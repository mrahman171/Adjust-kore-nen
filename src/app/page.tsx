"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
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
import { getGradeInfo } from "@/components/data/endings";
import { resolveEnding } from "@/components/ending";
import { calculateScoreDetails, clamp } from "@/components/logic";
import type { Adjustment, Ending, LogEntry, Meters } from "@/components/types";

// New imports for enhanced features
import { useSound } from "@/lib/sounds";
import {
  loadAchievements,
  saveAchievements,
  checkAchievements,
  getAchievement,
  type AchievementState,
  type GameEndState,
} from "@/lib/achievements";
import {
  DIFFICULTY_CONFIGS,
  createInitialPowerUpState,
  saveToLeaderboard,
  type DifficultyLevel,
  type PowerUpState,
  type PowerUpType,
} from "@/lib/gameConfig";
import { Tutorial, useTutorial } from "@/components/Tutorial";
import {
  Confetti,
  StreakFire,
  useScreenShake,
  useFloatingText,
  FlashOverlay,
  AchievementPopup,
} from "@/components/VisualEffects";
import { ShareableResult } from "@/components/ShareableResult";
import {
  DifficultySelector,
  PowerUpsBar,
  AchievementsModal,
  LeaderboardModal,
  SettingsModal,
  QuickMenuBar,
} from "@/components/GameMenu";

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

const createInitialMeters = (difficulty: DifficultyLevel): Meters => ({
  publicPatience: DIFFICULTY_CONFIGS[difficulty].initialPatience,
  chaos: 0,
  mediaNoise: 0,
  adjustmentCount: 0,
  correctAdjustmentCount: 0,
  committeeCount: 0,
  correctCommitteeCount: 0,
  announcementCount: 0,
  correctAnnouncementCount: 0,
  silentCount: 0,
  correctSilentCount: 0,
  delayCount: 0,
  correctDelayCount: 0,
  blameCount: 0,
  correctBlameCount: 0,
  investigateCount: 0,
  correctInvestigateCount: 0,
  streak: 0,
  maxStreak: 0,
  totalPatienceGained: 0,
  totalPatienceLost: 0,
});

