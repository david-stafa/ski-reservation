"use server";

import { prisma } from "@/db/prisma";
import { revalidateTag } from "next/cache";
import * as Sentry from "@sentry/nextjs";
import {
  calculateDuration,
  createStartAndEndDate,
  formatDateTime,
  isWithinOpeningHours,
  isWithinReservationTime,
} from "../helpers/reservationHelpers";

import { Resend } from "resend";
import ReservationConfirmationEmail from "../../../../emails/templates/reservation-confirmation";
import { config } from "../../../lib/config";
import { findConflictingSeasonalReservations } from "./seasonalReservationActions";
import { SeasonalReservationResult, SeasonalReservationSchema } from "@/lib/types/seasonalReservationTypes";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function createSeasonalReservation(
  prevState: unknown,
  formData: SeasonalReservationSchema
): Promise<SeasonalReservationResult> {
  // parsing reservation form inputs with zod
  const result = SeasonalReservationSchema.safeParse(formData);

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
  const conflictingSeasonalReservations = await findConflictingSeasonalReservations(
    newStartDate,
    newEndDate
  );

  if (conflictingSeasonalReservations) {
    return {
      success: false,
      error: {
        date: ["Tato rezervace už je bohužel obsazena."],
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
    const reservation = await prisma.reservation.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        peopleCount: data.peopleCount,
        startDate: newStartDate,
        endDate: newEndDate,
        isSeasonal: data.isSeasonal,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        peopleCount: true,
        startDate: true,
        endDate: true,
        createdAt: true,
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
        reservationUrl: `rezervace.skiblazek.cz/reservation/${reservation.id}`,
      }),
    });

    revalidateTag("reservations");

    Sentry.logger.info(`Reservation created. ${JSON.stringify(reservation)}`);

    return {
      success: true,
      message: "Rezervace byla úspěšně vytvořena.",
      reservationId: reservation.id,
    };
  } catch (error: unknown) {
    console.log(error);
    Sentry.logger.error(
      `Reservation creation failed. ${JSON.stringify(error)}`
    );
    return {
      success: false,
      error: {
        root: ["Něco se nepovedlo. Zkuste to prosím znovu."],
      },
    };
  }
}

export async function updateSeasonalReservation(
  prevState: unknown,
  formData: SeasonalReservationSchema,
  reservationId: string
): Promise<SeasonalReservationResult> {
  // parsing reservation form inputs with zod
  const result = SeasonalReservationSchema.safeParse(formData);

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
    const conflictingSeasonalReservations = await findConflictingSeasonalReservations(
      newStartDate,
      newEndDate,
      reservationId
    );

    if (conflictingSeasonalReservations) {
      return {
        success: false,
        error: {
          date: ["Tato rezervace už je bohužel obsazena."],
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
    const updatedReservation = await prisma.reservation.update({
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

    Sentry.logger.info(
      `Reservation updated. ${JSON.stringify(updatedReservation)}`
    );
    revalidateTag("reservations");

    return {
      success: true,
      message: "Rezervace byla úspěšně upravena.",
      reservationId: updatedReservation.id,
    };
  } catch (error: unknown) {
    console.log(error);
    Sentry.logger.error(`Reservation update failed. ${JSON.stringify(error)}`);
    return {
      success: false,
      error: {
        root: ["Něco se nepovedlo. Zkuste to prosím znovu."],
      },
    };
  }
}

export async function deleteSeasonalReservation(reservationId: string): Promise<SeasonalReservationResult> {
  try {
    const deletedReservation = await prisma.reservation.delete({
      where: {
        id: reservationId,
        isSeasonal: true,
      },
    });

    revalidateTag("reservations");

    Sentry.logger.info(
      `Reservation deleted. ${JSON.stringify(deletedReservation)}`
    );
    return {
      success: true,
      message: "Rezervace byla úspěšně smazána.",
      reservationId: deletedReservation.id,
    };
  } catch (error: unknown) {
    console.log(error);
    Sentry.logger.error(
      `Reservation deletion failed. ${JSON.stringify(error)}`
    );
    return {
      success: false,
      error: {
        root: ["Něco se nepovedlo. Zkuste to prosím znovu."],
      },
    };
  }
}
