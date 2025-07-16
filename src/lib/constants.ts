export const STARTDATE = "2025-09-15";
export const ENDDATE = "2025-09-19";
export const SINGLE_RESERVATION_DURATION = 10; // in minutes

const RESTRICTED_TIMESLOT_FOR_2_PEOPLE = ["18:50:00"];
const RESTRICTED_TIMESLOTS_FOR_3_PEOPLE = ["18:50:00", "18:40:00"];

export const RESTRICTED_TIMESLOTS: Record<number, string[]> = {
  2: RESTRICTED_TIMESLOT_FOR_2_PEOPLE,
  3: RESTRICTED_TIMESLOTS_FOR_3_PEOPLE,
  // Add more if needed
};