"use server";

import { z } from "zod";
import prisma from "@/db/db";
import { revalidatePath } from "next/cache";

// const SkiSetsSchema = z.array(
//   z.object({
//     ski: z.boolean(),
//     skiBoot: z.boolean(),
//     skiPole: z.boolean(),
//     skiHelmet: z.boolean(),
//     skiGoggle: z.boolean(),
//   })
// );

const ReservationSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.coerce.string().min(9),
  peopleCount: z.coerce.number().min(1).max(4),
  date: z.string().date(),
  time: z.string().time(),
  // skiSets: SkiSetsSchema,
});

export async function createReservation(
  prevState: unknown,
  formData: FormData,
){
  // parsing reservation form inputs with zod
  const result = ReservationSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  // return field error when validation fails
  if (result.success === false) {
    return {
      success: false,
      error: result.error.formErrors.fieldErrors,
      prevData: formData
    };
  }

  // result data from form inputs
  const data = result.data;
  // creates date in UTC format - now it saves actual value (input time: 15:00:00, db value is the same)
  // but it does not correlate with UTC time - its wrong but to fulfill purpose of this app its decent
  const date = new Date(data.date + "T" + data.time + "Z");

  // create new reservation
  await prisma.reservation.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      peopleCount: data.peopleCount,
      dateTime: date,
      // skiSets: {
      //   create: data.skiSets.map((set) => ({
      //     ...set,
      //   })),
      // },
    },
  });

  // TODO: Revalidate app after reservation is created
  revalidatePath("/");

  return {
    success: true,
    message: "Reservation created.",
  };
}
