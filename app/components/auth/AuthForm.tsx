import Link from "next/link";

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

type AuthFormProps = {
  mode: "login" | "register";
};

export default function AuthForm({ mode }: AuthFormProps) {
  const isLogin = mode === "login";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <h1 className="text-3xl font-bold text-indigo-600">Studyora</h1>

          <CardTitle className="mt-4">
            {isLogin ? "Welcome Back 👋" : "Create Account"}
          </CardTitle>

          <CardDescription>
            {isLogin
              ? "Sign in to continue your learning journey."
              : "Create your Studyora account."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-5">
            {/* Name */}
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>

                <Input id="name" type="text" placeholder="John Doe" />
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input id="email" type="email" placeholder="you@example.com" />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>

              <Input id="password" type="password" placeholder="••••••••" />
            </div>

            {/* Confirm Password */}
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>

                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
            )}

            <Button className="w-full">{isLogin ? "Login" : "Register"}</Button>

            <p className="text-center text-sm text-slate-500">
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="font-medium text-indigo-600 hover:underline"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-indigo-600 hover:underline"
                  >
                    Login
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
