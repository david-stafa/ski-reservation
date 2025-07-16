import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TIMESLOTS } from "@/lib/timeSlots";
import { ReservationSchema } from "@/lib/types/types";
import { cn } from "@/lib/utils";
import { DateTime } from "luxon";
import { useCallback, useEffect, useState } from "react";
import { FieldError, UseFormRegister, UseFormSetValue } from "react-hook-form";

import {
  DAY_TIMESLOTS_COUNT,
  SINGLE_RESERVATION_DURATION,
} from "@/lib/constants";
import { isTimeSlotDisabled } from "./helpers/helpers";
import { getAllReservationsDates } from "@/app/_actions/reservation/reservationActions";
import { XIcon } from "lucide-react";

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
  // calculate free timeslots count
  const freeTimeslotsCount =
    DAY_TIMESLOTS_COUNT - (timeOfReservations?.size || 0);

  // on click store time value with useState and pass it to controlled input
  function handleTimeClick(time: string) {
    // if the user clicks on the same time slot, clear the time input and selected time
    if (time === selectedTime) {
      setValue("time", "");
      setSelectedTime(undefined);
      return;
    }
    setValue("time", time);
    setSelectedTime(time);
  }

  const fetchReservations = useCallback(async () => {
    try {
      setLoading(true); // show skeleton UI
      const data = await getAllReservationsDates(date);
      const reservationsTimeArray: string[] = [];

      data.forEach((reservation) => {
        const responseTime = DateTime.fromJSDate(reservation.startDate, {
          zone: "Europe/Prague",
        });

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

      const reservationTimeSet = new Set(reservationsTimeArray);

      // Remove already booked time slots from the list - so the user CAN select them when editing
      if (reservationTime && reservationPeopleCount) {
        const formattedReservationTime = DateTime.fromFormat(
          reservationTime,
          "HH:mm:ss"
        );
        for (let index = 0; index < reservationPeopleCount; index++) {
          const slot = formattedReservationTime
            .plus({
              minutes: SINGLE_RESERVATION_DURATION * index,
            })
            .toFormat("HH:mm:ss");
          reservationTimeSet.delete(slot);
        }
      }

      setTimeOfReservations(reservationTimeSet); // update state with formatted times
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setSelectedTime(undefined); // clear selected time
      setLoading(false); // hide skeleton UI
    }
  }, [date, reservationPeopleCount, reservationTime]);

  // fetch data when date is changed and exists
  useEffect(() => {
    if (date) {
      fetchReservations();
    }
  }, [date, fetchReservations]); // fetch reservations whenever the `date` prop changes

  // Reset selected time and time input value when people count changes
  useEffect(() => {
    // Only reset if we're not in edit mode (no reservationTime)
    // or if we are in edit mode but the peopleCount has changed from the original
    if (!reservationTime || peopleCount !== reservationPeopleCount) {
      setSelectedTime(undefined);
      setValue("time", "");
    }
  }, [peopleCount, setValue, reservationTime, reservationPeopleCount]);

  if (date === "")
    return (
      <div className="mt-4">
        <Label className="mb-2">Začátek rezervace</Label>
        <div className="animate-pulse w-full h-10 bg-zinc-200 rounded-md text-sm" />
        {error && (
          <p className="text-red-500 italic text-sm">{error.message}</p>
        )}
      </div>
    );

  if (freeTimeslotsCount === 0) {
    return (
      <div className="flex justify-center items-center gap-2 px-3 py-6 mt-4 border border-red-500 rounded-md shadow-xs">
        <XIcon className="w-5 h-5 text-red-500" />
        <p className="text-red-500 text-sm text-center">
          Všechny termíny jsou na tento den obsazeny.
        </p>
      </div>
    );
  }

  if (freeTimeslotsCount < peopleCount) {
    return (
      <div className="flex justify-center items-center gap-2 px-3 py-6 mt-4 border border-red-500 rounded-md shadow-xs">
        <XIcon className="w-5 h-5 text-red-500" />
        <p className="text-red-500 text-sm text-center">
          Pro daný počet lidí nejsou dostupné žádné termíny.
        </p>
      </div>
    );
  }

  return (
    <section className={cn("mt-4 mb-2", { hidden: date === "" })}>
      <Label className="mb-2">Začátek rezervace</Label>
      <div
        className={cn(
          "grid grid-flow-col grid-rows-6 gap-2 border border-zinc-200 p-3 rounded-md shadow-xs",
          error && "border-red-500"
        )}
      >
        {loading ? (
          <TimeInputsSkeleton />
        ) : (
          <TimeInputs
            handleTimeClick={handleTimeClick}
            timesFromDB={timeOfReservations}
            selectedTime={selectedTime}
            peopleCount={peopleCount}
            reservationTime={reservationTime}
          />
        )}
      </div>
      {error && <p className="text-red-500 italic text-sm">{error.message}</p>}
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
}

function TimeInputs({
  handleTimeClick,
  timesFromDB,
  selectedTime,
  peopleCount,
  reservationTime,
}: TimeInputsProps) {
  return (
    <>
      {TIMESLOTS.map((time, timeIndex) => {
        const timeDisabled = isTimeSlotDisabled(
          time,
          timeIndex,
          timesFromDB,
          peopleCount
        );

        const isStartOfReservation = reservationTime === time;

        return (
          <Button
            key={time}
            onClick={() => handleTimeClick(time)}
            type="button"
            variant={selectedTime === time ? "default" : "secondary"}
            disabled={timeDisabled || isStartOfReservation}
            className={cn(
              timeDisabled && "!opacity-20",
              isStartOfReservation && "border-2 border-blue-500 !opacity-50"
            )}
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
