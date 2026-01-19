import type { Meters } from "@/components/types";

type Props = {
  meters: Meters;
};

export function Dossier({ meters }: Props) {
  return (
    <div className="rounded-3xl border-2 border-[var(--line)] bg-[var(--paper)] p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
        সিস্টেম ডসিয়ার
      </p>
      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <p>অ্যাডজাস্ট সংখ্যা: {meters.adjustmentCount}</p>
        <p>কমিটি সংখ্যা: {meters.committeeCount}</p>
        <p>ঘোষণা সংখ্যা: {meters.announcementCount}</p>
        <p>নীরবতা সংখ্যা: {meters.silentCount}</p>
        <p>জনগণের ধৈর্য: {meters.publicPatience}</p>
        <p>বিশৃঙ্খলা স্তর: {meters.chaos}</p>
      </div>
    </div>
  );
}
