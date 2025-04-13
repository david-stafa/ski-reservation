"use server";

import { prisma } from "@/db/prisma";

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

export async function getSumOfReservations(){
  return await prisma.reservation.count()
}
