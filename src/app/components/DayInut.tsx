import H3 from "@/components/h3";
import { Button } from "@/components/ui/button";
import { Reservation } from "@prisma/client";

interface DayInputProps {
  reservation: Reservation | object;
  setReservation: React.Dispatch<React.SetStateAction<object | Reservation>>;
}

export default function DayInput({
  reservation,
  setReservation,
}: DayInputProps) {

  function handleDayClick(day: string): void {
    setReservation({ ...reservation, dateTime: day });
  }

  return (
    <section>
      <H3>Vyberte termin:</H3>
      <DayButton handleClick={handleDayClick} day="2025-10-6" dayCZ="Pondělí" />
      <DayButton handleClick={handleDayClick} day="2025-10-7" dayCZ="Úterý" />
      <DayButton handleClick={handleDayClick} day="2025-10-8" dayCZ="Středa" />
      <DayButton handleClick={handleDayClick} day="2025-10-10" dayCZ="Pátek" />
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
