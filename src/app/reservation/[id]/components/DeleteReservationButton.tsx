"use client";

import { deleteReservation } from "@/app/_actions/reservation/formActions";
import { Button } from "@/components/ui/button";

export function DeleteReservationButton({ id }: { id: string }) {

  const handleDelete = async () => {
    const response = await deleteReservation(id);
    console.log("Deleting reservation with ID:", id);
    if (response.success) {
      // Redirect to the reservations page or show a success message
      window.location.href = "/";
    } else {
      // Handle error
      console.error(response.error);
    }
  };


  // TODO: Add confirmation modal with confirmation button and cancel button

  return (
    <Button variant="destructive" onClick={handleDelete}>
      Smazat rezervaci
    </Button>
  );
}
