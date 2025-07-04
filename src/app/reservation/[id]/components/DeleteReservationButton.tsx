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

export function DeleteReservationButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // TODO: add success message?

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteReservation(id);
      router.push("/");
    } catch {
      setError(
        "Nastala chyba při mazání rezervace. Prosím zkuste to znovu později."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Smazat rezervaci</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <XCircleIcon className="size-15 mx-auto text-destructive " />
          <div className="my-2">
            <DialogTitle className="text-lg font-semibold text-center mb-1">
              Smazat rezervaci
            </DialogTitle>
            <DialogDescription className="text-base text-zinc-500 text-center">
              Opravdu chcete smazat rezervaci? Tato akce je nevratná.
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
