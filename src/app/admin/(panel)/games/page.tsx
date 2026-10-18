import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import type { AdminGame } from "@/lib/admin-types";
import { GamesManager } from "./games-manager";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "الألعاب",
};

export default async function AdminGamesPage() {
  let games: AdminGame[] = [];
  let loadError: string | null = null;

  if (supabase) {
    const { data, error } = await supabase
      .from("games")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      loadError = `تعذر تحميل الألعاب: ${error.message}`;
    } else if (data) {
      games = data as AdminGame[];
    }
  } else {
    loadError = "تعذر الاتصال بقاعدة البيانات. تحقق من إعدادات Supabase.";
  }

  return <GamesManager initialGames={games} initialError={loadError} />;
}
