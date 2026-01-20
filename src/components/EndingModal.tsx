import type { Ending } from "@/components/types";
import { getGradeInfo } from "@/components/data/endings";

type Props = {
  ending: Ending;
  score: number;
  breakdown: {
    adjustments: number;
    chaos: number;
    media: number;
    patience: number;
    committees: number;
    announcements: number;
    silent: number;
  };
  stats: {
    rounds: number;
    adjustmentCount: number;
    committeeCount: number;
    announcementCount: number;
  };
  onRestart: () => void;
};

export function EndingModal({
  ending,
  score,
  breakdown,
  stats,
  onRestart,
}: Props) {
  const gradeInfo = getGradeInfo(score);

  const gradeColors: Record<string, string> = {
    S: "from-yellow-400 to-amber-500 text-yellow-900",
    A: "from-green-400 to-emerald-500 text-green-900",
    B: "from-blue-400 to-cyan-500 text-blue-900",
    C: "from-orange-400 to-amber-500 text-orange-900",
    D: "from-gray-400 to-slate-500 text-gray-900",
    F: "from-red-400 to-rose-500 text-red-900",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">
      <section className="w-full max-w-2xl rounded-3xl bg-[var(--paper)] shadow-[0_16px_40px_rgba(140,40,30,0.18)] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b border-[var(--line)] bg-gradient-to-r from-[var(--accent)]/10 to-transparent px-6 py-5 text-center sm:px-8">
          <div className="flex items-center justify-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
              ফাইনাল রিপোর্ট
            </p>
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl">{ending.title}</h2>
          {ending.subtitle && (
            <p className="mt-1 text-sm text-[var(--ink)]/60">
              {ending.subtitle}
            </p>
          )}
        </div>

        {/* Grade & Score Section */}
        <div className="flex flex-col items-center gap-4 px-6 py-6 sm:flex-row sm:justify-center sm:gap-8 sm:px-8">
          {/* Grade Badge */}
          <div
            className={`flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br shadow-sm ${gradeColors[gradeInfo.grade]}`}
          >
            <span className="text-5xl font-bold">{gradeInfo.grade}</span>
          </div>

          {/* Score & Title */}
          <div className="text-center sm:text-left">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              ফাইনাল স্কোর
            </p>
            <p className="text-4xl font-bold">{score}</p>
            <p className="mt-1 text-lg font-medium text-[var(--ink)]/80">
              {gradeInfo.title}
            </p>
            <p className="text-sm text-[var(--ink)]/60">{gradeInfo.comment}</p>
          </div>
        </div>

        {/* Message */}
        <div className="border-t border-[var(--line)] bg-white/50 px-6 py-4 sm:px-8">
          <p className="text-center text-base leading-relaxed">
            {ending.message}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="border-t border-[var(--line)] px-6 py-5 sm:px-8">
          <p className="mb-3 text-center text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            পারফরম্যান্স সামারি
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-white/80 px-3 py-2 text-center shadow-[0_6px_16px_rgba(80,50,20,0.06)]">
              <p className="text-2xl font-semibold">{stats.rounds}</p>
              <p className="text-xs text-[var(--ink)]/60">রাউন্ড খেলেছেন</p>
            </div>
            <div className="rounded-xl bg-white/80 px-3 py-2 text-center shadow-[0_6px_16px_rgba(80,50,20,0.06)]">
              <p className="text-2xl font-semibold">{stats.adjustmentCount}</p>
              <p className="text-xs text-[var(--ink)]/60">অ্যাডজাস্টমেন্ট</p>
            </div>
            <div className="rounded-xl bg-white/80 px-3 py-2 text-center shadow-[0_6px_16px_rgba(80,50,20,0.06)]">
              <p className="text-2xl font-semibold">{stats.committeeCount}</p>
              <p className="text-xs text-[var(--ink)]/60">কমিটি গঠিত</p>
            </div>
            <div className="rounded-xl bg-white/80 px-3 py-2 text-center shadow-[0_6px_16px_rgba(80,50,20,0.06)]">
              <p className="text-2xl font-semibold">
                {stats.announcementCount}
              </p>
              <p className="text-xs text-[var(--ink)]/60">ঘোষণা দিয়েছেন</p>
            </div>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="border-t border-[var(--line)] px-6 py-5 sm:px-8">
          <p className="mb-3 text-center text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            স্কোর বিশ্লেষণ
          </p>
          <div className="space-y-2 text-sm">
            {/* Positive scores */}
            <div className="flex items-center justify-between rounded-lg bg-green-50 px-3 py-2">
              <span className="flex items-center gap-2">
                <span>🔧</span> অ্যাডজাস্টমেন্ট
              </span>
              <span className="font-medium text-green-700">
                +{breakdown.adjustments}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-green-50 px-3 py-2">
              <span className="flex items-center gap-2">
                <span>🌀</span> বিশৃঙ্খলা বোনাস
              </span>
              <span className="font-medium text-green-700">
                +{breakdown.chaos}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-green-50 px-3 py-2">
              <span className="flex items-center gap-2">
                <span>📢</span> মিডিয়া হাইপ
              </span>
              <span className="font-medium text-green-700">
                +{breakdown.media}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-green-50 px-3 py-2">
              <span className="flex items-center gap-2">
                <span>😤</span> ধৈর্য বোনাস
              </span>
              <span className="font-medium text-green-700">
                +{breakdown.patience}
              </span>
            </div>
            {/* Negative scores */}
            <div className="flex items-center justify-between rounded-lg bg-red-50 px-3 py-2">
              <span className="flex items-center gap-2">
                <span>👥</span> কমিটি ট্যাক্স
              </span>
              <span className="font-medium text-red-700">
                -{breakdown.committees}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-red-50 px-3 py-2">
              <span className="flex items-center gap-2">
                <span>📣</span> ঘোষণা ক্লান্তি
              </span>
              <span className="font-medium text-red-700">
                -{breakdown.announcements}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-red-50 px-3 py-2">
              <span className="flex items-center gap-2">
                <span>🤫</span> নীরবতা পেনাল্টি
              </span>
              <span className="font-medium text-red-700">
                -{breakdown.silent}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="border-t border-[var(--line)] bg-gradient-to-r from-transparent via-[var(--accent)]/5 to-transparent px-6 py-5 text-center sm:px-8">
          <button
            className="w-full rounded-full border-2 border-[var(--accent)] bg-[var(--accent)] px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[var(--accent)]/90 sm:w-auto"
            onClick={onRestart}
          >
            আবার খেলুন
          </button>
          <p className="mt-3 text-xs text-[var(--ink)]/50">
            নতুন সমস্যা, নতুন অ্যাডজাস্টমেন্ট, একই ফলাফল
          </p>
        </div>
      </section>
    </div>
  );
}
