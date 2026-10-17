import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BLACK GAMING | اشحن ألعابك المفضلة فوراً",
    template: "%s | BLACK GAMING",
  },
  description:
    "منصة عربية موثوقة لشحن الألعاب والبطاقات الرقمية بأسعار تنافسية، تسليم فوري، ودعم فني على مدار الساعة.",
  applicationName: "BLACK GAMING",
  keywords: [
    "شحن ألعاب",
    "شحن ببجي",
    "شحن فري فاير",
    "بطاقات رقمية",
    "BLACK GAMING",
  ],
  openGraph: {
    title: "BLACK GAMING | اشحن ألعابك المفضلة فوراً",
    description:
      "منصة عربية موثوقة لشحن الألعاب والبطاقات الرقمية بأسعار تنافسية، تسليم فوري، ودعم فني على مدار الساعة.",
    locale: "ar_SA",
    type: "website",
    siteName: "BLACK GAMING",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0F19",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} scroll-smooth`}>
      <body className="min-h-screen overflow-x-hidden bg-background font-sans text-white">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-background"
        >
          تجاوز إلى المحتوى
        </a>
        {children}
      </body>
    </html>
  );
}
