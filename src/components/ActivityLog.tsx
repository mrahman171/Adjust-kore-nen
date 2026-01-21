import type { LogEntry } from "@/components/types";

type Props = {
  log: LogEntry[];
};

export function ActivityLog({ log }: Props) {
  return (
    <div className="relative overflow-hidden rounded-3xl panel-surface p-6">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(181,54,46,0.05),_transparent_50%)]" />
      <div className="pointer-events-none absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-[var(--accent)]/10 blur-2xl" />

      {/* Top accent line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--accent)] via-[var(--accent-muted)] to-transparent" />

      {/* Header */}
      <div className="relative flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-deep)] text-white shadow-md">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
          সাম্প্রতিক কার্যক্রম
        </p>
      </div>

      {/* Log entries */}
      <div className="relative mt-4 space-y-3 text-sm">
        {log.length === 0 ? (
          <div className="flex items-center gap-3 rounded-2xl border border-dashed border-[var(--line)] bg-white/50 px-4 py-6 text-center">
            <div className="mx-auto flex flex-col items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)]/10">
                <svg className="h-5 w-5 text-[var(--accent)]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p className="text-[var(--ink)]/50">প্রথম অ্যাডজাস্টের অপেক্ষা</p>
            </div>
          </div>
        ) : (
          log.slice(0, 4).map((entry, index) => (
            <div
              key={entry.round}
              className="group relative overflow-hidden rounded-2xl border border-white/50 bg-gradient-to-br from-white/90 to-[var(--paper-soft)] px-4 py-4 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Left accent bar */}
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[var(--accent)] to-[var(--accent-deep)]" />

              {/* Round badge */}
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)]/10 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-[var(--accent)]">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  রাউন্ড {entry.round}
                </span>
              </div>

              {/* Problem */}
              <p className="font-medium leading-snug text-[var(--ink)]">{entry.problem}</p>

              {/* Result with icon */}
              <div className="mt-2 flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)]/10">
                  <svg className="h-3 w-3 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-[var(--accent)]">{entry.result}</p>
              </div>

              {/* Hover indicator */}
              <div className="pointer-events-none absolute -right-4 -top-4 h-12 w-12 rounded-full bg-[var(--accent)]/5 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
            </div>
          ))
        )}
      </div>

      {/* Show more indicator if there are more than 4 entries */}
      {log.length > 4 && (
        <div className="relative mt-3 text-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent)]/5 px-3 py-1 text-xs text-[var(--accent)]">
            <span>+{log.length - 4} আরো</span>
          </span>
        </div>
      )}
    </div>
  );
}
