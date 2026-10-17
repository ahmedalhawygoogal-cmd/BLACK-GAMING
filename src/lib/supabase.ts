import { createClient } from "@supabase/supabase-js";

// Supabase credentials with fallback to the configured project
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ntkuotuzjkvbnicpvpie.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_hvA_yFewttedkRk7cuX9ng_BGLqqI5Q";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith("http") &&
    !supabaseUrl.includes("your-project")
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export type Product = {
  id: string;
  game_id?: string;
  name: string;
  category: "gold" | "battle_pass" | "item" | "bundle";
  amount: number;
  price: number;
  currency: string;
  is_popular?: boolean;
  badge?: string | null;
  sort_order: number;
  is_available?: boolean;
};

export type Game = {
  id: string;
  slug: string;
  name: string;
  region: string;
  description: string;
  icon?: string;
};

export type OrderRecord = {
  id?: string;
  order_code?: string;
  game_id?: string;
  product_id?: string;
  player_id: string;
  player_name?: string;
  contact_phone?: string;
  total_amount: number;
  currency: string;
  payment_method?: string;
  status?: string;
  notes?: string;
};

// Default fallback data for Blood Strike (MENA) matching exact requirements
export const BLOOD_STRIKE_GAME: Game = {
  id: "e7c2f6d8-4b2a-431e-9134-8b6c0e2a1f9d",
  slug: "blood-strike",
  name: "Blood Strike",
  region: "سيرفر الشرق الأوسط وشمال أفريقيا (MENA)",
  description:
    "شحن فوري ومباشر لجميع باقات الجولد والباتل باس للعبة Blood Strike على سيرفر الشرق الأوسط، بأسعار رسمية ومنافسة وتسليم فوري عبر الآيدي.",
};

export const BLOOD_STRIKE_PRODUCTS: Product[] = [
  {
    id: "bs-g-50",
    name: "جولد 50",
    category: "gold",
    amount: 50,
    price: 25,
    currency: "EGP",
    sort_order: 1,
  },
  {
    id: "bs-g-105",
    name: "جولد 105",
    category: "gold",
    amount: 105,
    price: 50,
    currency: "EGP",
    sort_order: 2,
  },
  {
    id: "bs-g-320",
    name: "جولد 320",
    category: "gold",
    amount: 320,
    price: 140,
    currency: "EGP",
    is_popular: true,
    badge: "الأكثر طلباً 🔥",
    sort_order: 3,
  },
  {
    id: "bs-g-540",
    name: "جولد 540",
    category: "gold",
    amount: 540,
    price: 230,
    currency: "EGP",
    sort_order: 4,
  },
  {
    id: "bs-g-1100",
    name: "جولد 1100",
    category: "gold",
    amount: 1100,
    price: 430,
    currency: "EGP",
    is_popular: true,
    badge: "أفضل قيمة 💎",
    sort_order: 5,
  },
  {
    id: "bs-g-2260",
    name: "جولد 2260",
    category: "gold",
    amount: 2260,
    price: 840,
    currency: "EGP",
    sort_order: 6,
  },
  {
    id: "bs-g-5800",
    name: "جولد 5800",
    category: "gold",
    amount: 5800,
    price: 2100,
    currency: "EGP",
    badge: "باقة الحيتان 👑",
    sort_order: 7,
  },
  {
    id: "bs-bp-regular",
    name: "باتل باس نخبة عادي",
    category: "battle_pass",
    amount: 0,
    price: 200,
    currency: "EGP",
    badge: "Elite Pass",
    sort_order: 8,
  },
  {
    id: "bs-bp-premium",
    name: "باتل باس نخبة مميز",
    category: "battle_pass",
    amount: 0,
    price: 400,
    currency: "EGP",
    is_popular: true,
    badge: "Premium Elite ⭐",
    sort_order: 9,
  },
];

export const WHATSAPP_PHONE_NUMBER = "201554893945";
export const WHATSAPP_FORMATTED = "+20 155 489 3945";

export function generateWhatsAppOrderUrl(params: {
  productName: string;
  price: number;
  currency?: string;
  playerId: string;
  playerName?: string;
  orderCode?: string;
}) {
  const currencyStr = params.currency === "EGP" ? "جنيه مصري" : (params.currency || "جنيه مصري");
  const idText = params.playerId.trim() ? params.playerId.trim() : "غير محدد بعد";
  const nameText = params.playerName?.trim() ? `\n👤 اسم الحساب: ${params.playerName.trim()}` : "";
  const codeText = params.orderCode ? `\n🔖 كود الطلب: ${params.orderCode}` : "";

  const text = `مرحباً BLACK GAMING 👋
أريد شحن لعبة: Blood Strike (MENA)
${codeText}
📦 الباقة: ${params.productName}
💰 السعر: ${params.price} ${currencyStr}
🎯 الآيدي (Player ID): ${idText}${nameText}

أرجو تزويدي بطرق الدفع المتاحة وتأكيد تنفيذ الطلب فوراً 🙏`;

  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
}

export async function fetchBloodStrikeGame(): Promise<Game> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("games")
        .select("*")
        .eq("slug", "blood-strike")
        .single();

      if (!error && data) {
        return data as Game;
      }
    } catch (err) {
      console.warn("Supabase fetch game warning:", err);
    }
  }
  return BLOOD_STRIKE_GAME;
}

export async function fetchBloodStrikeProducts(): Promise<Product[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("sort_order", { ascending: true });

      if (!error && data && data.length > 0) {
        return data as Product[];
      }
      if (error) {
        console.warn("Supabase fetch products error:", error.message);
      }
    } catch (err) {
      console.warn("Supabase fetch products catch:", err);
    }
  }
  return BLOOD_STRIKE_PRODUCTS;
}

export async function createOrder(order: OrderRecord): Promise<{ success: boolean; orderCode?: string }> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .insert([order])
        .select("order_code")
        .single();

      if (!error && data) {
        return { success: true, orderCode: data.order_code };
      }
      if (error) {
        console.warn("Supabase insert order error:", error.message);
      }
    } catch (err) {
      console.warn("Supabase insert order catch:", err);
    }
  }
  return { success: true };
}
