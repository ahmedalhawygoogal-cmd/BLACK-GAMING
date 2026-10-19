"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createAdminSessionToken,
  verifyAdminSessionToken,
} from "@/lib/admin-session";

const ADMIN_PASSWORD = "$YXg8sr?8&&Y?Bb";

export type LoginState = {
  error: string | null;
};

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");

  console.log("Login attempt - received password:", password);
  console.log("Login attempt - expected password:", ADMIN_PASSWORD);
  console.log("Match status:", password === ADMIN_PASSWORD);

  if (password !== ADMIN_PASSWORD && password.trim() !== ADMIN_PASSWORD) {
    await new Promise((resolve) => setTimeout(resolve, 350));
    return { error: "كلمة المرور غير صحيحة. تحقق منها وحاول مرة أخرى." };
  }

  cookies().set({
    name: "admin_session",
    value: "true",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  cookies().set({
    name: "admin_session",
    value: "",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  redirect("/admin/login");
}

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type DeactivateGameState = {
  success?: boolean;
  error: string | null;
  rlsBlocked?: boolean;
  sqlHelp?: string;
};

export async function deactivateGameAction(
  gameId: string,
): Promise<DeactivateGameState> {
  const adminSession = cookies().get("admin_session")?.value;
  if (!adminSession) {
    return {
      error: "غير مصرح لك بتنفيذ هذا الإجراء. يرجى تسجيل الدخول مجدداً.",
    };
  }

  if (!gameId || !UUID_PATTERN.test(gameId)) {
    return { error: "معرّف اللعبة غير صالح." };
  }

  const supabaseUrl =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://ntkuotuzjkvbnicpvpie.supabase.co";

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "sb_publishable_hvA_yFewttedkRk7cuX9ng_BGLqqI5Q";

  // Use service role key if configured (bypasses RLS), otherwise try anon client
  const clientKey = serviceRoleKey || anonKey;
  if (!clientKey) {
    return {
      error: "إعدادات Supabase غير متوفرة على الخادم.",
    };
  }

  try {
    const client = createClient(supabaseUrl, clientKey, {
      auth: { persistSession: false },
    });

    const { error } = await client
      .from("games")
      .update({ is_active: false })
      .eq("id", gameId);

    if (error) {
      console.error("deactivateGameAction error:", error);
      const isRls =
        error.message.toLowerCase().includes("row-level security") ||
        error.message.toLowerCase().includes("policy") ||
        error.code === "42501";

      return {
        error: isRls
          ? "تم رفض التعديل بواسطة سياسة الأمان (RLS) في Supabase. يجب تفعيل سياسة UPDATE لجدول games أو إضافة مفتاح SUPABASE_SERVICE_ROLE_KEY."
          : `تعذر حذف اللعبة: ${error.message}`,
        rlsBlocked: isRls,
        sqlHelp:
          'CREATE POLICY "Allow update to games" ON public.games FOR UPDATE USING (true) WITH CHECK (true);',
      };
    }

    revalidatePath("/admin/games");
    revalidatePath("/admin");
    revalidatePath("/");

    return { success: true, error: null };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "حدث خطأ غير متوقع أثناء حذف اللعبة.";
    return { error: message };
  }
}

