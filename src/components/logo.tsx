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
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-[10px] border border-white/10 bg-gradient-to-br from-[#1a1430] to-[#0d1220] transition-colors duration-300 group-hover:border-white/20">
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-accent-purple/70 to-transparent"
        />
        <span className="text-[12px] font-extrabold leading-none tracking-wide text-white">
          BG
        </span>
      </span>
      <span className="text-[13px] font-extrabold leading-none tracking-[0.18em] text-white">
        BLACK GAMING
      </span>
    </Link>
  );
}
