import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReservationSchema } from "@/lib/types/types";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import { UseFormGetValues } from "react-hook-form";

type ReservationModalProps = {
  getValues: UseFormGetValues<ReservationSchema>;
  onConfirm: () => void;
  disabled: boolean;
};

export default function ReservationModal({ getValues, onConfirm, disabled }: ReservationModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<ReservationSchema | undefined>();

  console.log(disabled)

  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen);

    if (isOpen) {
      // 🔥 This runs when the dialog is being opene
      const data = getValues();
      setFormData(data);
      console.log("Dialog opened — running setup logic...");
    }

    // 🔥 This runs when the dialog is being closed
    if (!isOpen) {
      console.log("Dialog closed — running cleanup logic...");
      // Put your custom logic here, e.g. reset form, save state, etc.
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger disabled={disabled}>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            <>Hello</>
            {formData && (
              <>
                {formData.firstName} {formData.email} {formData.phone}{" "}
                {formData.date} {formData.peopleCount}
              </>
            )}
            <Button type="submit">Click Me</Button>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onConfirm}>Potvrdit a odeslat</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
