"use server";

import { prisma } from "@/db/prisma";
import { ReservationResult, ReservationSchema } from "@/lib/types/types";
import { revalidatePath } from "next/cache";
import { DateTime } from "luxon";

export async function createReservation(
  prevState: unknown,
  formData: ReservationSchema
): Promise<ReservationResult> {
  // parsing reservation form inputs with zod
  const result = ReservationSchema.safeParse(formData);

  // return field error when validation fails
  if (result.success === false) {
    return {
      success: false,
      error: result.error.formErrors.fieldErrors,
    };
  }
  // result data from form inputs
  const data = result.data;
  // Calculate duration based on peopleCount (10 mins each )
  const duration = 10 * data.peopleCount;

  // ***** Create dateTime with Prague time zone(becouse Vercel threast is as UTC otherwise) *****
  const dateTime = DateTime.fromFormat(
    `${data.date} ${data.time}`,
    "yyyy-MM-dd HH:mm:ss",
    { zone: "Europe/Prague" }
  );

  // ***** Convert dateTime to UTC and create new start and end date using luxon *****
  const newStartDate = dateTime.toUTC().toJSDate();
  const newEndDate = dateTime.plus({ minutes: duration }).toUTC().toJSDate();

  // check for already existing reservation
  const conflictingReservations = await prisma.reservation.findFirst({
    where: {
      AND: [
        { startDate: { lt: newEndDate } },
        { endDate: { gt: newStartDate } },
      ],
    },
  });

  if (conflictingReservations) {
    return {
      success: false,
      error: {
        date: ["This date is already reserved."],
      },
    };
  }

  // check for duplicate email reservation
  const conflictingEmail = await prisma.reservation.findFirst({
    where: {
      email: data.email,
    },
  });

  if (conflictingEmail) {
    return {
      success: false,
      error: {
        email: ["Na tento email už byla vytvořena jiná rezervace."],
      },
    };
  }

  // stop when peopleCount > 1 and time would exceed opening hours
  if (newStartDate.getHours() >= 18 && newStartDate.getMinutes() >= 40) {
    if (data.peopleCount === 2 && newStartDate.getMinutes() >= 50) {
      return {
        success: false,
        error: {
          time: [
            "Zvolte jiný čas. Pro dvě osoby nelze zarezezervovat časový blok těsně před koncem otvírací doby",
          ],
        },
      };
    }
    if (data.peopleCount === 3 && newStartDate.getMinutes() >= 40) {
      return {
        success: false,
        error: {
          time: [
            "Zvolte jiný čas. Pro tři osoby nelze zarezezervovat časový blok těsně před koncem otvírací doby",
          ],
        },
      };
    }
  }

  // create new reservation
  try {
    await prisma.reservation.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        peopleCount: data.peopleCount,
        startDate: newStartDate,
        endDate: newEndDate,
      },
    });

    revalidatePath("/reservation");

    return {
      success: true,
      message: "Reservation created.",
      redirectUrl: "/",
    };
  } catch (error: unknown) {
    // TODO - Find some usefull usage to this error value
    console.log(error);
    // I think this is not needet now. I check for overlaping reservation and unique email up in the code.
    // if (error instanceof PrismaClientKnownRequestError) {
    //   if (error.code === "P2002") {
    //     return {
    //       success: false,
    //       error: {
    //         code: "P2002",
    //         general: "Rezervace již existuje nebo",
    //       },
    //     };
    //   }
    // }

    return {
      success: false,
      error: {
        root: ["Něco se nepovedlo. Zkuste to prosím znovu."],
      },
    };
  }
}
