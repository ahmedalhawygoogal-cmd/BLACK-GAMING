import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  href?: string;
};

export function Logo({ href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="BLACK GAMING - الصفحة الرئيسية"
      className="group flex items-center gap-3"
    >
      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#0B0F19] shadow-[0_0_0_1px_rgba(139,92,246,0.08)] transition-colors duration-300 group-hover:border-white/20">
        <Image
          src="/logo-mark.png"
          alt=""
          width={256}
          height={256}
          sizes="40px"
          priority
          className="h-full w-full object-cover"
        />
      </span>
      <span className="flex flex-col gap-1">
        <span className="text-[13px] font-extrabold leading-none tracking-[0.16em] text-white">
          BLACK GAMING
        </span>
        <span className="hidden text-[9px] font-medium leading-none tracking-[0.12em] text-white/30 sm:block">
          GAME TOP-UP STORE
        </span>
      </span>
    </Link>
  );
}
