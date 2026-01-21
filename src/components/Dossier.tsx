import type { Meters, PerformanceMetrics, StrategyStats } from "@/components/types";

type Props = {
  meters: Meters;
  metrics?: PerformanceMetrics;
  strategies?: StrategyStats[];
};

export function Dossier({ meters, metrics, strategies }: Props) {
  const stats = [
    { label: "অ্যাডজাস্ট", value: meters.adjustmentCount, correct: meters.correctAdjustmentCount, icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z", color: "from-blue-500 to-indigo-600" },
    { label: "কমিটি", value: meters.committeeCount, correct: meters.correctCommitteeCount, icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", color: "from-purple-500 to-violet-600" },
    { label: "ঘোষণা", value: meters.announcementCount, correct: meters.correctAnnouncementCount, icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z", color: "from-cyan-500 to-blue-600" },
    { label: "নীরবতা", value: meters.silentCount, correct: meters.correctSilentCount, icon: "M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2", color: "from-slate-500 to-gray-600" },
  ];

  const bars = [
    { label: "জনগণের ধৈর্য", value: meters.publicPatience, color: "from-emerald-400 to-green-500", bgColor: "bg-green-100" },
    { label: "বিশৃঙ্খলা স্তর", value: meters.chaos, color: "from-red-400 to-rose-500", bgColor: "bg-red-100" },
    { label: "মিডিয়া চাপ", value: meters.mediaNoise, color: "from-amber-400 to-orange-500", bgColor: "bg-amber-100" },
  ];

  const performanceMetrics = metrics
    ? [
        { label: "নির্ভুলতা", value: metrics.accuracyRate, suffix: "%", color: "text-blue-600", bgColor: "bg-blue-50" },
        { label: "দক্ষতা", value: metrics.efficiencyIndex, suffix: "%", color: "text-emerald-600", bgColor: "bg-emerald-50" },
        { label: "স্থিতিশীলতা", value: metrics.stabilityScore, suffix: "%", color: "text-purple-600", bgColor: "bg-purple-50" },
        { label: "ঝুঁকি", value: metrics.riskFactor, suffix: "%", color: "text-rose-600", bgColor: "bg-rose-50" },
      ]
    : [];

  return (
    <div className="relative overflow-hidden rounded-3xl panel-surface p-6">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(181,54,46,0.06),_transparent_50%)]" />
      <div className="pointer-events-none absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-[var(--accent)]/10 blur-2xl" />

      {/* Top accent line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--accent)] via-[var(--accent-muted)] to-transparent" />

      {/* Header */}
      <div className="relative flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-deep)] text-white shadow-md">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
          সিস্টেম ডসিয়ার
        </p>
      </div>

      {/* Main stats with accuracy indicator */}
      <div className="relative mt-4 grid gap-3 text-sm sm:grid-cols-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-2xl border border-white/50 bg-gradient-to-br from-white/90 to-[var(--paper-soft)] px-4 py-3 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl"
          >
            {/* Accent line */}
            <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${stat.color} opacity-60`} />

            <div className="flex items-start justify-between">
              <div>
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[var(--ink)]/50">
                  {stat.label}
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  {stat.value > 0 && (
                    <p className={`text-xs font-medium ${
                      stat.correct / stat.value >= 0.5 ? "text-green-600" : "text-red-500"
                    }`}>
                      ({stat.correct}/{stat.value})
                    </p>
                  )}
                </div>
              </div>
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${stat.color} text-white shadow-sm`}>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Streak indicator */}
      {meters.streak > 0 && (
        <div className="relative mt-4 overflow-hidden rounded-2xl border border-amber-200/50 bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-3 shadow-lg">
          {/* Fire animation effect */}
          <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gradient-to-br from-amber-300/30 to-orange-300/30 blur-xl" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-amber-700">
                স্ট্রিক
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-amber-600">{meters.streak}</span>
              {meters.maxStreak > meters.streak && (
                <span className="rounded-full bg-amber-200/50 px-2 py-0.5 text-xs font-medium text-amber-600">
                  সর্বোচ্চ: {meters.maxStreak}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Progress bars */}
      <div className="relative mt-5 space-y-4">
        {bars.map((bar) => (
          <div key={bar.label} className="group">
            <div className="flex items-center justify-between text-[0.65rem] font-semibold uppercase tracking-[0.2em]">
              <span className="text-[var(--ink)]/60">{bar.label}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs ${bar.bgColor}`}>
                {bar.value}%
              </span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-[var(--line)]/50 shadow-inner">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${bar.color} shadow-sm transition-all duration-500 ease-out`}
                style={{ width: `${bar.value}%` }}
              >
                {/* Shimmer effect */}
                <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance metrics */}
      {metrics && (
        <div className="relative mt-5 border-t border-[var(--line)]/50 pt-4">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[var(--ink)]/50">
            পারফরম্যান্স মেট্রিক্স
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {performanceMetrics.map((m) => (
              <div
                key={m.label}
                className={`flex items-center justify-between rounded-xl ${m.bgColor} border border-white/50 px-3 py-2 backdrop-blur-sm transition-all hover:shadow-md`}
              >
                <span className="text-xs text-[var(--ink)]/60">{m.label}</span>
                <span className={`text-sm font-bold ${m.color}`}>
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
        <div className="relative mt-4 border-t border-[var(--line)]/50 pt-4">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[var(--ink)]/50">
            কৌশল বিশ্লেষণ
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {strategies
              .filter((s) => s.total > 0)
              .map((s) => (
                <div
                  key={s.tag}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs backdrop-blur-sm transition-all hover:shadow-md ${
                    s.accuracy >= 50
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  <span className="font-medium text-[var(--ink)]/70">{s.label}</span>
                  <span
                    className={`font-bold ${
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
