type Props = {
  roundLabel: string;
  categoryLabel: string;
  crisisText: string;
  escalationLevel: number;
  escalationTotal: number;
  memoText: string;
  chaosTone: string;
  chaosTilt: number;
  children: React.ReactNode;
};

export function ProblemPanel({
  roundLabel,
  categoryLabel,
  crisisText,
  escalationLevel,
  escalationTotal,
  memoText,
  chaosTone,
  chaosTilt,
  children,
}: Props) {
  return (
    <div className="rounded-3xl border-2 border-[var(--line)] bg-[var(--paper)] p-8 shadow-[0_25px_70px_rgba(80,50,20,0.12)]">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
        <span>{roundLabel}</span>
        <span>{categoryLabel}</span>
      </div>
      <div
        className="mt-6 rounded-2xl border border-[var(--line)] bg-[#fdfbf6] p-6"
        style={{ transform: `rotate(${chaosTilt}deg)` }}
      >
        <p className={`text-sm uppercase text-[var(--accent)] ${chaosTone}`}>
          ক্রাইসিস ব্রিফিং
        </p>
        <h2 className="mt-2 text-2xl sm:text-3xl">{crisisText}</h2>
        <p className="mt-4 text-sm text-[var(--ink)]/70">
          এস্কেলেশন লেভেল: {escalationLevel} / {escalationTotal}
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--accent)]/70">
          {memoText}
        </p>
      </div>
      {children}
    </div>
  );
}
