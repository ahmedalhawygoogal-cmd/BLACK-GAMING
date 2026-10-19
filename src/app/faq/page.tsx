import type { Metadata } from "next";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FaqAccordion } from "@/components/faq-accordion";
import { WHATSAPP_PHONE_NUMBER } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة",
  description:
    "إجابات على أكثر الأسئلة شيوعاً حول شحن Blood Strike، طرق الدفع، التحقق من الإيصالات، ومدة التسليم في منصة BLACK GAMING.",
};

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative isolate overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid" />
          <div className="hidden sm:block absolute -top-32 right-1/2 h-[360px] w-[560px] translate-x-1/2 rounded-full bg-accent-purple/[0.11] blur-[120px]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="container-page py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex justify-center">
              <Link
                href="/"
                className="inline-flex h-9 items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 text-[12px] font-semibold text-white/70 shadow-sm transition-all duration-200 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
              >
                <ArrowRight size={14} />
                العودة للرئيسية
              </Link>
            </div>

            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-4 py-1.5 text-[11px] font-medium text-white/55 sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan/80" />
                مركز المساعدة
              </span>
            </div>
            <h1 className="mt-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              الأسئلة الشائعة
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-white/50 sm:text-[15px]">
              إجابات على أكثر الأسئلة التي تصلنا حول عملية الشحن، الدفع، والتحقق من
              الإيصالات. لم تجد إجابتك؟ تواصل معنا عبر واتساب.
            </p>
          </div>

          <FaqAccordion />

          <div className="mx-auto mt-12 max-w-3xl sm:mt-16">
            <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] px-6 py-7 text-center sm:flex-row sm:text-right">
              <div>
                <h2 className="text-base font-bold text-white sm:text-lg">
                  لم تجد إجابتك؟
                </h2>
                <p className="mt-2 text-[13px] leading-7 text-white/55 sm:text-sm">
                  فريق الدعم متاح على واتساب على مدار الساعة للرد على جميع
                  استفساراتك.
                </p>
              </div>
              <a
                href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 text-sm font-bold text-white transition-colors duration-200 hover:bg-emerald-400"
              >
                <MessageCircle size={17} />
                تواصل عبر واتساب
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
