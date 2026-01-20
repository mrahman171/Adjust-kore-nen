type Props = {
  score: number;
  onStop: () => void;
  disabled?: boolean;
};

export function ControlPanel({ score, onStop, disabled }: Props) {
  return (
    <div className="rounded-3xl panel-surface p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
        কন্ট্রোল ডেস্ক
      </p>
      <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3 shadow-[0_6px_18px_rgba(80,50,20,0.06)]">
        <span className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
          বর্তমান স্কোর
        </span>
        <span className="text-2xl font-semibold">{score}</span>
      </div>
      <button
        className="mt-4 w-full rounded-full border-2 border-[var(--accent)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-white sm:w-auto"
        onClick={onStop}
        disabled={disabled}
      >
        স্কোর দেখুন
      </button>
    </div>
  );
}
