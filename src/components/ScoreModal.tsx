import { getGradeInfo } from "@/components/data/endings";

type Props = {
  score: number;
  breakdown: string[];
  onContinue: () => void;
  onEnd: () => void;
};

export function ScoreModal({ score, breakdown, onContinue, onEnd }: Props) {
  const gradeInfo = getGradeInfo(score);

  const gradeColors: Record<string, string> = {
    S: "from-yellow-400 to-amber-500 text-yellow-900",
    A: "from-green-400 to-emerald-500 text-green-900",
    B: "from-blue-400 to-cyan-500 text-blue-900",
    C: "from-orange-400 to-amber-500 text-orange-900",
    D: "from-gray-400 to-slate-500 text-gray-900",
    F: "from-red-400 to-rose-500 text-red-900",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">
      <section className="w-full max-w-lg rounded-3xl border-2 border-[var(--accent)] bg-[var(--paper)] shadow-[0_25px_70px_rgba(140,40,30,0.25)] max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b border-[var(--line)] bg-gradient-to-r from-[var(--accent)]/10 to-transparent px-6 py-4 text-center sm:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
            সিস্টেম পজ
          </p>
          <h2 className="mt-2 text-2xl">বর্তমান অবস্থা</h2>
        </div>

        {/* Grade & Score */}
        <div className="flex flex-col items-center gap-4 px-6 py-5 sm:flex-row sm:justify-center sm:gap-6 sm:px-8">
          <div
            className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg ${gradeColors[gradeInfo.grade]}`}
          >
            <span className="text-4xl font-bold">{gradeInfo.grade}</span>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              বর্তমান স্কোর
            </p>
            <p className="text-3xl font-bold">{score}</p>
            <p className="text-sm text-[var(--ink)]/60">{gradeInfo.title}</p>
          </div>
        </div>

        {/* Breakdown */}
        <div className="border-t border-[var(--line)] px-6 py-4 sm:px-8">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[var(--accent)]/80">
            স্কোর হিসাব
          </p>
          <ul className="space-y-1 text-sm text-[var(--ink)]/70">
            {breakdown.map((line) => (
              <li key={line} className="flex items-center gap-2">
                <span
                  className={`inline-block h-1.5 w-1.5 rounded-full ${line.includes("-") ? "bg-red-400" : "bg-green-400"}`}
                />
                {line}
              </li>
            ))}
          </ul>
        </div>

        {/* Message */}
        <div className="border-t border-[var(--line)] bg-white/50 px-6 py-4 text-center sm:px-8">
          <p className="text-sm text-[var(--ink)]/70">
            আপনি চাইলে এখান থেকে আবার চালিয়ে যেতে পারেন বা খেলা শেষ করতে পারেন।
          </p>
        </div>

        {/* Actions */}
        <div className="border-t border-[var(--line)] px-6 py-5 sm:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              className="w-full rounded-full border-2 border-[var(--accent)] bg-[var(--accent)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[var(--accent)]/90 sm:w-auto"
              onClick={onContinue}
            >
              চালিয়ে যান
            </button>
            <button
              className="w-full rounded-full border-2 border-[var(--line)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ink)] transition hover:bg-[var(--line)] sm:w-auto"
              onClick={onEnd}
            >
              গেম শেষ করুন
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
