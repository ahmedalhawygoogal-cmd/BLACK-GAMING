"use client";

import React, { useState } from "react";
import { Download, Share, Smartphone, X } from "lucide-react";
import { usePWAInstall } from "@/hooks/use-pwa-install";

export const PWAInstallButton: React.FC<{ className?: string }> = ({ className }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide
  if (isInstalled) {
    return null;
  }

  // Android / Chromium / Desktop flow
  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className={
          className ||
          "inline-flex items-center gap-1.5 rounded-lg border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-1.5 text-xs font-semibold text-accent-cyan hover:bg-accent-cyan/20 transition-all active:scale-95"
        }
      >
        <Download size={14} />
        <span>تثبيت التطبيق</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className={
            className ||
            "inline-flex items-center gap-1.5 rounded-lg border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-1.5 text-xs font-semibold text-accent-cyan hover:bg-accent-cyan/20 transition-all active:scale-95"
          }
        >
          <Smartphone size={14} />
          <span>تثبيت التطبيق (iOS)</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-sm rounded-2xl border border-white/15 bg-[#0f1422] p-6 text-right shadow-2xl">
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 left-4 p-1 rounded-lg text-white/50 hover:text-white"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2.5 text-accent-cyan font-bold text-sm mb-3">
                <Smartphone size={18} />
                <span>تثبيت BLACK GAMING على الآيفون</span>
              </div>

              <p className="text-xs text-white/70 leading-relaxed mb-4">
                لتثبيت التطبيق والوصول السريع بدون متصفح:
              </p>

              <ol className="list-decimal list-inside space-y-2 text-xs text-white/80 bg-white/[0.03] p-3.5 rounded-xl border border-white/10">
                <li className="flex items-center gap-2">
                  <span>1. اضغط على زر</span>
                  <strong className="text-white flex items-center gap-1 bg-white/10 px-1.5 py-0.5 rounded">
                    <Share size={12} /> مشاركة (Share)
                  </strong>
                  <span>في أسفل متصفح Safari.</span>
                </li>
                <li>
                  2. مرر لأسفل واختر <strong>«إضافة إلى الشاشة الرئيسية» (Add to Home Screen)</strong>.
                </li>
                <li>
                  3. اضغط على <strong>«إضافة» (Add)</strong> في الزاوية العلوية.
                </li>
              </ol>

              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-4 w-full h-10 rounded-xl bg-accent-purple text-xs font-bold text-white hover:bg-[#7c4df2] transition-colors"
              >
                فهمت ذلك
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
