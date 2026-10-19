import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "تسجيل الدخول للإدارة",
  description: "الدخول إلى لوحة تحكم BLACK GAMING.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const adminSession = cookies().get("admin_session")?.value;
  if (adminSession) {
    redirect("/admin");
  }

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-5 py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute -top-40 right-1/2 h-[420px] w-[620px] translate-x-1/2 rounded-full bg-accent-purple/[0.12] blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-8%] h-[320px] w-[420px] rounded-full bg-accent-cyan/[0.06] blur-[130px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      <div className="w-full max-w-[400px]">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="relative h-14 w-14 overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F19] shadow-[0_0_0_1px_rgba(139,92,246,0.12)]">
            <Image
              src="/logo-mark.png"
              alt="شعار BLACK GAMING"
              width={256}
              height={256}
              priority
              className="h-full w-full object-cover"
            />
          </span>
          <span className="mt-4 text-[15px] font-extrabold leading-none tracking-[0.16em] text-white">
            BLACK GAMING
          </span>
          <span className="mt-2 text-[11px] font-medium tracking-[0.14em] text-white/30">
            ADMIN CONTROL PANEL
          </span>
        </div>

        <div className="rounded-2xl border border-white/[0.07] bg-surface/80 p-7 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-8">
          <h1 className="text-xl font-bold text-white sm:text-[22px]">
            تسجيل الدخول إلى اللوحة
          </h1>
          <p className="mt-2 text-[13px] leading-6 text-white/40">
            أدخل كلمة مرور الإدارة للمتابعة. سيتم الاحتفاظ بجلستك على هذا
            المتصفح.
          </p>

          <LoginForm />

          <div className="mt-6 flex items-center justify-center gap-1.5 border-t border-white/[0.06] pt-5 text-[11px] text-white/25">
            <ShieldCheck size={13} className="text-accent-cyan/70" />
            جلسة مشفّرة ومحمية عبر كوكيز آمنة
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-white/35 transition-colors hover:text-white/70"
          >
            <ArrowRight size={14} />
            العودة إلى المتجر
          </Link>
        </div>
      </div>
    </main>
  );
}
