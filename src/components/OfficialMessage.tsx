type Props = {
  officialLine: string;
  publicLine: string;
};

export function OfficialMessage({ officialLine, publicLine }: Props) {
  return (
    <div className="rounded-3xl border-2 border-[var(--line)] bg-[var(--paper)] p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
        অফিশিয়াল বার্তা
      </p>
      <p className="mt-3 text-lg">{officialLine}</p>
      <p className="mt-2 text-sm text-[var(--ink)]/70">{publicLine}</p>
    </div>
  );
}
