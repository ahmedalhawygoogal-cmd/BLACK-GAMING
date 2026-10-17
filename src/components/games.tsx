import {
  ArrowLeft,
  Crosshair,
  Flame,
  Gamepad2,
  Sparkles,
  Swords,
  Target,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./reveal";

type Game = {
  name: string;
  genre: string;
  icon: LucideIcon;
  art: string;
};

const games: Game[] = [
  {
    name: "ببجي موبايل",
    genre: "باتل رويال",
    icon: Crosshair,
    art: "from-[#1d3350]/70 via-[#122033] to-[#0d1420]",
  },
  {
    name: "فري فاير",
    genre: "باتل رويال",
    icon: Flame,
    art: "from-[#4a2a22]/70 via-[#2a1a1a] to-[#0f1420]",
  },
  {
    name: "فالورانت",
    genre: "تصويب تكتيكي",
    icon: Swords,
    art: "from-[#432230]/70 via-[#251725] to-[#0e1420]",
  },
  {
    name: "كول أوف ديوتي موبايل",
    genre: "أكشن",
    icon: Target,
    art: "from-[#3d3420]/70 via-[#241f18] to-[#0f1420]",
  },
  {
    name: "جينشين إمباكت",
    genre: "مغامرات",
    icon: Sparkles,
    art: "from-[#1e3a3c]/70 via-[#152527] to-[#0e1420]",
  },
  {
    name: "فورتنايت",
    genre: "باتل رويال",
    icon: Gamepad2,
    art: "from-[#31234d]/70 via-[#1d1833] to-[#0e1320]",
  },
];

export function Games() {
  return (
    <section id="games" className="relative py-20 sm:py-24">
      <div className="container-page">
        <Reveal>
          <div className="max-w-xl">
            <div className="flex items-center gap-2.5 text-[11px] font-semibold text-white/40 sm:text-xs">
              <span
                aria-hidden
                className="h-px w-6 bg-gradient-to-l from-accent-purple to-transparent"
              />
              مكتبة الألعاب
            </div>
            <h2 className="mt-4 text-balance text-2xl font-extrabold text-white sm:text-[34px] sm:leading-[1.35]">
              ألعاب قادمة إلى المنصة
            </h2>
            <p className="mt-3 max-w-md text-sm leading-7 text-white/45">
              نعمل على إضافة أشهر الألعاب والمنصات. كن أول من يعرف عند إطلاق
              الشحن.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game, index) => {
            const Icon = game.icon;

            return (
              <Reveal key={game.name} delay={index * 0.05}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-surface p-3 transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:border-white/[0.13] hover:bg-[#111726]">
                  <div
                    className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl border border-white/[0.05] bg-gradient-to-br ${game.art}`}
                  >
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.10),transparent_55%)]"
                    />
                    <Icon
                      size={40}
                      strokeWidth={1.2}
                      className="relative text-white/70 transition-transform duration-500 ease-premium group-hover:scale-105"
                    />
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[10px] font-medium text-white/65 backdrop-blur-md">
                      <span className="h-1 w-1 rounded-full bg-accent-cyan/80" />
                      قريباً
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 px-2 pb-1 pt-4">
                    <div className="min-w-0">
                      <h3 className="truncate text-[15px] font-semibold text-white">
                        {game.name}
                      </h3>
                      <p className="mt-1 text-xs text-white/35">{game.genre}</p>
                    </div>
                    <span
                      aria-hidden
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/[0.08] text-white/30 transition-colors duration-300 group-hover:border-white/20 group-hover:text-white/70"
                    >
                      <ArrowLeft size={15} />
                    </span>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