export default function Home() {
  // Core game state
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [problemIndex, setProblemIndex] = useState(() => getRandomIndex(PROBLEMS.length));
  const [usedProblems, setUsedProblems] = useState<number[]>([]);
  const [officialLine, setOfficialLine] = useState("সিস্টেম প্রস্তুত। অ্যাডজাস্ট দিন।");
  const [publicLine, setPublicLine] = useState("জনগণের ধৈর্য স্থিতিশীল।");
  const [log, setLog] = useState<LogEntry[]>([]);
  const [ending, setEnding] = useState<Ending | null>(null);
  const [scoreOpen, setScoreOpen] = useState(false);

  // Difficulty and meters
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("normal");
  const [meters, setMeters] = useState<Meters>(() => createInitialMeters("normal"));
  const difficultyConfig = DIFFICULTY_CONFIGS[difficulty];

  // Power-ups state
  const [powerUps, setPowerUps] = useState<PowerUpState>(() =>
    createInitialPowerUpState(DIFFICULTY_CONFIGS["normal"])
  );

  // Track minimum patience for comeback achievement
  const [minPatience, setMinPatience] = useState(100);

  // Visual effects state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCorrectFlash, setShowCorrectFlash] = useState(false);
  const [showWrongFlash, setShowWrongFlash] = useState(false);
  const [showStreakFire, setShowStreakFire] = useState(false);
  const { shake, shakeClass } = useScreenShake();
  const { addFloatingText, FloatingTextContainer } = useFloatingText();

  // Achievement state
  const [achievements, setAchievements] = useState<AchievementState | null>(null);
  const [newAchievement, setNewAchievement] = useState<{
    title: string;
    titleBn: string;
    icon: string;
    rarity: string;
  } | null>(null);

  // Modal states
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Sound hook
  const { init: initSound, play: playSound, isEnabled: soundEnabled, toggleSound, setVolume, volume } = useSound();

  // Tutorial hook
  const { showTutorial, completeTutorial, skipTutorial, restartTutorial } = useTutorial();

  // Reveal state for power-up
  const [revealedCorrectTag, setRevealedCorrectTag] = useState<string | null>(null);

  // Load achievements on mount
  useEffect(() => {
    setAchievements(loadAchievements());
  }, []);

  // Initialize sound on first interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      initSound();
      document.removeEventListener("click", handleFirstInteraction);
    };
    document.addEventListener("click", handleFirstInteraction);
    return () => document.removeEventListener("click", handleFirstInteraction);
  }, [initSound]);

  // Computed values
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
  const { score, breakdown, detailedBreakdown, professional, metrics, strategies } = calculateScoreDetails(meters);

  // Apply difficulty score multiplier
  const finalScore = Math.round(score * difficultyConfig.scoreMultiplier);

  // Handle power-up usage
  const handleUsePowerUp = useCallback((type: string) => {
    const powerUpType = type as PowerUpType;

    if (powerUps.available[powerUpType] <= 0) return;

    playSound("powerUp");

    setPowerUps((prev) => ({
      ...prev,
      available: {
        ...prev.available,
        [powerUpType]: prev.available[powerUpType] - 1,
      },
      active: {
        ...prev.active,
        ...(powerUpType === "shield" && { shield: true }),
        ...(powerUpType === "doublePoints" && { doublePoints: 3 }),
        ...(powerUpType === "reveal" && { revealed: true }),
      },
    }));

    // Handle immediate effects
    if (powerUpType === "heal") {
      setMeters((prev) => ({
        ...prev,
        publicPatience: clamp(prev.publicPatience + 25, 0, 100),
      }));
      addFloatingText("+25 ধৈর্য", window.innerWidth / 2, window.innerHeight / 2, "green", "text-2xl");
    }

    if (powerUpType === "skip") {
      // Skip to next problem without penalty
      const recentlyUsed = [...usedProblems, problemIndex].slice(-Math.min(10, PROBLEMS.length - 1));
      const nextProblemIndex = getRandomIndex(PROBLEMS.length, recentlyUsed);
      setProblemIndex(nextProblemIndex);
      setUsedProblems((prev) => [...prev, problemIndex].slice(-10));
      setRound((prev) => prev + 1);
    }

    if (powerUpType === "reveal") {
      // Reveal the correct answer
      const correctTag = problem.correctTags?.[0] || null;
      setRevealedCorrectTag(correctTag);
    }
  }, [powerUps, playSound, problemIndex, usedProblems, problem, addFloatingText]);

  // Handle adjustment action
  const handleAdjustment = useCallback((action: Adjustment) => {
    if (ending) return;

    const nextRound = round + 1;
    const chaosIncrease = difficultyConfig.chaosIncreaseBase +
      Math.floor(nextRound * difficultyConfig.chaosIncreasePerRound);
    const newChaos = clamp(meters.chaos + chaosIncrease, 0, 100);

    // Check if this is a proper adjustment for the current problem
    const isProperAdjustment = problem.adjustment
      ? action.label === problem.adjustment
      : problem.correctTags?.includes(action.tag) ?? false;

    // Calculate patience change with difficulty multipliers
    let patienceChange: number;
    if (isProperAdjustment) {
      patienceChange = Math.round(
        (8 + Math.floor(nextRound / 3)) * difficultyConfig.patienceGainMultiplier
      );
    } else {
      // Check if shield is active
      if (powerUps.active.shield) {
        patienceChange = 0;
        setPowerUps((prev) => ({
          ...prev,
          active: { ...prev.active, shield: false },
        }));
        addFloatingText("🛡️ শিল্ড!", window.innerWidth / 2, window.innerHeight / 2, "gold", "text-2xl");
      } else {
        patienceChange = -Math.round(
          (6 + Math.floor(newChaos / 15)) * difficultyConfig.patienceDecayMultiplier
        );
      }
    }

    const newPatience = clamp(meters.publicPatience + patienceChange, 0, 100);

    // Track minimum patience for comeback achievement
    if (newPatience < minPatience) {
      setMinPatience(newPatience);
    }

    const noiseIncrease = Math.round(
      (6 + (action.tag === "announce" ? 10 : 0)) * difficultyConfig.mediaNoiseMultiplier
    );
    const newNoise = clamp(meters.mediaNoise + noiseIncrease, 0, 100);

    // Track all strategy counts
    const committeeCount = meters.committeeCount + (action.tag === "committee" ? 1 : 0);
    const announcementCount = meters.announcementCount + (action.tag === "announce" ? 1 : 0);
    const silentCount = meters.silentCount + (action.tag === "silent" ? 1 : 0);
    const delayCount = meters.delayCount + (action.tag === "delay" ? 1 : 0);
    const blameCount = meters.blameCount + (action.tag === "blame" ? 1 : 0);
    const investigateCount = meters.investigateCount + (action.tag === "investigate" ? 1 : 0);

    // Track correct strategy counts
    const correctCommitteeCount = meters.correctCommitteeCount +
      (isProperAdjustment && action.tag === "committee" ? 1 : 0);
    const correctAnnouncementCount = meters.correctAnnouncementCount +
      (isProperAdjustment && action.tag === "announce" ? 1 : 0);
    const correctSilentCount = meters.correctSilentCount +
      (isProperAdjustment && action.tag === "silent" ? 1 : 0);
    const correctDelayCount = meters.correctDelayCount +
      (isProperAdjustment && action.tag === "delay" ? 1 : 0);
    const correctBlameCount = meters.correctBlameCount +
      (isProperAdjustment && action.tag === "blame" ? 1 : 0);
    const correctInvestigateCount = meters.correctInvestigateCount +
      (isProperAdjustment && action.tag === "investigate" ? 1 : 0);

    // Track streak
    const newStreak = isProperAdjustment ? meters.streak + 1 : 0;
    const newMaxStreak = Math.max(meters.maxStreak, newStreak);

    // Track patience changes
    const patienceGained = patienceChange > 0 ? patienceChange : 0;
    const patienceLost = patienceChange < 0 ? Math.abs(patienceChange) : 0;

    // Visual and audio feedback
    if (isProperAdjustment) {
      playSound("correct");
      setShowCorrectFlash(true);
      setTimeout(() => setShowCorrectFlash(false), 300);

      // Calculate points for floating text
      let points = 80;
      if (powerUps.active.doublePoints > 0) {
        points *= 2;
        setPowerUps((prev) => ({
          ...prev,
          active: { ...prev.active, doublePoints: prev.active.doublePoints - 1 },
        }));
      }
      addFloatingText(`+${points}`, window.innerWidth / 2 - 50, window.innerHeight / 2, "green");

      // Streak effects
      if (newStreak >= 3) {
        setShowStreakFire(true);
        setTimeout(() => setShowStreakFire(false), 2000);

        if (newStreak === 5 || newStreak === 10) {
          playSound("streak");
        }
      }
    } else {
      playSound("wrong");
      setShowWrongFlash(true);
      shake("medium");
      setTimeout(() => setShowWrongFlash(false), 300);

      if (patienceChange !== 0) {
        addFloatingText(`${patienceChange} ধৈর্য`, window.innerWidth / 2 + 50, window.innerHeight / 2, "red");
      }
    }

    // Get next random problem, avoiding recently used ones
    const recentlyUsed = [...usedProblems, problemIndex].slice(-Math.min(10, PROBLEMS.length - 1));
    const nextProblemIndex = getRandomIndex(PROBLEMS.length, recentlyUsed);

    const adjustSuffix = newChaos > 55 ? " অ্যাডজাস্ট। অ্যাডজাস্ট।" : "";
    const officialMessage = getRandomItem(OFFICIAL_LINES) + adjustSuffix;
    const publicMessage = getRandomItem(PUBLIC_REACTIONS);

    // Resolve ending with difficulty-adjusted thresholds
    const nextEnding = resolveEnding({
      round: nextRound,
      committeeCount,
      announcementCount,
      silentCount,
      publicPatience: newPatience,
      // Pass difficulty thresholds
      committeeLimitForEnding: difficultyConfig.committeeLimitForEnding,
      announcementLimitForEnding: difficultyConfig.announcementLimitForEnding,
      silentLimitForEnding: difficultyConfig.silentLimitForEnding,
      silentLimitRoundThreshold: difficultyConfig.silentLimitRoundThreshold,
    });

    // Update meters state
    setMeters({
      publicPatience: newPatience,
      chaos: newChaos,
      mediaNoise: newNoise,
      adjustmentCount: meters.adjustmentCount + 1,
      correctAdjustmentCount: meters.correctAdjustmentCount + (isProperAdjustment ? 1 : 0),
      committeeCount,
      correctCommitteeCount,
      announcementCount,
      correctAnnouncementCount,
      silentCount,
      correctSilentCount,
      delayCount,
      correctDelayCount,
      blameCount,
      correctBlameCount,
      investigateCount,
      correctInvestigateCount,
      streak: newStreak,
      maxStreak: newMaxStreak,
      totalPatienceGained: meters.totalPatienceGained + patienceGained,
      totalPatienceLost: meters.totalPatienceLost + patienceLost,
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

    // Reset reveal state
    setRevealedCorrectTag(null);
    setPowerUps((prev) => ({
      ...prev,
      active: { ...prev.active, revealed: false },
    }));

    // Handle game ending
    if (nextEnding) {
      handleGameEnd(nextEnding, {
        ...meters,
        publicPatience: newPatience,
        chaos: newChaos,
        mediaNoise: newNoise,
        adjustmentCount: meters.adjustmentCount + 1,
        correctAdjustmentCount: meters.correctAdjustmentCount + (isProperAdjustment ? 1 : 0),
        committeeCount,
        correctCommitteeCount,
        announcementCount,
        correctAnnouncementCount,
        silentCount,
        correctSilentCount,
        delayCount,
        correctDelayCount,
        blameCount,
        correctBlameCount,
        investigateCount,
        correctInvestigateCount,
        streak: newStreak,
        maxStreak: newMaxStreak,
        totalPatienceGained: meters.totalPatienceGained + patienceGained,
        totalPatienceLost: meters.totalPatienceLost + patienceLost,
      }, nextRound);
    }
  }, [
    ending, round, meters, problem, problemText, problemIndex, usedProblems, powerUps,
    difficultyConfig, playSound, shake, addFloatingText, minPatience
  ]);

  // Handle game end - check achievements, save to leaderboard
  const handleGameEnd = useCallback((gameEnding: Ending, finalMeters: Meters, finalRound: number) => {
    playSound("gameOver");

    // Calculate final metrics
    const accuracy = finalMeters.adjustmentCount > 0
      ? Math.round((finalMeters.correctAdjustmentCount / finalMeters.adjustmentCount) * 100)
      : 0;

    const efficiencyIndex = metrics?.efficiencyIndex || 0;

    // Check if this is a "win" (not patience exhaustion)
    const isWin = gameEnding.type !== "patience_exhaustion";

    // Create game end state for achievement checking
    const gradeInfo = getGradeInfo(finalScore);
    const gameEndState: GameEndState = {
      score: finalScore,
      grade: gradeInfo.grade,
      rounds: finalRound,
      accuracy,
      efficiency: efficiencyIndex,
      streak: finalMeters.maxStreak,
      chaos: finalMeters.chaos,
      patience: finalMeters.publicPatience,
      minPatience,
      mediaNoise: finalMeters.mediaNoise,
      committees: finalMeters.committeeCount,
      correctCommittees: finalMeters.correctCommitteeCount,
      announcements: finalMeters.announcementCount,
      correctAnnouncements: finalMeters.correctAnnouncementCount,
      blames: finalMeters.blameCount,
      correctBlames: finalMeters.correctBlameCount,
      delays: finalMeters.delayCount,
      correctDelays: finalMeters.correctDelayCount,
      investigations: finalMeters.investigateCount,
      correctInvestigations: finalMeters.correctInvestigateCount,
      silent: finalMeters.silentCount,
      correctSilent: finalMeters.correctSilentCount,
      adjustments: finalMeters.adjustmentCount,
      isWin,
    };

    // Check achievements
    if (achievements) {
      const newAchievementState = checkAchievements(achievements, gameEndState);
      setAchievements(newAchievementState);
      saveAchievements(newAchievementState);

      // Show newly unlocked achievement
      if (newAchievementState.newlyUnlocked.length > 0) {
        const firstNew = getAchievement(newAchievementState.newlyUnlocked[0]);
        if (firstNew) {
          playSound("achievement");
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);

          setNewAchievement({
            title: firstNew.title,
            titleBn: firstNew.titleBn,
            icon: firstNew.icon,
            rarity: firstNew.rarity,
          });
        }
      }
    }

    // Save to leaderboard
    const playerName = typeof window !== "undefined"
      ? localStorage.getItem("player_name") || "অজ্ঞাত"
      : "অজ্ঞাত";

    saveToLeaderboard({
      name: playerName,
      score: finalScore,
      grade: gradeInfo.grade,
      difficulty,
      rounds: finalRound,
      accuracy,
    });

    // Show confetti for good grades
    if (gradeInfo.grade === "S" || gradeInfo.grade === "A") {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  }, [achievements, finalScore, professional, difficulty, metrics, minPatience, playSound]);

  // Reset game
  const resetGame = useCallback(() => {
    setStarted(false);
    setRound(0);
    setProblemIndex(getRandomIndex(PROBLEMS.length));
    setUsedProblems([]);
    setOfficialLine("সিস্টেম প্রস্তুত। অ্যাডজাস্ট দিন।");
    setPublicLine("জনগণের ধৈর্য স্থিতিশীল।");
    setLog([]);
    setEnding(null);
    setScoreOpen(false);
    setMeters(createInitialMeters(difficulty));
    setPowerUps(createInitialPowerUpState(DIFFICULTY_CONFIGS[difficulty]));
    setMinPatience(DIFFICULTY_CONFIGS[difficulty].initialPatience);
    setRevealedCorrectTag(null);
    setShowShareModal(false);
  }, [difficulty]);

  // Handle difficulty change
  const handleDifficultyChange = useCallback((newDifficulty: DifficultyLevel) => {
    setDifficulty(newDifficulty);
    setMeters(createInitialMeters(newDifficulty));
    setPowerUps(createInitialPowerUpState(DIFFICULTY_CONFIGS[newDifficulty]));
    setMinPatience(DIFFICULTY_CONFIGS[newDifficulty].initialPatience);
  }, []);

  // Start game handler
  const handleStartGame = useCallback(() => {
    playSound("click");
    setStarted(true);
  }, [playSound]);

  return (
    <div className={`min-h-screen px-4 py-10 text-[var(--ink)] sm:px-8 lg:px-12 ${shakeClass}`}>
      {/* Visual Effects */}
      <Confetti active={showConfetti} />
      <StreakFire streak={meters.streak} show={showStreakFire} />
      <FlashOverlay active={showCorrectFlash} color="green" />
      <FlashOverlay active={showWrongFlash} color="red" />
      <FloatingTextContainer />
      <AchievementPopup
        achievement={newAchievement}
        onClose={() => setNewAchievement(null)}
      />

      {/* Tutorial */}
      <Tutorial
        isActive={showTutorial}
        onComplete={completeTutorial}
        onSkip={skipTutorial}
      />

      {/* Modals */}
      {showDifficultyModal && (
        <DifficultySelector
          currentDifficulty={difficulty}
          onSelect={handleDifficultyChange}
          onClose={() => setShowDifficultyModal(false)}
        />
      )}

      {showAchievementsModal && (
        <AchievementsModal onClose={() => setShowAchievementsModal(false)} />
      )}

      {showLeaderboardModal && (
        <LeaderboardModal onClose={() => setShowLeaderboardModal(false)} />
      )}

      {showSettingsModal && (
        <SettingsModal
          settings={{ soundEnabled, soundVolume: volume }}
          onUpdateSettings={(newSettings) => {
            if (newSettings.soundEnabled !== undefined) toggleSound();
            if (newSettings.soundVolume !== undefined) setVolume(newSettings.soundVolume);
          }}
          onClose={() => setShowSettingsModal(false)}
          onRestartTutorial={restartTutorial}
        />
      )}

      {showShareModal && ending && (
        <ShareableResult
          score={finalScore}
          grade={getGradeInfo(finalScore).grade}
          ending={ending}
          stats={{
            rounds: round,
            adjustmentCount: meters.adjustmentCount,
            accuracy: meters.adjustmentCount > 0
              ? Math.round((meters.correctAdjustmentCount / meters.adjustmentCount) * 100)
              : 0,
            maxStreak: meters.maxStreak,
          }}
          metrics={metrics}
          onClose={() => setShowShareModal(false)}
        />
      )}

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <Header
          title="অ্যাডজাস্ট করে নেন"
          subtitle="সব সমস্যার সমাধান একটাই — অ্যাডজাস্ট করে নেন। আপনি সিস্টেম। ঘোষণাই বাস্তবতা।"
        />

        {/* Quick Menu Bar */}
        {!started && (
          <div className="flex justify-center">
            <QuickMenuBar
              currentDifficulty={difficulty}
              onOpenDifficulty={() => setShowDifficultyModal(true)}
              onOpenAchievements={() => setShowAchievementsModal(true)}
              onOpenLeaderboard={() => setShowLeaderboardModal(true)}
              onOpenSettings={() => setShowSettingsModal(true)}
            />
          </div>
        )}

        <StartPanel started={started} onStart={handleStartGame} />

        {started ? (
          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Power-ups bar */}
            {difficultyConfig.powerUpsEnabled && (
              <div className="lg:col-span-2 flex justify-center" data-tutorial="powerups">
                <PowerUpsBar
                  powerUps={powerUps.available}
                  onUsePowerUp={handleUsePowerUp}
                  disabled={Boolean(ending)}
                />
              </div>
            )}

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
              <div data-tutorial="adjustments">
                <AdjustmentGrid
                  onAdjust={handleAdjustment}
                  disabled={Boolean(ending)}
                  round={round}
                  correctTags={problem.correctTags}
                  correctAdjustmentLabel={problem.adjustment}
                  revealedTag={revealedCorrectTag}
                />
              </div>
            </ProblemPanel>

            <SidePanel>
              <ControlPanel
                score={finalScore}
                onStop={() => setScoreOpen(true)}
                disabled={Boolean(ending)}
              />
              <OfficialMessage
                officialLine={officialLine}
                publicLine={publicLine}
              />
              <div data-tutorial="meters">
                <Dossier meters={meters} metrics={metrics} strategies={strategies} />
              </div>
              <ActivityLog log={log} />
            </SidePanel>
          </section>
        ) : null}

        {scoreOpen ? (
          <ScoreModal
            score={finalScore}
            breakdown={breakdown}
            onContinue={() => setScoreOpen(false)}
            onEnd={resetGame}
          />
        ) : null}

        {ending ? (
          <>
            <EndingModal
              ending={ending}
              score={finalScore}
              breakdown={detailedBreakdown}
              stats={{
                rounds: round,
                adjustmentCount: meters.adjustmentCount,
                committeeCount: meters.committeeCount,
                announcementCount: meters.announcementCount,
              }}
              professional={professional}
              metrics={metrics}
              strategies={strategies}
              onRestart={resetGame}
            />
            {/* Share button overlay - responsive positioning */}
            <div className="fixed bottom-3 right-3 z-[60] sm:bottom-4 sm:right-4 lg:bottom-6 lg:right-6">
              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-deep)] text-white text-xs font-bold shadow-lg hover:scale-105 active:scale-95 transition-transform sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                শেয়ার করুন
              </button>
            </div>
          </>
        ) : null}

        <FooterCredit />
      </main>
    </div>
  );
}
