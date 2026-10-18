import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Database, HardDrive, Settings } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "الإعدادات",
};

export default function AdminSettingsPage() {
  return (
    <div>
      <div>
        <div className="flex items-center gap-2.5 text-[11px] font-semibold text-white/35">
          <span
            aria-hidden
            className="h-px w-6 bg-gradient-to-l from-accent-purple to-transparent"
          />
          إدارة المتجر
        </div>
        <h1 className="mt-3 text-2xl font-extrabold text-white sm:text-[30px] sm:leading-tight">
          الإعدادات
        </h1>
        <p className="mt-2 max-w-md text-[13px] leading-7 text-white/40">
          حالة اتصال المنصة وإعدادات المتجر العامة.
        </p>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <section className="rounded-2xl border border-white/[0.06] bg-surface/60 p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-accent-purple/20 bg-accent-purple/10 text-accent-purple">
              <Database size={18} strokeWidth={1.7} />
            </span>
            <div>
              <h2 className="text-[13px] font-semibold text-white">
                قاعدة البيانات
              </h2>
              <p className="mt-0.5 text-[10px] text-white/30">Supabase</p>
            </div>
          </div>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1 text-[10px] font-medium text-emerald-300">
            <span className="h-1 w-1 rounded-full bg-emerald-400" />
            {isSupabaseConfigured ? "متصل" : "غير مهيأ"}
          </p>
        </section>

        <section className="rounded-2xl border border-white/[0.06] bg-surface/60 p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-accent-cyan/20 bg-accent-cyan/10 text-accent-cyan">
              <HardDrive size={18} strokeWidth={1.7} />
            </span>
            <div>
              <h2 className="text-[13px] font-semibold text-white">
                تخزين الصور
              </h2>
              <p className="mt-0.5 text-[10px] text-white/30">
                حاوية game-images
              </p>
            </div>
          </div>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-medium text-white/45">
            <span className="h-1 w-1 rounded-full bg-white/40" />
            يُدار من إعدادات Supabase
          </p>
        </section>
      </div>

      <div className="mt-4 rounded-2xl border border-white/[0.06] bg-surface/50 px-6 py-12 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-white/30">
          <Settings size={22} strokeWidth={1.5} />
        </span>
        <h2 className="mt-4 text-[15px] font-semibold text-white">
          خيارات إضافية قادمة قريباً
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-[12px] leading-6 text-white/35">
          إعدادات المتجر المتقدمة وبيانات التواصل ستُضاف في المراحل القادمة.
        </p>
        <Link
          href="/admin"
          className="mt-6 inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.03] px-4 text-[12px] font-semibold text-white/60 transition-colors hover:border-white/20 hover:text-white"
        >
          <ArrowLeft size={14} />
          العودة إلى الرئيسية
        </Link>
      </div>
    </div>
  );
}
