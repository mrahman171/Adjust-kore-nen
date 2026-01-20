import { useMemo } from "react";
import { ADJUSTMENTS } from "@/components/data/adjustments";
import type { Adjustment } from "@/components/types";

type Props = {
  onAdjust: (action: Adjustment) => void;
  disabled?: boolean;
  round?: number;
  correctTags?: ("committee" | "announce" | "delay" | "blame" | "investigate" | "silent")[];
  correctAdjustmentLabel?: string;
};

// Get 4 random adjustments, always include the correct label when provided
function getRandomAdjustments(
  correctTags?: ("committee" | "announce" | "delay" | "blame" | "investigate" | "silent")[],
  correctAdjustmentLabel?: string
): Adjustment[] {
  const shuffle = (items: Adjustment[]) =>
    [...items].sort(() => Math.random() - 0.5);

  const selected: Adjustment[] = [];

  if (correctAdjustmentLabel) {
    const match = ADJUSTMENTS.find((adj) => adj.label === correctAdjustmentLabel);
    if (match) selected.push(match);
  } else if (correctTags && correctTags.length > 0) {
    const correctPool = ADJUSTMENTS.filter((adj) => correctTags.includes(adj.tag));
    selected.push(...shuffle(correctPool).slice(0, 1));
  }

  const uniqueByLabel = new Set(selected.map((adj) => adj.label));
  const fallback = shuffle(
    ADJUSTMENTS.filter((adj) => !uniqueByLabel.has(adj.label))
  );
  selected.push(...fallback.slice(0, Math.max(0, 4 - selected.length)));

  return shuffle(selected);
}

export function AdjustmentGrid({
  onAdjust,
  disabled,
  round,
  correctTags,
  correctAdjustmentLabel,
}: Props) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = useMemo(
    () => getRandomAdjustments(correctTags, correctAdjustmentLabel),
    [round, correctTags, correctAdjustmentLabel]
  );

  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {options.map((action) => (
        <button
          key={action.label}
          className="group rounded-2xl bg-[linear-gradient(160deg,#fffaf2,#f3ebdd)] px-4 py-3 text-left text-sm shadow-[0_8px_18px_rgba(80,50,20,0.08)] transition hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(80,50,20,0.1)] disabled:opacity-50 disabled:hover:translate-y-0"
          onClick={() => onAdjust(action)}
          disabled={disabled}
        >
          <span className="inline-flex items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)]/70" />
            অ্যাডজাস্ট
          </span>
          <span className="mt-1 block text-base">{action.label}</span>
        </button>
      ))}
    </div>
  );
}
