export type Problem = {
  adjustment: string;
  category: string;
  base: string;
  escalations: string[];
  correctTags?: ("committee" | "announce" | "delay" | "blame" | "investigate" | "silent")[];
};

export type Adjustment = {
  label: string;
  tag: "committee" | "announce" | "delay" | "blame" | "investigate" | "silent";
  result: string;
};

export type LogEntry = {
  round: number;
  problem: string;
  action: string;
  result: string;
};

export type EndingType = "patience_exhaustion" | "silent_overuse" | "committee_overflow" | "announcement_saturation" | "success";

export type Ending = {
  title: string;
  message: string;
  grade?: string;
  subtitle?: string;
  type?: EndingType;
};

export type Meters = {
  publicPatience: number;
  chaos: number;
  mediaNoise: number;
  adjustmentCount: number;
  correctAdjustmentCount: number;
  committeeCount: number;
  correctCommitteeCount: number;
  announcementCount: number;
  correctAnnouncementCount: number;
  silentCount: number;
  correctSilentCount: number;
  // Professional metrics
  delayCount: number;
  correctDelayCount: number;
  blameCount: number;
  correctBlameCount: number;
  investigateCount: number;
  correctInvestigateCount: number;
  streak: number;
  maxStreak: number;
  totalPatienceGained: number;
  totalPatienceLost: number;
};

// Professional analytics types
export type StrategyStats = {
  tag: string;
  label: string;
  total: number;
  correct: number;
  accuracy: number;
};

export type PerformanceMetrics = {
  accuracyRate: number;
  efficiencyIndex: number;
  strategyDiversity: number;
  streakBonus: number;
  stabilityScore: number;
  riskFactor: number;
};

export type DetailedBreakdown = {
  base: {
    adjustments: number;
    chaos: number;
    media: number;
    patience: number;
  };
  bonuses: {
    streak: number;
    accuracy: number;
    efficiency: number;
    diversity: number;
  };
  penalties: {
    committees: number;
    announcements: number;
    silent: number;
    delay: number;
    blame: number;
    investigate: number;
  };
  total: number;
};
