type Props = {
  started: boolean;
  onStart: () => void;
};

export function StartPanel({ started, onStart }: Props) {
  if (started) return null;

  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-3xl border-2 border-[var(--line)] bg-[var(--paper)] p-8 shadow-[0_20px_60px_rgba(80,50,20,0.08)]">
        <h2 className="text-3xl">সিস্টেম ইনিশিয়ালাইজেশন</h2>
        <p className="mt-3 text-base">
          সিস্টেম কাজ করে প্রত্যাশা ব্যবস্থাপনায়। সমাধান নয়, ঘোষণা। সমস্যা ফিরে
          আসে আরও জোরে।
        </p>
        <button
          className="mt-6 rounded-full border-2 border-[var(--accent)] bg-[var(--accent)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:translate-y-[-2px]"
          onClick={onStart}
        >
          অ্যাডজাস্ট শুরু করুন
        </button>
      </div>
    </section>
  );
}
