import type {
  Meters,
  StrategyStats,
  PerformanceMetrics,
  DetailedBreakdown,
} from "@/components/types";

export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

// Strategy tag labels in Bengali
const STRATEGY_LABELS: Record<string, string> = {
  committee: "কমিটি",
  announce: "ঘোষণা",
  delay: "বিলম্ব",
  blame: "দায়",
  investigate: "তদন্ত",
  silent: "নীরবতা",
};

// Calculate strategy-wise statistics
export const calculateStrategyStats = (meters: Meters): StrategyStats[] => {
  const strategies = [
    {
      tag: "committee",
      total: meters.committeeCount,
      correct: meters.correctCommitteeCount,
    },
    {
      tag: "announce",
      total: meters.announcementCount,
      correct: meters.correctAnnouncementCount,
    },
    {
      tag: "delay",
      total: meters.delayCount,
      correct: meters.correctDelayCount,
    },
    {
      tag: "blame",
      total: meters.blameCount,
      correct: meters.correctBlameCount,
    },
    {
      tag: "investigate",
      total: meters.investigateCount,
      correct: meters.correctInvestigateCount,
    },
    {
      tag: "silent",
      total: meters.silentCount,
      correct: meters.correctSilentCount,
    },
  ];

  return strategies.map((s) => ({
    tag: s.tag,
    label: STRATEGY_LABELS[s.tag],
    total: s.total,
    correct: s.correct,
    accuracy: s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0,
  }));
};

// Calculate professional performance metrics
export const calculatePerformanceMetrics = (
  meters: Meters
): PerformanceMetrics => {
  // Accuracy Rate: % of correct adjustments
  const accuracyRate =
    meters.adjustmentCount > 0
      ? Math.round((meters.correctAdjustmentCount / meters.adjustmentCount) * 100)
      : 0;

  // Efficiency Index: Points gained per adjustment (0-100 scale)
  const basePointsPerAdjustment = 80;
  const actualPointsPerAdjustment =
    meters.adjustmentCount > 0
      ? (meters.correctAdjustmentCount * basePointsPerAdjustment) /
        meters.adjustmentCount
      : 0;
  const efficiencyIndex = Math.round(
    (actualPointsPerAdjustment / basePointsPerAdjustment) * 100
  );

  // Strategy Diversity: How many different strategies were used (0-100)
  const usedStrategies = [
    meters.committeeCount,
    meters.announcementCount,
    meters.delayCount,
    meters.blameCount,
    meters.investigateCount,
    meters.silentCount,
  ].filter((c) => c > 0).length;
  const strategyDiversity = Math.round((usedStrategies / 6) * 100);

  // Streak Bonus: Reward for consecutive correct answers
  const streakBonus = Math.min(meters.maxStreak * 15, 100);

  // Stability Score: Based on patience management (0-100)
  const totalPatienceChange =
    meters.totalPatienceGained + meters.totalPatienceLost;
  const stabilityScore =
    totalPatienceChange > 0
      ? Math.round(
          (meters.totalPatienceGained / totalPatienceChange) * 100
        )
      : 50;

  // Risk Factor: How much chaos was generated vs controlled (0-100)
  const riskFactor = Math.round(
    (meters.chaos / Math.max(meters.adjustmentCount * 10, 1)) * 100
  );

  return {
    accuracyRate,
    efficiencyIndex,
    strategyDiversity,
    streakBonus,
    stabilityScore,
    riskFactor: clamp(riskFactor, 0, 100),
  };
};

// Calculate penalty for a strategy
const calculateStrategyPenalty = (
  total: number,
  correct: number,
  wrongMultiplier: number,
  correctMultiplier: number
): number => {
  return (total - correct) * wrongMultiplier + correct * correctMultiplier;
};

