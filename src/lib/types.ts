import { Reservation } from "@prisma/client";

export type ReservationType = Partial<Reservation>;

export type SetReservationType = React.Dispatch<
  React.SetStateAction<Partial<Reservation>>
>;
