import { DateTime } from "luxon";
import { z } from "zod";
import { STANDARD_ENDDATE, STANDARD_STARTDATE } from "../constants";

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

export const ReservationSchema = z
  .object({
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
        message:
          "Zadejte validní telefon ve formátu XXX XXX XXX nebo XXXXXXXXX",
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
          DateTime.fromISO(val, { zone: "Europe/Prague" }) >=
          STANDARD_STARTDATE,
        {
          message: `Datum musí být nejdříve ${STANDARD_STARTDATE.toFormat("dd.MM.yyyy")}.`,
        }
      )
      .refine(
        (val) =>
          DateTime.fromISO(val, { zone: "Europe/Prague" }) <= STANDARD_ENDDATE,
        {
          message: `Datum musí být nejpozději ${STANDARD_ENDDATE.toFormat("dd.MM.yyyy")}.`,
        }
      ),
    time: z
      .string({ message: "Vyberte čas rezervace." })
      .time({ message: "Vyberte čas rezervace." }),
    isSeasonal: z.boolean().default(false),
  })
  .refine(
    (data) => {
      const hour = Number(data.time.split(":")[0]);
      if (DateTime.fromISO(data.date).weekday === 6) {
        // Saturday: 9:00 - 11:30
        return hour >= 9 && hour <= 11;
      }
      // Other days: 16:00 - 19:00
      return hour >= 16 && hour <= 19;
    },
    (data) => ({
      message:
        DateTime.fromISO(data.date).weekday === 6
          ? "Čas rezervace musí být mezi 9:00 a 11:30"
          : "Čas rezervace musí být mezi 16:00 a 19:00",
      path: ["time"],
    })
  );

export type ReservationSchema = z.infer<typeof ReservationSchema>;

export type ReservationResult =
  | { success: true; message: string; reservationId: string }
  | { success: false; error: Record<string, string[]> };
