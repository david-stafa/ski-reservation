import { STANDARD_TIME_SLOTS, WeekDay } from "@/lib/constants";

export const isTimeSlotDisabled = (
  time: string,
  timeIndex: number,
  timesFromDB: Set<string> | undefined,
  peopleCount: number,
  dayOfWeek: WeekDay
): boolean => {
  // Check if the slot is directly booked
  if (timesFromDB?.has(time)) return true;

  const timeSlots = STANDARD_TIME_SLOTS[dayOfWeek];

  // Check consecutive slots
  for (let index = 1; index < peopleCount; index++) {
    const nextTimeSlot = timeSlots[timeIndex + index];
    if (nextTimeSlot && timesFromDB?.has(nextTimeSlot)) {
      return true;
    }
  }

  // Check restricted time slots
  if (peopleCount > 1) {
    for (let i = 0; i < peopleCount; i++) {
      const lastTimeSlot = timeSlots[timeSlots.length - i];
      if (lastTimeSlot === time) {
        return true;
      }
    }
  }

  return false;
};

/**
 * Checks if a time slot is disabled for editing purposes.
 * Used in useEffect to validate if the selected time remains available
 * when the user changes the date or people count.
 * 
 * @param time - The time slot to check
 * @param timesFromDB - Set of booked time slots from database
 * @param peopleCount - Number of people for the reservation
 * @param dayOfWeek - The day of the week
 * @returns true if the time slot is disabled, false otherwise
 */
export const isTimeSlotDisabledForEdit = (
  time: `${number}:${number}:${number}`,
  timesFromDB: Set<string> | undefined,
  peopleCount: number,
  dayOfWeek: WeekDay
): boolean => {
  if (!time) return false;

  const timeSlots = STANDARD_TIME_SLOTS[dayOfWeek];
  
  // Guard against undefined timeSlots (invalid dayOfWeek)
  if (!timeSlots) return true;
  
  const timeIndex = timeSlots.indexOf(time);

  // Check consecutive slots
  for (let index = 1; index < peopleCount; index++) {
    const nextTimeSlot = timeSlots[timeIndex + index];
    if (nextTimeSlot && timesFromDB?.has(nextTimeSlot)) {
      return true;
    }
  }

  if (!timeSlots.includes(time)) return true;

  // Check restricted time slots
  if (peopleCount > 1) {
    for (let i = 0; i < peopleCount; i++) {
      const lastTimeSlot = timeSlots[timeSlots.length - i];
      if (lastTimeSlot === time) {
        return true;
      }
    }
  }

  return false;
};

