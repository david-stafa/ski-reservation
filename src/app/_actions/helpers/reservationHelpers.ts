import { SINGLE_RESERVATION_DURATION } from "@/lib/constants";
import { DateTime } from "luxon";
import { Prisma } from "@prisma/client";

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

const PEOPLE_COUNT_LABEL: Record<number, string> = {
  2: "dvě osoby",
  3: "tři osoby",
};

/**
 * Checks that the whole reservation fits inside the opening hours of that day.
 *
 * Closing time is derived from the last available time slot of the day, so it
 * follows the configured opening hours and stays correct across DST changes
 * (a hardcoded UTC hour would be off by one during the winter half of the season).
 *
 * @param date - reservation start as stored (UTC)
 * @param peopleCount - number of people; each one takes SINGLE_RESERVATION_DURATION minutes
 * @param timeSlots - the time slots available on that day ("HH:mm:ss")
 */
export const isWithinOpeningHours = (
  date: Date,
  peopleCount: number,
  timeSlots: readonly string[]
): Record<string, string[]> | undefined => {
  const start = DateTime.fromJSDate(date).setZone("Europe/Prague");
  const lastTimeSlot = timeSlots[timeSlots.length - 1];

  if (!lastTimeSlot) {
    return { date: ["V tento den je zavřeno. Zvolte prosím jiné datum."] };
  }

  // the day closes when the last bookable slot ends
  const closingTime = formatDateTime(
    start.toFormat("yyyy-MM-dd"),
    lastTimeSlot
  ).plus({ minutes: SINGLE_RESERVATION_DURATION });

  const end = start.plus({ minutes: calculateDuration(peopleCount) });

  if (end > closingTime) {
    const label = PEOPLE_COUNT_LABEL[peopleCount] ?? `${peopleCount} osob`;
    return {
      time: [
        `Zvolte jiný čas. Pro ${label} nelze zarezervovat časový blok těsně před koncem otvírací doby.`,
      ],
    };
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

/**
 * A reservation can still lose a race between the conflict check and the insert,
 * because startDate/endDate carry a unique constraint in the database.
 * Recognising it lets the user see the same message as a detected conflict
 * instead of a generic failure.
 */
export const isSlotAlreadyTakenError = (error: unknown): boolean =>
  error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";

export const SLOT_ALREADY_TAKEN_ERROR = {
  date: ["Tato rezervace už je bohužel obsazena."],
};
