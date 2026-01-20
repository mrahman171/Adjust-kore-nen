import { useMemo } from "react";
import { ADJUSTMENTS } from "@/components/data/adjustments";
import type { Adjustment } from "@/components/types";

type Props = {
  onAdjust: (action: Adjustment) => void;
  disabled?: boolean;
  round?: number;
  correctTags?: ("committee" | "announce" | "delay" | "blame" | "investigate" | "silent")[];
};

// Get 4 random adjustments, ensuring at least one matches the correct tags for the problem
function getRandomAdjustments(
  correctTags?: ("committee" | "announce" | "delay" | "blame" | "investigate" | "silent")[]
): Adjustment[] {
  const shuffled = [...ADJUSTMENTS].sort(() => Math.random() - 0.5);
  const selected: Adjustment[] = [];
  const usedTags = new Set<string>();

  // First pass: ensure at least one correct adjustment is included
  if (correctTags && correctTags.length > 0) {
    const correctAdjustments = shuffled.filter((adj) => correctTags.includes(adj.tag));
    if (correctAdjustments.length > 0) {
      const correctAdj = correctAdjustments[Math.floor(Math.random() * correctAdjustments.length)];
      selected.push(correctAdj);
      usedTags.add(correctAdj.tag);
    }
  }

  // Second pass: try to get one from each remaining category for variety
  for (const adj of shuffled) {
    if (selected.length >= 4) break;
    if (!usedTags.has(adj.tag) && !selected.includes(adj)) {
      selected.push(adj);
      usedTags.add(adj.tag);
    }
  }

  // Third pass: fill remaining slots with any random ones
  for (const adj of shuffled) {
    if (selected.length >= 4) break;
    if (!selected.includes(adj)) {
      selected.push(adj);
    }
  }

  return selected.sort(() => Math.random() - 0.5);
}

export function AdjustmentGrid({ onAdjust, disabled, round, correctTags }: Props) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = useMemo(() => getRandomAdjustments(correctTags), [round, correctTags]);

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
