import { z } from "zod";
import { ENDDATE, STARTDATE } from "../constants";

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
  phone: z
    .string()
    .trim()
    .regex(/^(\d{3} \d{3} \d{3}|\d{9})$/, {
      message: "Zadejte validní telefon ve formátu XXX XXX XXX nebo XXXXXXXXX",
    }),
  peopleCount: z.coerce.number({ message: "Vyberte počet osob." }).min(1),
  date: z
    .string()
    .refine((val) => new Date(val) >= new Date(STARTDATE), {
      message: `Datum musí být nejdříve ${new Date(
        STARTDATE
      ).toLocaleDateString("cs-CZ", { month: "long", day: "numeric", year: "numeric" })}.`,
    })
    .refine((val) => new Date(val) <= new Date(ENDDATE), {
      message: `Datum musí být nejpozději ${new Date(
        ENDDATE
      ).toLocaleDateString("cs-CZ", { month: "long", day: "numeric", year: "numeric" })}.`,
    }),
  time: z
    .string()
    .time("Vyberte čas rezervace.")
    .refine(
      (val) =>
        Number(val.split(":")[0]) >= 15 && Number(val.split(":")[0]) <= 19,
      {
        message: "Čas rezervace musí být mezi 15:00 a 19:00",
      }
    ),
});

export type ReservationSchema = z.infer<typeof ReservationSchema>;

export type ReservationResult =
  | { success: true; message: string; redirectUrl: string}
  | { success: false; error: Record<string, string[]> };
