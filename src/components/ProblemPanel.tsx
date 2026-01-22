type Props = {
  roundLabel: string;
  categoryLabel: string;
  crisisText: string;
  escalationLevel: number;
  escalationTotal: number;
  memoText: string;
  chaosTone: string;
  chaosTilt: number;
  children: React.ReactNode;
};

export function ProblemPanel({
  roundLabel,
  categoryLabel,
  crisisText,
  escalationLevel,
  escalationTotal,
  memoText,
  chaosTone,
  chaosTilt,
  children,
}: Props) {
  // Escalation color based on level
  const escalationColor =
    escalationLevel >= 4
      ? "from-red-500 to-rose-600"
      : escalationLevel >= 3
      ? "from-orange-500 to-amber-600"
      : escalationLevel >= 2
      ? "from-yellow-500 to-amber-500"
      : "from-green-500 to-emerald-600";

  const escalationBg =
    escalationLevel >= 4
      ? "bg-red-500/10"
      : escalationLevel >= 3
      ? "bg-orange-500/10"
      : escalationLevel >= 2
      ? "bg-yellow-500/10"
      : "bg-green-500/10";

  return (
    <div className="relative overflow-hidden rounded-3xl panel-surface p-4 sm:p-6 md:p-8">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(181,54,46,0.08),_transparent_50%)]" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[var(--accent)]/10 blur-3xl" />

      {/* Top accent line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--accent)] via-[var(--accent-muted)] to-transparent" />

      {/* Header row */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-deep)] text-white shadow-lg shadow-[var(--accent)]/20">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
              {roundLabel}
            </span>
            {/* <div className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)]/10 px-2.5 py-0.5 border border-[var(--accent)]/20">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              <p className="text-xs font-semibold text-[var(--accent)]">{categoryLabel}</p>
            </div> */}
          </div>
        </div>

        {/* Escalation indicator */}
        <div className={`flex items-center gap-2 rounded-full ${escalationBg} px-3 py-1.5 backdrop-blur-sm`}>
          <div className="flex gap-1">
            {Array.from({ length: escalationTotal }).map((_, i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full transition-all ${
                  i < escalationLevel
                    ? `bg-gradient-to-br ${escalationColor}`
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-[0.6rem] font-semibold uppercase tracking-wider text-[var(--ink)]/60">
            LV.{escalationLevel}
          </span>
        </div>
      </div>

      {/* Crisis card with dynamic tilt */}
      <div
        className="relative mt-6 overflow-hidden rounded-2xl border border-white/50 bg-gradient-to-br from-white/90 via-[var(--paper-soft)] to-[var(--paper-strong)]/80 p-6 shadow-xl shadow-[rgba(80,50,20,0.1)] backdrop-blur-sm transition-transform duration-300"
        style={{ transform: `rotate(${chaosTilt}deg)` }}
      >
        {/* Top accent bar */}
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${escalationColor}`} />

        {/* Decorative corner */}
        <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[var(--accent)]/10 blur-xl" />

        {/* Header accent */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${escalationColor}`} />
            <p className={`text-xs font-bold uppercase text-[var(--accent)] ${chaosTone}`}>
              ক্রাইসিস ব্রিফিং
            </p>
          </div>
          <span className="rounded-full bg-[var(--accent)]/10 px-2.5 py-0.5 text-xs font-semibold text-[var(--accent)] border border-[var(--accent)]/20">
            {categoryLabel}
          </span>
        </div>

        {/* Main crisis text */}
        <h2 className="text-xl leading-tight break-words hyphens-auto sm:text-2xl md:text-3xl">{crisisText}</h2>

        {/* Footer info */}
        <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-[var(--line)]/50 pt-4">
          <div className="flex items-center gap-2">
            <div className={`flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br ${escalationColor} text-white text-xs font-bold`}>
              {escalationLevel}
            </div>
            <span className="text-sm text-[var(--ink)]/70">
              এস্কেলেশন লেভেল {escalationLevel}/{escalationTotal}
            </span>
          </div>
          <div className="h-4 w-px bg-[var(--line)]" />
          <p className={`text-xs uppercase tracking-[0.15em] text-[var(--accent)]/70 ${chaosTone}`}>
            {memoText}
          </p>
        </div>
      </div>

      {/* Action buttons section */}
      {children}
    </div>
  );
}
