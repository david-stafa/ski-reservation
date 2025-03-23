"use server";

import { prisma } from "@/db/prisma";
import { ReservationSchema } from "@/lib/types/types";

export async function createReservation(
  prevState: unknown,
  formData: FormData
) {
  // parsing reservation form inputs with zod
  const result = ReservationSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  // return field error when validation fails
  if (result.success === false) {
    return {
      success: false,
      error: result.error.formErrors.fieldErrors,
      // return data for uncontrolled inputs -> they are erased after submit
      prevData: {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
      },
    };
  }

  // result data from form inputs
  const data = result.data;
  // creates date in UTC format - now it saves actual value (input time: 15:00:00, db value is the same)
  // but it does not correlate with UTC time - its wrong but to fulfill purpose of this app its decent
  // const date = new Date(data.date + "T" + data.time + "Z");

  // create new reservation
  await prisma.reservation.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      peopleCount: data.peopleCount,
      dateTime: data.date,
    },
  });

  return {
    success: true,
    message: "Reservation created.",
  };
}
