import { RESTRICTED_TIMESLOTS } from "@/lib/constants";
import { TIMESLOTS } from "@/lib/constants";

export const isTimeSlotDisabled = (
  time: string,
  timeIndex: number,
  timesFromDB: Set<string> | undefined,
  peopleCount: number
): boolean => {
  // Check if the slot is directly booked
  if (timesFromDB?.has(time)) return true;

  // Check consecutive slots
  for (let index = 1; index < peopleCount; index++) {
    const nextTimeSlot = TIMESLOTS[timeIndex + index];
    if (nextTimeSlot && timesFromDB?.has(nextTimeSlot)) {
      return true;
    }
  }

  // Check restricted time slots
  if (RESTRICTED_TIMESLOTS[peopleCount]?.includes(time)) {
    return true;
  }

  return false;
};

export const isTimeSlotDisabledForEdit = (
  time: `${number}:${number}:${number}`,
  timesFromDB: Set<string> | undefined,
  peopleCount: number
): boolean => {
  if (!time) return false;

  const timeIndex = TIMESLOTS.indexOf(time);
  
  // Check consecutive slots
  for (let index = 1; index < peopleCount; index++) {
    const nextTimeSlot = TIMESLOTS[timeIndex + index];
    if (nextTimeSlot && timesFromDB?.has(nextTimeSlot)) {
      return true;
    }
  }

  // Check restricted time slots
  if (RESTRICTED_TIMESLOTS[peopleCount]?.includes(time)) {
    return true;
  }

  return false;
};
