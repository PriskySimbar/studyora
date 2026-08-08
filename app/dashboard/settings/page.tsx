import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ProfileForm from "@/app/components/settings/ProfileForm";
import LogoutButton from "@/app/components/settings/LogoutButton";
import { User, LogOut } from "lucide-react";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Settings</h1>
        <p className="mt-1 text-sm sm:text-base text-muted-foreground">
          Manage your profile and account preferences.
        </p>
      </div>

      {/* Profile */}
      <section className="max-w-2xl">
        <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Profile</h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Update your personal details.
              </p>
            </div>
          </div>

          <ProfileForm
            initialName={session.user.name ?? ""}
            email={session.user.email ?? ""}
          />
        </div>
      </section>

      {/* Account */}
      <section className="max-w-2xl">
        <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
              <LogOut className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Account</h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Manage your session and sign out options.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <LogoutButton />
          </div>
        </div>
      </section>
    </div>
  );
}
