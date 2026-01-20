import type { LogEntry } from "@/components/types";

type Props = {
  log: LogEntry[];
};

export function ActivityLog({ log }: Props) {
  return (
    <div className="rounded-3xl panel-surface p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
        সাম্প্রতিক কার্যক্রম
      </p>
      <div className="mt-4 space-y-4 text-sm">
        {log.length === 0 ? (
          <p>প্রথম অ্যাডজাস্টের অপেক্ষা।</p>
        ) : (
          log.slice(0, 4).map((entry) => (
            <div
              key={entry.round}
              className="rounded-2xl bg-white/70 px-4 py-3 shadow-[0_6px_18px_rgba(80,50,20,0.06)]"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]/70">
                রাউন্ড {entry.round}
              </p>
              <p className="mt-2 font-semibold">{entry.problem}</p>
              <p className="mt-1 text-[var(--accent)]">{entry.result}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
