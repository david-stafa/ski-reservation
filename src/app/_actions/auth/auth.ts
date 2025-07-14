"use server";

import { prisma } from "@/db/prisma";
import { createSession, deleteSession } from "@/lib/session";
import {
  loginFormSchema,
  LoginFormSchema,
  SignupFormSchema,
} from "@/lib/types/definitions";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  await createSession(user.id);

  redirect("/admin/reservations");
}

export async function login(formData: LoginFormSchema) {
  const validatedFields = loginFormSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  if (!email || !password) {
    return {
      message: "Email and password are required.",
    };
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return {
      message: "Neplatný email nebo heslo.",
    };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return {
      message: "Neplatný email nebo heslo.",
    };
  }

  await createSession(user.id);

  redirect("/admin");
}

export async function logout() {
  await deleteSession();
  redirect("/");
}
