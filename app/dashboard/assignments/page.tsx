import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

import AssignmentForm from "@/app/components/assignment/AssignmentForm";
import AssignmentList from "@/app/components/assignment/AssignmentList";

export default async function AssignmentsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const courses = await prisma.course.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const assignments = await prisma.assignment.findMany({
    where: {
      course: {
        userId: session.user.id,
      },
    },
    include: {
      course: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      dueDate: "asc",
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Assignments</h1>
        <p className="mt-1 text-sm sm:text-base text-muted-foreground">
          Manage your assignments, deadlines, and task statuses.
        </p>
      </div>

      <div className="max-w-2xl">
        <AssignmentForm courses={courses} />
      </div>

      <div className="max-w-2xl space-y-4">
        <h2 className="text-xl font-semibold text-foreground">My Assignments</h2>
        <AssignmentList assignments={assignments} />
      </div>
    </div>
  );
}
