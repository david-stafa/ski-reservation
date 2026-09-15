"use server";

import { prisma } from "@/db/prisma";
import { unstable_cache } from "next/cache";
import { SEASONAL_ENDDATE, SEASONAL_STARTDATE } from "@/lib/constants";
import * as Sentry from "@sentry/nextjs";

const getSumOfSeasonalReservations = async () => {
  const reservations = await prisma.reservation.findMany({
    where: {
      isSeasonal: true,
      // only the current season, otherwise previous seasons count towards SEASONAL_SKI_SETS_LIMIT
      startDate: {
        gte: SEASONAL_STARTDATE.startOf("day").toJSDate(),
        lte: SEASONAL_ENDDATE.endOf("day").toJSDate(),
      },
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

export const getCachedSumOfSeasonalReservations = unstable_cache(
  async () => await getSumOfSeasonalReservations(),
  ["reservations"], // key
  {
    tags: ["reservations"], // 💡 tag to revalidate
  }
);

export async function getSeasonalReservationById(id: string) {
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
        isSeasonal: true,
      },
    });

    if (!reservation) {
      // This could indicate:
      // - Broken links in emails
      // - Security issues (someone trying random IDs)
      // - Data corruption
      Sentry.logger.warn(
        "Seasonal reservation not found - possible security issue or broken link",
        {
          reservationId: id,
          timestamp: new Date().toISOString(),
          userAgent: "server-side", // You could add user context here if available
        }
      );
    }

    return reservation;
  } catch (error) {
    Sentry.logger.error("Failed to retrieve seasonal reservation by ID", {
      id,
      error: error instanceof Error ? error.message : "Unknown error",
    });

    throw error;
  }
}

// check for already existing reservation
export async function findConflictingSeasonalReservations(
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
        isSeasonal: true,
      },
    });
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        function: "findConflictingSeasonalReservations",
        errorType: "database_query",
      },
      extra: { newStartDate, newEndDate, excludeReservationId },
    });
  }
}
