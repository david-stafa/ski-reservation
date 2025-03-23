import { Reservation, SkiSet } from "@prisma/client";
import { z } from "zod";

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

export type PrevFormData =
  | {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    }
  | undefined;

export const ReservationSchema = z.object({
  firstName: z.string().min(2, { message: "Jméno musí mít aspoň 2 znaky." }),
  lastName: z.string().min(2, { message: "Příjmení musí mít aspoň 2 znaky." }),
  email: z.string().email({ message: "Zadejte validní email." }),
  // TODO finish phone error message and validation
  phone: z.string().min(9, { message: "Zadejte validní telefon" }),
  peopleCount: z.coerce.number({ message: "Vyberte počet osob." }).min(1),
  date: z.string().date()
  // time: z.string().time("Vyberte čas rezervace."),
});

export type ReservationSchema = z.infer<typeof ReservationSchema>;
