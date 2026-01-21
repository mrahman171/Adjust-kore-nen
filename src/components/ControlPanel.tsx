type Props = {
  score: number;
  onStop: () => void;
  disabled?: boolean;
};

export function ControlPanel({ score, onStop, disabled }: Props) {
  // Dynamic score color based on value
  const scoreColor =
    score >= 80
      ? "from-emerald-500 to-green-600"
      : score >= 60
      ? "from-blue-500 to-cyan-600"
      : score >= 40
      ? "from-amber-500 to-orange-600"
      : "from-red-500 to-rose-600";

  return (
    <div className="relative overflow-hidden rounded-3xl panel-surface p-6">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(181,54,46,0.06),_transparent_50%)]" />
      <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[var(--accent)]/10 blur-2xl" />

      {/* Top accent line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--accent)] via-[var(--accent-muted)] to-transparent" />

      {/* Header */}
      <div className="relative flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-deep)] text-white shadow-md">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
          কন্ট্রোল ডেস্ক
        </p>
      </div>

      {/* Score display card */}
      <div className="relative mt-4 overflow-hidden rounded-2xl border border-white/50 bg-gradient-to-br from-white/90 to-[var(--paper-soft)] p-4 shadow-lg backdrop-blur-sm">
        {/* Score accent bar */}
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${scoreColor}`} />

        <div className="flex items-center justify-between">
          <div>
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[var(--ink)]/50">
              বর্তমান স্কোর
            </span>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-4xl font-bold">{score}</span>
              <span className="text-sm text-[var(--ink)]/40">pts</span>
            </div>
          </div>

          {/* Score indicator ring */}
          <div className="relative flex h-14 w-14 items-center justify-center">
            <svg className="h-14 w-14 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[var(--line)]"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={`bg-gradient-to-r ${scoreColor}`}
                stroke="url(#scoreGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={`${score}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--accent)" />
                  <stop offset="100%" stopColor="var(--accent-deep)" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute text-xs font-bold text-[var(--accent)]">{score}%</span>
          </div>
        </div>
      </div>

      {/* Action button */}
      <button
        className="group relative mt-4 w-full overflow-hidden rounded-full border-2 border-[var(--accent)] bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)] transition-all duration-300 hover:bg-[var(--accent)] hover:text-white hover:shadow-lg hover:shadow-[var(--accent)]/20 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-[var(--accent)] sm:w-auto"
        onClick={onStop}
        disabled={disabled}
      >
        {/* Shimmer effect on hover */}
        <span className="absolute inset-0 translate-x-[-200%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-[200%]" />
        <span className="relative flex items-center justify-center gap-2">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          স্কোর দেখুন
        </span>
      </button>
    </div>
  );
}
