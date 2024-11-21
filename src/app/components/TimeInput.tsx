import H3 from "@/components/h3";
import { Button } from "@/components/ui/button";
import { timeSlots } from "@/lib/timeSlots";
import { ReservationType, SetReservationType } from "@/lib/types";

interface TimeInputProps {
  reservation: ReservationType;
  setReservation: SetReservationType;
  peopleCount: number;
}

export default function TimeInput({
  reservation,
  setReservation,
  peopleCount,
}: TimeInputProps) {
  function handleTimeClick(time: string): void {
    setReservation({
      ...reservation,
      dateTime: reservation.dateTime.split(" ")[0] + " " + time,
    });
  }

  return (
    <section>
      <TimeInputHeading peopleCount={peopleCount} />
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

interface TimeInputHeadingProps {
  peopleCount: number;
}

function TimeInputHeading({ peopleCount }: TimeInputHeadingProps) {
  return (
    <>
      {peopleCount === 0 && <H3>Vyberte X časových bloků:</H3>}
      {peopleCount === 1 && <H3>Vyberte 1 časový blok:</H3>}
      {peopleCount > 1 && <H3>Vyberte {peopleCount} časové bloky:</H3>}
    </>
  );
}
