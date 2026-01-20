"use client";

import { useMemo, useState } from "react";
import { ActivityLog } from "@/components/ActivityLog";
import { AdjustmentGrid } from "@/components/AdjustmentGrid";
import { ControlPanel } from "@/components/ControlPanel";
import { Dossier } from "@/components/Dossier";
import { EndingModal } from "@/components/EndingModal";
import { FooterCredit } from "@/components/FooterCredit";
import { Header } from "@/components/Header";
import { OfficialMessage } from "@/components/OfficialMessage";
import { ProblemPanel } from "@/components/ProblemPanel";
import { ScoreModal } from "@/components/ScoreModal";
import { SidePanel } from "@/components/SidePanel";
import { StartPanel } from "@/components/StartPanel";
import { PROBLEMS } from "@/components/data/problems";
import {
  OFFICIAL_LINES,
  PUBLIC_REACTIONS,
  SYSTEM_MEMOS,
} from "@/components/data/messages";
import { resolveEnding } from "@/components/ending";
import { calculateScoreDetails, clamp } from "@/components/logic";
import type { Adjustment, Ending, LogEntry, Meters } from "@/components/types";

// Helper to get random index from array, optionally excluding certain indices
function getRandomIndex(length: number, exclude?: number[]): number {
  const available = Array.from({ length }, (_, i) => i).filter(
    (i) => !exclude?.includes(i)
  );
  return available[Math.floor(Math.random() * available.length)];
}

// Helper to get random item from array
function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const initialMeters: Meters = {
  publicPatience: 100,
  chaos: 0,
  mediaNoise: 0,
  adjustmentCount: 0,
  committeeCount: 0,
  announcementCount: 0,
  silentCount: 0,
};

export default function Home() {
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [problemIndex, setProblemIndex] = useState(() => getRandomIndex(PROBLEMS.length));
  const [usedProblems, setUsedProblems] = useState<number[]>([]);
  const [officialLine, setOfficialLine] = useState("সিস্টেম প্রস্তুত। অ্যাডজাস্ট দিন।");
  const [publicLine, setPublicLine] = useState("জনগণের ধৈর্য স্থিতিশীল।");
  const [log, setLog] = useState<LogEntry[]>([]);
  const [ending, setEnding] = useState<Ending | null>(null);
  const [scoreOpen, setScoreOpen] = useState(false);
  const [meters, setMeters] = useState<Meters>(initialMeters);

  const problem = useMemo(() => PROBLEMS[problemIndex], [problemIndex]);
  const escalationLevel = clamp(Math.floor(round / 2), 0, 3);
  const problemText = problem.escalations[escalationLevel] ?? problem.base;
  const memoText = getRandomItem(SYSTEM_MEMOS);

  const chaosTone = useMemo(() => {
    if (meters.chaos > 70) return "tracking-[0.28em]";
    if (meters.chaos > 40) return "tracking-[0.16em]";
    return "tracking-[0.08em]";
  }, [meters.chaos]);

  const chaosTilt = (meters.chaos / 100) * 2 - 1;
  const { score, breakdown, detailedBreakdown } = calculateScoreDetails(meters);

  const handleAdjustment = (action: Adjustment) => {
    if (ending) return;

    const nextRound = round + 1;
    const chaosIncrease = 8 + Math.floor(nextRound / 2);
    const newChaos = clamp(meters.chaos + chaosIncrease, 0, 100);

    // Check if this is a proper adjustment for the current problem
    const isProperAdjustment = problem.correctTags?.includes(action.tag) ?? false;

    // If proper adjustment, increase patience; otherwise decrease
    const patienceChange = isProperAdjustment
      ? 8 + Math.floor(nextRound / 3) // Increase patience for correct adjustment
      : -(6 + Math.floor(newChaos / 15)); // Decrease patience for wrong adjustment
    const newPatience = clamp(meters.publicPatience + patienceChange, 0, 100);
    const noiseIncrease = 6 + (action.tag === "announce" ? 10 : 0);
    const newNoise = clamp(meters.mediaNoise + noiseIncrease, 0, 100);

    const committeeCount =
      meters.committeeCount + (action.tag === "committee" ? 1 : 0);
    const announcementCount =
      meters.announcementCount + (action.tag === "announce" ? 1 : 0);
    const silentCount = meters.silentCount + (action.tag === "silent" ? 1 : 0);

    // Get next random problem, avoiding recently used ones
    const recentlyUsed = [...usedProblems, problemIndex].slice(-Math.min(10, PROBLEMS.length - 1));
    const nextProblemIndex = getRandomIndex(PROBLEMS.length, recentlyUsed);

    const adjustSuffix = newChaos > 55 ? " অ্যাডজাস্ট। অ্যাডজাস্ট।" : "";
    const officialMessage = getRandomItem(OFFICIAL_LINES) + adjustSuffix;
    const publicMessage = getRandomItem(PUBLIC_REACTIONS);

    const nextEnding = resolveEnding({
      round: nextRound,
      committeeCount,
      announcementCount,
      silentCount,
      publicPatience: newPatience,
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
    setUsedProblems((prev) => [...prev, problemIndex].slice(-10));
    setEnding(nextEnding);
  };

  const resetGame = () => {
    setStarted(false);
    setRound(0);
    setProblemIndex(getRandomIndex(PROBLEMS.length));
    setUsedProblems([]);
    setOfficialLine("সিস্টেম প্রস্তুত। অ্যাডজাস্ট দিন।");
    setPublicLine("জনগণের ধৈর্য স্থিতিশীল।");
    setLog([]);
    setEnding(null);
    setScoreOpen(false);
    setMeters(initialMeters);
  };

  return (
    <div className="min-h-screen px-4 py-10 text-[var(--ink)] sm:px-8 lg:px-12">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <Header
          title="ADJUST KORE NEN"
          subtitle="সব সমস্যার সমাধান একটাই — অ্যাডজাস্ট করে নেন। আপনি সিস্টেম। ঘোষণাই বাস্তবতা।"
        />

        <StartPanel started={started} onStart={() => setStarted(true)} />

        {started ? (
          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <ProblemPanel
              roundLabel={`রাউন্ড ${round + 1}`}
              categoryLabel={`${problem.category} ফাইল`}
              crisisText={problemText}
              escalationLevel={escalationLevel + 1}
              escalationTotal={4}
              memoText={memoText}
              chaosTone={chaosTone}
              chaosTilt={chaosTilt}
            >
              <AdjustmentGrid
                onAdjust={handleAdjustment}
                disabled={Boolean(ending)}
                round={round}
                correctTags={problem.correctTags}
              />
            </ProblemPanel>
            <SidePanel>
              <ControlPanel
                score={score}
                onStop={() => setScoreOpen(true)}
                disabled={Boolean(ending)}
              />
              <OfficialMessage
                officialLine={officialLine}
                publicLine={publicLine}
              />
              <Dossier meters={meters} />
              <ActivityLog log={log} />
            </SidePanel>
          </section>
        ) : null}

        {scoreOpen ? (
          <ScoreModal
            score={score}
            breakdown={breakdown}
            onContinue={() => setScoreOpen(false)}
            onEnd={resetGame}
          />
        ) : null}

        {ending ? (
          <EndingModal
            ending={ending}
            score={score}
            breakdown={detailedBreakdown}
            stats={{
              rounds: round,
              adjustmentCount: meters.adjustmentCount,
              committeeCount: meters.committeeCount,
              announcementCount: meters.announcementCount,
            }}
            onRestart={resetGame}
          />
        ) : null}

        <FooterCredit />
      </main>
    </div>
  );
}
