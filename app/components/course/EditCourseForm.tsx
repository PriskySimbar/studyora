"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateCourse } from "@/app/actions/course";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

type EditCourseFormProps = {
  courseId: string;
  initialName: string;
  onCancel: () => void;
};

export default function EditCourseForm({
  courseId,
  initialName,
  onCancel,
}: EditCourseFormProps) {
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleUpdate() {
    if (!name.trim() || loading) return;

    setLoading(true);
    setMessage("");

    const result = await updateCourse(courseId, name);

    setMessage(result.message);

    if (result.success) {
      onCancel();
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor={`edit-course-${courseId}`} className="text-xs font-semibold">
          Edit Course Name
        </Label>

        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            id={`edit-course-${courseId}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Course name"
            disabled={loading}
            className="flex-1"
          />

          <div className="flex gap-2">
            <Button
              type="button"
              onClick={handleUpdate}
              disabled={loading || !name.trim()}
              className="gap-2 shrink-0"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Saving..." : "Save"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
              className="shrink-0"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>

      {message && <p className="text-xs text-destructive font-medium">{message}</p>}
    </div>
  );
}
