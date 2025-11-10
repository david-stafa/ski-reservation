"use server";

import { prisma } from "@/db/prisma";
import * as Sentry from "@sentry/nextjs";
import { DateTime } from "luxon";
import { revalidatePath, unstable_cache } from "next/cache";


// input: date in format 2025-10-07
export async function getAllReservationsDates(date: string) {
  try {
    // Input validation
    if (!date || typeof date !== "string") {
      const error = new Error("Invalid date parameter");
      Sentry.captureException(error, {
        tags: { function: "getAllReservationsDates", errorType: "validation" },
        extra: { date, dateType: typeof date },
      });
      throw error;
    }

    // Use Luxon for better date handling
    const dateObj = DateTime.fromISO(date);

    if (!dateObj.isValid) {
      const error = new Error(
        `Invalid date: ${date}. ${dateObj.invalidReason}`
      );
      Sentry.captureException(error, {
        tags: {
          function: "getAllReservationsDates",
          errorType: "date_parsing",
        },
        extra: { date, invalidReason: dateObj.invalidReason },
      });
      throw error;
    }

    const startOfTheDay = dateObj.startOf("day").toISO();
    const endOfTheDay = dateObj.endOf("day").toISO();

    if (!startOfTheDay || !endOfTheDay) {
      const error = new Error(`Failed to create date range for: ${date}`);
      Sentry.captureException(error, {
        tags: {
          function: "getAllReservationsDates",
          errorType: "date_range_creation",
        },
        extra: { date },
      });
      throw error;
    }

    const reservations = await prisma.reservation.findMany({
      where: {
        startDate: {
          gte: startOfTheDay,
          lte: endOfTheDay,
        },
      },
      select: { startDate: true, endDate: true, peopleCount: true },
    });

    return reservations;
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        function: "getAllReservationsDates",
        operation: "database_query",
      },
      extra: {
        date,
        timestamp: new Date().toISOString(),
      },
    });

    Sentry.logger.error("Failed to retrieve reservation dates", {
      date,
      error: error instanceof Error ? error.message : "Unknown error",
    });

    throw error;
  }
}

export async function getSumOfReservations() {
  const reservations = await prisma.reservation.findMany({
    where: {
      isSeasonal: false,
    },
    select: {
      startDate: true,
      peopleCount: true,
    },
  });

  const groupedByDate = reservations.reduce(
    (acc, reservation) => {
      const dateKey = reservation.startDate.toISOString().split("T")[0];
      if (!acc[dateKey]) {
        acc[dateKey] = { _count: 0, startDate: new Date(dateKey) };
      }
      acc[dateKey]._count += reservation.peopleCount;
      acc._total += reservation.peopleCount;
      return acc;
    },
    { _total: 0 } as Record<string, { _count: number; startDate: Date }> & {
      _total: number;
    }
  );

  return groupedByDate;
}

// TODO: Find out if this is the right way to use cache
export const getCachedSumOfReservations = unstable_cache(
  async () => await getSumOfReservations(),
  ["reservations"], // key
  {
    tags: ["reservations"], // 💡 tag to revalidate
  }
);

export async function getReservationById(id: string) {
  try {
    // Input validation
    if (!id || typeof id !== "string") {
      const error = new Error("Invalid reservation ID parameter");
      Sentry.captureException(error, {
        tags: { function: "getReservationById", errorType: "validation" },
        extra: { id, idType: typeof id },
      });
      throw error;
    }

    const reservation = await prisma.reservation.findUnique({
      where: {
        id: id,
        isSeasonal: false,
      },
    });

    if (!reservation) {
      // This could indicate:
      // - Broken links in emails
      // - Security issues (someone trying random IDs)
      // - Data corruption
      Sentry.logger.warn(
        "Reservation not found - possible security issue or broken link",
        {
          reservationId: id,
          timestamp: new Date().toISOString(),
          userAgent: "server-side", // You could add user context here if available
        }
      );
    }

    return reservation;
  } catch (error) {
    Sentry.logger.error("Failed to retrieve reservation by ID", {
      id,
      error: error instanceof Error ? error.message : "Unknown error",
    });

    throw error;
  }
}

