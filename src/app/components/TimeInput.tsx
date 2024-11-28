import H3 from "@/components/h3";
import { Button } from "@/components/ui/button";
import { timeSlots } from "@/lib/timeSlots";
import { ReservationType, SetReservationType } from "@/lib/types/types";
import { useState } from "react";

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
    // get hours and minutes to separate variables
    const [hours, minutes] = time.split(":");
    // handle that updatedDate has Date type - without this workaround the .setHours return number type
    const updatedDate = new Date(reservation.dateTime!); // clone the Date object
    updatedDate.setHours(+hours, +minutes); // update hours and minutes in date object

    setReservation({
      ...reservation,
      dateTime: updatedDate,
    });

    setTime(time);
  }

  const [time, setTime] = useState<string>();

  return (
    <section>
      <TimeInputHeading peopleCount={peopleCount} />
      <div className="grid grid-flow-col grid-rows-6 gap-2 mb-2">
        {timeSlots.map((time, i) => (
          <TimeButton
            key={i}
            handleClick={() => handleTimeClick(time)}
            time={time.split(":").slice(0, 2).join(":")}
          />
        ))}
      </div>
      <input
        type="string"
        name="time"
        id="time"
        hidden
        value={time || ""}
        readOnly
      />
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
