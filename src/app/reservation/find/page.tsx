"use client";

import { findReservationByEmailAndLastName } from "@/app/_actions/reservation/reservationActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reservation } from "@prisma/client";
import { useRef, useState } from "react";

const FindReservation = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const [reservation, setReservation] = useState<Reservation>();

  const handleFindReservation = async () => {
    const email = emailRef.current?.value.trim();
    const lastName = lastNameRef.current?.value.trim();

    if (!email || !lastName) return;

    console.log(email, lastName);

    const result = await findReservationByEmailAndLastName(email);

    if(!result) return;

    setReservation(result);
  };

  console.log(reservation)

  return (
    <div>
      <Input placeholder="Zadejte email" ref={emailRef} />
      <Input placeholder="Zadejte příjmení" ref={lastNameRef} />
      <Button
        variant="default"
        className="ml-2"
        onClick={handleFindReservation}
      >
        Najít rezervaci
      </Button>
    </div>
  );
};

export default FindReservation;
