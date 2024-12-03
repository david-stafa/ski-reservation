import H3 from "@/components/h3";
import { Button } from "@/components/ui/button";
import { timeSlots } from "@/lib/timeSlots";
import { useEffect, useState } from "react";
import { getAllReservationsDates } from "../_actions/reservationActions";

interface TimeInputProps {
  peopleCount: number;
  date: string;
}

export default function TimeInput({ peopleCount, date }: TimeInputProps) {
  // store selected time by user
  const [selectedTime, setSelectedTime] = useState<string>();
  // store fetched reservations dates from DB
  const [timeOfReservations, setTimeOfReservations] = useState<Set<string>>();
  // loading state -> display skeleton if true
  const [loading, setLoading] = useState(true);

  // on click store time value with useState and pass it to controlled input
  function handleTimeClick(time: string) {
    setSelectedTime(time);
  }

  // fetch data when date is changed and exists
  useEffect(() => {
    if (date) {
      fetchReservations();
    }
  }, [date]); // fetch reservations whenever the `date` prop changes

  async function fetchReservations() {
    try {
      setLoading(true); // show skeleton UI
      const data = await getAllReservationsDates(date);

      // transform and format reservation times
      const reservationsTime = new Set(
        data.map((item) => formatTime(item.dateTime))
      );

      setTimeOfReservations(reservationsTime); // update state with formatted times
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setSelectedTime(undefined); // clear selected time
      setLoading(false); // hide skeleton UI
    }
  }

  // function to format time to HH:MM:SS format
  function formatTime(date: Date): string {
    const hours = date.getUTCHours().toString();
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}:00`;
  }

  return (
    <section>
      <TimeInputHeading peopleCount={peopleCount} />
      <div className="grid grid-flow-col grid-rows-6 gap-2 mb-2">
        {loading ? (
          <TimeInputsSkeleton />
        ) : (
          <TimeInputs
            handleTimeClick={handleTimeClick}
            timesFromDB={timeOfReservations}
            selectedTime={selectedTime}
          />
        )}
      </div>
      <input
        type="string"
        name="time"
        id="time"
        hidden
        value={selectedTime || ""}
        readOnly
      />
    </section>
  );
}

//* TIME INPUTS COMPONENT
interface TimeInputsProps {
  handleTimeClick: (time: string) => void;
  timesFromDB: Set<string> | undefined;
  selectedTime: string | undefined;
}

function TimeInputs({
  handleTimeClick,
  timesFromDB,
  selectedTime,
}: TimeInputsProps) {
  return (
    <>
      {timeSlots.map((time) => (
        <Button
          key={time}
          onClick={() => handleTimeClick(time)}
          type="button"
          variant={selectedTime == time ? "default" : "secondary"}
          disabled={timesFromDB?.has(time)}
        >
          {time.slice(0, 5)}
        </Button>
      ))}
    </>
  );
}

//* TIME INPUT HEADING COMPONENT
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

//* TIME INPUTS SKELETON
function TimeInputsSkeleton() {
  return timeSlots.map((time) => (
    <Button
      key={time}
      type="button"
      className="animate-pulse"
      variant="secondary"
    />
  ));
}
