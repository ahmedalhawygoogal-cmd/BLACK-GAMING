import {
  ArrowLeft,
  CheckCircle2,
  Coins,
  Crosshair,
  Flame,
  Gamepad2,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./reveal";
import {
  getGameHref,
  type CatalogGame,
  type Product,
} from "@/lib/supabase";

export function Games({
  games,
  featuredProducts = [],
}: {
  games: CatalogGame[];
  featuredProducts?: Product[];
}) {
  const featuredGame = games[0] ?? null;
  const moreGames = games.slice(1);
  const goldPackages = featuredProducts
    .filter((product) => product.category === "gold")
    .slice(0, 4);
  const battlePassPackages = featuredProducts.filter(
    (product) => product.category === "battle_pass",
  );
  const featuredHref = featuredGame ? getGameHref(featuredGame.slug) : "/#games";

  return (
    <section id="games" className="relative py-16 sm:py-24">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2.5 text-[11px] font-semibold text-white/40 sm:text-xs">
                <span
                  aria-hidden
                  className="h-px w-6 bg-gradient-to-l from-accent-purple to-transparent"
                />
                الألعاب المتاحة للشحن الفوري
              </div>
              <h2 className="mt-4 text-balance text-2xl font-extrabold text-white sm:text-[34px] sm:leading-[1.35]">
                {featuredGame
                  ? `شحن لعبة ${featuredGame.name}${featuredGame.region ? ` (${featuredGame.region})` : ""}`
                  : "الألعاب المتاحة للشحن"}
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/50">
                {featuredGame?.description ||
                  "تسليم فوري ومباشر إلى حسابك عبر الآيدي (Player ID)، بأفضل أسعار الجنيه المصري وبدون انتظار."}
              </p>
            </div>

            {featuredGame ? (
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  الشحن متاح ونشط الآن
                </span>
              </div>
            ) : null}
          </div>
        </Reveal>

        {!featuredGame ? (
          <Reveal>
            <div className="mt-10 rounded-3xl border border-white/[0.08] bg-white/[0.02] px-6 py-16 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-white/35">
                <Gamepad2 size={26} strokeWidth={1.6} />
              </div>
              <p className="mt-5 text-base font-semibold text-white">
                لا توجد ألعاب متاحة حالياً
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-white/45">
                يتم تحديث قائمة الألعاب من لوحة التحكم. عُد لاحقاً بعد تفعيل لعبة للشحن.
              </p>
            </div>
          </Reveal>
        ) : (
          <div className="mt-10">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.12] bg-gradient-to-b from-[#141b2d] via-surface to-[#0b0f19] p-6 sm:p-8 lg:p-10 shadow-xl transition-all duration-300 hover:border-white/20">
                <div className="hidden sm:block pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent-purple/15 blur-[90px]" />
                <div className="hidden sm:block pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-accent-cyan/10 blur-[90px]" />

                <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-7">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-accent-purple/40 bg-accent-purple/15 px-3 py-1 text-xs font-bold text-accent-purple">
                        <Flame size={14} className="text-accent-purple" />
                        اللعبة الأكثر طلباً في مصر والوطن العربي
                      </span>
                      {featuredGame.region ? (
                        <span className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
                          {featuredGame.region}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-4 text-3xl sm:text-4xl font-black text-white tracking-tight">
                      {featuredGame.name}{" "}
                      <span className="text-gradient">متاحة للشحن</span>
                    </h3>

                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/60 max-w-xl">
                      {featuredGame.description ||
                        "اشحن رصيدك وفعّل باقاتك فوراً لحسابك بأرخص الأسعار في مصر. كل ما تحتاجه هو الـ Player ID الخاص بك والدفع كاش أو إنستاباي."}
                    </p>

                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-xs text-white/80">
                        <Zap size={16} className="text-amber-400 shrink-0" />
                        <span>تسليم في أقل من 5 دقائق</span>
                      </div>
                      <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-xs text-white/80">
                        <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                        <span>شحن رسمي وآمن 100%</span>
                      </div>
                      <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-xs text-white/80 col-span-2 sm:col-span-1">
                        <CheckCircle2 size={16} className="text-accent-cyan shrink-0" />
                        <span>أسعار تنافسية بالجنيه</span>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <Link
                        href={featuredHref}
                        className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-accent-purple to-[#7c4df2] px-8 text-sm font-bold text-white shadow-cta transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span>شحن باقات {featuredGame.name} الآن</span>
                        <ArrowLeft
                          size={17}
                          className="transition-transform duration-200 group-hover:-translate-x-1"
                        />
                      </Link>

                      <Link
                        href={`${featuredHref}#pricing`}
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 text-sm font-semibold text-white/80 transition-colors hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                      >
                        <Coins size={16} className="text-amber-400" />
                        <span>
                          قائمة الأسعار والباقات
                          {featuredProducts.length > 0
                            ? ` (${featuredProducts.length} باقات)`
                            : ""}
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="rounded-2xl border border-white/[0.08] bg-[#0c101b] md:bg-[#0c101b]/90 md:backdrop-blur-sm p-5">
                      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-xs font-semibold text-white/60">
                        <span className="flex items-center gap-1.5 text-white/90">
                          <Sparkles size={14} className="text-accent-purple" />
                          أبرز الباقات المتوفرة
                        </span>
                        <span className="text-accent-cyan">العملة: EGP</span>
                      </div>

                      {goldPackages.length > 0 ? (
                        <div className="mt-3 space-y-2.5">
                          {goldPackages.map((pkg) => (
                            <Link
                              key={pkg.id}
                              href={featuredHref}
                              className="group flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 transition-colors hover:border-accent-purple/40 hover:bg-accent-purple/[0.08]"
                            >
                              <div className="flex items-center gap-3">
                                <div className="grid h-9 w-9 place-items-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                  <Coins size={18} />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-white group-hover:text-accent-purple transition-colors">
                                      {pkg.name}
                                    </span>
                                    {pkg.is_popular && (
                                      <span className="rounded-full bg-accent-purple/20 px-2 py-0.5 text-[10px] font-semibold text-accent-purple border border-accent-purple/30">
                                        طلب عالي
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[11px] text-white/40">
                                    {featuredGame.region || "شحن فوري"}
                                  </span>
                                </div>
                              </div>

                              <div className="text-left">
                                <span className="block text-base font-extrabold text-emerald-400">
                                  {pkg.price} ج.م
                                </span>
                                <span className="text-[10px] text-white/35">تسليم فوري</span>
                              </div>
                            </Link>
                          ))}

                          {battlePassPackages.length > 0 ? (
                            <Link
                              href={featuredHref}
                              className="flex items-center justify-between rounded-xl border border-accent-cyan/30 bg-accent-cyan/[0.05] p-3 transition-colors hover:bg-accent-cyan/[0.12]"
                            >
                              <div className="flex items-center gap-3">
                                <div className="grid h-9 w-9 place-items-center rounded-lg bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30">
                                  <Crosshair size={18} />
                                </div>
                                <div>
                                  <span className="text-sm font-bold text-white">
                                    {battlePassPackages[0].name}
                                  </span>
                                  <span className="block text-[11px] text-accent-cyan/80">
                                    {battlePassPackages
                                      .map((item) => `${item.price} ج.م`)
                                      .join(" / ")}
                                  </span>
                                </div>
                              </div>
                              <span className="rounded-lg bg-accent-cyan px-2.5 py-1 text-xs font-bold text-background">
                                اختر
                              </span>
                            </Link>
                          ) : null}
                        </div>
                      ) : (
                        <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-sm leading-7 text-white/50">
                          اختر اللعبة لعرض باقات الشحن المتاحة وأسعارها بالجنيه المصري.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        )}

        {moreGames.length > 0 ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {moreGames.map((game) => {
              const href = getGameHref(game.slug);
              const cover =
                game.banner_url ||
                (game.icon?.startsWith("http") ? game.icon : null);

              return (
                <Reveal key={game.id}>
                  <Link
                    href={href}
                    className="group block overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c101b] transition-colors hover:border-white/20"
                  >
                    <span className="relative block h-36 w-full overflow-hidden bg-white/[0.03]">
                      {cover ? (
                        <Image
                          src={cover}
                          alt={`غلاف ${game.name}`}
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <span className="grid h-full place-items-center text-white/25">
                          <Gamepad2 size={28} />
                        </span>
                      )}
                    </span>
                    <span className="block p-4">
                      <span className="block text-sm font-bold text-white">
                        {game.name}
                      </span>
                      <span className="mt-1 block text-[12px] text-white/40">
                        {game.region || "شحن فوري"}
                      </span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
