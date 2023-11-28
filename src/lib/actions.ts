"use server";

import { z } from "zod";
import { hash } from "bcryptjs";
import prisma from "@/lib/db"
import { signIn, signOut } from "@/auth";

export async function register(_: string | undefined, formData: FormData) {
  const parsedCredentials = z
    .object({
      email: z.string().email(),
      password: z.string().min(6),
      name: z.string().min(1),
    })
    .safeParse(Object.fromEntries(formData));

  if (!parsedCredentials.success) return "Invalid Credentials";

  const { name, email, password } = parsedCredentials.data;

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: await hash(password, 2),
      },
    });
  } catch (e) {
    console.error("Failed to create user", e);
    throw new Error("Failed to create user");
  }

  const error =  await safeSignIn({ name, password });
  if (error) {
    console.error("Error logging in after registering", error)
    throw error
  }
}

export async function authenticate(_: string | undefined, formData: FormData) {
  const parsedCredentials = z
    .object({
      password: z.string().min(6),
      name: z.string().min(1),
    })
    .safeParse(Object.fromEntries(formData));

  if (!parsedCredentials.success) return "Invalid Credentials";

  return safeSignIn(parsedCredentials.data);
}

export async function safeSignIn({
  name,
  password,
}: {
  name: string;
  password: string;
}) {
  try {
    await signIn('credentials',{ name, password });
  } catch (e) {
    if ((e as Error).message.includes("CredentialsSignin"))
      return "CredentialsSignin";
    throw e;
  }
}

export async function signOutSafe(){
  await signOut()
}
