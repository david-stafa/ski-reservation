"use server";

import { prisma } from "@/db/prisma";
import { unstable_cache } from "next/cache";

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
  return await prisma.reservation.count();
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
      createdAt: true,
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
  newEndDate: Date
) {
  return await prisma.reservation.findFirst({
    where: {
      AND: [
        { startDate: { lt: newEndDate } },
        { endDate: { gt: newStartDate } },
      ],
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

export async function findReservationByEmailAndLastName(email: string) {
  return await prisma.reservation.findUnique({
    where: {
      email,
    },
  });
}
