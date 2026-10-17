import { ArrowLeft, Gamepad2 } from "lucide-react";
import Link from "next/link";
import { Reveal } from "./reveal";

const stats = [
  { value: "+40", label: "لعبة مدعومة" },
  { value: "24/7", label: "دعم فني" },
  { value: "+250K", label: "عملية شحن" },
  { value: "100%", label: "دفع آمن" },
];

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute -top-48 right-1/2 h-[440px] w-[720px] translate-x-1/2 rounded-full bg-accent-purple/[0.13] blur-[140px]" />
        <div className="absolute -top-24 left-[-12%] h-[340px] w-[460px] rounded-full bg-accent-cyan/[0.07] blur-[130px]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container-page relative pb-16 pt-16 sm:pb-24 sm:pt-24 lg:pb-28 lg:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-4 py-1.5 text-[11px] font-medium text-white/55 sm:text-xs">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent-cyan/60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-cyan" />
              </span>
              منصة الشحن العربية للاعبين
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-7 text-balance text-[2rem] font-extrabold leading-[1.4] text-white sm:text-5xl sm:leading-[1.3] lg:text-[64px] lg:leading-[1.22]">
              اشحن ألعابك المفضلة
              <span className="mt-1 block">
                <span className="text-gradient">فوراً</span> وبأمان
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-[15px] leading-8 text-white/50 sm:text-base">
              الرصيد، البطاقات، وشحنات الألعاب في مكان واحد. أسعار تنافسية،
              تسليم لحظي، وتجربة شراء مصممة خصيصاً للاعب العربي.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/#games"
                className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent-purple px-8 text-sm font-bold text-white shadow-cta transition-colors duration-200 hover:bg-[#7c4df2] sm:w-auto"
              >
                تسوق الآن
                <ArrowLeft
                  size={17}
                  className="transition-transform duration-300 ease-premium group-hover:-translate-x-1"
                />
              </Link>
              <Link
                href="/#features"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.02] px-8 text-sm font-semibold text-white/70 transition-colors duration-200 hover:border-white/15 hover:bg-white/[0.05] hover:text-white sm:w-auto"
              >
                <Gamepad2 size={17} strokeWidth={1.8} />
                استكشف الألعاب
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.24}>
          <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-8 border-t border-white/[0.06] pt-8 sm:mt-20 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-2xl font-extrabold text-white sm:text-[28px]">
                    {stat.value}
                  </span>
                  <span className="mt-2 block text-[11px] font-medium text-white/35 sm:text-xs">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
