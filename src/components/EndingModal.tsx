import type { Ending } from "@/components/types";

type Props = {
  ending: Ending;
  score: number;
  breakdown: string[];
  onRestart: () => void;
};

export function EndingModal({ ending, score, breakdown, onRestart }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
      <section className="w-full max-w-xl rounded-3xl border-2 border-[var(--accent)] bg-[var(--paper)] p-6 text-center shadow-[0_25px_70px_rgba(140,40,30,0.25)] sm:p-8 max-h-[85vh] overflow-y-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
          ফাইনাল ঘোষণা
        </p>
        <h2 className="mt-3 text-3xl">{ending.title}</h2>
        <p className="mt-3 text-lg">{ending.message}</p>
        <div className="mt-5 rounded-2xl border border-[var(--line)] bg-white/80 px-6 py-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            ফাইনাল স্কোর
          </p>
          <p className="mt-2 text-3xl font-semibold">{score}</p>
          <div className="mt-3 text-left text-sm text-[var(--ink)]/70">
            <p className="uppercase tracking-[0.2em] text-[var(--accent)]/80">
              স্কোর হিসাব
            </p>
            <ul className="mt-2 space-y-1">
              {breakdown.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
        <button
          className="mt-6 w-full rounded-full border-2 border-[var(--accent)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-white sm:w-auto"
          onClick={onRestart}
        >
          আবার শুরু করুন
        </button>
      </section>
    </div>
  );
}
