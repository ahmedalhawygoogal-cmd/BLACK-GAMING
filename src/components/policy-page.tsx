import type { ReactNode } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

type PolicyPageProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function PolicyPage({ title, subtitle, children }: PolicyPageProps) {
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
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-4 py-1.5 text-[11px] font-medium text-white/55 sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan/80" />
              BLACK GAMING
            </span>
            <h1 className="mt-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-white/50 sm:text-[15px]">
              {subtitle}
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.07] bg-surface/40 backdrop-blur-sm sm:mt-16">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

type PolicySectionProps = {
  title: string;
  children: ReactNode;
};

export function PolicySection({ title, children }: PolicySectionProps) {
  return (
    <section className="px-5 py-7 sm:px-8 sm:py-8">
      <h2 className="text-base font-bold text-white sm:text-lg">
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-[13px] leading-8 text-white/55 sm:text-sm">
        {children}
      </div>
    </section>
  );
}
