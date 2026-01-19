type Props = {
  score: number;
  onContinue: () => void;
  onEnd: () => void;
};

export function ScoreModal({ score, onContinue, onEnd }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
      <section className="w-full max-w-lg rounded-3xl border-2 border-[var(--accent)] bg-[var(--paper)] p-8 text-center shadow-[0_25px_70px_rgba(140,40,30,0.25)]">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
          সিস্টেম থামানো হয়েছে
        </p>
        <h2 className="mt-3 text-3xl">বর্তমান স্কোর</h2>
        <p className="mt-3 text-4xl font-semibold">{score}</p>
        <p className="mt-3 text-sm text-[var(--ink)]/70">
          আপনি চাইলে এখান থেকে আবার চালিয়ে যেতে পারেন বা খেলা শেষ করতে পারেন।
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            className="rounded-full border-2 border-[var(--accent)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-white"
            onClick={onContinue}
          >
            চালিয়ে যান
          </button>
          <button
            className="rounded-full border-2 border-[var(--line)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ink)] transition hover:bg-[var(--line)]"
            onClick={onEnd}
          >
            গেম শেষ করুন
          </button>
        </div>
      </section>
    </div>
  );
}
