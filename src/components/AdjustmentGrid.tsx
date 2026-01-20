import { useMemo } from "react";
import { ADJUSTMENTS } from "@/components/data/adjustments";
import type { Adjustment } from "@/components/types";

type Props = {
  onAdjust: (action: Adjustment) => void;
  disabled?: boolean;
  round?: number;
  correctTags?: ("committee" | "announce" | "delay" | "blame" | "investigate" | "silent")[];
};

// Get 4 random adjustments, mixing correct and incorrect tags for balance
function getRandomAdjustments(
  correctTags?: ("committee" | "announce" | "delay" | "blame" | "investigate" | "silent")[]
): Adjustment[] {
  const hasTags = Boolean(correctTags && correctTags.length > 0);
  const correctPool = hasTags
    ? ADJUSTMENTS.filter((adj) => correctTags!.includes(adj.tag))
    : ADJUSTMENTS;
  const wrongPool = hasTags
    ? ADJUSTMENTS.filter((adj) => !correctTags!.includes(adj.tag))
    : [];

  const shuffle = (items: Adjustment[]) =>
    [...items].sort(() => Math.random() - 0.5);

  const selected: Adjustment[] = [];
  const correctPick = hasTags ? 1 : 4;
  const wrongPick = hasTags ? 3 : 0;

  selected.push(...shuffle(correctPool).slice(0, correctPick));
  selected.push(...shuffle(wrongPool).slice(0, wrongPick));

  if (selected.length < 4) {
    const fallback = shuffle(ADJUSTMENTS.filter((adj) => !selected.includes(adj)));
    selected.push(...fallback.slice(0, 4 - selected.length));
  }

  return shuffle(selected);
}

export function AdjustmentGrid({ onAdjust, disabled, round, correctTags }: Props) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = useMemo(() => getRandomAdjustments(correctTags), [round, correctTags]);

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
