"use server";

import bcrypt from "bcrypt";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name minimal 2 karakter"),
    email: z.string().email("Email tidak valid"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z.string().min(6, "Confirm password minimal 6 karakter"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

export async function registerUser(formData: FormData) {
  const result = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0].message,
    };
  }

  const { name, email, password } = result.data;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      success: false,
      message: "Email sudah terdaftar",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return {
    success: true,
    message: "Account berhasil dibuat",
  };
}

export async function updateProfile(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Kamu harus login terlebih dahulu.",
    };
  }

  const name = formData.get("name")?.toString().trim();

  if (!name || name.length < 2) {
    return {
      success: false,
      message: "Nama minimal 2 karakter.",
    };
  }

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name,
    },
  });

  return {
    success: true,
    message: "Profile berhasil diperbarui.",
  };
}
