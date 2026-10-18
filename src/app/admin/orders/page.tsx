import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ClipboardList } from "lucide-react";

export const metadata: Metadata = {
  title: "الطلبات",
};

export default function AdminOrdersPage() {
  return (
    <div>
      <div>
        <div className="flex items-center gap-2.5 text-[11px] font-semibold text-white/35">
          <span
            aria-hidden
            className="h-px w-6 bg-gradient-to-l from-accent-cyan to-transparent"
          />
          إدارة المتجر
        </div>
        <h1 className="mt-3 text-2xl font-extrabold text-white sm:text-[30px] sm:leading-tight">
          الطلبات
        </h1>
        <p className="mt-2 max-w-md text-[13px] leading-7 text-white/40">
          مراجعة طلبات الشحن والتحقق من إثباتات الدفع.
        </p>
      </div>

      <div className="mt-7 rounded-2xl border border-white/[0.06] bg-surface/50 px-6 py-16 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-white/30">
          <ClipboardList size={22} strokeWidth={1.5} />
        </span>
        <h2 className="mt-4 text-[15px] font-semibold text-white">
          إدارة الطلبات قادمة قريباً
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-[12px] leading-6 text-white/35">
          سيتم تفعيل هذه الصفحة في المرحلة التالية مع أدوات التحقق من الدفع
          وتحديث حالات الطلبات.
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
