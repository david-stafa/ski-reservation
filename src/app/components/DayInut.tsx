import H3 from "@/components/h3";
import { Button } from "@/components/ui/button";
import { ReservationType, SetReservationType } from "@/lib/types/types";
import { useState } from "react";

interface DayInputProps {
  reservation: ReservationType;
  setReservation: SetReservationType;
}

export default function DayInput({
  reservation,
  setReservation,
}: DayInputProps) {
  function handleDayClick(day: string): void {
    setReservation({ ...reservation, dateTime: new Date(day) });
    setDate(day);
  }

  const [date, setDate] = useState<string>();

  return (
    <section>
      <H3>Vyberte termín:</H3>
      <DayButton
        handleClick={handleDayClick}
        day="2025-10-06"
        dayCZ="Pondělí"
      />
      <DayButton handleClick={handleDayClick} day="2025-10-07" dayCZ="Úterý" />
      <DayButton handleClick={handleDayClick} day="2025-10-08" dayCZ="Středa" />
      <DayButton handleClick={handleDayClick} day="2025-10-10" dayCZ="Pátek" />
      <input
        type="string"
        name="date"
        id="date"
        value={date || ""}
        hidden
        readOnly
      />
    </section>
  );
}

interface DayButtonProps {
  day: string;
  dayCZ: string;
  handleClick: (day: string) => void;
}

function DayButton({ handleClick, day, dayCZ }: DayButtonProps) {
  return (
    <Button
      onClick={() => handleClick(day)}
      type="button"
      className="mr-2 grow"
      variant="secondary"
    >
      {dayCZ}
    </Button>
  );
}
