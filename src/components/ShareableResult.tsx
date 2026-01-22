"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import type { Ending, PerformanceMetrics } from "@/components/types";
import { getGradeInfo } from "@/components/data/endings";

interface ShareableResultProps {
  score: number;
  grade: string;
  ending: Ending;
  stats: {
    rounds: number;
    adjustmentCount: number;
    accuracy: number;
    maxStreak: number;
  };
  metrics?: PerformanceMetrics;
  onClose: () => void;
}

export function ShareableResult({
  score,
  grade,
  ending,
  stats,
  metrics,
  onClose,
}: ShareableResultProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const gradeInfo = getGradeInfo(score);

  const gradeColors: Record<string, { bg: string; text: string; accent: string }> = {
    S: { bg: "from-amber-400 to-yellow-500", text: "text-amber-900", accent: "#f59e0b" },
    A: { bg: "from-emerald-400 to-green-500", text: "text-emerald-900", accent: "#10b981" },
    B: { bg: "from-blue-400 to-cyan-500", text: "text-blue-900", accent: "#3b82f6" },
    C: { bg: "from-orange-400 to-amber-500", text: "text-orange-900", accent: "#f97316" },
    D: { bg: "from-slate-400 to-gray-500", text: "text-slate-900", accent: "#64748b" },
    F: { bg: "from-red-500 to-rose-600", text: "text-red-100", accent: "#ef4444" },
  };

  const currentGrade = gradeColors[grade] || gradeColors.F;

  // Generate shareable text
  const generateShareText = useCallback(() => {
    const emojis = {
      S: "👑",
      A: "⭐",
      B: "📋",
      C: "📎",
      D: "📄",
      F: "💀",
    };

    const emoji = emojis[grade as keyof typeof emojis] || "📋";

    return `${emoji} অ্যাডজাস্ট করে নেন!

🏆 স্কোর: ${score} পয়েন্ট
📊 গ্রেড: ${grade} - ${gradeInfo.title}
🎮 রাউন্ড: ${stats.rounds}
🎯 নির্ভুলতা: ${stats.accuracy}%
🔥 সেরা স্ট্রিক: ${stats.maxStreak}

"${ending.title}"

খেলুন: adjust-kore-nen.vercel.app
#AdjustKoreNen #BureaucracySimulator`;
  }, [score, grade, gradeInfo.title, stats, ending.title]);

  // Copy to clipboard
  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generateShareText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [generateShareText]);

  // Share via Web Share API (mobile)
  const shareNative = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "অ্যাডজাস্ট করে নেন - রেজাল্ট",
          text: generateShareText(),
          url: "https://adjust-kore-nen.vercel.app",
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Share failed:", err);
        }
      }
    } else {
      copyToClipboard();
    }
  }, [generateShareText, copyToClipboard]);

  // Download as image (using html2canvas if available, otherwise fallback)
  const downloadImage = useCallback(async () => {
    if (!cardRef.current) return;

    try {
      // Dynamic import html2canvas
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#f9f6ef",
        scale: 2,
      });

      const link = document.createElement("a");
      link.download = `adjust-kore-nen-${grade}-${score}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Failed to generate image:", err);
      // Fallback: copy text instead
      copyToClipboard();
    }
  }, [grade, score, copyToClipboard]);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-6 animate-fade-in">
      <div className="w-full max-w-md animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Shareable Card */}
        <div
          ref={cardRef}
          className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
          style={{ backgroundColor: "#f9f6ef" }}
        >
          {/* Header gradient */}
          <div className={`bg-gradient-to-r ${currentGrade.bg} px-6 py-8 text-center relative overflow-hidden`}>
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/30 rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/20 rounded-full translate-x-1/3 translate-y-1/3" />
            </div>

            <div className="relative">
              {/* Game title */}
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/80 mb-2">
                অ্যাডজাস্ট করে নেন
              </p>

              {/* Grade badge */}
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm mb-3">
                <span className={`text-6xl font-black ${currentGrade.text} drop-shadow-lg`}>
                  {grade}
                </span>
              </div>

              {/* Score */}
              <p className={`text-4xl font-black ${currentGrade.text}`}>{score}</p>
              <p className={`text-sm font-semibold ${currentGrade.text} opacity-80`}>পয়েন্ট</p>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-5" style={{ backgroundColor: "#f9f6ef" }}>
            {/* Title and message */}
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-[#2b211b]">{gradeInfo.title}</h3>
              <p className="text-sm text-[#2b211b]/60 mt-1">{ending.title}</p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <StatBox icon="🎮" label="রাউন্ড" value={stats.rounds} />
              <StatBox icon="🔧" label="অ্যাডজাস্টমেন্ট" value={stats.adjustmentCount} />
              <StatBox icon="🎯" label="নির্ভুলতা" value={`${stats.accuracy}%`} />
              <StatBox icon="🔥" label="সেরা স্ট্রিক" value={stats.maxStreak} />
            </div>

            {/* Performance bars */}
            {metrics && (
              <div className="space-y-2 mb-4">
                <PerformanceBar label="দক্ষতা" value={metrics.efficiencyIndex} color={currentGrade.accent} />
                <PerformanceBar label="স্থিতিশীলতা" value={metrics.stabilityScore} color={currentGrade.accent} />
              </div>
            )}

            {/* Footer */}
            <div className="text-center pt-3 border-t border-[#d5c7b2]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2b211b]/40">
                adjust-kore-nen.vercel.app
              </p>
            </div>
          </div>
        </div>

        {/* Share buttons */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            onClick={copyToClipboard}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              copied
                ? "bg-green-500 text-white"
                : "bg-white/90 text-[var(--ink)] hover:bg-white"
            }`}
          >
            {copied ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                কপি হয়েছে!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                কপি করুন
              </>
            )}
          </button>

          {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
            <button
              onClick={shareNative}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-deep)] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              শেয়ার করুন
            </button>
          )}

          <button
            onClick={downloadImage}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/90 text-[var(--ink)] text-sm font-semibold hover:bg-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            ছবি
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

function StatBox({ icon, label, value }: { icon: string; label: string; value: string | number }) {
  return (
    <div className="rounded-lg bg-white/60 border border-[#d5c7b2]/50 px-3 py-2 text-center">
      <span className="text-lg">{icon}</span>
      <p className="text-lg font-bold text-[#2b211b]">{value}</p>
      <p className="text-[10px] font-medium text-[#2b211b]/50">{label}</p>
    </div>
  );
}

function PerformanceBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-[#2b211b]/60 w-16">{label}</span>
      <div className="flex-1 h-2 bg-[#d5c7b2]/30 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-bold text-[#2b211b]/70 w-8 text-right">{value}%</span>
    </div>
  );
}

// Social share links component
export function SocialShareLinks({ text, url }: { text: string; url: string }) {
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);

  const links = [
    {
      name: "Twitter/X",
      icon: "𝕏",
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      color: "bg-black hover:bg-gray-800",
    },
    {
      name: "Facebook",
      icon: "f",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "WhatsApp",
      icon: "💬",
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      color: "bg-green-500 hover:bg-green-600",
    },
  ];

  return (
    <div className="flex items-center justify-center gap-2">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${link.color} transition-colors`}
          title={link.name}
        >
          <span className="text-sm font-bold">{link.icon}</span>
        </a>
      ))}
    </div>
  );
}
