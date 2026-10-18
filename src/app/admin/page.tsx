import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  Clock,
  Gamepad2,
  Plus,
  type LucideIcon,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "الرئيسية",
};

type StatCard = {
  label: string;
  value: number | string;
  hint: string;
  icon: LucideIcon;
  accent: string;
};

export default async function AdminDashboardPage() {
  let gamesCount = 0;
  let ordersCount = 0;
  let pendingCount = 0;
  let latestGames: Array<{
    id: string;
    name: string;
    banner_url: string | null;
    icon: string | null;
    is_active: boolean | null;
  }> = [];

  if (supabase) {
    const [gamesResult, ordersResult, pendingResult, latestResult] =
      await Promise.all([
        supabase
          .from("games")
          .select("*", { count: "exact", head: true }),
        supabase
          .from("orders")
          .select("*", { count: "exact", head: true }),
        supabase
          .from("orders")
          .select("*", { count: "exact", head: true })
          .eq("status", "pending_verification"),
        supabase
          .from("games")
          .select("id, name, banner_url, icon, is_active")
          .order("created_at", { ascending: false })
          .limit(4),
      ]);

    gamesCount = gamesResult.count ?? 0;
    ordersCount = ordersResult.count ?? 0;
    pendingCount = pendingResult.count ?? 0;
    latestGames = latestResult.data ?? [];
  }

  const stats: StatCard[] = [
    {
      label: "إجمالي الألعاب",
      value: gamesCount,
      hint: "لعبة مسجلة في المتجر",
      icon: Gamepad2,
      accent: "border-accent-purple/20 bg-accent-purple/10 text-accent-purple",
    },
    {
      label: "إجمالي الطلبات",
      value: ordersCount,
      hint: "طلب تم استلامه",
      icon: ClipboardList,
      accent: "border-accent-cyan/20 bg-accent-cyan/10 text-accent-cyan",
    },
    {
      label: "بانتظار المراجعة",
      value: pendingCount,
      hint: "طلب يحتاج تحقق الدفع",
      icon: Clock,
      accent: "border-amber-500/20 bg-amber-500/10 text-amber-300",
    },
  ];

  return (
    <div>
      <div>
        <div className="flex items-center gap-2.5 text-[11px] font-semibold text-white/35">
          <span
            aria-hidden
            className="h-px w-6 bg-gradient-to-l from-accent-purple to-transparent"
          />
          نظرة عامة
        </div>
        <h1 className="mt-3 text-2xl font-extrabold text-white sm:text-[30px] sm:leading-tight">
          مرحباً بك في لوحة التحكم
        </h1>
        <p className="mt-2 max-w-lg text-[13px] leading-7 text-white/40">
          راقب حالة متجرك، أدر الألعاب، وتابع الطلبات من مكان واحد.
        </p>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className="rounded-2xl border border-white/[0.06] bg-surface/60 p-5 transition-colors duration-300 hover:border-white/[0.1]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-medium text-white/35">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-[28px] font-extrabold leading-none text-white">
                    {stat.value}
                  </p>
                </div>
                <span
                  className={`grid h-10 w-10 place-items-center rounded-xl border ${stat.accent}`}
                >
                  <Icon size={18} strokeWidth={1.7} />
                </span>
              </div>
              <p className="mt-4 text-[10px] text-white/25">{stat.hint}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <section className="rounded-2xl border border-white/[0.06] bg-surface/60 p-5 lg:col-span-2">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-[14px] font-semibold text-white">
                أحدث الألعاب
              </h2>
              <p className="mt-1 text-[11px] text-white/30">
                آخر ما تمت إضافته إلى المتجر
              </p>
            </div>
            <Link
              href="/admin/games"
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/40 transition-colors hover:text-white"
            >
              إدارة الألعاب
              <ArrowLeft size={13} />
            </Link>
          </div>

          {latestGames.length > 0 ? (
            <ul className="mt-4 space-y-1">
              {latestGames.map((game) => {
                const cover =
                  game.banner_url ||
                  (game.icon?.startsWith("http") ? game.icon : null);

                return (
                  <li
                    key={game.id}
                    className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-white/[0.02]"
                  >
                    <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-white/[0.07] bg-white/[0.03]">
                      {cover ? (
                        <Image
                          src={cover}
                          alt=""
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="grid h-full w-full place-items-center text-white/25">
                          <Gamepad2 size={16} strokeWidth={1.6} />
                        </span>
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12px] font-medium text-white/80">
                        {game.name}
                      </p>
                      <p className="mt-0.5 text-[10px] text-white/25">
                        {game.is_active === false ? "غير نشطة" : "نشطة في المتجر"}
                      </p>
                    </div>
                    {game.is_active === false ? null : (
                      <CheckCircle2
                        size={14}
                        className="shrink-0 text-emerald-400/70"
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="mt-4 flex flex-col items-center rounded-xl border border-dashed border-white/[0.08] px-4 py-10 text-center">
              <Gamepad2 size={20} className="text-white/20" />
              <p className="mt-3 text-[12px] text-white/35">
                لم تتم إضافة أي لعبة بعد
              </p>
              <Link
                href="/admin/games"
                className="mt-4 inline-flex h-9 items-center gap-1.5 rounded-lg bg-accent-purple px-4 text-[11px] font-semibold text-white transition-colors hover:bg-[#7c4df2]"
              >
                <Plus size={13} />
                إضافة لعبة
              </Link>
            </div>
          )}
        </section>

        <section className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#151129] via-[#0F1420] to-[#0B111B] p-5">
          <div
            aria-hidden
            className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-accent-purple/[0.12] blur-3xl"
          />
          <h2 className="relative text-[14px] font-semibold text-white">
            إجراء سريع
          </h2>
          <p className="relative mt-1.5 text-[11px] leading-6 text-white/35">
            أضف لعبة جديدة مع غلافها وستظهر مباشرة في صفحة المتجر.
          </p>
          <Link
            href="/admin/games"
            className="relative mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-accent-purple text-[12px] font-bold text-white shadow-cta transition-colors hover:bg-[#7c4df2]"
          >
            <Plus size={15} />
            إضافة لعبة جديدة
          </Link>
          <p className="relative mt-4 text-[10px] leading-5 text-white/20">
            المرحلة القادمة: إدارة الطلبات والتحقق من المدفوعات.
          </p>
        </section>
      </div>
    </div>
  );
}
