import type { Ending } from "@/components/types";

type Props = {
  ending: Ending;
  score: number;
  onRestart: () => void;
};

export function EndingModal({ ending, score, onRestart }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
      <section className="w-full max-w-xl rounded-3xl border-2 border-[var(--accent)] bg-[var(--paper)] p-8 text-center shadow-[0_25px_70px_rgba(140,40,30,0.25)]">
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
          <p className="mt-2 text-sm text-[var(--ink)]/70">
            স্কোর নির্ধারিত হয়েছে অ্যাডজাস্ট, বিশৃঙ্খলা, সংবাদ চিৎকার এবং
            ধৈর্যের অনুপাত অনুযায়ী।
          </p>
        </div>
        <button
          className="mt-6 rounded-full border-2 border-[var(--accent)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-white"
          onClick={onRestart}
        >
          আবার শুরু করুন
        </button>
      </section>
    </div>
  );
}
