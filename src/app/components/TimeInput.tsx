import H3 from "@/components/h3";
import { Button } from "@/components/ui/button";
import { timeSlots } from "@/lib/timeSlots";
import { Reservation } from "@prisma/client";

interface TimeInputProps {
  reservation: Reservation | object;
  setReservation: React.Dispatch<React.SetStateAction<Reservation | object>>;
}

export default function TimeInput({
  reservation,
  setReservation,
}: TimeInputProps) {
  function handleTimeClick(time: string): void {
    setReservation({
      ...reservation,
      dateTime: reservation.dateTime.split(" ")[0] + " " + time,
    });
  }

  return (
    <section>
      <H3>Vyberte čas:</H3>
      <div className="grid grid-flow-col grid-rows-6 gap-2 mb-2">
        {timeSlots.map((time, i) => (
          <TimeButton key={i} handleClick={handleTimeClick} time={time} />
        ))}
      </div>
    </section>
  );
}

interface TimeButtonProps {
  time: string;
  handleClick: (time: string) => void;
}

function TimeButton({ handleClick, time }: TimeButtonProps) {
  return (
    <Button onClick={() => handleClick(time)} type="button" variant="secondary">
      {time}
    </Button>
  );
}
