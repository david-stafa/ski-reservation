import { SINGLE_RESERVATION_DURATION } from "@/lib/constants";
import { DateTime } from "luxon";

export const calculateDuration = (peopleCount: number) => {
  return SINGLE_RESERVATION_DURATION * peopleCount;
};

export const formatDateTime = (date: string, time: string) => {
  return DateTime.fromFormat(`${date} ${time}`, "yyyy-MM-dd HH:mm:ss", {
    zone: "Europe/Prague",
  });
};

// ***** Convert dateTime to UTC and create new start and end date using luxon *****
export const createStartAndEndDate = (date: DateTime, duration: number) => {
  const newStartDate = date.toUTC().toJSDate();
  const newEndDate = date.plus({ minutes: duration }).toUTC().toJSDate();
  return { newStartDate, newEndDate };
};

const LAST_HOUR_IN_UTC = 16; // in czech time it is 18:00

// check if reservation time is within opening hours
export const isWithinOpeningHours = (date: Date, peopleCount: number) => {
  // stop when peopleCount > 1 and time would exceed opening hours
  if (date.getUTCHours() >= LAST_HOUR_IN_UTC && date.getUTCMinutes() >= 40) {
    if (peopleCount === 2 && date.getUTCMinutes() >= 50) {
      return {
        time: [
          "Zvolte jiný čas. Pro dvě osoby nelze zarezezervovat časový blok těsně před koncem otvírací doby.",
        ],
      };
    }
    if (peopleCount === 3 && date.getMinutes() >= 40) {
      return {
        time: [
          "Zvolte jiný čas. Pro tři osoby nelze zarezezervovat časový blok těsně před koncem otvírací doby.",
        ],
      };
    }
  }
};

export const isWithinReservationTime = (
  newStartDate: Date,
  newEndDate: Date,
  actualStartDate: Date,
  actualEndDate: Date
): boolean => {
  return (newStartDate >= actualStartDate && newEndDate <= actualEndDate);
};
