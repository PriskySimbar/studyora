"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, GraduationCap } from "lucide-react";

import { registerUser } from "@/app/actions/auth";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ThemeToggle from "../theme-toggle";

type AuthFormProps = {
  mode: "login" | "register";
};

export default function AuthForm({ mode }: AuthFormProps) {
  const isLogin = mode === "login";
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (res?.error) {
          setError("Invalid email or password.");
          setLoading(false);
          return;
        }

        router.push("/dashboard");
        router.refresh();
        return;
      }

      const result = await registerUser(formData);

      if (!result.success) {
        setError(result.message);
        setLoading(false);
        return;
      }

      router.push("/login?registered=true");
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md shadow-xl border-border bg-card">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md dark:bg-indigo-500 mb-2">
            <GraduationCap className="h-7 w-7" />
          </div>

          <Link
            href="/"
            className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 inline-block"
          >
            Studyora
          </Link>

          <CardTitle className="text-xl font-bold">
            {isLogin ? "Welcome Back 👋" : "Create Account"}
          </CardTitle>

          <CardDescription className="text-sm text-muted-foreground">
            {isLogin
              ? "Sign in to access your learning workspace."
              : "Create your Studyora account to get started."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  disabled={loading}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                Password <span className="text-destructive">*</span>
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirm Password <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
              </div>
            )}

            {error && (
              <p className="text-xs font-medium text-destructive bg-destructive/10 p-3 rounded-md">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full gap-2" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
            </Button>

            <p className="text-center text-sm text-muted-foreground pt-2">
              {isLogin ? (
                <>
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </p>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
