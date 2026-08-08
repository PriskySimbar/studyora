"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const assignmentSchema = z.object({
  title: z.string().min(2, "Title minimal 2 karakter"),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  courseId: z.string().min(1, "Course harus dipilih"),
});

export async function createAssignment(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Kamu harus login.",
    };
  }

  const result = assignmentSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description") || "",
    dueDate: formData.get("dueDate") || "",
    courseId: formData.get("courseId"),
  });

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0].message,
    };
  }

  const { title, description, dueDate, courseId } = result.data;

  // Pastikan course memang milik user yang sedang login
  const course = await prisma.course.findFirst({
    where: {
      id: courseId,
      userId: session.user.id,
    },
  });

  if (!course) {
    return {
      success: false,
      message: "Course tidak ditemukan.",
    };
  }

  await prisma.assignment.create({
    data: {
      title,
      description: description || null,
      dueDate: dueDate ? new Date(dueDate) : null,
      courseId,
    },
  });

  return {
    success: true,
    message: "Assignment berhasil dibuat.",
  };
}

export async function updateAssignment(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Kamu harus login terlebih dahulu.",
    };
  }

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const dueDate = formData.get("dueDate") as string;
  const completed = formData.get("completed") === "true";

  if (!id || !title.trim()) {
    return {
      success: false,
      message: "Title wajib diisi.",
    };
  }

  const assignment = await prisma.assignment.findFirst({
    where: {
      id,
      course: {
        userId: session.user.id,
      },
    },
  });

  if (!assignment) {
    return {
      success: false,
      message: "Assignment tidak ditemukan.",
    };
  }

  await prisma.assignment.update({
    where: {
      id,
    },
    data: {
      title: title.trim(),
      description: description.trim() || null,
      dueDate: dueDate ? new Date(dueDate) : null,
      completed,
    },
  });

  revalidatePath("/dashboard/assignments");

  return {
    success: true,
    message: "Assignment berhasil diperbarui.",
  };
}

export async function deleteAssignment(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Kamu harus login terlebih dahulu.",
    };
  }

  const assignment = await prisma.assignment.findFirst({
    where: {
      id,
      course: {
        userId: session.user.id,
      },
    },
  });

  if (!assignment) {
    return {
      success: false,
      message: "Assignment tidak ditemukan.",
    };
  }

  await prisma.assignment.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/assignments");

  return {
    success: true,
    message: "Assignment berhasil dihapus.",
  };
}
