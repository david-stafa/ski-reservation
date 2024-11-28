"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useActionState, useEffect, useState } from "react";
import PeopleInput from "./PeopleInput";
import DayInput from "./DayInut";
import TimeInput from "./TimeInput";
// import EquipmentInput from "./EquipmentInput";
import UserDataInput from "./UserDataInput";
import { ReservationType } from "@/lib/types/types";
import { useFormStatus } from "react-dom";
import { createReservation } from "../_actions/formActions";

export default function Form() {
  const [peopleCount, setPeopleCount] = useState<number>(0);
  const [reservation, setReservation] = useState<ReservationType>({
    skiSets: [],
  });

  const [error, action] = useActionState(createReservation, {});

  if (error) console.log(error);

  useEffect(() => console.log(reservation), [reservation, peopleCount]);

  return (
    <Card className="w-3/6 mx-auto">
      <CardHeader>
        <CardTitle>Rezervace celorocnich setu</CardTitle>
        <CardDescription>Vyplnte formular</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action}>
          {/* get number of people requiring reservation */}
          {error?.peopleCount && (
            <div className="text-destructive">{error.peopleCount}</div>
          )}
          <PeopleInput
            setPeopleCount={setPeopleCount}
            peopleCount={peopleCount}
          />
          {/* get day of reservation */}
          <DayInput setReservation={setReservation} reservation={reservation} />
          {/* get time of reservation */}
          <TimeInput
            setReservation={setReservation}
            reservation={reservation}
            peopleCount={peopleCount}
          />
          {/* get equipment user want to rent */}
          {/* <EquipmentInput
            reservation={reservation}
            setReservation={setReservation}
          /> */}
          {/* user info */}
          <UserDataInput
            reservation={reservation}
            setReservation={setReservation}
            error={error}
          />
          {/* submit button */}
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full mt-4" variant="default" disabled={pending}>
      Odeslat rezervaci
    </Button>
  );
}
