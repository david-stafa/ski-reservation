"use server";

import { prisma } from "@/db/prisma";
import { DateTime } from "luxon";
import { revalidatePath, unstable_cache } from "next/cache";

// input: date in format 2025-10-07
export async function getAllReservationsDates(date: string) {
  const startOfTheDay = `${date}T00:00:00Z`;
  const endOfTheDay = `${date}T23:59:59Z`;

  return await prisma.reservation.findMany({
    where: {
      startDate: {
        gte: startOfTheDay,
        lte: endOfTheDay,
      },
    },
    select: {
      startDate: true,
      endDate: true,
      peopleCount: true,
    },
  });
}

export async function getSumOfReservations() {
  const reservations = await prisma.reservation.findMany({
    select: {
      startDate: true,
    },
  });

  // Initialize all dates from STARTDATE to ENDDATE
  const allDates = [
    "2025-09-15",
    "2025-09-16",
    "2025-09-17",
    "2025-09-18",
    "2025-09-19",
  ];

  const groupedByDate = reservations.reduce(
    (acc, reservation) => {
      const dateKey = reservation.startDate.toISOString().split("T")[0];
      if (!acc[dateKey]) {
        acc[dateKey] = { _count: 0, startDate: new Date(dateKey) };
      }
      acc[dateKey]._count += 1;
      acc._total += 1;
      return acc;
    },
    { _total: 0 } as Record<string, { _count: number; startDate: Date }> & {
      _total: number;
    }
  );

  // Add all dates with 0 count if they don't exist
  allDates.forEach((date) => {
    if (!groupedByDate[date]) {
      groupedByDate[date] = { _count: 0, startDate: new Date(date) };
    }
  });

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
  return await prisma.reservation.findUnique({
    where: {
      id: id,
    },
  });
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
  return await prisma.reservation.findFirst({
    where: {
      startDate: { lt: newEndDate },
      endDate: { gt: newStartDate },
      ...(excludeReservationId && { id: { not: excludeReservationId } }),
    },
  });
}

// check for already existing reservation with the same email
export async function checkConflictingEmail(email: string) {
  return await prisma.reservation.findFirst({
    where: {
      email: email,
    },
  });
}

export async function findReservationByEmailAndLastName(
  email: string,
  lastName: string
) {
  return await prisma.reservation.findUnique({
    where: {
      email,
      lastName,
    },
  });
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
