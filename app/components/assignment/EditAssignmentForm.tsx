"use client";

import { useState } from "react";
import { updateAssignment } from "../../actions/assignment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

type Assignment = {
  id: string;
  title: string;
  description: string | null;
  dueDate: Date | null;
  completed: boolean;
};

type EditAssignmentFormProps = {
  assignment: Assignment;
  onCancel: () => void;
};

export default function EditAssignmentForm({
  assignment,
  onCancel,
}: EditAssignmentFormProps) {
  const [title, setTitle] = useState(assignment.title);
  const [description, setDescription] = useState(assignment.description ?? "");
  const [dueDate, setDueDate] = useState(
    assignment.dueDate
      ? new Date(assignment.dueDate).toISOString().split("T")[0]
      : "",
  );
  const [completed, setCompleted] = useState(assignment.completed);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage("");

    formData.set("id", assignment.id);
    formData.set("completed", completed ? "true" : "false");

    const result = await updateAssignment(formData);

    if (!result.success) {
      setMessage(result.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    onCancel();
  }

  return (
    <form
      action={handleSubmit}
      className="mt-4 space-y-4 rounded-xl border border-border bg-muted/30 p-4"
    >
      <h4 className="text-sm font-semibold text-foreground">Edit Assignment</h4>

      <div className="space-y-2">
        <Label htmlFor={`edit-title-${assignment.id}`} className="text-xs">
          Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id={`edit-title-${assignment.id}`}
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`edit-desc-${assignment.id}`} className="text-xs">
          Description
        </Label>
        <textarea
          id={`edit-desc-${assignment.id}`}
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          disabled={loading}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`edit-date-${assignment.id}`} className="text-xs">
          Due Date
        </Label>
        <Input
          id={`edit-date-${assignment.id}`}
          type="date"
          name="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="flex items-center gap-2 pt-1">
        <input
          id={`edit-completed-${assignment.id}`}
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          disabled={loading}
          className="h-4 w-4 rounded border-input text-indigo-600 focus:ring-ring"
        />
        <Label
          htmlFor={`edit-completed-${assignment.id}`}
          className="text-sm font-normal cursor-pointer"
        >
          Mark as Completed
        </Label>
      </div>

      {message && <p className="text-xs text-destructive font-medium">{message}</p>}

      <div className="flex gap-2 pt-2">
        <Button type="submit" disabled={loading} className="gap-2">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Saving..." : "Save Changes"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
