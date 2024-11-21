"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import PeopleInput from "./PeopleInput";
import DayInput from "./DayInut";
import TimeInput from "./TimeInput";
import EquipmentInput from "./EquipmentInput";
import UserDataInput from "./UserDataInput";
import { ReservationType } from "@/lib/types";

export default function Form() {
  const [peopleCount, setPeopleCount] = useState<number>(0);
  const [reservation, setReservation] = useState<ReservationType>({});

  useEffect(() => console.log(peopleCount), [reservation, peopleCount]);

  return (
    <Card className="w-3/6 mx-auto">
      <CardHeader>
        <CardTitle>Rezervace celorocnich setu</CardTitle>
        <CardDescription>Vyplnte formular</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          {/* get number of people requiring reservation */}
          <PeopleInput setPeopleCount={setPeopleCount} />
          {/* get day of reservation */}
          <DayInput setReservation={setReservation} reservation={reservation} />
          {/* get time of reservation */}
          <TimeInput
            setReservation={setReservation}
            reservation={reservation}
            peopleCount={peopleCount}
          />
          {/* get equipment user want to rent */}
          <EquipmentInput />
          {/* user info */}
          <UserDataInput
            reservation={reservation}
            setReservation={setReservation}
          />
          {/* submit button */}
          <Button className="w-full mt-4" variant="default">Odeslat rezervaci</Button>
        </form>
      </CardContent>
    </Card>
  );
}
