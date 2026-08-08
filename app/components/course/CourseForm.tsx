"use client";

import { useState } from "react";
import { createCourse } from "@/app/actions/course";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";

export default function CourseForm() {
  const [courseName, setCourseName] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    if (!courseName.trim() || loading) return;

    setMessage("");
    setLoading(true);

    try {
      const result = await createCourse(formData);

      setMessage(result.message);
      setIsSuccess(result.success);

      if (result.success) {
        setCourseName("");
      }
    } catch {
      setIsSuccess(false);
      setMessage("Failed to create course. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      action={handleSubmit}
      className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="course-name-input" className="text-sm font-medium">
          Add New Course <span className="text-destructive">*</span>
        </Label>

        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            id="course-name-input"
            name="name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="e.g. Computer Science 101"
            required
            disabled={loading}
            className="flex-1"
          />

          <Button
            type="submit"
            disabled={loading || !courseName.trim()}
            className="gap-2 shrink-0"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Add Course
              </>
            )}
          </Button>
        </div>
      </div>

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
