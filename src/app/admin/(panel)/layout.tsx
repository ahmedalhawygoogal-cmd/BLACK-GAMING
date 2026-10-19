import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminShell } from "./admin-shell";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "لوحة التحكم",
    template: "%s | لوحة تحكم BLACK GAMING",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adminSession = cookies().get("admin_session")?.value;
  if (!adminSession) {
    redirect("/admin/login");
  }

  return <AdminShell>{children}</AdminShell>;
}
