"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  ClipboardList,
  Gamepad2,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Store,
  X,
  type LucideIcon,
} from "lucide-react";
import { logoutAction } from "@/lib/admin-actions";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  { label: "الرئيسية", href: "/admin", icon: LayoutDashboard },
  { label: "الألعاب", href: "/admin/games", icon: Gamepad2 },
  { label: "الطلبات", href: "/admin/orders", icon: ClipboardList },
  { label: "الإعدادات", href: "/admin/settings", icon: Settings },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") {
    return pathname === "/admin";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-[72px] shrink-0 items-center border-b border-white/[0.05] px-6">
        <Link
          href="/admin"
          onClick={onNavigate}
          className="group flex items-center gap-3"
          aria-label="لوحة تحكم BLACK GAMING"
        >
          <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-[10px] border border-white/10 bg-[#0B0F19]">
            <Image
              src="/logo-mark.png"
              alt=""
              width={256}
              height={256}
              sizes="36px"
              className="h-full w-full object-cover"
            />
          </span>
          <span className="flex flex-col gap-1">
            <span className="text-[12px] font-extrabold leading-none tracking-[0.16em] text-white">
              BLACK GAMING
            </span>
            <span className="text-[9px] font-medium leading-none tracking-[0.12em] text-white/30">
              ADMIN PANEL
            </span>
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5">
        <div className="mb-5">
          <Link
            href="/"
            onClick={onNavigate}
            className="group flex items-center justify-between gap-3 rounded-xl border border-accent-purple/35 bg-gradient-to-r from-accent-purple/20 via-accent-purple/10 to-accent-cyan/10 px-3.5 py-3 text-[13px] font-bold text-white shadow-sm transition-all duration-200 hover:border-accent-purple/60 hover:from-accent-purple/30 hover:to-accent-cyan/20"
          >
            <span className="flex items-center gap-2.5">
              <Store size={18} strokeWidth={2} className="text-accent-cyan transition-transform group-hover:scale-110" />
              العودة للمتجر
            </span>
            <ArrowLeft size={15} className="text-white/40 transition-transform group-hover:-translate-x-1 group-hover:text-white" />
          </Link>
        </div>

        <p className="px-3 text-[10px] font-semibold tracking-[0.16em] text-white/25">
          إدارة المتجر
        </p>

        <nav aria-label="تنقل لوحة التحكم" className="mt-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href);
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={`group relative flex h-11 items-center gap-3 rounded-lg px-3 text-[13px] font-medium transition-colors duration-200 ${
                      active
                        ? "bg-white/[0.055] text-white"
                        : "text-white/45 hover:bg-white/[0.03] hover:text-white/80"
                    }`}
                  >
                    {active ? (
                      <span
                        aria-hidden
                        className="absolute right-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-accent-purple"
                      />
                    ) : null}
                    <Icon
                      size={17}
                      strokeWidth={1.8}
                      className={
                        active
                          ? "text-accent-purple"
                          : "text-white/30 transition-colors group-hover:text-white/60"
                      }
                    />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-6">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
            <div className="flex items-center gap-2 text-[11px] font-medium text-white/50">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              المتجر متصل
            </div>
            <p className="mt-1.5 text-[10px] leading-5 text-white/25">
              آخر مزامنة تلقائية مع قاعدة البيانات
            </p>
          </div>
        </div>
      </div>

      <div className="shrink-0 space-y-2 border-t border-white/[0.05] p-4">
        <Link
          href="/"
          onClick={onNavigate}
          className="group flex h-10 w-full items-center justify-between gap-2 rounded-lg border border-accent-purple/25 bg-accent-purple/[0.08] px-3 text-[13px] font-semibold text-white transition-colors duration-200 hover:border-accent-purple/45 hover:bg-accent-purple/[0.14]"
        >
          <span className="flex items-center gap-2.5">
            <Store size={16} strokeWidth={1.8} className="text-accent-purple" />
            العودة للمتجر
          </span>
          <ArrowLeft
            size={14}
            className="text-white/35 transition-transform duration-200 group-hover:-translate-x-0.5"
          />
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex h-10 w-full items-center gap-2.5 rounded-lg px-3 text-[13px] font-medium text-white/40 transition-colors duration-200 hover:bg-red-500/[0.07] hover:text-red-300"
          >
            <LogOut size={16} strokeWidth={1.8} className="text-white/25" />
            تسجيل خروج
          </button>
        </form>
        <p className="px-3 text-[10px] text-white/15">BLACK GAMING v1.0</p>
      </div>
    </div>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isDrawerOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDrawerOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isDrawerOpen]);

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 right-0 z-40 hidden w-[272px] border-l border-white/[0.06] bg-[#080B12] lg:block">
        <SidebarContent />
      </aside>

      {isDrawerOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="إغلاق القائمة"
            onClick={() => setIsDrawerOpen(false)}
            className="absolute inset-0 h-full w-full animate-[fade-in_0.2s_ease-out] bg-black/60 backdrop-blur-sm"
          />
          <aside className="absolute inset-y-0 right-0 w-[282px] animate-[admin-drawer-in_0.3s_cubic-bezier(0.22,1,0.36,1)] border-l border-white/[0.07] bg-[#080B12]">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              aria-label="إغلاق القائمة"
              className="absolute left-3 top-5 z-10 grid h-8 w-8 place-items-center rounded-lg border border-white/[0.08] text-white/50 transition-colors hover:text-white"
            >
              <X size={15} />
            </button>
            <SidebarContent onNavigate={() => setIsDrawerOpen(false)} />
          </aside>
        </div>
      ) : null}

      <div className="flex min-h-screen flex-col lg:pr-[272px]">
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-3 border-b border-white/[0.06] bg-background/85 px-5 backdrop-blur-xl lg:hidden">
          <Link href="/admin" className="flex items-center gap-2.5">
            <span className="h-8 w-8 overflow-hidden rounded-lg border border-white/10">
              <Image
                src="/logo-mark.png"
                alt=""
                width={256}
                height={256}
                sizes="32px"
                className="h-full w-full object-cover"
              />
            </span>
            <span className="text-[11px] font-extrabold tracking-[0.14em] text-white">
              BLACK GAMING
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/[0.09] bg-white/[0.03] px-3 text-[11px] font-semibold text-white/75 transition-colors hover:border-white/20 hover:text-white"
            >
              <Store size={14} className="text-accent-cyan" />
              المتجر
            </Link>
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="فتح القائمة"
              aria-expanded={isDrawerOpen}
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/60 transition-colors hover:text-white"
            >
              <Menu size={17} />
            </button>
          </div>
        </header>

        <main className="relative flex-1">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-64 bg-[radial-gradient(ellipse_60%_100%_at_70%_0%,rgba(139,92,246,0.06),transparent_70%)]"
          />
          <div className="relative mx-auto w-full max-w-6xl px-5 py-7 sm:px-8 lg:px-10 lg:py-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
