import type { Meters, PerformanceMetrics, StrategyStats } from "@/components/types";

type Props = {
  meters: Meters;
  metrics?: PerformanceMetrics;
  strategies?: StrategyStats[];
};

export function Dossier({ meters, metrics, strategies }: Props) {
  const stats = [
    { label: "অ্যাডজাস্ট", value: meters.adjustmentCount, correct: meters.correctAdjustmentCount },
    { label: "কমিটি", value: meters.committeeCount, correct: meters.correctCommitteeCount },
    { label: "ঘোষণা", value: meters.announcementCount, correct: meters.correctAnnouncementCount },
    { label: "নীরবতা", value: meters.silentCount, correct: meters.correctSilentCount },
  ];

  const bars = [
    { label: "জনগণের ধৈর্য", value: meters.publicPatience, color: "bg-green-500" },
    { label: "বিশৃঙ্খলা স্তর", value: meters.chaos, color: "bg-red-500" },
    { label: "মিডিয়া চাপ", value: meters.mediaNoise, color: "bg-amber-500" },
  ];

  const performanceMetrics = metrics
    ? [
        { label: "নির্ভুলতা", value: metrics.accuracyRate, suffix: "%" },
        { label: "দক্ষতা", value: metrics.efficiencyIndex, suffix: "%" },
        { label: "স্থিতিশীলতা", value: metrics.stabilityScore, suffix: "%" },
        { label: "ঝুঁকি", value: metrics.riskFactor, suffix: "%" },
      ]
    : [];

  return (
    <div className="rounded-3xl panel-surface p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
        সিস্টেম ডসিয়ার
      </p>

      {/* Main stats with accuracy indicator */}
      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-white/70 px-3 py-3 shadow-[0_6px_18px_rgba(80,50,20,0.06)]"
          >
            <p className="text-[0.6rem] uppercase tracking-[0.2em] text-[var(--accent)]/70">
              {stat.label}
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <p className="text-lg font-semibold">{stat.value}</p>
              {stat.value > 0 && (
                <p className="text-xs text-green-600">
                  ({stat.correct}/{stat.value} সঠিক)
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Streak indicator */}
      {meters.streak > 0 && (
        <div className="mt-4 rounded-2xl bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-3 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.15em] text-amber-700">
              স্ট্রিক
            </span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-amber-600">{meters.streak}</span>
              {meters.maxStreak > meters.streak && (
                <span className="text-xs text-amber-500">(সর্বোচ্চ: {meters.maxStreak})</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Progress bars */}
      <div className="mt-5 space-y-3">
        {bars.map((bar) => (
          <div key={bar.label}>
            <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.2em] text-[var(--accent)]/70">
              <span>{bar.label}</span>
              <span>{bar.value}</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--line)]">
              <div
                className={`h-full rounded-full ${bar.color} transition-all duration-300`}
                style={{ width: `${bar.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Performance metrics */}
      {metrics && (
        <div className="mt-5 border-t border-[var(--line)] pt-4">
          <p className="text-[0.6rem] uppercase tracking-[0.2em] text-[var(--accent)]/70">
            পারফরম্যান্স মেট্রিক্স
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {performanceMetrics.map((m) => (
              <div
                key={m.label}
                className="flex items-center justify-between rounded-xl bg-white/50 px-2 py-2"
              >
                <span className="text-xs text-[var(--ink)]/60">{m.label}</span>
                <span className="text-sm font-semibold">
                  {m.value}
                  {m.suffix}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strategy breakdown (compact) */}
      {strategies && strategies.filter((s) => s.total > 0).length > 0 && (
        <div className="mt-4 border-t border-[var(--line)] pt-4">
          <p className="text-[0.6rem] uppercase tracking-[0.2em] text-[var(--accent)]/70">
            কৌশল বিশ্লেষণ
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {strategies
              .filter((s) => s.total > 0)
              .map((s) => (
                <div
                  key={s.tag}
                  className="flex items-center gap-1 rounded-full bg-white/60 px-2 py-1 text-xs"
                >
                  <span className="text-[var(--ink)]/70">{s.label}</span>
                  <span
                    className={`font-medium ${
                      s.accuracy >= 50 ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {s.accuracy}%
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
