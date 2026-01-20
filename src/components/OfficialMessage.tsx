type Props = {
  officialLine: string;
  publicLine: string;
};

export function OfficialMessage({ officialLine, publicLine }: Props) {
  return (
    <div className="rounded-3xl panel-surface p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
        অফিশিয়াল বার্তা
      </p>
      <div className="mt-3 rounded-2xl bg-white/75 px-4 py-3 shadow-[0_6px_18px_rgba(80,50,20,0.06)]">
        <p className="text-lg">{officialLine}</p>
        <p className="mt-2 text-sm text-[var(--ink)]/70">{publicLine}</p>
      </div>
    </div>
  );
}
