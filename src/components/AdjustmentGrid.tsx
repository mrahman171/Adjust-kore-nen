import { useMemo } from "react";
import { ADJUSTMENTS } from "@/components/data/adjustments";
import type { Adjustment } from "@/components/types";

type Props = {
  onAdjust: (action: Adjustment) => void;
  disabled?: boolean;
  round?: number;
};

// Get 4 random adjustments, trying to pick from different categories
function getRandomAdjustments(): Adjustment[] {
  const shuffled = [...ADJUSTMENTS].sort(() => Math.random() - 0.5);
  const selected: Adjustment[] = [];
  const usedTags = new Set<string>();

  // First pass: try to get one from each category
  for (const adj of shuffled) {
    if (selected.length >= 4) break;
    if (!usedTags.has(adj.tag)) {
      selected.push(adj);
      usedTags.add(adj.tag);
    }
  }

  // Second pass: fill remaining slots with any random ones
  for (const adj of shuffled) {
    if (selected.length >= 4) break;
    if (!selected.includes(adj)) {
      selected.push(adj);
    }
  }

  return selected.sort(() => Math.random() - 0.5);
}

export function AdjustmentGrid({ onAdjust, disabled, round }: Props) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = useMemo(() => getRandomAdjustments(), [round]);

  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {options.map((action) => (
        <button
          key={action.label}
          className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-left text-sm transition hover:-translate-y-1 hover:border-[var(--accent)] disabled:opacity-50 disabled:hover:translate-y-0"
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
