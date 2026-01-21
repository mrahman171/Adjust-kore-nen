import type { Ending, PerformanceMetrics, StrategyStats, DetailedBreakdown } from "@/components/types";
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
  professional?: DetailedBreakdown;
  metrics?: PerformanceMetrics;
  strategies?: StrategyStats[];
  onRestart: () => void;
};

export function EndingModal({
  ending,
  score,
  breakdown,
  stats,
  professional,
  metrics,
  strategies,
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

        {/* Performance Metrics */}
        {metrics && (
          <div className="border-t border-[var(--line)] px-6 py-5 sm:px-8">
            <p className="mb-3 text-center text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              পারফরম্যান্স মেট্রিক্স
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 px-3 py-3 text-center">
                <p className="text-2xl font-bold text-blue-600">{metrics.accuracyRate}%</p>
                <p className="text-xs text-blue-600/70">নির্ভুলতা</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 px-3 py-3 text-center">
                <p className="text-2xl font-bold text-emerald-600">{metrics.efficiencyIndex}%</p>
                <p className="text-xs text-emerald-600/70">দক্ষতা সূচক</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 px-3 py-3 text-center">
                <p className="text-2xl font-bold text-amber-600">{metrics.strategyDiversity}%</p>
                <p className="text-xs text-amber-600/70">কৌশল বৈচিত্র্য</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 px-3 py-3 text-center">
                <p className="text-2xl font-bold text-purple-600">{metrics.streakBonus}</p>
                <p className="text-xs text-purple-600/70">স্ট্রিক বোনাস</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 px-3 py-3 text-center">
                <p className="text-2xl font-bold text-teal-600">{metrics.stabilityScore}%</p>
                <p className="text-xs text-teal-600/70">স্থিতিশীলতা</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-rose-50 to-red-50 px-3 py-3 text-center">
                <p className="text-2xl font-bold text-rose-600">{metrics.riskFactor}%</p>
                <p className="text-xs text-rose-600/70">ঝুঁকি ফ্যাক্টর</p>
              </div>
            </div>
          </div>
        )}

        {/* Strategy Analysis */}
        {strategies && strategies.filter((s) => s.total > 0).length > 0 && (
          <div className="border-t border-[var(--line)] px-6 py-5 sm:px-8">
            <p className="mb-3 text-center text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              কৌশল বিশ্লেষণ
            </p>
            <div className="grid gap-2">
              {strategies
                .filter((s) => s.total > 0)
                .map((s) => (
                  <div
                    key={s.tag}
                    className="flex items-center justify-between rounded-lg bg-white/60 px-3 py-2"
                  >
                    <span className="text-sm font-medium">{s.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[var(--ink)]/60">
                        {s.correct}/{s.total} সঠিক
                      </span>
                      <div className="flex h-2 w-20 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className={`h-full rounded-full ${
                            s.accuracy >= 70
                              ? "bg-green-500"
                              : s.accuracy >= 40
                              ? "bg-amber-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${s.accuracy}%` }}
                        />
                      </div>
                      <span
                        className={`text-sm font-semibold ${
                          s.accuracy >= 70
                            ? "text-green-600"
                            : s.accuracy >= 40
                            ? "text-amber-600"
                            : "text-red-600"
                        }`}
                      >
                        {s.accuracy}%
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Score Breakdown */}
        <div className="border-t border-[var(--line)] px-6 py-5 sm:px-8">
          <p className="mb-3 text-center text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            স্কোর বিশ্লেষণ
          </p>
          <div className="space-y-2 text-sm">
            {/* Base scores */}
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
            {/* Professional bonuses */}
            {professional && professional.bonuses.streak > 0 && (
              <div className="flex items-center justify-between rounded-lg bg-amber-50 px-3 py-2">
                <span className="flex items-center gap-2">
                  <span>🔥</span> স্ট্রিক বোনাস
                </span>
                <span className="font-medium text-amber-700">
                  +{professional.bonuses.streak}
                </span>
              </div>
            )}
            {professional && professional.bonuses.accuracy > 0 && (
              <div className="flex items-center justify-between rounded-lg bg-blue-50 px-3 py-2">
                <span className="flex items-center gap-2">
                  <span>🎯</span> নির্ভুলতা বোনাস
                </span>
                <span className="font-medium text-blue-700">
                  +{professional.bonuses.accuracy}
                </span>
              </div>
            )}
            {professional && professional.bonuses.efficiency > 0 && (
              <div className="flex items-center justify-between rounded-lg bg-indigo-50 px-3 py-2">
                <span className="flex items-center gap-2">
                  <span>⚡</span> দক্ষতা বোনাস
                </span>
                <span className="font-medium text-indigo-700">
                  +{professional.bonuses.efficiency}
                </span>
              </div>
            )}
            {professional && professional.bonuses.diversity > 0 && (
              <div className="flex items-center justify-between rounded-lg bg-purple-50 px-3 py-2">
                <span className="flex items-center gap-2">
                  <span>🎨</span> বৈচিত্র্য বোনাস
                </span>
                <span className="font-medium text-purple-700">
                  +{professional.bonuses.diversity}
                </span>
              </div>
            )}
            {/* Penalties */}
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
            {professional && professional.penalties.delay > 0 && (
              <div className="flex items-center justify-between rounded-lg bg-red-50 px-3 py-2">
                <span className="flex items-center gap-2">
                  <span>⏳</span> বিলম্ব পেনাল্টি
                </span>
                <span className="font-medium text-red-700">
                  -{professional.penalties.delay}
                </span>
              </div>
            )}
            {professional && professional.penalties.blame > 0 && (
              <div className="flex items-center justify-between rounded-lg bg-red-50 px-3 py-2">
                <span className="flex items-center gap-2">
                  <span>👉</span> দায় পেনাল্টি
                </span>
                <span className="font-medium text-red-700">
                  -{professional.penalties.blame}
                </span>
              </div>
            )}
            {professional && professional.penalties.investigate > 0 && (
              <div className="flex items-center justify-between rounded-lg bg-red-50 px-3 py-2">
                <span className="flex items-center gap-2">
                  <span>🔍</span> তদন্ত পেনাল্টি
                </span>
                <span className="font-medium text-red-700">
                  -{professional.penalties.investigate}
                </span>
              </div>
            )}
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
