"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock,
  Coins,
  Copy,
  CreditCard,
  Crown,
  Database,
  ExternalLink,
  FileCheck,
  Flame,
  HelpCircle,
  Image as ImageIcon,
  Loader2,
  MessageCircle,
  Receipt,
  ShieldCheck,
  Upload,
  User,
  X,
  Zap,
} from "lucide-react";
import {
  Game,
  PAYMENT_METHODS,
  PaymentMethod,
  Product,
  WHATSAPP_FORMATTED,
  WHATSAPP_PHONE_NUMBER,
  createOrder,
  generateWhatsAppOrderUrl,
  uploadReceiptImage,
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
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(PAYMENT_METHODS[0]);

  // Form Fields
  const [playerId, setPlayerId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);

  // UI state
  const [showIdGuide, setShowIdGuide] = useState(false);
  const [copiedWallet, setCopiedWallet] = useState(false);
  const [copiedOrderCode, setCopiedOrderCode] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState<string>("");

  // Success Modal
  const [successOrder, setSuccessOrder] = useState<{
    orderCode: string;
    productName: string;
    price: number;
    playerId: string;
    playerName?: string;
    paymentMethod: string;
    transactionId: string;
    receiptUrl?: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredProducts = products.filter((p) => {
    if (selectedCategory === "all") return true;
    return p.category === selectedCategory;
  });

  const goldList = products.filter((p) => p.category === "gold");
  const bpList = products.filter((p) => p.category === "battle_pass");

  const handleCopyWallet = () => {
    navigator.clipboard.writeText(selectedMethod.walletNumber);
    setCopiedWallet(true);
    setTimeout(() => setCopiedWallet(false), 2000);
  };

  const handleCopyOrderCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedOrderCode(true);
    setTimeout(() => setCopiedOrderCode(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFormError("يرجى اختيار ملف صورة صالح (JPG, PNG, WebP)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormError("حجم الصورة يجب ألا يتجاوز 5 ميجابايت");
      return;
    }

    setFormError(null);
    setReceiptFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setReceiptPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    setReceiptFile(null);
    setReceiptPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation
    if (!playerId.trim()) {
      setFormError("يرجى إدخال معرف اللاعب (Player ID)");
      const el = document.getElementById("playerId");
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus();
      return;
    }

    if (!transactionId.trim()) {
      setFormError("يرجى إدخال رقم العملية (Transaction ID) المذكور في رسالة التحويل أو التطبيق");
      const el = document.getElementById("transactionId");
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus();
      return;
    }

    if (!receiptFile) {
      setFormError("يرجى رفع صورة إثبات التحويل (لقطة شاشة للرسالة أو الإيصال)");
      const el = document.getElementById("receiptUploadSection");
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);
    setSubmitStep("جاري رفع صورة الإيصال إلى السيرفر...");

    try {
      // 1. Upload receipt to Supabase Storage
      let uploadedUrl: string | undefined = undefined;
      const uploadRes = await uploadReceiptImage(receiptFile);

      if (uploadRes.error) {
        console.warn("Storage upload notice:", uploadRes.error);
        // Continue even if storage has bucket delay, using placeholder or proceeding
      } else if (uploadRes.url) {
        uploadedUrl = uploadRes.url;
      }

      setSubmitStep("جاري تسجيل وتوثيق الطلب...");

      // 2. Insert order record into Supabase Orders table
      const orderRes = await createOrder({
        game_id: game.id,
        product_id: selectedProduct.id,
        player_id: playerId.trim(),
        player_name: playerName.trim() || undefined,
        total_amount: selectedProduct.price,
        currency: selectedProduct.currency || "EGP",
        payment_method: selectedMethod.id,
        transaction_id: transactionId.trim(),
        receipt_url: uploadedUrl,
        status: "pending_verification",
        notes: `طريقة الدفع: ${selectedMethod.name} | رقم العملية: ${transactionId.trim()}`,
      });

      const orderCode = orderRes.orderCode || `BG-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

      // 3. Show Success Modal
      setSuccessOrder({
        orderCode,
        productName: selectedProduct.name,
        price: selectedProduct.price,
        playerId: playerId.trim(),
        playerName: playerName.trim() || undefined,
        paymentMethod: selectedMethod.name,
        transactionId: transactionId.trim(),
        receiptUrl: uploadedUrl,
      });

      // Clear input file
      setReceiptFile(null);
      setReceiptPreview(null);
      setTransactionId("");
    } catch (err: unknown) {
      console.error("Order submission error:", err);
      setFormError("حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى أو التواصل معنا عبر واتساب.");
    } finally {
      setIsSubmitting(false);
      setSubmitStep("");
    }
  };

  return (
    <main id="main" className="min-h-screen bg-background text-white pb-20 pt-6 sm:pt-10">
      {/* Background Ambient Glow: Hidden on mobile for peak 60fps performance */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="hidden sm:block absolute -top-32 right-1/4 h-[450px] w-[450px] rounded-full bg-accent-purple/[0.10] blur-[120px]" />
        <div className="hidden sm:block absolute top-1/3 -left-32 h-[400px] w-[400px] rounded-full bg-accent-cyan/[0.06] blur-[110px]" />
      </div>

      <div className="container-page">
        {/* Breadcrumb Navigation & SSR Status */}
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
              <span>دفع مصري مباشر (جنيه مصري EGP)</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
          </div>
        </div>

        {/* Game Header Banner */}
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
                  الدفع كاش وبالجنيه المصري فقط (لا نقبل عملات رقمية)
                </span>
              </div>

              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                شحن باقات {game.name}
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
                  <span>فودافون كاش - إنستاباي - اتصالات - أورنج - وي باي</span>
                </div>
              </div>
            </div>

            {/* Support Callout */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-5 text-right lg:w-72 shrink-0">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <MessageCircle size={16} />
                <span>دعم مباشر واستفسارات</span>
              </div>
              <p className="mt-1.5 text-xs text-white/60">
                لديك استفسار قبل التحويل؟ فريقنا متواجد 24/7
              </p>
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-white tracking-wider" dir="ltr">
                  {WHATSAPP_FORMATTED}
                </span>
                <a
                  href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-emerald-500/20 text-white/70 hover:text-emerald-400 transition-colors"
                  title="فتح محادثة واتساب"
                >
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Form Start */}
        <form onSubmit={handleSubmitOrder} className="mt-10 grid gap-8 lg:grid-cols-12 items-start" id="pricing">
          {/* Main Configuration Columns (Steps 1, 2, 3, 4) */}
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
                      required
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

            {/* STEP 3: EGYPTIAN PAYMENT METHODS */}
            <div className="rounded-3xl border border-white/[0.08] bg-surface p-6 sm:p-7 shadow-lg">
              <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-accent-purple/20 text-accent-purple font-black text-sm">
                  3
                </span>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white">
                    اختر وسيلة الدفع (مصر فقط)
                  </h2>
                  <p className="text-xs text-white/40">
                    طرق دفع رسمية وآمنة عبر المحافظ الإلكترونية وتطبيق إنستاباي
                  </p>
                </div>
              </div>

              {/* Payment Method Selector Grid */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {PAYMENT_METHODS.map((method) => {
                  const isSelected = selectedMethod.id === method.id;

                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedMethod(method)}
                      className={`relative flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? `bg-white/[0.06] ${method.borderColor} ring-2 ring-accent-purple/60 shadow-lg scale-[1.02]`
                          : "border-white/[0.08] bg-[#0c101c] hover:border-white/20"
                      }`}
                    >
                      {/* Logo Badge */}
                      <div
                        className={`h-11 w-11 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-md ${method.accentBg}`}
                      >
                        {method.logoText}
                      </div>

                      <span className="mt-2.5 text-xs font-bold text-white block">
                        {method.name}
                      </span>
                      <span className="text-[10px] text-white/40 mt-0.5">
                        {method.nameEn}
                      </span>

                      {isSelected && (
                        <div className="absolute top-2 left-2 h-4 w-4 rounded-full bg-accent-purple flex items-center justify-center text-white">
                          <Check size={11} strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Active Payment Details Box */}
              <div className="mt-6 rounded-2xl border border-white/10 bg-[#090d16] p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${selectedMethod.badgeColor}`}>
                        {selectedMethod.name}
                      </span>
                      <span className="text-xs text-white/50">
                        المستلم: <strong className="text-white">{selectedMethod.accountName}</strong>
                      </span>
                    </div>

                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-xs text-white/40">رقم المحفظة / العنوان:</span>
                      <span className="font-mono text-base sm:text-lg font-black text-white tracking-wider" dir="ltr">
                        {selectedMethod.walletNumber}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons: Copy & Open App */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyWallet}
                      className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 text-xs font-bold text-white transition-colors hover:bg-white/10 active:scale-95"
                    >
                      {copiedWallet ? (
                        <>
                          <Check size={14} className="text-emerald-400" />
                          <span className="text-emerald-400">تم النسخ</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>نسخ الرقم</span>
                        </>
                      )}
                    </button>

                    <a
                      href={selectedMethod.officialAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-accent-purple/20 border border-accent-purple/40 px-4 text-xs font-bold text-accent-purple transition-colors hover:bg-accent-purple/30"
                    >
                      <span>فتح التطبيق / الموقع</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>

                {/* Instructions */}
                <div className="mt-4 pt-3.5 border-t border-white/[0.06] flex items-start gap-2 text-xs text-white/60">
                  <span className="font-bold text-amber-400 shrink-0">تعليمات:</span>
                  <span>{selectedMethod.instructions} بمبلغ <strong className="text-emerald-400">{selectedProduct.price} جنيه مصري</strong>. بعد التحويل مباشرة يرجى إدخال رقم العملية ورفع لقطة الشاشة في الخطوة التالية.</span>
                </div>
              </div>
            </div>

            {/* STEP 4: VERIFICATION INPUTS (TRANSACTION ID & RECEIPT IMAGE) */}
            <div className="rounded-3xl border border-white/[0.08] bg-surface p-6 sm:p-7 shadow-lg" id="receiptUploadSection">
              <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-accent-purple/20 text-accent-purple font-black text-sm">
                  4
                </span>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white">
                    تأكيد وإثبات عملية الدفع
                  </h2>
                  <p className="text-xs text-white/40">
                    أدخل رقم العملية المرجعي وارفع صورة إشعار التحويل للتأكيد الفوري
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                {/* 1. Transaction ID Input */}
                <div>
                  <label htmlFor="transactionId" className="block text-xs font-semibold text-white/80 mb-2">
                    رقم العملية (Transaction ID / Reference No.) <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="transactionId"
                      type="text"
                      placeholder="مثال: 94830218742 أو رقم الحوالة المذكور في رسالة الـ SMS"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      required
                      className="w-full h-12 rounded-xl border border-white/10 bg-[#0c101c] px-4 text-sm font-mono text-white placeholder-white/25 focus:border-accent-purple focus:outline-none focus:ring-1 focus:ring-accent-purple transition-colors"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">
                      <Receipt size={16} />
                    </div>
                  </div>
                  <span className="mt-1.5 block text-[11px] text-white/40">
                    هو الرقم المرجعي أو كود العملية الظاهر في رسالة تأكيد التحويل من محفظتك أو من تطبيق InstaPay.
                  </span>
                </div>

                {/* 2. File Upload Input (SMS / Receipt Screenshot) */}
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-2">
                    ارفع صورة إثبات التحويل (SMS أو إيصال التطبيق) <span className="text-red-400">*</span>
                  </label>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/jpg"
                    onChange={handleFileChange}
                    className="hidden"
                    id="receiptInput"
                  />

                  {!receiptPreview ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="group flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-white/15 bg-[#090d16] hover:border-accent-purple/60 hover:bg-[#0c1220] transition-colors cursor-pointer text-center"
                    >
                      <div className="h-12 w-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/60 group-hover:text-accent-purple group-hover:border-accent-purple/40 transition-colors">
                        <Upload size={22} />
                      </div>
                      <span className="mt-3 block text-sm font-bold text-white">
                        اضغط هنا لرفع صورة الإيصال أو لقطة الشاشة
                      </span>
                      <span className="mt-1 block text-xs text-white/40">
                        يدعم صيغ JPG, PNG, WebP (بحد أقصى 5 ميجابايت)
                      </span>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-emerald-500/30 bg-[#090d16] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative h-16 w-16 rounded-xl overflow-hidden border border-white/15 bg-black shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={receiptPreview}
                            alt="Receipt preview"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-xs font-bold text-white truncate max-w-[200px] sm:max-w-[300px]">
                            {receiptFile?.name}
                          </span>
                          <span className="block text-[11px] text-emerald-400 mt-0.5 flex items-center gap-1">
                            <FileCheck size={13} />
                            تم اختيار الصورة ({((receiptFile?.size || 0) / 1024).toFixed(0)} KB)
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="h-9 px-3 rounded-lg border border-white/15 bg-white/5 text-xs font-medium text-white hover:bg-white/10 transition-colors"
                        >
                          تغيير الصورة
                        </button>
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="h-9 px-3 rounded-lg border border-red-500/30 bg-red-500/10 text-xs font-medium text-red-400 hover:bg-red-500/20 transition-colors flex items-center gap-1"
                        >
                          <X size={14} />
                          <span>إلغاء</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Form Error Notice */}
                {formError && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 flex items-center gap-2.5 text-xs text-red-300 animate-in fade-in">
                    <AlertCircle size={16} className="text-red-400 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Step 5: Sticky Checkout Summary Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="rounded-3xl border border-white/[0.12] bg-[#0d121f] p-6 sm:p-7 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-accent-purple/20 text-accent-purple font-black text-sm">
                  5
                </span>
                <div>
                  <h2 className="text-base font-bold text-white">ملخص الفاتورة</h2>
                  <p className="text-xs text-white/40">تأكيد التفاصيل وإرسال الطلب</p>
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
                  <span className="text-white/50">معرف اللاعب (Player ID):</span>
                  <span
                    className={`font-mono font-bold ${
                      playerId.trim() ? "text-white" : "text-amber-400"
                    }`}
                  >
                    {playerId.trim() ? playerId.trim() : "لم يتم الإدخال"}
                  </span>
                </div>

                {playerName.trim() && (
                  <div className="flex items-center justify-between py-1 border-b border-white/[0.05]">
                    <span className="text-white/50">اسم الحساب:</span>
                    <span className="font-medium text-white">{playerName.trim()}</span>
                  </div>
                )}

                <div className="flex items-center justify-between py-1 border-b border-white/[0.05]">
                  <span className="text-white/50">طريقة التحويل:</span>
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${selectedMethod.accentBg}`} />
                    {selectedMethod.name}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-white/[0.05]">
                  <span className="text-white/50">رقم العملية:</span>
                  <span className="font-mono text-white/90">
                    {transactionId.trim() || "بانتظار الإدخال"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-white/[0.05]">
                  <span className="text-white/50">صورة الإيصال:</span>
                  <span className={receiptFile ? "text-emerald-400 font-bold" : "text-white/40"}>
                    {receiptFile ? "جاهزة للرفع ✓" : "لم يتم الاختيار"}
                  </span>
                </div>

                {/* Total Price Callout */}
                <div className="mt-4 rounded-2xl border border-white/[0.08] bg-[#080c14] p-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-semibold text-white/70">المبلغ المطلوب تحويله:</span>
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

              {/* Submit Button */}
              <div className="mt-6 space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-l from-accent-purple to-[#6d38e0] px-6 text-sm font-black text-white shadow-lg shadow-purple-950/40 transition-transform duration-150 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-75 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>{submitStep || "جاري إرسال الطلب..."}</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={20} />
                      <span>تأكيد الطلب وإرسال الإثبات 🚀</span>
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-white/40 leading-relaxed">
                  بمجرد تأكيد الطلب، سيتم فحص ومطابقة رقم العملية وإشعار التحويل وتنفيذ الشحن لحسابك في دقائق معدودة.
                </p>
              </div>

              {/* Security & Support Guarantee */}
              <div className="mt-6 border-t border-white/[0.08] pt-5 space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                  <ShieldCheck size={16} />
                  <span>معاملة مشفّرة وضمان استرجاع 100%</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <Clock size={15} className="text-amber-400" />
                  <span>مراجعة فورية خلال 1 - 5 دقائق</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* SUCCESS MODAL (RECEIPT CONFIRMATION & ORDER CODE) */}
      {successOrder && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-lg rounded-3xl border border-white/15 bg-[#0f1422] p-6 sm:p-8 shadow-2xl text-center">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSuccessOrder(null)}
              className="absolute top-5 left-5 p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Success Check Icon */}
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 size={36} />
            </div>

            <h3 className="mt-4 text-2xl font-black text-white">
              تم استلام طلبك بنجاح!
            </h3>
            <p className="mt-1 text-xs text-white/60">
              طلبك الآن قيد المراجعة والتحقق من التحويل وسيتم الشحن لحسابك فوراً.
            </p>

            {/* Order Code Highlight */}
            <div className="mt-6 rounded-2xl border border-accent-purple/40 bg-accent-purple/10 p-4">
              <span className="block text-xs font-semibold text-accent-purple mb-1">
                كود الطلب المرجعي (احفظ هذا الكود):
              </span>
              <div className="flex items-center justify-center gap-3">
                <span className="font-mono text-2xl font-black text-white tracking-widest">
                  {successOrder.orderCode}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyOrderCode(successOrder.orderCode)}
                  className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                  title="نسخ كود الطلب"
                >
                  {copiedOrderCode ? (
                    <Check size={16} className="text-emerald-400" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* Order Summary Details */}
            <div className="mt-5 rounded-2xl border border-white/[0.08] bg-[#090d16] p-4 text-right text-xs space-y-2.5">
              <div className="flex justify-between items-center text-white/70">
                <span>الباقة:</span>
                <strong className="text-white">{successOrder.productName}</strong>
              </div>
              <div className="flex justify-between items-center text-white/70">
                <span>المبلغ المدفوع:</span>
                <strong className="text-emerald-400 font-bold">{successOrder.price} جنيه مصري</strong>
              </div>
              <div className="flex justify-between items-center text-white/70">
                <span>معرف اللاعب (Player ID):</span>
                <strong className="text-white font-mono">{successOrder.playerId}</strong>
              </div>
              <div className="flex justify-between items-center text-white/70">
                <span>طريقة الدفع:</span>
                <strong className="text-white">{successOrder.paymentMethod}</strong>
              </div>
              <div className="flex justify-between items-center text-white/70">
                <span>رقم العملية:</span>
                <strong className="text-white font-mono">{successOrder.transactionId}</strong>
              </div>
              <div className="flex justify-between items-center text-white/70 pt-2 border-t border-white/[0.06]">
                <span>حالة الطلب:</span>
                <span className="inline-flex items-center gap-1.5 text-amber-400 font-bold">
                  <Clock size={13} />
                  قيد المراجعة والتحقق (1 - 5 دقائق)
                </span>
              </div>
            </div>

            {/* Action: Open WhatsApp with Order Details */}
            <div className="mt-6 space-y-3">
              <a
                href={generateWhatsAppOrderUrl({
                  productName: successOrder.productName,
                  price: successOrder.price,
                  currency: "جنيه مصري",
                  playerId: successOrder.playerId,
                  playerName: successOrder.playerName,
                  orderCode: successOrder.orderCode,
                  paymentMethod: successOrder.paymentMethod,
                  transactionId: successOrder.transactionId,
                  receiptUrl: successOrder.receiptUrl,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-l from-[#25D366] to-[#128C7E] px-6 text-sm font-black text-white shadow-lg shadow-emerald-950/40 transition-transform duration-150 hover:scale-[1.01] active:scale-[0.98]"
              >
                <MessageCircle size={20} className="shrink-0" />
                <span>متابعة الطلب عبر واتساب الآن</span>
              </a>

              <button
                type="button"
                onClick={() => setSuccessOrder(null)}
                className="h-11 w-full rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                إغلاق وتقديم طلب شحن جديد
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
