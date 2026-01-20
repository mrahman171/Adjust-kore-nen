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
    <div className="rounded-3xl panel-surface p-8">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
        <span>{roundLabel}</span>
        <span>{categoryLabel}</span>
      </div>
      <div
        className="mt-6 rounded-2xl bg-[linear-gradient(150deg,#fffaf2,#f6efe3)] p-6 shadow-[0_8px_22px_rgba(80,50,20,0.08)]"
        style={{ transform: `rotate(${chaosTilt}deg)` }}
      >
        <div className="mb-4 h-1 w-16 rounded-full bg-[var(--accent)]/60" />
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
