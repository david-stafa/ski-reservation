import { z } from "zod";
import { SEASONAL_ENDDATE, SEASONAL_STARTDATE } from "../constants";
import { DateTime } from "luxon";

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
  firstName: z
    .string()
    .min(2, { message: "Jméno musí mít aspoň 2 znaky." })
    .trim(),
  lastName: z
    .string()
    .min(2, { message: "Příjmení musí mít aspoň 2 znaky." })
    .trim(),
  email: z.string().email({ message: "Zadejte validní email." }).trim(),
  // TODO finish phone error message and validation
  phone: z
    .string()
    .regex(/^(\d{3} \d{3} \d{3}|\d{9})$/, {
      message: "Zadejte validní telefon ve formátu XXX XXX XXX nebo XXXXXXXXX",
    })
    .trim(),
  peopleCount: z.coerce
    .number({ message: "Vyberte počet osob." })
    .min(1)
    .max(3),
  date: z
    .string({ message: "Vyberte datum." })
    .refine(
      (val) =>
        DateTime.fromISO(val, { zone: "Europe/Prague" }) >= SEASONAL_STARTDATE,
      {
        message: `Datum musí být nejdříve ${SEASONAL_STARTDATE.toFormat("dd.MM.yyyy")}.`,
      }
    )
    .refine(
      (val) =>
        DateTime.fromISO(val, { zone: "Europe/Prague" }) <= SEASONAL_ENDDATE,
      {
        message: `Datum musí být nejpozději ${SEASONAL_ENDDATE.toFormat("dd.MM.yyyy")}.`,
      }
    ),
  time: z
    .string({ message: "Vyberte čas rezervace." })
    .time({ message: "Vyberte čas rezervace." })
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
  | { success: true; message: string; redirectUrl: string }
  | { success: false; error: Record<string, string[]> };
