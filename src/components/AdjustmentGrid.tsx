import { ADJUSTMENTS } from "@/components/data/adjustments";
import type { Adjustment } from "@/components/types";

type Props = {
  onAdjust: (action: Adjustment) => void;
  disabled?: boolean;
};

export function AdjustmentGrid({ onAdjust, disabled }: Props) {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {ADJUSTMENTS.map((action) => (
        <button
          key={action.label}
          className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-left text-sm transition hover:-translate-y-1 hover:border-[var(--accent)]"
          onClick={() => onAdjust(action)}
          disabled={disabled}
        >
          <span className="font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            অ্যাডজাস্ট
          </span>
          <span className="mt-1 block text-base">{action.label}</span>
        </button>
      ))}
    </div>
  );
}
