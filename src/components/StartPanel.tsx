type Props = {
  started: boolean;
  onStart: () => void;
};

export function StartPanel({ started, onStart }: Props) {
  if (started) return null;

  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="relative overflow-hidden rounded-3xl border-2 border-[var(--line)] bg-[var(--paper)] p-8 shadow-[0_20px_60px_rgba(80,50,20,0.08)]">
        <div className="absolute right-4 top-4 h-3 w-3 animate-pulse rounded-full bg-green-500" />
        <div className="absolute right-10 top-4 font-mono text-xs text-[var(--accent)] opacity-60">
          STANDBY MODE
        </div>
        <h2 className="text-3xl">মিশন ব্রিফিং</h2>
        <p className="mt-3 text-base leading-relaxed">
          আপনাকে নিয়োগ দেওয়া হয়েছে{" "}
          <span className="font-semibold text-[var(--accent)]">
            ক্রাইসিস ম্যানেজমেন্ট অফিসার
          </span>{" "}
          হিসেবে। আপনার মিশন: সমস্যার সমাধান নয় — সমস্যাকে{" "}
          <span className="italic">অ্যাডজাস্ট</span> করা। ঘোষণাই বাস্তবতা। কমিটিই
          সমাধান। নীরবতাই কৌশল।
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-[var(--ink)] opacity-70">
          <span className="rounded border border-[var(--line)] px-2 py-1 font-mono">
            BUILD 2.0.25
          </span>
          <span className="rounded border border-[var(--line)] px-2 py-1">
            STATUS: OPERATIONAL
          </span>
          <span className="rounded border border-[var(--line)] px-2 py-1">
            CLEARANCE: LEVEL 5
          </span>
        </div>
        <button
          className="mt-6 rounded-full border-2 border-[var(--accent)] bg-[var(--accent)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:translate-y-[-2px] hover:shadow-lg hover:shadow-[var(--accent)]/20"
          onClick={onStart}
        >
          ▶ ENGAGE SYSTEM
        </button>
      </div>
      <div className="hidden flex-col gap-4 rounded-3xl border-2 border-dashed border-[var(--line)] bg-[var(--paper)]/50 p-6 lg:flex">
        <h3 className="text-lg font-semibold text-[var(--accent)]">অপারেশন ম্যানুয়াল</h3>
        <ul className="space-y-3 text-sm leading-relaxed">
          <li className="flex gap-2">
            <span className="text-[var(--stamp)]">◉</span>
            <span>প্রতিটি রাউন্ডে নতুন ক্রাইসিস রিপোর্ট আসবে</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--stamp)]">◉</span>
            <span>৪টি কৌশল থেকে একটি ডিপ্লয় করুন</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--stamp)]">◉</span>
            <span>পাবলিক ট্রাস্ট শূন্য হলে মিশন ফেইলড</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--stamp)]">◉</span>
            <span>সমাধান করবেন না — অ্যাডজাস্ট করুন!</span>
          </li>
        </ul>
        <div className="mt-auto rounded-xl bg-[var(--accent)]/5 p-4 text-xs">
          <span className="font-semibold text-[var(--accent)]">INTEL:</span>{" "}
          সংকট বড় হলে কমিটি গঠন করুন। সংকট ছোট হলেও কমিটি গঠন করুন।
        </div>
      </div>
    </section>
  );
}
