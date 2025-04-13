"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useActionState, useState } from "react";
import PeopleInput from "./PeopleInput";
import DayInput from "./DayInut";
import TimeInput from "../Form/TimeInput";
// import EquipmentInput from "./EquipmentInput";
import UserDataInput from "./UserDataInput";
// import { ReservationType } from "@/lib/types/types";
import { createReservation } from "../../_actions/formActions";

// type ReservationState = {
//   success: boolean;
//   error?: {
//     [key: string]: string[]; // Map of field errors
//   };
//   message?: string;
// };

// const initialState: ReservationState = { success: false };

export default function Formular() {
  const [data, action, isPending] = useActionState(createReservation, null);
  const [selectedPeopleCount, setSelectedPeopleCount] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string>("");

  // const [reservation, setReservation] = useState<ReservationType>({
  //   skiSets: [],
  // });

  return (
    <Card className="w-3/6 mx-auto">
      <CardHeader>
        <CardTitle>Rezervace celorocnich setu</CardTitle>
        <CardDescription>Vyplnte formular</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action}>
          {/* get number of people requiring reservation */}
          {data?.error?.peopleCount && (
            <div className="text-destructive">{data.error.peopleCount}</div>
          )}

          <PeopleInput
            setSelectedPeopleCount={setSelectedPeopleCount}
            selectedPeopleCount={selectedPeopleCount}
          />
          {data?.error?.date && (
            <div className="text-destructive">{data.error?.date}</div>
          )}
          {/* get day of reservation */}
          <DayInput selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          {data?.error?.time && (
            <div className="text-destructive">{data.error?.time}</div>
          )}
          {/* get time of reservation */}
          <TimeInput peopleCount={selectedPeopleCount} date={selectedDate} />
          {/* get equipment user want to rent */}
          {/* <EquipmentInput
            reservation={reservation}
            setReservation={setReservation}
          /> */}
          {/* user info */}
          <UserDataInput error={data?.error} prevData={data?.prevData} />
          {/* submit button */}
          <SubmitButton pending={isPending} />
        </form>
      </CardContent>
    </Card>
  );
}

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button className="w-full mt-4" variant="default" disabled={pending}>
      {pending ? "Vytváření rezervace" : "Odeslat rezervaci"}
    </Button>
  );
}
