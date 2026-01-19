type Props = {
  score: number;
  onStop: () => void;
  disabled?: boolean;
};

export function ControlPanel({ score, onStop, disabled }: Props) {
  return (
    <div className="rounded-3xl border-2 border-[var(--line)] bg-[var(--paper)] p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
        কন্ট্রোল ডেস্ক
      </p>
      <p className="mt-3 text-lg">বর্তমান স্কোর: {score}</p>
      <button
        className="mt-4 rounded-full border-2 border-[var(--accent)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-white"
        onClick={onStop}
        disabled={disabled}
      >
        স্কোর দেখুন
      </button>
    </div>
  );
}
