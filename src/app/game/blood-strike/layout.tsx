import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "شحن لعبة Blood Strike (MENA) - باقات الجولد والباتل باس",
  description:
    "اشحن جولد وباتل باس لعبة بلود سترايك Blood Strike سيرفر الشرق الأوسط (MENA) فوراً عبر الآيدي، بأسعار تبدأ من 25 جنيه مصري وتسليم فوري عبر واتساب.",
  openGraph: {
    title: "شحن لعبة Blood Strike (MENA) | BLACK GAMING",
    description:
      "شحن فوري لجولد وباتل باس Blood Strike بالجنيه المصري عبر الآيدي ودعم واتساب متواصل.",
  },
};

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