export async function getAllReservations() {
  return await prisma.reservation.findMany({
    select: {
      startDate: true,
      endDate: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      peopleCount: true,
      id: true,
      attended: true,
      createdAt: true,
      updatedAt: true,
      isSeasonal: true,
    },
    where: {
      startDate: {
        gte: DateTime.fromObject({ year: 2025, month: 10 }).toJSDate(),
      },
    },
  });
}

// TODO: Find out if this is the right way to use cache
export const getCachedAllReservations = unstable_cache(
  async () => await getAllReservations(),
  ["reservations"], // key
  {
    tags: ["reservations"], // 💡 tag to revalidate
  }
);

// check for already existing reservation
export async function findConflictingReservations(
  newStartDate: Date,
  newEndDate: Date,
  excludeReservationId?: string
) {
  try {
    return await prisma.reservation.findFirst({
      where: {
        startDate: { lt: newEndDate },
        endDate: { gt: newStartDate },
        ...(excludeReservationId && { id: { not: excludeReservationId } }),
      },
    });
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        function: "findConflictingReservations",
        errorType: "database_query",
      },
      extra: { newStartDate, newEndDate, excludeReservationId },
    });
  }
}

// check for already existing reservation with the same email
export async function checkConflictingEmail(email: string) {
  try {
    return await prisma.reservation.findFirst({
      where: {
        email: email,
      },
    });
  } catch (error) {
    Sentry.captureException(error, {
      tags: { function: "checkConflictingEmail", errorType: "database_query" },
      extra: { email },
    });
  }
}

export async function getReservationsByDate(date: string) {
  const dateStart = DateTime.fromISO(date).startOf("day").toJSDate();
  const dateEnd = DateTime.fromISO(date).endOf("day").toJSDate();

  const reservations = await prisma.reservation.findMany({
    where: {
      startDate: {
        gte: dateStart,
        lte: dateEnd,
      },
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      phone: true,
      peopleCount: true,
      startDate: true,
      endDate: true,
      attended: true,
    },
    orderBy: {
      startDate: "asc",
    },
  });

  return reservations;
}

export async function updateAttendance(
  reservationId: string,
  attended: boolean
) {
  try {
    await prisma.reservation.update({
      where: { id: reservationId },
      data: { attended },
    });

    // Revalidate the current page to show updated data
    revalidatePath("/admin/reservations/day-sheet");

    return { success: true };
  } catch (error) {
    console.error("Failed to update attendance:", error);
    return { success: false, error: "Failed to update attendance" };
  }
}

/**
 * Retrieves reservations for the week containing the given date, grouped by date.
 * @param dayInWeek - The date to get reservations for
 * @returns Object with reservations grouped by date and total count
 */
export const getReservationsByWeek = async (
  dayInWeek: DateTime
): Promise<
  Record<string, { _count: number; startDate: Date }> & { _total: number }
> => {
  const startOfAWeek = dayInWeek.startOf("week");
  const endOfAWeek = startOfAWeek.endOf("week");

  const reservations = await prisma.reservation.findMany({
    where: {
      startDate: { gte: startOfAWeek.toJSDate(), lte: endOfAWeek.toJSDate() },
    },
    select: {
      startDate: true,
      peopleCount: true,
    },
  });

  const groupedByDate = reservations.reduce(
    (acc, reservation) => {
      const dateKey = reservation.startDate.toISOString().split("T")[0];
      if (!acc[dateKey]) {
        acc[dateKey] = { _count: 0, startDate: new Date(dateKey) };
      }
      acc[dateKey]._count += reservation.peopleCount;
      acc._total += reservation.peopleCount;
      return acc;
    },
    { _total: 0 } as Record<string, { _count: number; startDate: Date }> & {
      _total: number;
    }
  );

  return groupedByDate;
};

export const getCachedReservationsByWeek = unstable_cache(
  async (dayInWeek: DateTime) => await getReservationsByWeek(dayInWeek),
  ["reservations"], // key
  {
    tags: ["reservations"], // 💡 tag to revalidate
  }
);
