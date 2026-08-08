import { auth } from "@/auth";
import DashboardLayoutClient from "./layout-client";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <DashboardLayoutClient userName={session?.user?.name ?? undefined}>
      {children}
    </DashboardLayoutClient>
  );
}
