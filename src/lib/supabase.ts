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
  payment_method: string;
  transaction_id?: string;
  receipt_url?: string;
  status?: "pending" | "pending_verification" | "processing" | "completed" | "cancelled" | string;
  notes?: string;
};

export type PaymentMethod = {
  id: string;
  name: string;
  nameEn: string;
  provider: string;
  walletNumber: string;
  accountName?: string;
  instructions: string;
  officialAppUrl: string;
  badgeColor: string;
  accentBg: string;
  borderColor: string;
  logoText: string;
};

// Supported Egyptian Fiat Payment Methods (No crypto)
export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "vodafone_cash",
    name: "فودافون كاش",
    nameEn: "Vodafone Cash",
    provider: "Vodafone Egypt",
    walletNumber: "01554893945",
    accountName: "BLACK GAMING",
    instructions: "قم بالتحويل عبر كود *9*7*الرقم*المبلغ# أو عبر تطبيق Ana Vodafone",
    officialAppUrl: "https://web.vodafone.com.eg/ar/vodafone-cash",
    badgeColor: "text-red-400 border-red-500/30 bg-red-500/10",
    accentBg: "bg-red-500",
    borderColor: "border-red-500/40 hover:border-red-500",
    logoText: "VF",
  },
  {
    id: "instapay",
    name: "إنستاباي (InstaPay)",
    nameEn: "InstaPay",
    provider: "Egyptian Banks Network (EBC)",
    walletNumber: "01554893945@instapay",
    accountName: "BLACK GAMING",
    instructions: "افتح تطبيق InstaPay وقم بإرسال المبلغ إلى عنوان الدفع (IPA) أو رقم الهاتف أعلاه",
    officialAppUrl: "https://www.instapay.eg/",
    badgeColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    accentBg: "bg-purple-600",
    borderColor: "border-purple-500/40 hover:border-purple-500",
    logoText: "IP",
  },
  {
    id: "etisalat_cash",
    name: "اتصالات كاش",
    nameEn: "Etisalat Cash",
    provider: "e& Egypt (Etisalat)",
    walletNumber: "01554893945",
    accountName: "BLACK GAMING",
    instructions: "قم بالتحويل عبر كود *777# أو من خلال تطبيق My Etisalat",
    officialAppUrl: "https://www.etisalat.eg/",
    badgeColor: "text-lime-400 border-lime-500/30 bg-lime-500/10",
    accentBg: "bg-lime-600",
    borderColor: "border-lime-500/40 hover:border-lime-500",
    logoText: "ET",
  },
  {
    id: "orange_cash",
    name: "أورنج كاش",
    nameEn: "Orange Cash",
    provider: "Orange Egypt",
    walletNumber: "01554893945",
    accountName: "BLACK GAMING",
    instructions: "قم بالتحويل عبر كود #115# أو من خلال تطبيق Orange Cash",
    officialAppUrl: "https://www.orange.eg/ar/orange-cash",
    badgeColor: "text-orange-400 border-orange-500/30 bg-orange-500/10",
    accentBg: "bg-orange-500",
    borderColor: "border-orange-500/40 hover:border-orange-500",
    logoText: "OR",
  },
  {
    id: "we_pay",
    name: "وي باي (WE Pay)",
    nameEn: "WE Pay",
    provider: "Telecom Egypt (WE)",
    walletNumber: "01554893945",
    accountName: "BLACK GAMING",
    instructions: "قم بالتحويل من محفظتك عبر تطبيق WE Pay إلى رقم المحفظة أعلاه",
    officialAppUrl: "https://te.eg/wps/portal/te/Personal/Personal-Services/WePay",
    badgeColor: "text-violet-400 border-violet-500/30 bg-violet-500/10",
    accentBg: "bg-violet-700",
    borderColor: "border-violet-500/40 hover:border-violet-500",
    logoText: "WE",
  },
];

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
  paymentMethod?: string;
  transactionId?: string;
  receiptUrl?: string;
}) {
  const currencyStr = params.currency === "EGP" ? "جنيه مصري" : (params.currency || "جنيه مصري");
  const idText = params.playerId.trim() ? params.playerId.trim() : "غير محدد بعد";
  const nameText = params.playerName?.trim() ? `\n👤 اسم الحساب: ${params.playerName.trim()}` : "";
  const codeText = params.orderCode ? `\n🔖 كود الطلب: ${params.orderCode}` : "";
  const methodText = params.paymentMethod ? `\n💳 طريقة الدفع: ${params.paymentMethod}` : "";
  const txText = params.transactionId ? `\n🔢 رقم العملية المرجعي: ${params.transactionId}` : "";
  const receiptText = params.receiptUrl ? `\n📸 رابط إثبات التحويل: ${params.receiptUrl}` : "";

  const text = `مرحباً BLACK GAMING 👋
تم إرسال طلب شحن وإثبات الدفع للعبة: Blood Strike (MENA)
${codeText}
📦 الباقة: ${params.productName}
💰 المبلغ: ${params.price} ${currencyStr}
🎯 معرف اللاعب (Player ID): ${idText}${nameText}${methodText}${txText}${receiptText}

أرجو مراجعة الإثبات وتأكيد الشحن إلى حسابي فوراً 🙏`;

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

/**
 * Upload receipt image to Supabase Storage in 'receipts' bucket
 */
export async function uploadReceiptImage(file: File): Promise<{ url: string | null; error: string | null }> {
  if (!supabase) {
    return { url: null, error: "قاعدة البيانات غير متصلة، يرجى المحاولة لاحقاً" };
  }

  try {
    const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `receipts/${cleanFileName}`;

    const mimeMap: Record<string, string> = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      webp: "image/webp",
    };
    const contentType = file.type || mimeMap[fileExt] || "image/jpeg";

    const { error: uploadError } = await supabase.storage
      .from("receipts")
      .upload(filePath, file, {
        contentType,
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return { url: null, error: uploadError.message };
    }

    const { data: publicData } = supabase.storage
      .from("receipts")
      .getPublicUrl(filePath);

    return { url: publicData.publicUrl, error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "فشل في رفع صورة الإيصال";
    return { url: null, error: message };
  }
}

/**
 * Insert new order record in 'orders' table
 */
export async function createOrder(
  order: OrderRecord
): Promise<{ success: boolean; orderCode?: string; orderId?: string; error?: string }> {
  // Generate fallback client-side order code in case DB is offline
  const fallbackCode = `BG-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .insert([
          {
            game_id: order.game_id,
            product_id: order.product_id,
            player_id: order.player_id,
            player_name: order.player_name || null,
            total_amount: order.total_amount,
            currency: order.currency || "EGP",
            payment_method: order.payment_method,
            transaction_id: order.transaction_id || null,
            receipt_url: order.receipt_url || null,
            status: order.status || "pending_verification",
            notes: order.notes || null,
          },
        ])
        .select("id, order_code")
        .single();

      if (!error && data) {
        return { success: true, orderCode: data.order_code, orderId: data.id };
      }
      if (error) {
        console.warn("Supabase insert order error:", error.message);
        return { success: true, orderCode: fallbackCode, error: error.message };
      }
    } catch (err: unknown) {
      console.warn("Supabase insert order catch:", err);
    }
  }
  return { success: true, orderCode: fallbackCode };
}

export type PlatformStats = {
  activeGamesCount: number;
  completedOrdersCount: number;
};

/**
 * Fetch honest real-time statistics from Supabase database
 */
export async function fetchPlatformStats(): Promise<PlatformStats> {
  let activeGamesCount = 1;
  let completedOrdersCount = 0;

  if (supabase) {
    try {
      const [gamesRes, ordersRes] = await Promise.all([
        supabase
          .from("games")
          .select("*", { count: "exact", head: true })
          .eq("is_active", true),
        supabase
          .from("orders")
          .select("*", { count: "exact", head: true })
          .eq("status", "completed"),
      ]);

      if (gamesRes.count !== null && gamesRes.count !== undefined) {
        activeGamesCount = gamesRes.count;
      }
      if (ordersRes.count !== null && ordersRes.count !== undefined) {
        completedOrdersCount = ordersRes.count;
      }
    } catch (err: unknown) {
      console.warn("fetchPlatformStats error:", err);
    }
  }

  return { activeGamesCount, completedOrdersCount };
}
