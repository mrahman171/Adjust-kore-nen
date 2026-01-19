"use client";

import { useMemo, useState } from "react";

type Problem = {
  category: string;
  base: string;
  escalations: string[];
};

type Adjustment = {
  label: string;
  tag: "committee" | "announce" | "delay" | "blame" | "investigate" | "silent";
  result: string;
};

type LogEntry = {
  round: number;
  problem: string;
  action: string;
  result: string;
};

type Ending = {
  title: string;
  message: string;
};

const PROBLEMS: Problem[] = [
  {
    category: "ইনফ্রাস্ট্রাকচার",
    base: "আজকে রাস্তায় গাড়ি কম, তাই জ্যাম বেশি।",
    escalations: [
      "আজকে রাস্তায় গাড়ি কম, তাই জ্যাম বেশি।",
      "জ্যাম এখন জাতীয় নীতির অংশ। বিকল্প রাস্তা এখনও ঘোষিত।",
      "জ্যাম সর্বত্র। মানচিত্র এখন স্মারক।",
    ],
  },
  {
    category: "শিক্ষা",
    base: "পরীক্ষা হবে নির্ধারিত সময়েই (পরিবর্তন সাপেক্ষে)।",
    escalations: [
      "পরীক্ষা হবে নির্ধারিত সময়েই (পরিবর্তন সাপেক্ষে)।",
      "পরীক্ষা পিছিয়েছে। নতুন তারিখ দ্রুত নির্ধারিত হবে।",
      "পরীক্ষা স্থগিত। ফাঁস তদন্ত চলমান।",
    ],
  },
  {
    category: "অর্থনীতি",
    base: "দাম বাড়েনি, শুধু মানসিকভাবে বেশি।",
    escalations: [
      "দাম বাড়েনি, শুধু মানসিকভাবে বেশি।",
      "দাম স্থিতিশীল। স্থিতিশীলতা আপডেট হচ্ছে।",
      "দাম ঐতিহাসিক। আশাবাদও ঐতিহাসিক।",
    ],
  },
  {
    category: "প্রশাসন",
    base: "মিটিং ডাকা হয়েছে আগের মিটিং কেন হয়নি সেটা বোঝার জন্য।",
    escalations: [
      "মিটিং ডাকা হয়েছে আগের মিটিং কেন হয়নি সেটা বোঝার জন্য।",
      "মিটিং থেকে সাব-মিটিং হয়েছে, এজেন্ডা নিশ্চিত করতে।",
      "মিটিং নির্ধারণে মিটিং প্রয়োজন।",
    ],
  },
  {
    category: "যোগাযোগ",
    base: "বিভিন্ন দপ্তর একই বিষয়ে ভিন্ন কথা বলেছে।",
    escalations: [
      "বিভিন্ন দপ্তর একই বিষয়ে ভিন্ন কথা বলেছে।",
      "ভিন্ন কথা আপডেট হয়েছে। ব্যাখ্যা পরে আসবে।",
      "ভিন্ন কথা চলমান। নীরবতা এখন কৌশল।",
    ],
  },
];

const ADJUSTMENTS: Adjustment[] = [
  {
    label: "কমিটি গঠন",
    tag: "committee",
    result: "কমিটি গঠন করা হয়েছে পূর্ণ ক্ষমতা সহকারে।",
  },
  {
    label: "জরুরি মিটিং",
    tag: "delay",
    result: "জরুরি মিটিং হয়েছে। সিদ্ধান্ত পরের মিটিংয়ে হবে।",
  },
  {
    label: "সিদ্ধান্ত স্থগিত",
    tag: "delay",
    result: "সিদ্ধান্ত স্থগিত। বিশেষজ্ঞ মতামত নেওয়া হবে।",
  },
  {
    label: "প্রেস রিলিজ",
    tag: "announce",
    result: "প্রেস রিলিজ দেওয়া হয়েছে। জনগণ সন্তুষ্ট।",
  },
  {
    label: "আবহাওয়ার দোষ",
    tag: "blame",
    result: "আবহাওয়াকে সাময়িক কারণ বলা হয়েছে। অ্যাডজাস্ট চলছে।",
  },
  {
    label: "তদন্ত ঘোষণা",
    tag: "investigate",
    result: "তদন্ত ঘোষণা হয়েছে। শিগগিরই জানানো হবে।",
  },
  {
    label: "কিছুই না",
    tag: "silent",
    result: "কোনো পদক্ষেপ নেই। দীর্ঘমেয়াদি স্থিতিশীলতা দেখা যাচ্ছে।",
  },
];

