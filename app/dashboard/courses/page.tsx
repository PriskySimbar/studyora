import { auth } from "@/auth";
import { redirect } from "next/navigation";

import CourseForm from "@/app/components/course/CourseForm";
import CourseList from "@/app/components/course/CourseList";
import { getCourses } from "@/app/actions/course";

export default async function CoursesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const courses = await getCourses();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Courses</h1>
        <p className="mt-1 text-sm sm:text-base text-muted-foreground">
          Manage your courses and track your assignment progress.
        </p>
      </div>

      <div className="max-w-2xl">
        <CourseForm />
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">My Courses</h2>
        <CourseList courses={courses} />
      </section>
    </div>
  );
}
