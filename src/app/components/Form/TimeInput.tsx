import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TIMESLOTS } from "@/lib/timeSlots";
import { ReservationSchema } from "@/lib/types/types";
import { cn } from "@/lib/utils";
import { DateTime } from "luxon";
import { useCallback, useEffect, useState } from "react";
import { FieldError, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { getAllReservationsDates } from "../../_actions/reservation/reservationActions";
import { SINGLE_RESERVATION_DURATION } from "@/lib/constants";

interface TimeInputProps {
  peopleCount: number;
  date: string;
  selectedTimeFromDB?: string;
  register: UseFormRegister<ReservationSchema>;
  setValue: UseFormSetValue<ReservationSchema>;
  error: FieldError | undefined;
  reservationTime?: string;
  reservationPeopleCount?: number;
}

const RESTRICTED_TIMESLOT_FOR_2_PEOPLE = ["18:50:00"];
const RESTRICTED_TIMESLOTS_FOR_3_PEOPLE = ["18:50:00", "18:40:00"];

const RESTRICTED_TIMESLOTS: Record<number, string[]> = {
  2: RESTRICTED_TIMESLOT_FOR_2_PEOPLE,
  3: RESTRICTED_TIMESLOTS_FOR_3_PEOPLE,
  // Add more if needed
};

export default function TimeInput({
  peopleCount,
  date,
  register,
  setValue,
  error,
  reservationTime,
  reservationPeopleCount,
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

  console.log(selectedTime);

  const fetchReservations = useCallback(async () => {
    try {
      setLoading(true); // show skeleton UI
      const data = await getAllReservationsDates(date);
      const reservationsTimeArray: string[] = [];

      data.map((reservation) => {
        const responseTime = DateTime.fromJSDate(reservation.startDate);

        for (let index = 0; index < reservation.peopleCount; index++) {
          const reservationMinuites = responseTime.minute;
          const bookedTime = responseTime
            .set({
              minute: reservationMinuites + SINGLE_RESERVATION_DURATION * index,
            })
            .toFormat("HH:mm:ss");
          reservationsTimeArray.push(bookedTime);
        }
      });

      setTimeOfReservations(new Set(reservationsTimeArray)); // update state with formatted times
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setSelectedTime(undefined); // clear selected time
      setLoading(false); // hide skeleton UI
    }
  }, [date, peopleCount]);

  console.log("timeOfReservations", timeOfReservations);

  // fetch data when date is changed and exists
  useEffect(() => {
    if (date) {
      fetchReservations();
    }
  }, [date, fetchReservations]); // fetch reservations whenever the `date` prop changes

  return (
    <section className={cn("mt-4", { hidden: date === "" })} key={date}>
      <Label className="mb-2">Časový blok</Label>
      {error && <p className="text-red-500 italic text-sm">{error.message}</p>}
      <div className="grid grid-flow-col grid-rows-6 gap-2 mb-2">
        {loading || date === "" ? (
          <TimeInputsSkeleton />
        ) : (
          <TimeInputs
            key={date}
            handleTimeClick={handleTimeClick}
            timesFromDB={timeOfReservations}
            selectedTime={selectedTime}
            peopleCount={peopleCount}
            reservationTime={reservationTime}
            reservationPeopleCount={reservationPeopleCount}
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
  peopleCount: number;
  reservationTime?: string;
  reservationPeopleCount?: number;
}

function TimeInputs({
  handleTimeClick,
  timesFromDB,
  selectedTime,
  peopleCount,
  reservationTime,
  reservationPeopleCount,
}: TimeInputsProps) {

  // TODO: REfactor this code -> did not have much time to think about it but it works
  // Remove already booked time slots from the list - so the user CAN select them when editing
  if (reservationTime && reservationPeopleCount) {
    for (let index = 1; index < reservationPeopleCount; index++) {
      const formattedReservationTime = DateTime.fromFormat(
        reservationTime,
        "HH:mm:ss"
      );
      const slot = formattedReservationTime
        .plus({
          minutes: SINGLE_RESERVATION_DURATION * index,
        })
        .toFormat("HH:mm:ss");
      if (peopleCount === 1) {
        timesFromDB?.delete(formattedReservationTime.toFormat("HH:mm:ss"));
      }
      timesFromDB?.delete(slot);
    }
  }

  return (
    <>
      {TIMESLOTS.map((time, timeIndex) => {
        let timeDisabled = timesFromDB?.has(time);

        if (!timeDisabled) {
          // Checks if any of the next time slots required for the current reservation are already booked.
          for (let index = 1; index < peopleCount; index++) {
            const nextTimeSlot = TIMESLOTS[timeIndex + index];
            if (timesFromDB?.has(nextTimeSlot)) {
              timeDisabled = true;
              // If any of the next time slots are booked, disable the current time slot
              if (timeDisabled) break;
            }
          }
        }

        // Make last time slot disabled, so the reservation doesn't exceed opening hours
        if (
          RESTRICTED_TIMESLOTS[peopleCount] &&
          RESTRICTED_TIMESLOTS[peopleCount].includes(time)
        ) {
          timeDisabled = true;
        }

        return (
          <Button
            key={time}
            onClick={() => handleTimeClick(time)}
            type="button"
            variant={selectedTime === time ? "default" : "secondary"}
            disabled={timeDisabled}
            className={cn(timeDisabled && "!opacity-20")}
          >
            {time.slice(0, 5)}
          </Button>
        );
      })}
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
