import {
  ArrowLeft,
  CheckCircle2,
  Coins,
  Crosshair,
  Flame,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Reveal } from "./reveal";
import { BLOOD_STRIKE_PRODUCTS } from "@/lib/supabase";

export function Games() {
  const goldPackages = BLOOD_STRIKE_PRODUCTS.filter((p) => p.category === "gold").slice(0, 4);

  return (
    <section id="games" className="relative py-20 sm:py-24">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2.5 text-[11px] font-semibold text-white/40 sm:text-xs">
                <span
                  aria-hidden
                  className="h-px w-6 bg-gradient-to-l from-accent-purple to-transparent"
                />
                الألعاب المتاحة للشحن الفوري
              </div>
              <h2 className="mt-4 text-balance text-2xl font-extrabold text-white sm:text-[34px] sm:leading-[1.35]">
                شحن لعبة Blood Strike (MENA)
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/50">
                تسليم فوري ومباشر إلى حسابك عبر الآيدي (Player ID) لسيرفر الشرق الأوسط وشمال أفريقيا، بأفضل أسعار الجنيه المصري وبدون انتظار.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                الشحن متاح ونشط الآن
              </span>
            </div>
          </div>
        </Reveal>

        {/* Featured Blood Strike Hero Showcase Card */}
        <div className="mt-10">
          <Reveal delay={0.08}>
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.12] bg-gradient-to-b from-[#141b2d] via-surface to-[#0b0f19] p-6 sm:p-8 lg:p-10 shadow-2xl">
              {/* Atmospheric Glow */}
              <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent-purple/20 blur-[100px]" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-accent-cyan/15 blur-[100px]" />

              <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
                {/* Left/Main Column: Game Details */}
                <div className="lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-accent-purple/40 bg-accent-purple/15 px-3 py-1 text-xs font-bold text-accent-purple">
                      <Flame size={14} className="text-accent-purple" />
                      اللعبة الأكثر طلباً في مصر والوطن العربي
                    </span>
                    <span className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
                      سيرفر الشرق الأوسط (MENA)
                    </span>
                  </div>

                  <h3 className="mt-4 text-3xl sm:text-4xl font-black text-white tracking-tight">
                    Blood Strike <span className="text-gradient">بلود سترايك</span>
                  </h3>

                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/60 max-w-xl">
                    اشحن رصيد الجولد (Gold) وفعل الباتل باس (Battle Pass) فوراً لحسابك بأرخص الأسعار في مصر. كل ما تحتاجه هو الـ Player ID الخاص بك والدفع كاش أو إنستاباي.
                  </p>

                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-xs text-white/80">
                      <Zap size={16} className="text-amber-400 shrink-0" />
                      <span>تسليم في أقل من 5 دقائق</span>
                    </div>
                    <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-xs text-white/80">
                      <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                      <span>شحن رسمي وآمن 100%</span>
                    </div>
                    <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-xs text-white/80 col-span-2 sm:col-span-1">
                      <CheckCircle2 size={16} className="text-accent-cyan shrink-0" />
                      <span>أسعار تبدأ من 25 ج.م</span>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <Link
                      href="/game/blood-strike"
                      className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-accent-purple to-[#7c4df2] px-8 text-sm font-bold text-white shadow-cta transition-all duration-200 hover:brightness-110"
                    >
                      <span>شحن باقات Blood Strike الآن</span>
                      <ArrowLeft
                        size={17}
                        className="transition-transform duration-300 group-hover:-translate-x-1"
                      />
                    </Link>

                    <Link
                      href="/game/blood-strike#pricing"
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 text-sm font-semibold text-white/80 transition-colors hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                    >
                      <Coins size={16} className="text-amber-400" />
                      <span>قائمة الأسعار والباقات (9 باقات)</span>
                    </Link>
                  </div>
                </div>

                {/* Right Column: Mini Pricing Teaser Cards */}
                <div className="lg:col-span-5">
                  <div className="rounded-2xl border border-white/[0.08] bg-[#0c101b]/90 p-5 backdrop-blur-sm">
                    <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-xs font-semibold text-white/60">
                      <span className="flex items-center gap-1.5 text-white/90">
                        <Sparkles size={14} className="text-accent-purple" />
                        أبرز باقات الجولد المتوفرة
                      </span>
                      <span className="text-accent-cyan">العملة: EGP</span>
                    </div>

                    <div className="mt-3 space-y-2.5">
                      {goldPackages.map((pkg) => (
                        <Link
                          key={pkg.id}
                          href="/game/blood-strike"
                          className="group flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 transition-colors hover:border-accent-purple/40 hover:bg-accent-purple/[0.08]"
                        >
                          <div className="flex items-center gap-3">
                            <div className="grid h-9 w-9 place-items-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              <Coins size={18} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-white group-hover:text-accent-purple transition-colors">
                                  {pkg.name}
                                </span>
                                {pkg.is_popular && (
                                  <span className="rounded-full bg-accent-purple/20 px-2 py-0.5 text-[10px] font-semibold text-accent-purple border border-accent-purple/30">
                                    طلب عالي
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-white/40">سيرفر الشرق الأوسط</span>
                            </div>
                          </div>

                          <div className="text-left">
                            <span className="block text-base font-extrabold text-emerald-400">
                              {pkg.price} ج.م
                            </span>
                            <span className="text-[10px] text-white/35">تسليم فوري</span>
                          </div>
                        </Link>
                      ))}

                      {/* Battle Pass Teaser row */}
                      <Link
                        href="/game/blood-strike"
                        className="flex items-center justify-between rounded-xl border border-accent-cyan/30 bg-accent-cyan/[0.05] p-3 transition-colors hover:bg-accent-cyan/[0.12]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="grid h-9 w-9 place-items-center rounded-lg bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30">
                            <Crosshair size={18} />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-white">باتل باس نخبة (Elite Pass)</span>
                            <span className="block text-[11px] text-accent-cyan/80">عادي 200 ج.م / مميز 400 ج.م</span>
                          </div>
                        </div>
                        <span className="rounded-lg bg-accent-cyan px-2.5 py-1 text-xs font-bold text-background">
                          اختر
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
