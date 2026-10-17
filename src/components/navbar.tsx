"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, MessageCircle, X, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { WHATSAPP_PHONE_NUMBER } from "@/lib/supabase";

const navLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "شحن Blood Strike", href: "/game/blood-strike" },
  { label: "مميزاتنا", href: "/#features" },
  { label: "الدعم عبر واتساب", href: `https://wa.me/${WHATSAPP_PHONE_NUMBER}`, isExternal: true },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${
        isScrolled
          ? "border-white/[0.08] bg-background/85"
          : "border-white/[0.05] bg-background/60"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Logo />

        <nav aria-label="التنقل الرئيسي" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <li key={link.label}>
                  {link.isExternal ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-[13px] font-medium text-emerald-400 transition-colors duration-200 hover:bg-emerald-500/10 hover:text-emerald-300"
                    >
                      <MessageCircle size={14} />
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className={`inline-flex h-9 items-center rounded-lg px-3.5 text-[13px] font-medium transition-colors duration-200 hover:bg-white/[0.04] hover:text-white ${
                        isActive ? "text-white bg-white/[0.06]" : "text-white/60"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/game/blood-strike"
            className="hidden h-10 items-center justify-center gap-1.5 rounded-lg bg-accent-purple px-5 text-[13px] font-semibold text-white shadow-cta transition-colors duration-200 hover:bg-[#7c4df2] sm:inline-flex"
          >
            <Zap size={15} />
            <span>اشحن الآن</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/70 transition-colors duration-200 hover:border-white/15 hover:text-white lg:hidden"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/[0.06] bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <nav
              aria-label="قائمة التنقل للجوال"
              className="container-page flex flex-col gap-1 py-4"
            >
              {navLinks.map((link) =>
                link.isExternal ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-emerald-400 transition-colors hover:bg-emerald-500/10"
                  >
                    <MessageCircle size={16} />
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg px-3 py-3 text-sm font-medium text-white/60 transition-colors hover:bg-white/[0.04] hover:text-white"
                  >
                    {link.label}
                  </Link>
                )
              )}

              <Link
                href="/game/blood-strike"
                onClick={() => setIsOpen(false)}
                className="mt-3 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-accent-purple text-sm font-semibold text-white transition-colors hover:bg-[#7c4df2]"
              >
                <Zap size={16} />
                <span>اشحن الآن (Blood Strike)</span>
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
