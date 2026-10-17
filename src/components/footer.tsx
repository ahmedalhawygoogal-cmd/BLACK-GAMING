import {
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { Logo } from "./logo";
import { WHATSAPP_FORMATTED, WHATSAPP_PHONE_NUMBER } from "@/lib/supabase";

const footerColumns = [
  {
    title: "المتجر",
    links: [
      { label: "شحن Blood Strike (MENA)", href: "/game/blood-strike" },
      { label: "باقات الجولد (Gold)", href: "/game/blood-strike#pricing" },
      { label: "شحن الباتل باس", href: "/game/blood-strike#pricing" },
    ],
  },
  {
    title: "المنصة",
    links: [
      { label: "عن BLACK GAMING", href: "/#home" },
      { label: "مميزاتنا", href: "/#features" },
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
      { label: "الأسئلة الشائعة", href: "/#support" },
      { label: "تواصل معنا", href: `https://wa.me/${WHATSAPP_PHONE_NUMBER}` },
    ],
  },
];

const socialLinks = [
  { label: "واتساب", href: `https://wa.me/${WHATSAPP_PHONE_NUMBER}`, icon: MessageCircle },
  { label: "إنستغرام", href: "#", icon: Instagram },
  { label: "إكس", href: "#", icon: Twitter },
  { label: "يوتيوب", href: "#", icon: Youtube },
];

const policyLinks = [
  { label: "سياسة الخصوصية", href: "#" },
  { label: "الشروط والأحكام", href: "#" },
  { label: "ضمان الاسترجاع", href: "#" },
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

              <a
                href="mailto:support@blackgaming.store"
                className="flex items-center gap-2.5 text-white/50 transition-colors hover:text-white"
              >
                <Mail size={15} className="text-white/30" />
                support@blackgaming.store
              </a>

              <div className="flex items-center gap-2.5 text-white/40">
                <MapPin size={15} className="text-white/30" />
                خدمة عملاء مصر والشرق الأوسط (MENA)
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={social.label}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.07] text-white/40 transition-colors duration-200 hover:border-emerald-500/30 hover:text-emerald-400"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
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
      </div>
    </footer>
  );
}
