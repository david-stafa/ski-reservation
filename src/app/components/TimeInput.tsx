import H3 from "@/components/h3";
import { Button } from "@/components/ui/button";
import { timeSlots } from "@/lib/timeSlots";
import { useState } from "react";

interface TimeInputProps {
  peopleCount: number;
}

export default function TimeInput({ peopleCount }: TimeInputProps) {
  const [time, setTime] = useState<string>();

  function handleTimeClick(time: string) {
    setTime(time);
  }

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
