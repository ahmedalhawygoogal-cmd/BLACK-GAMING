"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  CalendarDays,
  Check,
  Gamepad2,
  ImagePlus,
  Loader2,
  Plus,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import { deactivateGameAction } from "@/lib/admin-actions";
import { supabase } from "@/lib/supabase";
import type { AdminGame } from "@/lib/admin-types";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

const MIME_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

function buildSlug(name: string): string {
  const base = name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .replace(/_/g, "-")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  const suffix = Math.random().toString(36).slice(2, 6);

  return base ? `${base}-${suffix}` : `game-${suffix}`;
}

function formatDate(value: string | null): string {
  if (!value) {
    return "—";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("ar-EG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function GamesManager({
  initialGames,
  initialError = null,
}: {
  initialGames: AdminGame[];
  initialError?: string | null;
}) {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [games, setGames] = useState<AdminGame[]>(initialGames);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(game: AdminGame) {
    const confirmed = window.confirm(
      `هل أنت متأكد من حذف «${game.name}»؟ سيتم إخفاؤها من المتجر وتبقى محفوظة في قاعدة البيانات.`,
    );
    if (!confirmed) {
      return;
    }

    setDeletingId(game.id);
    setError(null);
    setSuccessMessage(null);

    const result = await deactivateGameAction(game.id);

    if (result.error) {
      setError(result.error);
    } else {
      setGames((current) =>
        current.map((g) => (g.id === game.id ? { ...g, is_active: false } : g)),
      );
      setSuccessMessage(`تم حذف «${game.name}» من المتجر بنجاح.`);
      router.refresh();
    }

    setDeletingId(null);
  }

  useEffect(() => {
    setGames(initialGames);
  }, [initialGames]);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) {
        closeModal();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen, isSubmitting]);

  function resetForm() {
    setName("");
    setDescription("");
    setFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function openModal() {
    resetForm();
    setSuccessMessage(null);
    setIsModalOpen(true);
  }

  function closeModal() {
    if (isSubmitting) {
      return;
    }
    setIsModalOpen(false);
    resetForm();
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] ?? null;
    setError(null);

    if (!selected) {
      setFile(null);
      return;
    }

    if (!ACCEPTED_TYPES.includes(selected.type)) {
      setError("صيغة الصورة غير مدعومة. استخدم JPG أو PNG أو WEBP أو AVIF.");
      event.target.value = "";
      setFile(null);
      return;
    }

    if (selected.size > MAX_FILE_SIZE) {
      setError("حجم الصورة يجب ألا يتجاوز 5 ميجابايت.");
      event.target.value = "";
      setFile(null);
      return;
    }

    setFile(selected);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (trimmedName.length < 2) {
      setError("يرجى إدخال اسم لعبة صالح (حرفان على الأقل).");
      return;
    }

    if (!file) {
      setError("يرجى اختيار صورة غلاف للعبة.");
      return;
    }

    if (!supabase) {
      setError("تعذر الاتصال بقاعدة البيانات. تحقق من إعدادات Supabase.");
      return;
    }

    setIsSubmitting(true);

    try {
      const extension =
        MIME_EXTENSIONS[file.type] ||
        file.name.split(".").pop()?.toLowerCase() ||
        "jpg";
      const filePath = `covers/${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 9)}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("game-images")
        .upload(filePath, file, {
          contentType: file.type,
          cacheControl: "31536000",
          upsert: false,
        });

      if (uploadError) {
        setError(
          `تعذر رفع الصورة: ${uploadError.message}. تأكد من صلاحيات الرفع في حاوية game-images.`,
        );
        return;
      }

      const { data: publicData } = supabase.storage
        .from("game-images")
        .getPublicUrl(filePath);

      const { data: insertedGame, error: insertError } = await supabase
        .from("games")
        .insert({
          name: trimmedName,
          slug: buildSlug(trimmedName),
          description: trimmedDescription || null,
          banner_url: publicData.publicUrl,
          region: "MENA",
          is_active: true,
        })
        .select("*")
        .single();

      if (insertError) {
        setError(
          `تعذر حفظ اللعبة: ${insertError.message}. تحقق من جدول games وصلاحياته.`,
        );
        return;
      }

      if (insertedGame) {
        setGames((current) => [insertedGame as AdminGame, ...current]);
      }

      setIsModalOpen(false);
      resetForm();
      setSuccessMessage(`تمت إضافة «${trimmedName}» بنجاح.`);
      router.refresh();
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "حدث خطأ غير متوقع أثناء حفظ اللعبة.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5 text-[11px] font-semibold text-white/35">
            <span
              aria-hidden
              className="h-px w-6 bg-gradient-to-l from-accent-purple to-transparent"
            />
            إدارة المتجر
          </div>
          <h1 className="mt-3 text-2xl font-extrabold text-white sm:text-[30px] sm:leading-tight">
            الألعاب
          </h1>
          <p className="mt-2 max-w-md text-[13px] leading-7 text-white/40">
            أضف ألعاباً جديدة وارفع أغلفتها إلى المنصة. تظهر الألعاب النشطة
            مباشرة في المتجر.
          </p>
        </div>

        <button
          type="button"
          onClick={openModal}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-accent-purple px-5 text-[13px] font-bold text-white shadow-cta transition-colors duration-200 hover:bg-[#7c4df2]"
        >
          <Plus size={16} strokeWidth={2.2} />
          إضافة لعبة جديدة
        </button>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-[11px] font-medium text-white/45">
          <Gamepad2 size={13} className="text-accent-purple" />
          {games.length} لعبة مسجلة
        </span>
        {successMessage ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1.5 text-[11px] font-medium text-emerald-300">
            <Check size={13} />
            {successMessage}
          </span>
        ) : null}
      </div>

      {initialError ? (
        <div
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-[12px] leading-6 text-red-300"
        >
          <AlertCircle size={14} className="mt-1 shrink-0" />
          {initialError}
        </div>
      ) : null}

      <div className="mt-5 overflow-hidden rounded-2xl border border-white/[0.06] bg-surface/50">
        {games.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-white/30">
              <Gamepad2 size={22} strokeWidth={1.5} />
            </span>
            <h2 className="mt-4 text-[15px] font-semibold text-white">
              لا توجد ألعاب بعد
            </h2>
            <p className="mt-1.5 max-w-xs text-[12px] leading-6 text-white/35">
              ابدأ بإضافة أول لعبة إلى المتجر وارفع صورة غلافها.
            </p>
            <button
              type="button"
              onClick={openModal}
              className="mt-5 inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.03] px-4 text-[12px] font-semibold text-white/70 transition-colors hover:border-white/20 hover:text-white"
            >
              <Plus size={14} />
              إضافة لعبة
            </button>
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[720px] border-collapse text-right">
                <thead>
                  <tr className="border-b border-white/[0.06] text-[11px] font-medium text-white/30">
                    <th scope="col" className="px-5 py-3.5 font-medium">
                      اللعبة
                    </th>
                    <th scope="col" className="px-4 py-3.5 font-medium">
                      الوصف
                    </th>
                    <th scope="col" className="px-4 py-3.5 font-medium">
                      المنطقة
                    </th>
                    <th scope="col" className="px-4 py-3.5 font-medium">
                      الحالة
                    </th>
                    <th scope="col" className="px-4 py-3.5 font-medium">
                      تاريخ الإضافة
                    </th>
                    <th scope="col" className="px-4 py-3.5 font-medium">
                      <span className="sr-only">إجراءات</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {games.map((game) => (
                    <tr
                      key={game.id}
                      className="border-b border-white/[0.04] transition-colors last:border-0 hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <GameCover game={game} />
                          <div className="min-w-0">
                            <p className="truncate text-[13px] font-semibold text-white">
                              {game.name}
                            </p>
                            <p
                              className="mt-0.5 max-w-[180px] truncate text-[11px] text-white/25"
                              dir="ltr"
                            >
                              {game.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="max-w-[260px] px-4 py-3.5">
                        <p className="line-clamp-2 text-[12px] leading-6 text-white/40">
                          {game.description || "—"}
                        </p>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5 text-[12px] text-white/40">
                        {game.region || "—"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5">
                        <StatusBadge active={game.is_active !== false} />
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5">
                        <span className="inline-flex items-center gap-1.5 text-[11px] text-white/30">
                          <CalendarDays size={12} />
                          {formatDate(game.created_at)}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5">
                        <button
                          type="button"
                          onClick={() => handleDelete(game)}
                          disabled={deletingId !== null}
                          aria-label={`حذف ${game.name}`}
                          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/[0.08] px-3 text-[11px] font-semibold text-red-300 transition-colors hover:border-red-500/50 hover:bg-red-500/[0.15] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingId === game.id ? (
                            <Loader2 size={12} className="animate-spin" />
                          ) : (
                            <Trash2 size={12} />
                          )}
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="divide-y divide-white/[0.05] md:hidden">
              {games.map((game) => (
                <li key={game.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <GameCover game={game} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className="truncate text-[13px] font-semibold text-white">
                          {game.name}
                        </p>
                        <StatusBadge active={game.is_active !== false} />
                      </div>
                      <p className="mt-1 line-clamp-2 text-[11px] leading-5 text-white/35">
                        {game.description || "—"}
                      </p>
                      <div className="mt-2 flex items-center gap-3 text-[10px] text-white/25">
                        <span>{game.region || "—"}</span>
                        <span className="h-0.5 w-0.5 rounded-full bg-white/20" />
                        <span>{formatDate(game.created_at)}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDelete(game)}
                        disabled={deletingId !== null}
                        className="mt-3 inline-flex h-8 items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/[0.08] px-3 text-[11px] font-semibold text-red-300 transition-colors hover:border-red-500/50 hover:bg-red-500/[0.15] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingId === game.id ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : (
                          <Trash2 size={12} />
                        )}
                        حذف
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen ? (
          <div key="add-game-modal" className="fixed inset-0 z-[60]">
            <motion.button
              type="button"
              aria-label="إغلاق النافذة"
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 h-full w-full bg-black/70 backdrop-blur-sm"
            />

            <div className="pointer-events-none absolute inset-0 flex items-end justify-center p-0 sm:items-center sm:p-6">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="add-game-title"
                initial={
                  shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.99 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-auto relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-white/[0.08] bg-[#0D121E] shadow-[0_32px_120px_-24px_rgba(0,0,0,0.95)] sm:rounded-2xl"
              >
                <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/[0.06] bg-[#0D121E]/95 px-6 py-5 backdrop-blur">
                  <div>
                    <h2
                      id="add-game-title"
                      className="text-base font-bold text-white"
                    >
                      إضافة لعبة جديدة
                    </h2>
                    <p className="mt-1 text-[11px] text-white/35">
                      ارفع غلاف اللعبة وسيتم حفظها في قاعدة البيانات.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    aria-label="إغلاق"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/[0.08] text-white/45 transition-colors hover:border-white/20 hover:text-white"
                  >
                    <X size={15} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="px-6 py-6">
                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor="game-name"
                        className="mb-2 block text-[12px] font-medium text-white/55"
                      >
                        اسم اللعبة <span className="text-accent-purple">*</span>
                      </label>
                      <input
                        id="game-name"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        maxLength={80}
                        required
                        placeholder="مثال: Blood Strike"
                        className="h-11 w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-3.5 text-sm text-white placeholder:text-white/20 transition-colors hover:border-white/[0.14] focus:border-accent-purple/60 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="game-description"
                        className="mb-2 block text-[12px] font-medium text-white/55"
                      >
                        الوصف
                      </label>
                      <textarea
                        id="game-description"
                        value={description}
                        onChange={(event) =>
                          setDescription(event.target.value)
                        }
                        rows={3}
                        maxLength={500}
                        placeholder="وصف قصير يظهر للاعبين في صفحة اللعبة..."
                        className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.02] px-3.5 py-3 text-sm leading-7 text-white placeholder:text-white/20 transition-colors hover:border-white/[0.14] focus:border-accent-purple/60 focus:outline-none"
                      />
                    </div>

                    <div>
                      <span className="mb-2 block text-[12px] font-medium text-white/55">
                        صورة الغلاف <span className="text-accent-purple">*</span>
                      </span>

                      <label
                        htmlFor="game-cover"
                        className={`group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed transition-colors duration-200 ${
                          previewUrl
                            ? "aspect-[16/9] border-white/[0.1]"
                            : "border-white/[0.1] bg-white/[0.02] px-4 py-8 hover:border-accent-purple/40 hover:bg-white/[0.03]"
                        }`}
                      >
                        {previewUrl ? (
                          <>
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-cover bg-center"
                              style={{ backgroundImage: `url(${previewUrl})` }}
                            />
                            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                            <span className="relative mt-auto flex w-full items-center justify-between gap-2 px-4 py-3">
                              <span className="truncate text-[11px] text-white/80">
                                {file?.name}
                              </span>
                              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/20 bg-black/40 px-2.5 py-1.5 text-[10px] font-medium text-white/80 backdrop-blur">
                                <ImagePlus size={12} />
                                تغيير
                              </span>
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/35 transition-colors group-hover:text-accent-purple">
                              <UploadCloud size={19} />
                            </span>
                            <span className="mt-3 text-[12px] font-medium text-white/60">
                              اضغط لاختيار صورة الغلاف
                            </span>
                            <span className="mt-1 text-[10px] text-white/25">
                              PNG أو JPG أو WEBP — بحد أقصى 5 ميجابايت
                            </span>
                          </>
                        )}
                      </label>
                      <input
                        ref={fileInputRef}
                        id="game-cover"
                        type="file"
                        accept={ACCEPTED_TYPES.join(",")}
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </div>
                  </div>

                  {error ? (
                    <div
                      role="alert"
                      className="mt-5 flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/[0.06] px-3 py-2.5 text-[12px] leading-6 text-red-300"
                    >
                      <AlertCircle size={14} className="mt-1 shrink-0" />
                      {error}
                    </div>
                  ) : null}

                  <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={closeModal}
                      disabled={isSubmitting}
                      className="inline-flex h-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 text-[12px] font-semibold text-white/55 transition-colors hover:border-white/20 hover:text-white disabled:opacity-50"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-accent-purple px-5 text-[12px] font-bold text-white shadow-cta transition-colors hover:bg-[#7c4df2] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          جارٍ الحفظ...
                        </>
                      ) : (
                        <>
                          <Check size={14} />
                          حفظ اللعبة
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function GameCover({ game }: { game: AdminGame }) {
  const cover = game.banner_url || (game.icon?.startsWith("http") ? game.icon : null);

  if (!cover) {
    return (
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-white/[0.07] bg-white/[0.03] text-white/25">
        <Gamepad2 size={17} strokeWidth={1.6} />
      </span>
    );
  }

  return (
    <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.03]">
      <Image
        src={cover}
        alt={`غلاف ${game.name}`}
        fill
        sizes="44px"
        className="object-cover"
      />
    </span>
  );
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[10px] font-medium ${
        active
          ? "border-emerald-500/20 bg-emerald-500/[0.07] text-emerald-300"
          : "border-white/10 bg-white/[0.03] text-white/40"
      }`}
    >
      <span
        aria-hidden
        className={`h-1 w-1 rounded-full ${
          active ? "bg-emerald-400" : "bg-white/30"
        }`}
      />
      {active ? "نشط" : "غير نشط"}
    </span>
  );
}
