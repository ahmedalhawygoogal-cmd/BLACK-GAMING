import { MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Logo } from "./logo";
import { WHATSAPP_FORMATTED, WHATSAPP_PHONE_NUMBER } from "@/lib/supabase";

const footerColumns = [
  {
    title: "المنصة",
    links: [
      { label: "عن BLACK GAMING", href: "/#home" },
      { label: "ضمان وأمان الشحن", href: "/#features" },
    ],
  },
  {
    title: "الدعم والمساعدة",
    links: [
      {
        label: `واتساب: ${WHATSAPP_FORMATTED}`,
        href: `https://wa.me/${WHATSAPP_PHONE_NUMBER}`,
      },
      { label: "الأسئلة الشائعة", href: "/faq" },
      { label: "تواصل معنا", href: `https://wa.me/${WHATSAPP_PHONE_NUMBER}` },
    ],
  },
];

const policyLinks = [
  { label: "سياسة الخصوصية", href: "/privacy" },
  { label: "الشروط والأحكام", href: "/terms" },
  { label: "الأسئلة الشائعة", href: "/faq" },
];

export function Footer() {
  return (
    <footer
      id="support"
      className="relative border-t border-white/[0.06] bg-[#090C14]"
    >
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-5 max-w-xs text-[13px] leading-7 text-white/40">
              منصتك الأولى لشحن ألعابك المفضلة فوراً. شحن رسمي معتمد للعبة Blood Strike (MENA) في مصر والوطن العربي.
            </p>

            <div className="mt-6 space-y-3 text-[13px] text-white/60">
              <a
                href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-emerald-400 font-semibold transition-colors hover:text-emerald-300"
              >
                <MessageCircle size={16} className="text-emerald-400" />
                <span dir="ltr">{WHATSAPP_FORMATTED}</span>
                <span className="text-[11px] font-normal text-white/40">(دعم واتساب 24/7)</span>
              </a>

              <div className="flex items-center gap-2.5 text-white/40">
                <MapPin size={15} className="text-white/30" />
                خدمة عملاء مصر والشرق الأوسط (MENA)
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:col-span-7">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-[13px] font-semibold text-white">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith("http") ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[13px] text-white/40 transition-colors duration-200 hover:text-emerald-400"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-[13px] text-white/40 transition-colors duration-200 hover:text-white"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 sm:flex-row">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} BLACK GAMING. جميع الحقوق محفوظة.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {policyLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-xs text-white/30 transition-colors duration-200 hover:text-white/70"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex justify-center">
          <Link
            href="/admin"
            className="text-[11px] text-white/20 transition-colors duration-200 hover:text-white/50"
          >
            دخول لوحة القيادة
          </Link>
        </div>
      </div>
    </footer>
  );
}
