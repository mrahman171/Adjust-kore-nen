type Props = {
  officialLine: string;
  publicLine: string;
};

export function OfficialMessage({ officialLine, publicLine }: Props) {
  return (
    <div className="relative overflow-hidden rounded-3xl panel-surface p-6">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(181,54,46,0.05),_transparent_50%)]" />
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[var(--accent)]/10 blur-2xl" />

      {/* Top accent line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--accent)] via-[var(--accent-muted)] to-transparent" />

      {/* Header */}
      <div className="relative flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-deep)] text-white shadow-md">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
          অফিশিয়াল বার্তা
        </p>
      </div>

      {/* Message card */}
      <div className="relative mt-4 overflow-hidden rounded-2xl border border-white/50 bg-gradient-to-br from-white/90 to-[var(--paper-soft)] p-5 shadow-lg backdrop-blur-sm">
        {/* Decorative quote mark */}
        <div className="pointer-events-none absolute -left-2 -top-2 text-6xl font-serif text-[var(--accent)]/10">
          &ldquo;
        </div>

        {/* Official line with icon */}
        <div className="relative flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/10">
            <svg className="h-3 w-3 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <p className="text-lg font-medium leading-relaxed">{officialLine}</p>
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-gradient-to-r from-[var(--line)] via-[var(--line-strong)] to-[var(--line)]" />

        {/* Public reaction */}
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/10">
            <svg className="h-3 w-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-blue-600/70">
              জনপ্রতিক্রিয়া
            </p>
            <p className="mt-1 text-sm text-[var(--ink)]/70">{publicLine}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
