"use client";

import { useState } from "react";
import { AlertCircle, Eye, EyeOff, Loader2, LockKeyhole } from "lucide-react";

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        // Option B: Response is 200 OK -> manually redirect using window.location.href = '/admin'
        // Dual safety: Also write to document.cookie so cross-origin iframes persist immediately
        const isHttps = window.location.protocol === "https:";
        document.cookie = `admin_session=true; path=/; max-age=604800; ${
          isHttps ? "SameSite=None; Secure" : "SameSite=Lax"
        }`;

        window.location.href = "/admin";
        return;
      }

      const data = await res.json().catch(() => ({}));
      setError(
        data.error || "كلمة المرور غير صحيحة. تحقق منها وحاول مرة أخرى.",
      );
      setIsLoading(false);
    } catch (err: unknown) {
      console.error("Login submission error:", err);
      setError("تعذر الاتصال بالخادم. يرجى المحاولة مرة أخرى.");
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <label
        htmlFor="password"
        className="mb-2 block text-[12px] font-medium text-white/55"
      >
        كلمة مرور الإدارة
      </label>

      <div className="relative">
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          autoFocus
          required
          placeholder="••••••••••••••"
          aria-describedby={error ? "login-error" : undefined}
          className="h-11 w-full rounded-xl border border-white/[0.08] bg-white/[0.02] pl-11 pr-3.5 text-sm text-white placeholder:text-white/20 transition-colors duration-200 hover:border-white/[0.14] focus:border-accent-purple/60 focus:bg-white/[0.03] focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setShowPassword((visible) => !visible)}
          aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
          className="absolute inset-y-0 left-0 grid w-11 place-items-center text-white/30 transition-colors hover:text-white/70"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {error ? (
        <div
          id="login-error"
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/[0.06] px-3 py-2.5 text-[12px] leading-6 text-red-300"
        >
          <AlertCircle size={14} className="mt-1 shrink-0" />
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isLoading}
        className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-accent-purple text-sm font-bold text-white shadow-cta transition-colors duration-200 hover:bg-[#7c4df2] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            جارٍ التحقق...
          </>
        ) : (
          <>
            <LockKeyhole size={16} />
            دخول إلى اللوحة
          </>
        )}
      </button>
    </form>
  );
}
