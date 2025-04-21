import H3 from "@/components/h3";
import { Button } from "@/components/ui/button";
import { TIMESLOTS } from "@/lib/timeSlots";
import { useCallback, useEffect, useState } from "react";
import { getAllReservationsDates } from "../../_actions/reservationActions";
import { FieldError, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { cn } from "@/lib/utils";
import { ReservationSchema } from "@/lib/types/types";

interface TimeInputProps {
  peopleCount: number;
  date: string;
  register: UseFormRegister<ReservationSchema>;
  setValue: UseFormSetValue<ReservationSchema>;
  error: FieldError | undefined;
}

const RESTRICTED_TIMESLOT_FOR_2_PEOPLE = "18:50:00";
const RESTRICTED_TIMESLOTS_FOR_3_PEOPLE = ["18:50:00", "18:40:00"];

export default function TimeInput({
  peopleCount,
  date,
  register,
  setValue,
  error,
}: TimeInputProps) {
  // store selected time by user
  const [selectedTime, setSelectedTime] = useState<string>();
  // store fetched reservations dates from DB
  const [timeOfReservations, setTimeOfReservations] = useState<Set<string>>();
  // loading state -> display skeleton if true
  const [loading, setLoading] = useState(true);

  // on click store time value with useState and pass it to controlled input
  function handleTimeClick(time: string) {
    setValue("time", time);
    setSelectedTime(time);
  }

  const fetchReservations = useCallback(async () => {
    try {
      setLoading(true); // show skeleton UI
      const data = await getAllReservationsDates(date);
      const reservationsTimeArray: string[] = [];

      data.map((reservation) => {

        console.log("reservation", reservation.startDate);
        let startHour = reservation.startDate.getUTCHours() + 2;
        console.log(reservation.startDate.getUTCHours() + 2);
        let startMinutes = reservation.startDate.getMinutes();
        let resTime: string;

        for (let index = 0; index < reservation.peopleCount; index++) {
          if (index === 0) {
            resTime = startHour + ":" + startMinutes + ":00";
          } else if (startMinutes !== 50) {
            startMinutes = startMinutes + 10;
          } else {
            startMinutes = 0;
            startHour = startHour + 1;
          }

          if (startMinutes === 0) {
            resTime = startHour + ":" + "00" + ":00";
          } else {
            resTime = startHour + ":" + startMinutes + ":00";
          }

          reservationsTimeArray.push(resTime);
        }
      });

      if (peopleCount === 2) {
        reservationsTimeArray.push(RESTRICTED_TIMESLOT_FOR_2_PEOPLE);
      }

      if (peopleCount === 3) {
        reservationsTimeArray.push(...RESTRICTED_TIMESLOTS_FOR_3_PEOPLE);
      }

      setTimeOfReservations(new Set(reservationsTimeArray)); // update state with formatted times
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setSelectedTime(undefined); // clear selected time
      setLoading(false); // hide skeleton UI
    }
  }, [date, peopleCount]);

  // fetch data when date is changed and exists
  useEffect(() => {
    if (date) {
      fetchReservations();
    }
  }, [date, fetchReservations]); // fetch reservations whenever the `date` prop changes

  return (
    <section className={cn("mt-2", { hidden: date === "" })}>
      <TimeInputHeading peopleCount={peopleCount} />
      {error && <p className="text-red-500">{error.message}</p>}
      <div className="grid grid-flow-col grid-rows-6 gap-2 mb-2">
        {loading || date === "" ? (
          <TimeInputsSkeleton />
        ) : (
          <TimeInputs
            handleTimeClick={handleTimeClick}
            timesFromDB={timeOfReservations}
            selectedTime={selectedTime}
          />
        )}
      </div>
      <input {...register("time")} type="text" id="time" hidden readOnly />
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
      {TIMESLOTS.map((time) => (
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
  return TIMESLOTS.map((time) => (
    <Button
      key={time}
      type="button"
      className="animate-pulse"
      variant="secondary"
    />
  ));
}
