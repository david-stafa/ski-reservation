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
      <DialogContent className="text-center">
        <DialogHeader>
          <XCircleIcon className="size-15 mx-auto text-destructive " />
          <DialogTitle className="text-lg font-semibold">
            Jste si jisti?
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-500">
            Opravdu chcete smazat rezervaci? Tato akce je nevratná.
          </DialogDescription>
        </DialogHeader>
        {error && <p className="text-red-500 italic text-sm">{error}</p>}
        <DialogFooter className="flex flex-row !justify-center gap-2 mt-2">
          <DialogClose asChild>
            <Button variant="outline" className="px-10">
              Zrušit
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            className="max-w-xs"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            Smazat rezervaci
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
