import { Headset, ShieldCheck, Zap, type LucideIcon } from "lucide-react";
import { Reveal } from "./reveal";

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconClass: string;
};

const features: Feature[] = [
  {
    title: "شحن فوري بالـ ID",
    description:
      "تُنفَّذ طلبات شحن Blood Strike في أقل من 5 دقائق إلى حسابك بالآيدي مباشرة دون الحاجة لكلمة المرور.",
    icon: Zap,
    iconClass: "border-accent-purple/20 bg-accent-purple/10 text-accent-purple",
  },
  {
    title: "دعم واتساب مباشر",
    description:
      "فريق خدمة عملاء متواجد على مدار الساعة عبر الواتساب (+201554893945) لمساعدتك وتأكيد تنفيذ طلبك.",
    icon: Headset,
    iconClass: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  },
  {
    title: "دفع آمن بالجنيه المصري",
    description:
      "طرق دفع محلية مريحة تشمل فودافون كاش، إنستاباي InstaPay، وكافة المحافظ الإلكترونية مع ضمان كامل.",
    icon: ShieldCheck,
    iconClass: "border-accent-cyan/20 bg-accent-cyan/10 text-accent-cyan",
  },
];

export function Trust() {
  return (
    <section
      id="features"
      className="relative border-t border-white/[0.05] py-20 sm:py-24"
    >
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <div>
              <div className="flex items-center gap-2.5 text-[11px] font-semibold text-white/40 sm:text-xs">
                <span
                  aria-hidden
                  className="h-px w-6 bg-gradient-to-l from-accent-cyan to-transparent"
                />
                لماذا BLACK GAMING
              </div>
              <h2 className="mt-4 text-balance text-2xl font-extrabold text-white sm:text-[34px] sm:leading-[1.35]">
                تجربة شحن تستحق ثقتك
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="max-w-md text-sm leading-8 text-white/45">
              من أول ضغطة زر حتى وصول الشحنة، صممنا كل تفصيلة لتكون سريعة وآمنة
              وواضحة تماماً.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Reveal key={feature.title} delay={index * 0.06}>
                <article className="h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-colors duration-300 hover:border-white/[0.1] hover:bg-white/[0.03]">
                  <div
                    className={`grid h-11 w-11 place-items-center rounded-xl border ${feature.iconClass}`}
                  >
                    <Icon size={20} strokeWidth={1.7} />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-7 text-white/40">
                    {feature.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