// Professional score calculation with detailed breakdown
export const calculateProfessionalScore = (
  meters: Meters
): DetailedBreakdown => {
  // Base scores
  const base = {
    adjustments: meters.correctAdjustmentCount * 80,
    chaos: meters.chaos * 3,
    media: meters.mediaNoise * 2,
    patience: meters.publicPatience,
  };

  // Bonuses
  const metrics = calculatePerformanceMetrics(meters);
  const bonuses = {
    streak: Math.min(meters.maxStreak * 12, 60),
    accuracy: metrics.accuracyRate >= 70 ? Math.floor((metrics.accuracyRate - 70) * 1.5) : 0,
    efficiency: metrics.efficiencyIndex >= 50 ? Math.floor((metrics.efficiencyIndex - 50) * 0.8) : 0,
    diversity: metrics.strategyDiversity >= 50 ? Math.floor((metrics.strategyDiversity - 50) * 0.5) : 0,
  };

  // Penalties
  const penalties = {
    committees: calculateStrategyPenalty(
      meters.committeeCount,
      meters.correctCommitteeCount,
      25,
      12
    ),
    announcements: calculateStrategyPenalty(
      meters.announcementCount,
      meters.correctAnnouncementCount,
      15,
      7
    ),
    silent: calculateStrategyPenalty(
      meters.silentCount,
      meters.correctSilentCount,
      35,
      18
    ),
    delay: calculateStrategyPenalty(
      meters.delayCount,
      meters.correctDelayCount,
      20,
      10
    ),
    blame: calculateStrategyPenalty(
      meters.blameCount,
      meters.correctBlameCount,
      18,
      9
    ),
    investigate: calculateStrategyPenalty(
      meters.investigateCount,
      meters.correctInvestigateCount,
      22,
      11
    ),
  };

  const baseTotal = base.adjustments + base.chaos + base.media + base.patience;
  const bonusTotal =
    bonuses.streak + bonuses.accuracy + bonuses.efficiency + bonuses.diversity;
  const penaltyTotal =
    penalties.committees +
    penalties.announcements +
    penalties.silent +
    penalties.delay +
    penalties.blame +
    penalties.investigate;

  const total = Math.max(0, Math.round(baseTotal + bonusTotal - penaltyTotal));

  return { base, bonuses, penalties, total };
};

// Legacy score calculation (for backward compatibility)
export const calculateScore = (meters: Meters) => {
  const result = calculateProfessionalScore(meters);
  return result.total;
};

export const calculateScoreDetails = (meters: Meters) => {
  const professional = calculateProfessionalScore(meters);
  const metrics = calculatePerformanceMetrics(meters);
  const strategies = calculateStrategyStats(meters);

  // Legacy breakdown for ScoreModal
  const breakdown = [
    `অ্যাডজাস্ট পয়েন্ট: ${professional.base.adjustments}`,
    `বিশৃঙ্খলা পয়েন্ট: ${professional.base.chaos}`,
    `মিডিয়া চিৎকার: ${professional.base.media}`,
    `ধৈর্য বোনাস: ${professional.base.patience}`,
    `স্ট্রিক বোনাস: +${professional.bonuses.streak}`,
    `নির্ভুলতা বোনাস: +${professional.bonuses.accuracy}`,
    `কমিটি কাটছাঁট: -${professional.penalties.committees}`,
    `ঘোষণা কাটছাঁট: -${professional.penalties.announcements}`,
    `নীরবতা কাটছাঁট: -${professional.penalties.silent}`,
  ];

  // Detailed breakdown for EndingModal (legacy format)
  const detailedBreakdown = {
    adjustments: professional.base.adjustments,
    chaos: professional.base.chaos,
    media: professional.base.media,
    patience: professional.base.patience,
    committees: professional.penalties.committees,
    announcements: professional.penalties.announcements,
    silent: professional.penalties.silent,
  };

  return {
    score: professional.total,
    breakdown,
    detailedBreakdown,
    professional,
    metrics,
    strategies,
  };
};
