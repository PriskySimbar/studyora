"use client";

import { useState } from "react";
import { updateProfile } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save } from "lucide-react";

type ProfileFormProps = {
  initialName: string;
  email: string;
};

export default function ProfileForm({ initialName, email }: ProfileFormProps) {
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    if (loading) return;

    setLoading(true);
    setMessage("");

    const result = await updateProfile(formData);

    setMessage(result.message);
    setIsSuccess(result.success);

    if (result.success) {
      setName(formData.get("name")?.toString() ?? "");
    }

    setLoading(false);
  }

  return (
    <form action={handleSubmit} className="mt-6 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="profile-name" className="text-sm font-medium">
          Full Name <span className="text-destructive">*</span>
        </Label>

        <Input
          id="profile-name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="profile-email" className="text-sm font-medium">
          Email Address (Read-only)
        </Label>

        <Input
          id="profile-email"
          type="email"
          value={email}
          readOnly
          disabled
          className="bg-muted text-muted-foreground cursor-not-allowed"
        />
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

      <Button type="submit" disabled={loading} className="gap-2">
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="h-4 w-4" />
            Save Changes
          </>
        )}
      </Button>
    </form>
  );
}
