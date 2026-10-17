"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  CheckCircle2,
  Coins,
  Copy,
  CreditCard,
  Crown,
  Database,
  Flame,
  HelpCircle,
  Loader2,
  MessageCircle,
  ShieldCheck,
  User,
  Zap,
} from "lucide-react";
import {
  Game,
  Product,
  WHATSAPP_FORMATTED,
  WHATSAPP_PHONE_NUMBER,
  createOrder,
  generateWhatsAppOrderUrl,
} from "@/lib/supabase";

interface BloodStrikeClientProps {
  initialGame: Game;
  initialProducts: Product[];
}

export function BloodStrikeClient({
  initialGame,
  initialProducts,
}: BloodStrikeClientProps) {
  const [game] = useState<Game>(initialGame);
  const [products] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<"all" | "gold" | "battle_pass">("all");
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    initialProducts.find((p) => p.name === "جولد 320") || initialProducts[0]
  );
  const [playerId, setPlayerId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [showIdGuide, setShowIdGuide] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  const filteredProducts = products.filter((p) => {
    if (selectedCategory === "all") return true;
    return p.category === selectedCategory;
  });

  const goldList = products.filter((p) => p.category === "gold");
  const bpList = products.filter((p) => p.category === "battle_pass");

  const handleCopySupportNumber = () => {
    navigator.clipboard.writeText(`+${WHATSAPP_PHONE_NUMBER}`);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleWhatsAppCheckout = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSubmittingOrder(true);

    let orderCode: string | undefined = undefined;

    try {
      const orderRes = await createOrder({
        game_id: game.id,
        product_id: selectedProduct.id,
        player_id: playerId.trim() || "غير محدد",
        player_name: playerName.trim() || undefined,
        total_amount: selectedProduct.price,
        currency: selectedProduct.currency || "EGP",
        payment_method: "whatsapp",
        status: "pending",
        notes: `طلب شحن عبر واتساب: ${selectedProduct.name}`,
      });

      if (orderRes.orderCode) {
        orderCode = orderRes.orderCode;
      }
    } catch (err) {
      console.warn("Could not record order:", err);
    } finally {
      setIsSubmittingOrder(false);
      const url = generateWhatsAppOrderUrl({
        productName: selectedProduct.name,
        price: selectedProduct.price,
        currency: selectedProduct.currency,
        playerId: playerId,
        playerName: playerName,
        orderCode: orderCode,
      });

      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <main id="main" className="min-h-screen bg-background text-white pb-20 pt-6 sm:pt-10">
      {/* Background Ambient Glow: hidden on mobile to eliminate composite rasterization overhead */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="hidden sm:block absolute -top-32 right-1/4 h-[450px] w-[450px] rounded-full bg-accent-purple/[0.10] blur-[120px]" />
        <div className="hidden sm:block absolute top-1/3 -left-32 h-[400px] w-[400px] rounded-full bg-accent-cyan/[0.06] blur-[110px]" />
      </div>

      <div className="container-page">
        {/* Breadcrumb Navigation & Server-Sync Badge */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <nav aria-label="مسار التنقل" className="flex items-center gap-2 text-xs text-white/50">
            <Link href="/" className="hover:text-white transition-colors">
              الرئيسية
            </Link>
            <span>/</span>
            <Link href="/#games" className="hover:text-white transition-colors">
              الألعاب
            </Link>
            <span>/</span>
            <span className="text-white font-medium">Blood Strike (MENA)</span>
          </nav>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              <Database size={13} className="text-emerald-400" />
              <span>مباشر من الخادم (SSR)</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
          </div>
        </div>

        {/* Game Header Banner (Solid background on mobile, no heavy backdrop-blur) */}
        <section className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-[#111728] md:bg-gradient-to-b md:from-[#182035] md:via-surface md:to-[#0c101c] p-6 sm:p-8 lg:p-10 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/15 px-3 py-1 text-xs font-bold text-red-400">
                  <Flame size={13} />
                  شحن فوري بالـ ID
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 size={13} />
                  {game.region || "سيرفر الشرق الأوسط (MENA)"}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/60">
                  العملة: الجنيه المصري EGP
                </span>
              </div>

              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                شحن لعبة {game.name}
              </h1>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/65">
                {game.description}
              </p>

              {/* Key Trust Highlights */}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-white/70">
                <div className="flex items-center gap-1.5">
                  <Zap size={15} className="text-amber-400" />
                  <span>تنفيذ الطلب: 1 - 5 دقائق</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={15} className="text-emerald-400" />
                  <span>بدون الحاجة لكلمة المرور (ID فقط)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CreditCard size={15} className="text-accent-cyan" />
                  <span>فودافون كاش - إنستاباي - محافظ إلكترونية</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-5 text-right lg:w-72 shrink-0">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <MessageCircle size={16} />
                <span>دعم مباشر عبر واتساب</span>
              </div>
              <p className="mt-1.5 text-xs text-white/60">
                هل تحتاج استفسار قبل الدفع؟ تواصل معنا مباشرة
              </p>
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-white tracking-wider" dir="ltr">
                  {WHATSAPP_FORMATTED}
                </span>
                <button
                  type="button"
                  onClick={handleCopySupportNumber}
                  className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                  title="نسخ الرقم"
                >
                  {copiedId ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Top-up Form Grid */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12 items-start" id="pricing">
          {/* Step 1 & Step 2 Column */}
          <div className="space-y-8 lg:col-span-8">
            {/* STEP 1: PLAYER ID INPUT */}
            <div className="rounded-3xl border border-white/[0.08] bg-surface p-6 sm:p-7 shadow-lg">
              <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-accent-purple/20 text-accent-purple font-black text-sm">
                    1
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-white">
                      أدخل معرّف الحساب (User ID)
                    </h2>
                    <p className="text-xs text-white/40">
                      مطلوب لتحويل الرصيد مباشرة إلى حسابك في اللعبة
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowIdGuide((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-cyan hover:underline"
                >
                  <HelpCircle size={14} />
                  <span>أين أجد الآيدي؟</span>
                </button>
              </div>

              {showIdGuide && (
                <div className="mt-4 rounded-2xl border border-accent-cyan/20 bg-accent-cyan/5 p-4 text-xs text-white/80">
                  <p className="font-semibold text-accent-cyan mb-1.5">
                    كيفية الحصول على معرف اللاعب (Player ID) في Blood Strike:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-white/70 pr-1">
                    <li>افتح لعبة Blood Strike على هاتفك أو الكمبيوتر.</li>
                    <li>اضغط على الصورة الرمزية (Avatar) أعلى يسار الشاشة الرئيسية.</li>
                    <li>ستجد بجوار اسمك رمز <strong>User ID</strong> مكون من أرقام.</li>
                    <li>اضغط على زر النسخ والصقه في الحقل أدناه.</li>
                  </ol>
                </div>
              )}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="playerId" className="block text-xs font-semibold text-white/80 mb-2">
                    معرف اللاعب (Player ID) <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="playerId"
                      type="text"
                      placeholder="مثال: 1234567890"
                      value={playerId}
                      onChange={(e) => setPlayerId(e.target.value)}
                      className="w-full h-12 rounded-xl border border-white/10 bg-[#0c101c] px-4 text-sm font-mono text-white placeholder-white/25 focus:border-accent-purple focus:outline-none focus:ring-1 focus:ring-accent-purple transition-colors"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">
                      <User size={16} />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="playerName" className="block text-xs font-semibold text-white/80 mb-2">
                    اسم اللاعب في اللعبة (اختياري للتأكيد)
                  </label>
                  <input
                    id="playerName"
                    type="text"
                    placeholder="مثال: BLACK_HUNTER"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="w-full h-12 rounded-xl border border-white/10 bg-[#0c101c] px-4 text-sm text-white placeholder-white/25 focus:border-accent-purple focus:outline-none focus:ring-1 focus:ring-accent-purple transition-colors"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-[11px] text-white/45">
                <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
                <span>لا نطلب أبداً كلمة المرور أو تسجيل الدخول. الشحن رسمي ومضمون 100%.</span>
              </div>
            </div>

            {/* STEP 2: SELECT PACKAGE */}
            <div className="rounded-3xl border border-white/[0.08] bg-surface p-6 sm:p-7 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-accent-purple/20 text-accent-purple font-black text-sm">
                    2
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-white">
                      اختر الباقة المطلوبة
                    </h2>
                    <p className="text-xs text-white/40">
                      الأسعار بالجنيه المصري شاملة التسليم اللحظي
                    </p>
                  </div>
                </div>

                {/* Category Filter Tabs */}
                <div className="flex items-center rounded-xl border border-white/10 bg-[#0c101c] p-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("all")}
                    className={`rounded-lg px-3 py-1.5 font-medium transition-colors ${
                      selectedCategory === "all"
                        ? "bg-accent-purple text-white shadow-sm"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    الكل ({products.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("gold")}
                    className={`rounded-lg px-3 py-1.5 font-medium transition-colors ${
                      selectedCategory === "gold"
                        ? "bg-accent-purple text-white shadow-sm"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    الجولد ({goldList.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("battle_pass")}
                    className={`rounded-lg px-3 py-1.5 font-medium transition-colors ${
                      selectedCategory === "battle_pass"
                        ? "bg-accent-purple text-white shadow-sm"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    الباتل باس ({bpList.length})
                  </button>
                </div>
              </div>

              {/* Products Grid with pure Tailwind transitions */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredProducts.map((product) => {
                  const isSelected = selectedProduct.id === product.id;
                  const isBP = product.category === "battle_pass";

                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      className={`group relative flex flex-col justify-between rounded-2xl border p-4 text-right transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "border-accent-purple bg-[#1a1730] md:bg-gradient-to-b md:from-accent-purple/[0.18] md:to-accent-purple/[0.04] ring-2 ring-accent-purple/50 shadow-md scale-[1.01]"
                          : "border-white/[0.08] bg-[#0c101c] hover:border-white/20 hover:scale-[1.01]"
                      }`}
                    >
                      {/* Top Badges */}
                      <div className="flex items-center justify-between w-full mb-3">
                        <span
                          className={`grid h-9 w-9 place-items-center rounded-xl transition-colors ${
                            isBP
                              ? "bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/25"
                              : "bg-amber-400/15 text-amber-400 border border-amber-400/25"
                          }`}
                        >
                          {isBP ? <Crown size={18} /> : <Coins size={18} />}
                        </span>

                        {product.badge && (
                          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-white/90 border border-white/15">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      {/* Package Info */}
                      <div>
                        <div className="text-base font-bold text-white group-hover:text-accent-purple transition-colors">
                          {product.name}
                        </div>
                        <div className="mt-1 text-xs text-white/45">
                          {isBP ? "تفعيل اشتراك فوري للموسم" : "شحن مباشر عبر الآيدي"}
                        </div>
                      </div>

                      {/* Price & Selection indicator */}
                      <div className="mt-5 flex items-end justify-between border-t border-white/[0.06] pt-3">
                        <div>
                          <span className="text-xs text-white/40 block">السعر</span>
                          <span className="text-lg font-black text-emerald-400">
                            {product.price}
                            <span className="text-xs font-semibold text-white/50 mr-1">
                              {product.currency === "EGP" ? "جنيه" : product.currency}
                            </span>
                          </span>
                        </div>

                        <div
                          className={`grid h-6 w-6 place-items-center rounded-full border transition-all duration-150 ${
                            isSelected
                              ? "border-accent-purple bg-accent-purple text-white scale-110"
                              : "border-white/20 text-transparent"
                          }`}
                        >
                          <Check size={13} strokeWidth={3} />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Step 3: Order Summary & WhatsApp Action */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="rounded-3xl border border-white/[0.12] bg-[#0d121f] p-6 sm:p-7 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-accent-purple/20 text-accent-purple font-black text-sm">
                  3
                </span>
                <div>
                  <h2 className="text-base font-bold text-white">ملخص الطلب</h2>
                  <p className="text-xs text-white/40">تأكيد التفاصيل والدفع عبر واتساب</p>
                </div>
              </div>

              <div className="mt-5 space-y-3.5 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-white/[0.05]">
                  <span className="text-white/50">اللعبة:</span>
                  <span className="font-bold text-white">{game.name}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-white/[0.05]">
                  <span className="text-white/50">الباقة المختارة:</span>
                  <span className="font-bold text-accent-purple text-sm">
                    {selectedProduct.name}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-white/[0.05]">
                  <span className="text-white/50">الآيدي (Player ID):</span>
                  <span
                    className={`font-mono font-bold ${
                      playerId.trim() ? "text-white" : "text-amber-400"
                    }`}
                  >
                    {playerId.trim() ? playerId.trim() : "لم يتم الإدخال بعد"}
                  </span>
                </div>

                {playerName.trim() && (
                  <div className="flex items-center justify-between py-1 border-b border-white/[0.05]">
                    <span className="text-white/50">اسم الحساب:</span>
                    <span className="font-medium text-white">{playerName.trim()}</span>
                  </div>
                )}

                <div className="flex items-center justify-between py-1 border-b border-white/[0.05]">
                  <span className="text-white/50">سرعة التنفيذ:</span>
                  <span className="font-semibold text-emerald-400">فوري (1 - 5 دقائق)</span>
                </div>

                {/* Total Price Callout */}
                <div className="mt-4 rounded-2xl border border-white/[0.08] bg-[#080c14] p-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-semibold text-white/70">المبلغ الإجمالي:</span>
                    <div className="text-left">
                      <span className="text-2xl font-black text-emerald-400">
                        {selectedProduct.price}
                      </span>
                      <span className="text-xs font-semibold text-white/60 mr-1.5">
                        جنيه مصري (EGP)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary CTA: Open WhatsApp with Order */}
              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  disabled={isSubmittingOrder}
                  className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-l from-[#25D366] to-[#128C7E] px-6 text-sm font-black text-white shadow-lg shadow-emerald-950/40 transition-transform duration-150 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-75 cursor-pointer"
                >
                  {isSubmittingOrder ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <MessageCircle size={20} className="shrink-0" />
                  )}
                  <span>{isSubmittingOrder ? "جاري تحضير الطلب..." : "اشحن الآن عبر واتساب"}</span>
                </button>

                <p className="text-center text-[11px] text-white/40 leading-relaxed">
                  بالضغط على الزر سيتم فتح محادثة واتساب جاهزة بكافة تفاصيل طلبك مع فريق خدمة العملاء على الرقم:
                  <br />
                  <span className="font-mono text-white/70" dir="ltr">
                    {WHATSAPP_FORMATTED}
                  </span>
                </p>
              </div>

              {/* Accepted Payment Methods in Egypt */}
              <div className="mt-6 border-t border-white/[0.08] pt-5">
                <span className="block text-[11px] font-semibold text-white/50 mb-3">
                  طرق الدفع المدعومة في مصر:
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2 text-white/75">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    <span>فودافون كاش</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2 text-white/75">
                    <span className="h-2 w-2 rounded-full bg-purple-500" />
                    <span>إنستاباي InstaPay</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2 text-white/75">
                    <span className="h-2 w-2 rounded-full bg-orange-500" />
                    <span>أورنج / اتصالات كاش</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2 text-white/75">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span>محافظ وي باي WE Pay</span>
                  </div>
                </div>
              </div>

              {/* Guarantee Banner */}
              <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <ShieldCheck size={15} />
                  <span>ضمان استرجاع المبلغ في حال تعذر الشحن</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