const OFFICIAL_LINES = [
  "পরিস্থিতি স্বাভাবিক।",
  "জনগণ বিষয়টি বুঝতে পারছে।",
  "এটি সাময়িক।",
  "গুরুত্ব সহকারে দেখা হচ্ছে।",
  "এখনই কিছু বলার সময় নয়।",
];

const PUBLIC_REACTIONS = [
  "জনগণের ধৈর্য স্থিতিশীল।",
  "জনগণের ধৈর্য পরীক্ষাধীন।",
  "জনগণের ধৈর্য তাত্ত্বিক।",
  "জনগণ আপডেট চাইছে।",
  "জনগণের ধৈর্য হোল্ডে আছে।",
];

const ENDINGS: Record<string, Ending> = {
  national: {
    title: "জাতীয় সাফল্য",
    message: "জাতি সফলভাবে অ্যাডজাস্ট করেছে।",
  },
  committee: {
    title: "কমিটি ওভারফ্লো",
    message: "দায়িত্ব এখন সব কমিটির মধ্যে ভাগ হয়েছে।",
  },
  press: {
    title: "প্রেস কনফারেন্স",
    message: "মাইক বেড়েছে। প্রশ্ন নেওয়া হচ্ছে না।",
  },
  silent: {
    title: "পূর্ণ নীরবতা",
    message: "স্থিতিশীলতা বজায় আছে। নীরবতা চলমান।",
  },
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export default function Home() {
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [problemIndex, setProblemIndex] = useState(0);
  const [officialLine, setOfficialLine] = useState("সিস্টেম প্রস্তুত। অ্যাডজাস্ট দিন।");
  const [publicLine, setPublicLine] = useState("জনগণের ধৈর্য স্থিতিশীল।");
  const [log, setLog] = useState<LogEntry[]>([]);
  const [ending, setEnding] = useState<Ending | null>(null);
  const [meters, setMeters] = useState({
    publicPatience: 100,
    chaos: 0,
    mediaNoise: 0,
    adjustmentCount: 0,
    committeeCount: 0,
    announcementCount: 0,
    silentCount: 0,
  });

  const problem = useMemo(() => PROBLEMS[problemIndex], [problemIndex]);
  const escalationLevel = clamp(Math.floor(round / 2), 0, 2);
  const problemText = problem.escalations[escalationLevel] ?? problem.base;

  const chaosTone = useMemo(() => {
    if (meters.chaos > 70) return "tracking-[0.28em]";
    if (meters.chaos > 40) return "tracking-[0.16em]";
    return "tracking-[0.08em]";
  }, [meters.chaos]);

  const chaosTilt = (meters.chaos / 100) * 2 - 1;

  const handleAdjustment = (action: Adjustment) => {
    if (ending) return;

    const nextRound = round + 1;
    const chaosIncrease = 8 + Math.floor(nextRound / 2);
    const newChaos = clamp(meters.chaos + chaosIncrease, 0, 100);
    const patienceDrop = 6 + Math.floor(newChaos / 15);
    const newPatience = clamp(meters.publicPatience - patienceDrop, 0, 100);
    const noiseIncrease = 6 + (action.tag === "announce" ? 10 : 0);
    const newNoise = clamp(meters.mediaNoise + noiseIncrease, 0, 100);

    const committeeCount =
      meters.committeeCount + (action.tag === "committee" ? 1 : 0);
    const announcementCount =
      meters.announcementCount + (action.tag === "announce" ? 1 : 0);
    const silentCount =
      meters.silentCount + (action.tag === "silent" ? 1 : 0);

    const nextProblemIndex =
      (problemIndex + 1 + (newChaos > 60 ? 1 : 0)) % PROBLEMS.length;

    const adjustSuffix = newChaos > 55 ? " অ্যাডজাস্ট। অ্যাডজাস্ট।" : "";
    const officialMessage =
      OFFICIAL_LINES[nextRound % OFFICIAL_LINES.length] + adjustSuffix;
    const publicMessage =
      PUBLIC_REACTIONS[nextRound % PUBLIC_REACTIONS.length];

    const nextEnding = resolveEnding({
      round: nextRound,
      committeeCount,
      announcementCount,
      silentCount,
    });

    setMeters({
      publicPatience: newPatience,
      chaos: newChaos,
      mediaNoise: newNoise,
      adjustmentCount: meters.adjustmentCount + 1,
      committeeCount,
      announcementCount,
      silentCount,
    });
    setOfficialLine(officialMessage);
    setPublicLine(publicMessage);
    setLog((prev) => [
      {
        round: nextRound,
        problem: problemText,
        action: action.label,
        result: action.result,
      },
      ...prev,
    ]);
    setRound(nextRound);
    setProblemIndex(nextProblemIndex);
    setEnding(nextEnding);
  };

  const resetGame = () => {
    setStarted(false);
    setRound(0);
    setProblemIndex(0);
    setOfficialLine("সিস্টেম প্রস্তুত। অ্যাডজাস্ট দিন।");
    setPublicLine("জনগণের ধৈর্য স্থিতিশীল।");
    setLog([]);
    setEnding(null);
    setMeters({
      publicPatience: 100,
      chaos: 0,
      mediaNoise: 0,
      adjustmentCount: 0,
      committeeCount: 0,
      announcementCount: 0,
      silentCount: 0,
    });
  };

  return (
    <div className="min-h-screen px-4 py-10 text-[var(--ink)] sm:px-8 lg:px-12">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <section className="relative overflow-hidden rounded-3xl border-2 border-[var(--line)] bg-[var(--paper)] px-6 py-8 shadow-[0_20px_60px_rgba(80,50,20,0.1)]">
          <div className="absolute -right-6 top-6 rotate-12 rounded-full border-2 border-[var(--stamp)] px-6 py-3 text-xs font-semibold text-[var(--stamp)] opacity-70">
            সরকারি নোটিশ
          </div>
          <div className="absolute -left-10 bottom-4 rotate-[-9deg] rounded-full border-2 border-[var(--accent)] px-5 py-2 text-[0.65rem] font-semibold text-[var(--accent)] opacity-70">
            নথিভুক্ত
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-display text-sm text-[var(--accent)]">
              সরকারি নোটিশ বোর্ড
            </p>
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl sm:text-5xl">ADJUST KORE NEN</h1>
              <p className="max-w-2xl text-base sm:text-lg">
                সব সমস্যার সমাধান একটাই — অ্যাডজাস্ট করে নেন। আপনি সিস্টেম।
                ঘোষণাই বাস্তবতা।
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              <span className="rounded-full border border-[var(--accent-muted)] px-3 py-1">
                কোনো টিউটোরিয়াল নয়
              </span>
              <span className="rounded-full border border-[var(--accent-muted)] px-3 py-1">
                কোনো সমাধান নয়
              </span>
              <span className="rounded-full border border-[var(--accent-muted)] px-3 py-1">
                ১০-১৫ মিনিট
              </span>
            </div>
          </div>
        </section>

        {!started ? (
          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border-2 border-[var(--line)] bg-[var(--paper)] p-8 shadow-[0_20px_60px_rgba(80,50,20,0.08)]">
              <h2 className="text-3xl">সিস্টেম ইনিশিয়ালাইজেশন</h2>
              <p className="mt-3 text-base">
                সিস্টেম কাজ করে প্রত্যাশা ব্যবস্থাপনায়। সমাধান নয়, ঘোষণা।
                সমস্যা ফিরে আসে আরও জোরে।
              </p>
              <button
                className="mt-6 rounded-full border-2 border-[var(--accent)] bg-[var(--accent)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:translate-y-[-2px]"
                onClick={() => setStarted(true)}
              >
                অ্যাডজাস্ট শুরু করুন
              </button>
            </div>
          </section>
        ) : (
          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border-2 border-[var(--line)] bg-[var(--paper)] p-8 shadow-[0_25px_70px_rgba(80,50,20,0.12)]">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                <span>রাউন্ড {round + 1}</span>
                <span>{problem.category} ফাইল</span>
              </div>
              <div
                className="mt-6 rounded-2xl border border-[var(--line)] bg-[#fdfbf6] p-6"
                style={{ transform: `rotate(${chaosTilt}deg)` }}
              >
                <p className={`text-sm uppercase text-[var(--accent)] ${chaosTone}`}>
                  ক্রাইসিস ব্রিফিং
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl">{problemText}</h2>
                <p className="mt-4 text-sm text-[var(--ink)]/70">
                  এস্কেলেশন লেভেল: {escalationLevel + 1} / 3
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {ADJUSTMENTS.map((action) => (
                  <button
                    key={action.label}
                    className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-left text-sm transition hover:-translate-y-1 hover:border-[var(--accent)]"
                    onClick={() => handleAdjustment(action)}
                    disabled={Boolean(ending)}
                  >
                    <span className="font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                      অ্যাডজাস্ট
                    </span>
                    <span className="mt-1 block text-base">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-3xl border-2 border-[var(--line)] bg-[var(--paper)] p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                  অফিশিয়াল বার্তা
                </p>
                <p className="mt-3 text-lg">{officialLine}</p>
                <p className="mt-2 text-sm text-[var(--ink)]/70">{publicLine}</p>
              </div>

              <div className="rounded-3xl border-2 border-[var(--line)] bg-[var(--paper)] p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                  সাম্প্রতিক কার্যক্রম
                </p>
                <div className="mt-4 space-y-4 text-sm">
                  {log.length === 0 ? (
                    <p>প্রথম অ্যাডজাস্টের অপেক্ষা।</p>
                  ) : (
                    log.slice(0, 4).map((entry) => (
                      <div
                        key={entry.round}
                        className="border-b border-[var(--line)] pb-3 last:border-b-0"
                      >
                        <p className="font-semibold">রাউন্ড {entry.round}</p>
                        <p className="text-[var(--ink)]/80">{entry.problem}</p>
                        <p className="text-[var(--accent)]">{entry.result}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {ending && (
          <section className="rounded-3xl border-2 border-[var(--accent)] bg-[var(--paper)] p-8 text-center shadow-[0_25px_70px_rgba(140,40,30,0.15)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
              ফাইনাল ঘোষণা
            </p>
            <h2 className="mt-3 text-3xl">{ending.title}</h2>
            <p className="mt-3 text-lg">{ending.message}</p>
            <button
              className="mt-6 rounded-full border-2 border-[var(--accent)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-white"
              onClick={resetGame}
            >
              সিস্টেম রিস্টার্ট
            </button>
          </section>
        )}
        <footer className="text-center text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
          Designed by M.A. Rahman
        </footer>
      </main>
    </div>
  );
}

function resolveEnding({
  round,
  committeeCount,
  announcementCount,
  silentCount,
}: {
  round: number;
  committeeCount: number;
  announcementCount: number;
  silentCount: number;
}) {
  if (silentCount >= 2 && round >= 4) return ENDINGS.silent;
  if (committeeCount >= 3) return ENDINGS.committee;
  if (announcementCount >= 3) return ENDINGS.press;
  if (round >= 8) return ENDINGS.national;
  return null;
}
