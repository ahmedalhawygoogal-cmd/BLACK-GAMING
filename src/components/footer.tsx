import { Instagram, Mail, MapPin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { Logo } from "./logo";

const footerColumns = [
  {
    title: "المتجر",
    links: [
      { label: "الألعاب", href: "/#games" },
      { label: "البطاقات الرقمية", href: "/#games" },
      { label: "العروض الحالية", href: "/#home" },
    ],
  },
  {
    title: "المنصة",
    links: [
      { label: "عن BLACK GAMING", href: "/#home" },
      { label: "مميزاتنا", href: "/#features" },
      { label: "الأسئلة الشائعة", href: "/#support" },
    ],
  },
  {
    title: "الدعم",
    links: [
      { label: "الدعم الفني", href: "/#support" },
      { label: "تتبع الطلب", href: "/#support" },
      { label: "تواصل معنا", href: "mailto:support@blackgaming.store" },
    ],
  },
];

const socialLinks = [
  { label: "إنستغرام", href: "#", icon: Instagram },
  { label: "إكس", href: "#", icon: Twitter },
  { label: "يوتيوب", href: "#", icon: Youtube },
];

const policyLinks = [
  { label: "سياسة الخصوصية", href: "#" },
  { label: "الشروط والأحكام", href: "#" },
  { label: "سياسة الاسترجاع", href: "#" },
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
              وجهتك العربية الأولى لشحن الألعاب والبطاقات الرقمية. تجربة شراء
              سريعة، آمنة، وبأسعار عادلة.
            </p>

            <div className="mt-6 space-y-3 text-[13px] text-white/45">
              <a
                href="mailto:support@blackgaming.store"
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Mail size={15} className="text-white/30" />
                support@blackgaming.store
              </a>
              <div className="flex items-center gap-2.5">
                <MapPin size={15} className="text-white/30" />
                الرياض، المملكة العربية السعودية
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.07] text-white/40 transition-colors duration-200 hover:border-white/15 hover:text-white"
                  >
                    <Icon size={15} />
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
                      <Link
                        href={link.href}
                        className="text-[13px] text-white/40 transition-colors duration-200 hover:text-white"
                      >
                        {link.label}
                      </Link>
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
