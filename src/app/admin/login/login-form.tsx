"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { AlertCircle, Eye, EyeOff, Loader2, LockKeyhole } from "lucide-react";
import { loginAction, type LoginState } from "@/lib/admin-actions";

const initialState: LoginState = { error: null };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-accent-purple text-sm font-bold text-white shadow-cta transition-colors duration-200 hover:bg-[#7c4df2] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? (
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
  );
}

export function LoginForm() {
  const [state, formAction] = useFormState(loginAction, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="mt-6">
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
          autoComplete="current-password"
          autoFocus
          required
          placeholder="••••••••••••••"
          aria-describedby={state.error ? "login-error" : undefined}
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

      {state.error ? (
        <div
          id="login-error"
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/[0.06] px-3 py-2.5 text-[12px] leading-6 text-red-300"
        >
          <AlertCircle size={14} className="mt-1 shrink-0" />
          {state.error}
        </div>
      ) : null}

      <SubmitButton />
    </form>
  );
}
