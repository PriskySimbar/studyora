"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const courseSchema = z.object({
  name: z
    .string()
    .min(2, "Course name minimal 2 karakter")
    .max(100, "Course name maksimal 100 karakter"),
});

export async function createCourse(formData: FormData) {
  try {
    // 1. Ambil session
    const session = await auth();

    console.log("SESSION:", session);

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Session user ID tidak ditemukan.",
      };
    }

    // 2. Validasi input
    const result = courseSchema.safeParse({
      name: formData.get("name"),
    });

    if (!result.success) {
      return {
        success: false,
        message: result.error.issues[0].message,
      };
    }

    // 3. Create course
    const course = await prisma.course.create({
      data: {
        name: result.data.name,
        userId: session.user.id,
      },
    });
    revalidatePath("/dashboard");

    console.log("COURSE CREATED:", course);

    return {
      success: true,
      message: "Course berhasil dibuat!",
    };
  } catch (error) {
    console.error("CREATE COURSE ERROR:", error);

    return {
      success: false,
      message: "Gagal membuat course.",
    };
  }
}

export async function getCourses() {
  const session = await auth();

  if (!session?.user?.id) {
    return [];
  }

  const courses = await prisma.course.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      assignments: {
        orderBy: {
          dueDate: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return courses;
}

export async function updateCourse(courseId: string, name: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Kamu harus login.",
    };
  }

  const result = courseSchema.safeParse({
    name,
  });

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0].message,
    };
  }

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

  await prisma.course.update({
    where: {
      id: courseId,
    },
    data: {
      name: result.data.name,
    },
  });

  return {
    success: true,
    message: "Course berhasil diperbarui.",
  };
}
export async function deleteCourse(courseId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Kamu harus login.",
    };
  }

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

  await prisma.course.delete({
    where: {
      id: courseId,
    },
  });

  return {
    success: true,
    message: "Course berhasil dihapus.",
  };
}
