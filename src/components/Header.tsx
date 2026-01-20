type Props = {
  title: string;
  subtitle: string;
};

export function Header({ title, subtitle }: Props) {
  return (
    <section className="relative overflow-hidden rounded-3xl border-2 border-[var(--line)] bg-[var(--paper)] px-6 py-8 shadow-[0_20px_60px_rgba(80,50,20,0.1)]">
      <div className="absolute -right-6 top-6 rotate-12 rounded-full border-2 border-[var(--stamp)] px-6 py-3 text-xs font-semibold text-[var(--stamp)] opacity-70">
        TOP SECRET
      </div>
      <div className="absolute -left-10 bottom-4 rotate-[-9deg] rounded-full border-2 border-[var(--accent)] px-5 py-2 text-[0.65rem] font-semibold text-[var(--accent)] opacity-70">
        CLASSIFIED
      </div>
      <div className="absolute right-4 top-4 hidden items-center gap-2 sm:flex">
        <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
        <span className="font-mono text-[0.65rem] uppercase tracking-wider text-[var(--stamp)]">
          LIVE
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-display text-sm text-[var(--accent)]">
          ব্যুরোক্রেসি সিমুলেটর ২০২৫
        </p>
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl sm:text-5xl">{title}</h1>
          <p className="max-w-2xl text-base sm:text-lg">{subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
          <span className="rounded-full border border-[var(--accent-muted)] px-3 py-1">
            সমাধান নিষিদ্ধ
          </span>
          <span className="rounded-full border border-[var(--accent-muted)] px-3 py-1">
            ঘোষণা বাধ্যতামূলক
          </span>
          <span className="rounded-full border border-[var(--accent-muted)] px-3 py-1">
            কমিটি অপরিহার্য
          </span>
          <span className="rounded-full border border-[var(--stamp)] bg-[var(--stamp)]/10 px-3 py-1 text-[var(--stamp)]">
            ১০-১৫ মিনিট
          </span>
        </div>
      </div>
    </section>
  );
}
