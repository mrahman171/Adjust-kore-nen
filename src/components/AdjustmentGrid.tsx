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

// Tag icons for visual distinction
const tagIcons: Record<string, React.ReactNode> = {
  committee: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  announce: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  ),
  delay: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  blame: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
    </svg>
  ),
  investigate: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  silent: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
    </svg>
  ),
};

// Tag colors for visual distinction
const tagColors: Record<string, string> = {
  committee: "from-purple-500 to-violet-600",
  announce: "from-blue-500 to-cyan-600",
  delay: "from-amber-500 to-orange-600",
  blame: "from-rose-500 to-red-600",
  investigate: "from-teal-500 to-emerald-600",
  silent: "from-slate-500 to-gray-600",
};

const tagBgColors: Record<string, string> = {
  committee: "group-hover:bg-purple-500/10",
  announce: "group-hover:bg-blue-500/10",
  delay: "group-hover:bg-amber-500/10",
  blame: "group-hover:bg-rose-500/10",
  investigate: "group-hover:bg-teal-500/10",
  silent: "group-hover:bg-slate-500/10",
};

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
      {options.map((action, index) => (
        <button
          key={action.label}
          className={`group relative overflow-hidden rounded-2xl border border-white/50 bg-gradient-to-br from-white/95 via-[var(--paper-soft)] to-[var(--paper-strong)]/90 px-5 py-4 text-left shadow-lg shadow-[rgba(80,50,20,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[rgba(80,50,20,0.12)] disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-lg ${tagBgColors[action.tag]}`}
          onClick={() => onAdjust(action)}
          disabled={disabled}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {/* Top accent line */}
          <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${tagColors[action.tag]} opacity-0 transition-opacity group-hover:opacity-100`} />

          {/* Decorative background blur */}
          <div className={`pointer-events-none absolute -right-8 -top-8 h-16 w-16 rounded-full bg-gradient-to-br ${tagColors[action.tag]} opacity-0 blur-2xl transition-opacity group-hover:opacity-20`} />

          {/* Header with icon */}
          <div className="flex items-center gap-2">
            <div className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br ${tagColors[action.tag]} text-white shadow-md transition-transform group-hover:scale-110`}>
              {tagIcons[action.tag]}
            </div>
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
              অ্যাডজাস্ট
            </span>
          </div>

          {/* Label */}
          <span className="mt-2 block text-base font-medium leading-snug transition-colors group-hover:text-[var(--accent)]">
            {action.label}
          </span>

          {/* Hover arrow indicator */}
          <div className="absolute bottom-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)]/0 transition-all group-hover:bg-[var(--accent)]/10">
            <svg
              className="h-4 w-4 translate-x-0 text-[var(--accent)] opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      ))}
    </div>
  );
}
