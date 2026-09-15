"use client";

import { deleteReservation } from "@/app/_actions/reservation/formActions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { XCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteReservationButton({
  id,
  unstyled = false,
  redirectUrl = "/",
  label,
}: {
  id: string;
  unstyled?: boolean;
  redirectUrl?: string;
  /** Names the reservation in the confirmation, so it is clear what is being deleted. */
  label?: string;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // TODO: add success message?

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError("");

      // the action reports failure in its result rather than by throwing
      const result = await deleteReservation(id);
      if (!result.success) {
        setError(
          "Nastala chyba při mazání rezervace. Prosím zkuste to znovu později."
        );
        return;
      }

      setIsOpen(false);
      router.push(redirectUrl);
    } catch {
      setError(
        "Nastala chyba při mazání rezervace. Prosím zkuste to znovu později."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {unstyled ? (
          <button className="text-red-500 hover:!text-red-500 text-sm px-2 py-1 hover:bg-zinc-100 w-full rounded-sm leading-6 text-left">
            Smazat rezervaci
          </button>
        ) : (
          <Button variant="destructive">Smazat rezervaci</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <XCircleIcon className="size-15 mx-auto text-destructive " />
          <div className="my-2">
            <DialogTitle className="text-lg font-semibold text-center mb-1">
              Smazat rezervaci
            </DialogTitle>
            <DialogDescription className="text-base text-zinc-500 text-center">
              Opravdu chcete smazat rezervaci
              {label ? ` — ${label}` : ""}? Tato akce je nevratná.
            </DialogDescription>
          </div>
        </DialogHeader>
        {error && <p className="text-red-500 italic text-sm">{error}</p>}
        <DialogFooter className="flex flex-row !justify-center gap-2 mt-2">
          <DialogClose asChild>
            <Button variant="outline">Ne, vrátit se zpět.</Button>
          </DialogClose>
          <Button
            variant="destructive"
            className="max-w-xs"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            Ano, smazat!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
