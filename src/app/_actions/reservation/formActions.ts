"use server";

import { prisma } from "@/db/prisma";
import { ReservationResult, ReservationSchema } from "@/lib/types/types";
import { revalidateTag } from "next/cache";
import {
  calculateDuration,
  createStartAndEndDate,
  formatDateTime,
  isWithinOpeningHours,
  isWithinReservationTime,
} from "./helpers/helpers";
import {
  checkConflictingEmail,
  findConflictingReservations,
} from "./reservationActions";
import { Resend } from "resend";
import ReservationConfirmationEmail from "../../../../emails/templates/reservation-confirmation";
import { config } from "../../../lib/config";

const resend = new Resend(process.env.RESEND_API_KEY);

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

  // Calculate duration based on peopleCount (10 mins each)
  const duration = calculateDuration(data.peopleCount);

  // Create dateTime with Prague time zone(becouse Vercel threast is as UTC otherwise)
  const dateTime = formatDateTime(data.date, data.time);

  // Convert dateTime to UTC and create new start and end date using luxon
  const { newStartDate, newEndDate } = createStartAndEndDate(
    dateTime,
    duration
  );

  // check for already existing reservation
  const conflictingReservations = await findConflictingReservations(
    newStartDate,
    newEndDate
  );

  if (conflictingReservations) {
    return {
      success: false,
      error: {
        date: ["Tato rezervace už je bohužel obsazena."],
      },
    };
  }

  // check for duplicate email reservation
  const conflictingEmail = await checkConflictingEmail(data.email);

  if (conflictingEmail) {
    return {
      success: false,
      error: {
        email: ["Na tento email už byla vytvořena jiná rezervace."],
      },
    };
  }

  // check if reservation time is within opening hours
  const openingHoursError = isWithinOpeningHours(
    newStartDate,
    data.peopleCount
  );
  if (openingHoursError) {
    return {
      success: false,
      error: openingHoursError,
    };
  }

  // create new reservation
  try {
    const { id: reservationId } = await prisma.reservation.create({
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

    await resend.emails.send({
      from: config.email.from,
      to: config.email.getToEmail(data.email),
      subject: config.email.subject,
      react: ReservationConfirmationEmail({
        firstName: data.firstName,
        lastName: data.lastName,
        startDate: newStartDate,
        endDate: newEndDate,
        peopleCount: data.peopleCount,
        reservationUrl: `rezervace.skiblazek.cz/reservation/${reservationId}`,
      }),
    });

    revalidateTag("reservations");

    return {
      success: true,
      message: "Rezervace byla úspěšně vytvořena.",
      redirectUrl: `/reservation/${reservationId}`,
    };
  } catch (error: unknown) {
    console.log(error);
    return {
      success: false,
      error: {
        root: ["Něco se nepovedlo. Zkuste to prosím znovu."],
      },
    };
  }
}

export async function updateReservation(
  prevState: unknown,
  formData: ReservationSchema,
  reservationId: string
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

  const reservation = await prisma.reservation.findUnique({
    where: {
      id: reservationId,
    },
  });

  if (!reservation) {
    return {
      success: false,
      error: {
        root: ["Rezervace nebyla nalezena."],
      },
    };
  }

  // Calculate duration based on peopleCount (10 mins each)
  const duration = calculateDuration(data.peopleCount);

  // Create dateTime with Prague time zone(becouse Vercel threast is as UTC otherwise)
  const dateTime = formatDateTime(data.date, data.time);

  // Convert dateTime to UTC and create new start and end date using luxon
  const { newStartDate, newEndDate } = createStartAndEndDate(
    dateTime,
    duration
  );

  const isCheckConflictingReservationNeeded = !isWithinReservationTime(
    newStartDate,
    newEndDate,
    reservation.startDate,
    reservation.endDate
  );

  if (isCheckConflictingReservationNeeded) {
    // Check for conflicting reservations, excluding the current reservation
    const conflictingReservations = await findConflictingReservations(
      newStartDate,
      newEndDate,
      reservationId
    );

    if (conflictingReservations) {
      return {
        success: false,
        error: {
          date: ["Tato rezervace už je bohužel obsazena."],
        },
      };
    }
  }

  // check for duplicate email reservation if email is changed
  if (data.email !== reservation.email) {
    const conflictingEmail = await checkConflictingEmail(data.email);

    if (conflictingEmail) {
      return {
        success: false,
        error: {
          email: ["Na tento email už byla vytvořena jiná rezervace."],
        },
      };
    }
  }

  // check if reservation time is within opening hours
  const openingHoursError = isWithinOpeningHours(
    newStartDate,
    data.peopleCount
  );
  if (openingHoursError) {
    return {
      success: false,
      error: openingHoursError,
    };
  }

  // update existing reservation
  try {
    const { id: updatedReservationId } = await prisma.reservation.update({
      where: {
        id: reservationId,
      },
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

    revalidateTag("reservations");

    return {
      success: true,
      message: "Rezervace byla úspěšně upravena.",
      redirectUrl: `/reservation/${updatedReservationId}`,
    };
  } catch (error: unknown) {
    console.log(error);
    return {
      success: false,
      error: {
        root: ["Něco se nepovedlo. Zkuste to prosím znovu."],
      },
    };
  }
}

export async function deleteReservation(reservationId: string) {
  try {
    await prisma.reservation.delete({
      where: {
        id: reservationId,
      },
    });
    revalidateTag("reservations");
    return {
      success: true,
      message: "Rezervace byla úspěšně smazána.",
      redirectUrl: "/",
    };
  } catch (error: unknown) {
    console.log(error);
    return {
      success: false,
      error: {
        root: ["Něco se nepovedlo. Zkuste to prosím znovu."],
      },
    };
  }
}
