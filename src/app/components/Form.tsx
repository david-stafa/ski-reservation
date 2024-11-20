"use client";

import H3 from "@/components/h3";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { timeSlots } from "@/lib/timeSlots";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Reservation } from "@prisma/client";
import PeopleInput from "./PeopleInput";
import DayInput from "./DayInut";
import TimeInput from "./TimeInput";
import EquipmentInput from "./EquipmentInput";
import UserDataInput from "./UserDataInput";

export default function Form() {
  const [peopleCount, setPeopleCount] = useState<number>(0);

  const [reservation, setReservation] = useState<Reservation | object>({});

  useEffect(() => console.log(reservation), [reservation, peopleCount]);

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
