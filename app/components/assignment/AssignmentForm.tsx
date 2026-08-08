"use client";

import { useState } from "react";
import { createAssignment } from "@/app/actions/assignment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, PlusCircle } from "lucide-react";

type Course = {
  id: string;
  name: string;
};

type AssignmentFormProps = {
  courses: Course[];
};

export default function AssignmentForm({ courses }: AssignmentFormProps) {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage("");

    const result = await createAssignment(formData);

    setMessage(result.message);
    setIsSuccess(result.success);

    if (result.success) {
      const form = document.getElementById(
        "assignment-form",
      ) as HTMLFormElement;

      form?.reset();
    }

    setLoading(false);
  }

  return (
    <form
      id="assignment-form"
      action={handleSubmit}
      className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-xs"
    >
      <h3 className="font-semibold text-lg text-foreground border-b border-border pb-3">
        Create New Assignment
      </h3>

      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium">
          Assignment Title <span className="text-destructive">*</span>
        </Label>

        <Input
          id="title"
          name="title"
          placeholder="e.g. React Final Project"
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Description
        </Label>

        <Input
          id="description"
          name="description"
          placeholder="Detailed notes or requirements..."
          disabled={loading}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="dueDate" className="text-sm font-medium">
            Due Date
          </Label>

          <Input
            id="dueDate"
            name="dueDate"
            type="date"
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="courseId" className="text-sm font-medium">
            Course <span className="text-destructive">*</span>
          </Label>

          <select
            id="courseId"
            name="courseId"
            required
            disabled={loading}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select a course</option>

            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading || courses.length === 0}
        className="w-full sm:w-auto gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Creating...
          </>
        ) : (
          <>
            <PlusCircle className="h-4 w-4" />
            Create Assignment
          </>
        )}
      </Button>

      {courses.length === 0 && (
        <p className="text-xs text-amber-600 dark:text-amber-400">
          You need to create at least one course before adding assignments.
        </p>
      )}

      {message && (
        <p
          className={`text-xs font-medium ${
            isSuccess
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-destructive"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
