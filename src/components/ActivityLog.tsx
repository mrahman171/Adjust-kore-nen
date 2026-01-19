import type { LogEntry } from "@/components/types";

type Props = {
  log: LogEntry[];
};

export function ActivityLog({ log }: Props) {
  return (
    <div className="rounded-3xl border-2 border-[var(--line)] bg-[var(--paper)] p-6">
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
              className="border-b border-[var(--line)] pb-3 last:border-b-0"
            >
              <p className="font-semibold">রাউন্ড {entry.round}</p>
              <p className="text-[var(--ink)]/80">{entry.problem}</p>
              <p className="text-[var(--accent)]">{entry.result}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
