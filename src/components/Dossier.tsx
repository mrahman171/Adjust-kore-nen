import type { Meters } from "@/components/types";

type Props = {
  meters: Meters;
};

export function Dossier({ meters }: Props) {
  const stats = [
    { label: "অ্যাডজাস্ট সংখ্যা", value: meters.adjustmentCount },
    { label: "কমিটি সংখ্যা", value: meters.committeeCount },
    { label: "ঘোষণা সংখ্যা", value: meters.announcementCount },
    { label: "নীরবতা সংখ্যা", value: meters.silentCount },
  ];

  const bars = [
    { label: "জনগণের ধৈর্য", value: meters.publicPatience },
    { label: "বিশৃঙ্খলা স্তর", value: meters.chaos },
    { label: "মিডিয়া চাপ", value: meters.mediaNoise },
  ];

  return (
    <div className="rounded-3xl panel-surface p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
        সিস্টেম ডসিয়ার
      </p>
      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-white/70 px-3 py-3 shadow-[0_6px_18px_rgba(80,50,20,0.06)]"
          >
            <p className="text-[0.6rem] uppercase tracking-[0.2em] text-[var(--accent)]/70">
              {stat.label}
            </p>
            <p className="mt-1 text-lg font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 space-y-3">
        {bars.map((bar) => (
          <div key={bar.label}>
            <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.2em] text-[var(--accent)]/70">
              <span>{bar.label}</span>
              <span>{bar.value}</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--line)]">
              <div
                className="h-full rounded-full bg-[var(--accent)]/80"
                style={{ width: `${bar.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
