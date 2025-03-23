"use server";

import { prisma } from "@/db/prisma";

// input: date in format 2025-10-07
export async function getAllReservationsDates(date: string) {
  const startOfTheDay = `${date}T00:00:00Z`;
  const endOfTheDay = `${date}T23:59:59Z`;

  return await prisma.reservation.findMany({
    where: {
      dateTime: {
        gte: startOfTheDay,
        lte: endOfTheDay,
      },
    },
    select: {
      dateTime: true,
    },
  });
}
