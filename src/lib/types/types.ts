import { Reservation, SkiSet } from "@prisma/client";

export type ReservationType = Partial<Reservation> & {
  skiSets: Omit<SkiSet, "reservationId" | "id">[];
};

export type SetReservationType = React.Dispatch<
  React.SetStateAction<ReservationType>
>;

export type ErrorType =
  | {
      firstName?: string[] | undefined;
      lastName?: string[] | undefined;
      email?: string[] | undefined;
      phone?: string[] | undefined;
      peopleCount?: string[] | undefined;
    }
  | undefined;