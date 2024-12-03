import H3 from "@/components/h3";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

interface DayInputProps {
  selectedDate: string;
  setSelectedDate: Dispatch<SetStateAction<string>>;
}

export default function DayInput({
  selectedDate,
  setSelectedDate,
}: DayInputProps) {
  function handleDayClick(day: string): void {
    setSelectedDate(day);
  }

  return (
    <section>
      <H3>Vyberte termín:</H3>
      <DayButton
        handleClick={handleDayClick}
        day="2025-10-06"
        dayCZ="Pondělí"
        selectedDay={selectedDate}
      />
      <DayButton
        handleClick={handleDayClick}
        day="2025-10-07"
        dayCZ="Úterý"
        selectedDay={selectedDate}
      />
      <DayButton
        handleClick={handleDayClick}
        day="2025-10-08"
        dayCZ="Středa"
        selectedDay={selectedDate}
      />
      <DayButton
        handleClick={handleDayClick}
        day="2025-10-10"
        dayCZ="Pátek"
        selectedDay={selectedDate}
      />
      <input
        type="string"
        name="date"
        id="date"
        value={selectedDate}
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
  selectedDay: string;
}

function DayButton({ handleClick, day, dayCZ, selectedDay }: DayButtonProps) {
  return (
    <Button
      onClick={() => handleClick(day)}
      type="button"
      className="mr-2 grow"
      variant={selectedDay === day ? "default" : "secondary"}
    >
      {dayCZ}
    </Button>
  );
}
