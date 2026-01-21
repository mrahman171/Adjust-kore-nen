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

  const gradeStyles: Record<string, { bg: string; ring: string; text: string; glow: string }> = {
    S: { bg: "from-amber-400 via-yellow-300 to-amber-500", ring: "ring-amber-400/50", text: "text-amber-900", glow: "shadow-[0_0_40px_rgba(251,191,36,0.4)]" },
    A: { bg: "from-emerald-400 via-green-300 to-emerald-500", ring: "ring-emerald-400/50", text: "text-emerald-900", glow: "shadow-[0_0_40px_rgba(52,211,153,0.4)]" },
    B: { bg: "from-blue-400 via-cyan-300 to-blue-500", ring: "ring-blue-400/50", text: "text-blue-900", glow: "shadow-[0_0_40px_rgba(96,165,250,0.4)]" },
    C: { bg: "from-orange-400 via-amber-300 to-orange-500", ring: "ring-orange-400/50", text: "text-orange-900", glow: "shadow-[0_0_40px_rgba(251,146,60,0.4)]" },
    D: { bg: "from-slate-400 via-gray-300 to-slate-500", ring: "ring-slate-400/50", text: "text-slate-900", glow: "shadow-[0_0_40px_rgba(148,163,184,0.4)]" },
    F: { bg: "from-red-500 via-rose-400 to-red-600", ring: "ring-red-400/50", text: "text-red-100", glow: "shadow-[0_0_40px_rgba(239,68,68,0.4)]" },
  };

  const currentGrade = gradeStyles[gradeInfo.grade];

  const totalBonus = breakdown.adjustments + breakdown.chaos + breakdown.media + breakdown.patience +
    (professional?.bonuses.streak || 0) + (professional?.bonuses.accuracy || 0) +
    (professional?.bonuses.efficiency || 0) + (professional?.bonuses.diversity || 0);

  const totalPenalty = breakdown.committees + breakdown.announcements + breakdown.silent +
    (professional?.penalties.delay || 0) + (professional?.penalties.blame || 0) +
    (professional?.penalties.investigate || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black/60 via-black/50 to-black/60 px-4 py-6 backdrop-blur-sm animate-fade-in">
      <section className="w-full max-w-2xl max-h-[92vh] overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-gradient-to-b from-[var(--paper-soft)] to-[var(--paper)] shadow-[0_24px_80px_rgba(100,40,30,0.25)] animate-scale-in">

        {/* Scrollable Content */}
        <div className="max-h-[92vh] overflow-y-auto">

          {/* Header with gradient accent */}
          <div className="relative overflow-hidden border-b border-[var(--line)] bg-gradient-to-r from-[var(--accent)]/5 via-[var(--accent)]/10 to-[var(--accent)]/5 px-6 py-6 text-center sm:px-8">
            {/* Decorative background elements */}
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[var(--accent)]/10 blur-2xl" />
            <div className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-[var(--accent)]/5 blur-xl" />

            <div className="relative">
              <div className="flex items-center justify-center gap-2">
                <span className="flex h-2 w-2 items-center justify-center">
                  <span className="absolute h-2 w-2 animate-ping rounded-full bg-[var(--accent)]/60" />
                  <span className="relative h-2 w-2 rounded-full bg-[var(--accent)]" />
                </span>
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[var(--accent)]">
                  ফাইনাল রিপোর্ট
                </p>
                <span className="flex h-2 w-2 items-center justify-center">
                  <span className="absolute h-2 w-2 animate-ping rounded-full bg-[var(--accent)]/60" style={{ animationDelay: '0.5s' }} />
                  <span className="relative h-2 w-2 rounded-full bg-[var(--accent)]" />
                </span>
              </div>
              <h2 className="mt-3 text-2xl font-bold tracking-wide sm:text-3xl">{ending.title}</h2>
              {ending.subtitle && (
                <p className="mt-2 text-sm font-medium text-[var(--ink)]/60">
                  {ending.subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Grade & Score Hero Section */}
          <div className="relative bg-gradient-to-b from-white/40 to-transparent px-6 py-8 sm:px-8">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
              {/* Grade Badge with glow */}
              <div className="relative">
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${currentGrade.bg} blur-xl opacity-50`} />
                <div
                  className={`relative flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br ${currentGrade.bg} ring-4 ${currentGrade.ring} ${currentGrade.glow} transition-transform hover:scale-105`}
                >
                  <span className={`text-6xl font-black ${currentGrade.text} drop-shadow-sm`}>
                    {gradeInfo.grade}
                  </span>
                </div>
              </div>

              {/* Score & Title */}
              <div className="text-center sm:text-left">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
                  ফাইনাল স্কোর
                </p>
                <div className="flex items-baseline gap-1">
                  <p className="text-5xl font-black tracking-tight">{score}</p>
                  <span className="text-lg font-medium text-[var(--ink)]/40">পয়েন্ট</span>
                </div>
                <p className="mt-2 text-xl font-bold text-[var(--ink)]/90">
                  {gradeInfo.title}
                </p>
                <p className="mt-1 max-w-xs text-sm leading-relaxed text-[var(--ink)]/60">
                  {gradeInfo.comment}
                </p>
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="mt-6 flex items-center justify-center gap-6 text-center">
              <div className="flex items-center gap-2">
                <span className="text-lg">+</span>
                <span className="text-lg font-bold text-emerald-600">{totalBonus}</span>
                <span className="text-xs text-[var(--ink)]/50">বোনাস</span>
              </div>
              <div className="h-4 w-px bg-[var(--line)]" />
              <div className="flex items-center gap-2">
                <span className="text-lg">−</span>
                <span className="text-lg font-bold text-red-500">{totalPenalty}</span>
                <span className="text-xs text-[var(--ink)]/50">পেনাল্টি</span>
              </div>
            </div>
          </div>

          {/* Message Card */}
          <div className="mx-6 mb-6 sm:mx-8">
            <div className="rounded-xl border border-[var(--line)] bg-white/60 p-5 shadow-sm">
              <p className="text-center text-base leading-relaxed text-[var(--ink)]/80">
                "{ending.message}"
              </p>
            </div>
          </div>

          {/* Performance Summary Grid */}
          <div className="border-t border-[var(--line)] bg-gradient-to-b from-[var(--paper-strong)]/30 to-transparent px-6 py-6 sm:px-8">
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--line)]" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
                পারফরম্যান্স সামারি
              </p>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--line)]" />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatCard value={stats.rounds} label="রাউন্ড খেলেছেন" icon="🎮" />
              <StatCard value={stats.adjustmentCount} label="অ্যাডজাস্টমেন্ট" icon="🔧" />
              <StatCard value={stats.committeeCount} label="কমিটি গঠিত" icon="👥" />
              <StatCard value={stats.announcementCount} label="ঘোষণা দিয়েছেন" icon="📢" />
            </div>
          </div>

          {/* Performance Metrics */}
          {metrics && (
            <div className="border-t border-[var(--line)] px-6 py-6 sm:px-8">
              <div className="mb-4 flex items-center justify-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--line)]" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
                  পারফরম্যান্স মেট্রিক্স
                </p>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--line)]" />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <MetricCard value={metrics.accuracyRate} label="নির্ভুলতা" color="blue" />
                <MetricCard value={metrics.efficiencyIndex} label="দক্ষতা সূচক" color="emerald" />
                <MetricCard value={metrics.strategyDiversity} label="কৌশল বৈচিত্র্য" color="amber" />
                <MetricCard value={metrics.streakBonus} label="স্ট্রিক বোনাস" color="purple" suffix="" />
                <MetricCard value={metrics.stabilityScore} label="স্থিতিশীলতা" color="teal" />
                <MetricCard value={metrics.riskFactor} label="ঝুঁকি ফ্যাক্টর" color="rose" />
              </div>
            </div>
          )}

          {/* Strategy Analysis */}
          {strategies && strategies.filter((s) => s.total > 0).length > 0 && (
            <div className="border-t border-[var(--line)] px-6 py-6 sm:px-8">
              <div className="mb-4 flex items-center justify-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--line)]" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
                  কৌশল বিশ্লেষণ
                </p>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--line)]" />
              </div>
              <div className="space-y-2">
                {strategies
                  .filter((s) => s.total > 0)
                  .sort((a, b) => b.total - a.total)
                  .map((s) => (
                    <StrategyBar key={s.tag} strategy={s} />
                  ))}
              </div>
            </div>
          )}

          {/* Score Breakdown */}
          <div className="border-t border-[var(--line)] px-6 py-6 sm:px-8">
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--line)]" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
                স্কোর বিশ্লেষণ
              </p>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--line)]" />
            </div>

            {/* Bonuses */}
            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-600">
                বোনাস পয়েন্ট
              </p>
              <div className="space-y-1.5">
                <ScoreRow icon="🔧" label="অ্যাডজাস্টমেন্ট" value={breakdown.adjustments} type="bonus" />
                <ScoreRow icon="🌀" label="বিশৃঙ্খলা বোনাস" value={breakdown.chaos} type="bonus" />
                <ScoreRow icon="📢" label="মিডিয়া হাইপ" value={breakdown.media} type="bonus" />
                <ScoreRow icon="😤" label="ধৈর্য বোনাস" value={breakdown.patience} type="bonus" />
                {professional?.bonuses.streak ? (
                  <ScoreRow icon="🔥" label="স্ট্রিক বোনাস" value={professional.bonuses.streak} type="bonus" highlight />
                ) : null}
                {professional?.bonuses.accuracy ? (
                  <ScoreRow icon="🎯" label="নির্ভুলতা বোনাস" value={professional.bonuses.accuracy} type="bonus" highlight />
                ) : null}
                {professional?.bonuses.efficiency ? (
                  <ScoreRow icon="⚡" label="দক্ষতা বোনাস" value={professional.bonuses.efficiency} type="bonus" highlight />
                ) : null}
                {professional?.bonuses.diversity ? (
                  <ScoreRow icon="🎨" label="বৈচিত্র্য বোনাস" value={professional.bonuses.diversity} type="bonus" highlight />
                ) : null}
              </div>
            </div>

            {/* Penalties */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-500">
                পেনাল্টি পয়েন্ট
              </p>
              <div className="space-y-1.5">
                <ScoreRow icon="👥" label="কমিটি ট্যাক্স" value={breakdown.committees} type="penalty" />
                <ScoreRow icon="📣" label="ঘোষণা ক্লান্তি" value={breakdown.announcements} type="penalty" />
                <ScoreRow icon="🤫" label="নীরবতা পেনাল্টি" value={breakdown.silent} type="penalty" />
                {professional?.penalties.delay ? (
                  <ScoreRow icon="⏳" label="বিলম্ব পেনাল্টি" value={professional.penalties.delay} type="penalty" />
                ) : null}
                {professional?.penalties.blame ? (
                  <ScoreRow icon="👉" label="দায় পেনাল্টি" value={professional.penalties.blame} type="penalty" />
                ) : null}
                {professional?.penalties.investigate ? (
                  <ScoreRow icon="🔍" label="তদন্ত পেনাল্টি" value={professional.penalties.investigate} type="penalty" />
                ) : null}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="sticky bottom-0 border-t border-[var(--line)] bg-gradient-to-t from-[var(--paper)] via-[var(--paper)] to-[var(--paper)]/95 px-6 py-6 text-center sm:px-8">
            <button
              className="group relative w-full overflow-hidden rounded-xl border-2 border-[var(--accent)] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-deep)] px-8 py-4 text-sm font-bold uppercase tracking-[0.25em] text-white shadow-lg shadow-[var(--accent)]/20 transition-all hover:shadow-xl hover:shadow-[var(--accent)]/30 hover:scale-[1.02] active:scale-[0.98] sm:w-auto sm:min-w-[280px]"
              onClick={onRestart}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="h-4 w-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                আবার খেলুন
              </span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
            <p className="mt-4 text-xs font-medium text-[var(--ink)]/40">
              নতুন সমস্যা, নতুন অ্যাডজাস্টমেন্ট, একই ফলাফল
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// Sub-components for cleaner code

function StatCard({ value, label, icon }: { value: number; label: string; icon: string }) {
  return (
    <div className="group rounded-xl border border-[var(--line)]/50 bg-white/70 px-3 py-3 text-center shadow-sm transition-all hover:border-[var(--accent)]/30 hover:shadow-md">
      <span className="text-lg opacity-80 transition-transform group-hover:scale-110 inline-block">{icon}</span>
      <p className="mt-1 text-2xl font-bold">{value}</p>
      <p className="text-[10px] font-medium text-[var(--ink)]/50">{label}</p>
    </div>
  );
}

function MetricCard({ value, label, color, suffix = "%" }: { value: number; label: string; color: string; suffix?: string }) {
  const colorMap: Record<string, string> = {
    blue: "from-blue-50 to-indigo-50 text-blue-600 border-blue-200/50",
    emerald: "from-emerald-50 to-green-50 text-emerald-600 border-emerald-200/50",
    amber: "from-amber-50 to-orange-50 text-amber-600 border-amber-200/50",
    purple: "from-purple-50 to-violet-50 text-purple-600 border-purple-200/50",
    teal: "from-teal-50 to-cyan-50 text-teal-600 border-teal-200/50",
    rose: "from-rose-50 to-red-50 text-rose-600 border-rose-200/50",
  };

  return (
    <div className={`rounded-xl border bg-gradient-to-br ${colorMap[color]} px-3 py-3 text-center transition-transform hover:scale-[1.02]`}>
      <p className="text-2xl font-bold">{value}{suffix}</p>
      <p className="text-[10px] font-medium opacity-70">{label}</p>
    </div>
  );
}

function StrategyBar({ strategy }: { strategy: StrategyStats }) {
  const accuracyColor =
    strategy.accuracy >= 70
      ? "bg-emerald-500"
      : strategy.accuracy >= 40
      ? "bg-amber-500"
      : "bg-red-500";

  const textColor =
    strategy.accuracy >= 70
      ? "text-emerald-600"
      : strategy.accuracy >= 40
      ? "text-amber-600"
      : "text-red-600";

  return (
    <div className="flex items-center justify-between rounded-lg border border-[var(--line)]/40 bg-white/50 px-4 py-2.5 transition-colors hover:bg-white/80">
      <span className="text-sm font-semibold text-[var(--ink)]/80">{strategy.label}</span>
      <div className="flex items-center gap-4">
        <span className="text-xs text-[var(--ink)]/50">
          {strategy.correct}/{strategy.total} সঠিক
        </span>
        <div className="relative h-2 w-24 overflow-hidden rounded-full bg-gray-200/80">
          <div
            className={`h-full rounded-full ${accuracyColor} transition-all duration-500`}
            style={{ width: `${strategy.accuracy}%` }}
          />
        </div>
        <span className={`min-w-[3rem] text-right text-sm font-bold ${textColor}`}>
          {strategy.accuracy}%
        </span>
      </div>
    </div>
  );
}

function ScoreRow({ icon, label, value, type, highlight }: { icon: string; label: string; value: number; type: "bonus" | "penalty"; highlight?: boolean }) {
  if (value === 0) return null;

  const bgColor = type === "bonus"
    ? highlight ? "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200/50" : "bg-emerald-50/80 border-emerald-200/30"
    : "bg-red-50/80 border-red-200/30";

  const textColor = type === "bonus"
    ? highlight ? "text-amber-700" : "text-emerald-700"
    : "text-red-600";

  return (
    <div className={`flex items-center justify-between rounded-lg border ${bgColor} px-3 py-2 transition-colors`}>
      <span className="flex items-center gap-2 text-sm">
        <span className="text-base">{icon}</span>
        <span className="font-medium text-[var(--ink)]/70">{label}</span>
      </span>
      <span className={`font-bold ${textColor}`}>
        {type === "bonus" ? "+" : "−"}{value}
      </span>
    </div>
  );
}
