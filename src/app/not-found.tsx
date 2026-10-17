import type { Metadata } from "next";
import { ArrowLeft, Compass, Home } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "الصفحة غير موجودة",
  description: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        id="main"
        className="relative isolate flex min-h-[70vh] items-center overflow-hidden py-20 sm:py-24"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid" />
          <div className="hidden sm:block absolute -top-32 right-1/2 h-[360px] w-[560px] translate-x-1/2 rounded-full bg-accent-purple/[0.11] blur-[120px]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="container-page text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-4 py-1.5 text-[11px] font-medium text-white/55 sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan/80" />
              خطأ 404
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-6 select-none text-[96px] font-black leading-none tracking-tight text-gradient sm:text-[140px]">
              404
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-4 text-2xl font-extrabold text-white sm:text-4xl">
              الصفحة غير موجودة
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mx-auto mt-4 max-w-md text-sm leading-8 text-white/45">
              يبدو أنك وصلت إلى منطقة غير مكتشفة. قد يكون الرابط غير صحيح أو أن
              الصفحة قد نُقلت إلى مكان آخر.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent-purple px-7 text-sm font-bold text-white shadow-cta transition-colors duration-200 hover:bg-[#7c4df2] sm:w-auto"
              >
                <Home size={17} strokeWidth={1.9} />
                العودة إلى الرئيسية
              </Link>
              <Link
                href="/#games"
                className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.02] px-7 text-sm font-semibold text-white/70 transition-colors duration-200 hover:border-white/15 hover:bg-white/[0.05] hover:text-white sm:w-auto"
              >
                <Compass size={17} strokeWidth={1.8} />
                تصفح الألعاب
                <ArrowLeft
                  size={16}
                  className="transition-transform duration-300 ease-premium group-hover:-translate-x-1"
                />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <p className="mt-16 text-[11px] font-medium tracking-[0.16em] text-white/20">
              BLACK GAMING — PLAY. TOP UP. REPEAT.
            </p>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
