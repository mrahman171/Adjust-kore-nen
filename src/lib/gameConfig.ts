// Game Configuration - Difficulty Modes and Power-ups

export type DifficultyLevel = "easy" | "normal" | "hard" | "disaster";

export interface DifficultyConfig {
  id: DifficultyLevel;
  name: string;
  nameBn: string;
  description: string;
  descriptionBn: string;
  icon: string;
  color: string;

  // Gameplay modifiers
  initialPatience: number;
  patienceDecayMultiplier: number; // How much patience decreases per wrong answer
  patienceGainMultiplier: number; // How much patience increases per correct answer
  chaosIncreaseBase: number;
  chaosIncreasePerRound: number;
  mediaNoiseMultiplier: number;

  // Ending thresholds
  committeeLimitForEnding: number;
  announcementLimitForEnding: number;
  silentLimitForEnding: number;
  silentLimitRoundThreshold: number;

  // Score multiplier
  scoreMultiplier: number;

  // Power-up availability
  powerUpsEnabled: boolean;
  startingPowerUps: number;
}

export const DIFFICULTY_CONFIGS: Record<DifficultyLevel, DifficultyConfig> = {
  easy: {
    id: "easy",
    name: "Easy",
    nameBn: "সহজ",
    description: "Relaxed mode for learning the ropes",
    descriptionBn: "শেখার জন্য আরামদায়ক মোড",
    icon: "🌱",
    color: "from-green-400 to-emerald-500",

    initialPatience: 100,
    patienceDecayMultiplier: 0.6,
    patienceGainMultiplier: 1.3,
    chaosIncreaseBase: 5,
    chaosIncreasePerRound: 0.3,
    mediaNoiseMultiplier: 0.7,

    committeeLimitForEnding: 6,
    announcementLimitForEnding: 6,
    silentLimitForEnding: 3,
    silentLimitRoundThreshold: 6,

    scoreMultiplier: 0.8,
    powerUpsEnabled: true,
    startingPowerUps: 3,
  },

  normal: {
    id: "normal",
    name: "Normal",
    nameBn: "সাধারণ",
    description: "The standard bureaucratic experience",
    descriptionBn: "স্ট্যান্ডার্ড আমলাতান্ত্রিক অভিজ্ঞতা",
    icon: "⚖️",
    color: "from-blue-400 to-indigo-500",

    initialPatience: 100,
    patienceDecayMultiplier: 1.0,
    patienceGainMultiplier: 1.0,
    chaosIncreaseBase: 8,
    chaosIncreasePerRound: 0.5,
    mediaNoiseMultiplier: 1.0,

    committeeLimitForEnding: 4,
    announcementLimitForEnding: 4,
    silentLimitForEnding: 2,
    silentLimitRoundThreshold: 4,

    scoreMultiplier: 1.0,
    powerUpsEnabled: true,
    startingPowerUps: 2,
  },

  hard: {
    id: "hard",
    name: "Hard",
    nameBn: "কঠিন",
    description: "For experienced crisis managers",
    descriptionBn: "অভিজ্ঞ ক্রাইসিস ম্যানেজারদের জন্য",
    icon: "🔥",
    color: "from-orange-400 to-red-500",

    initialPatience: 80,
    patienceDecayMultiplier: 1.3,
    patienceGainMultiplier: 0.8,
    chaosIncreaseBase: 10,
    chaosIncreasePerRound: 0.7,
    mediaNoiseMultiplier: 1.3,

    committeeLimitForEnding: 3,
    announcementLimitForEnding: 3,
    silentLimitForEnding: 2,
    silentLimitRoundThreshold: 3,

    scoreMultiplier: 1.3,
    powerUpsEnabled: true,
    startingPowerUps: 1,
  },

  disaster: {
    id: "disaster",
    name: "Disaster",
    nameBn: "দুর্যোগ",
    description: "Total administrative chaos!",
    descriptionBn: "সম্পূর্ণ প্রশাসনিক বিশৃঙ্খলা!",
    icon: "💀",
    color: "from-red-500 to-purple-600",

    initialPatience: 60,
    patienceDecayMultiplier: 1.6,
    patienceGainMultiplier: 0.6,
    chaosIncreaseBase: 12,
    chaosIncreasePerRound: 1.0,
    mediaNoiseMultiplier: 1.5,

    committeeLimitForEnding: 3,
    announcementLimitForEnding: 3,
    silentLimitForEnding: 1,
    silentLimitRoundThreshold: 2,

    scoreMultiplier: 1.8,
    powerUpsEnabled: false,
    startingPowerUps: 0,
  },
};

// Power-ups system
export type PowerUpType = "skip" | "reveal" | "heal" | "shield" | "doublePoints";

export interface PowerUp {
  id: PowerUpType;
  name: string;
  nameBn: string;
  description: string;
  descriptionBn: string;
  icon: string;
  color: string;
  maxUses: number;
}

export const POWER_UPS: Record<PowerUpType, PowerUp> = {
  skip: {
    id: "skip",
    name: "Skip Problem",
    nameBn: "সমস্যা এড়িয়ে যান",
    description: "Skip the current problem without penalty",
    descriptionBn: "কোনো পেনাল্টি ছাড়াই বর্তমান সমস্যা এড়িয়ে যান",
    icon: "⏭️",
    color: "from-blue-400 to-cyan-500",
    maxUses: 2,
  },

  reveal: {
    id: "reveal",
    name: "Reveal Answer",
    nameBn: "উত্তর প্রকাশ",
    description: "Highlight the correct adjustment",
    descriptionBn: "সঠিক অ্যাডজাস্টমেন্ট হাইলাইট করুন",
    icon: "👁️",
    color: "from-purple-400 to-violet-500",
    maxUses: 2,
  },

  heal: {
    id: "heal",
    name: "Restore Patience",
    nameBn: "ধৈর্য পুনরুদ্ধার",
    description: "Restore 25 public patience",
    descriptionBn: "২৫ জনগণের ধৈর্য পুনরুদ্ধার করুন",
    icon: "💊",
    color: "from-green-400 to-emerald-500",
    maxUses: 2,
  },

  shield: {
    id: "shield",
    name: "Shield",
    nameBn: "শিল্ড",
    description: "Block the next wrong answer's patience loss",
    descriptionBn: "পরবর্তী ভুল উত্তরের ধৈর্য হ্রাস ব্লক করুন",
    icon: "🛡️",
    color: "from-amber-400 to-yellow-500",
    maxUses: 1,
  },

  doublePoints: {
    id: "doublePoints",
    name: "Double Points",
    nameBn: "ডাবল পয়েন্ট",
    description: "Double points for next 3 correct answers",
    descriptionBn: "পরবর্তী ৩টি সঠিক উত্তরে ডাবল পয়েন্ট",
    icon: "✨",
    color: "from-yellow-400 to-orange-500",
    maxUses: 1,
  },
};

// Power-up state interface
export interface PowerUpState {
  available: {
    [K in PowerUpType]: number;
  };
  active: {
    shield: boolean;
    doublePoints: number; // Remaining double point rounds
    revealed: boolean; // Whether current problem answer is revealed
  };
}

export const createInitialPowerUpState = (difficulty: DifficultyConfig): PowerUpState => {
  const powerUpsPerType = Math.floor(difficulty.startingPowerUps / 3);
  const remainder = difficulty.startingPowerUps % 3;

  return {
    available: {
      skip: powerUpsPerType + (remainder > 0 ? 1 : 0),
      reveal: powerUpsPerType + (remainder > 1 ? 1 : 0),
      heal: powerUpsPerType,
      shield: difficulty.startingPowerUps > 2 ? 1 : 0,
      doublePoints: difficulty.startingPowerUps > 3 ? 1 : 0,
    },
    active: {
      shield: false,
      doublePoints: 0,
      revealed: false,
    },
  };
};

// Daily challenge configuration
export interface DailyChallenge {
  date: string; // YYYY-MM-DD
  seed: number;
  difficulty: DifficultyLevel;
  specialRules: {
    onlyCommittees?: boolean;
    noAnnouncements?: boolean;
    doubleMediaNoise?: boolean;
    halfPatience?: boolean;
    bonusObjective?: {
      type: "streak" | "accuracy" | "rounds" | "noStrategy";
      target: number;
      strategyTag?: string;
      bonusPoints: number;
    };
  };
  bonusPoints: number;
}

// Generate daily challenge based on date
export function generateDailyChallenge(dateString?: string): DailyChallenge {
  const date = dateString || new Date().toISOString().split("T")[0];
  // Create a seed from the date
  const seed = date.split("-").reduce((acc, part) => acc * 31 + parseInt(part, 10), 0);

  // Use seed to determine challenge parameters
  const random = (max: number) => {
    const x = Math.sin(seed + max) * 10000;
    return Math.floor((x - Math.floor(x)) * max);
  };

  const difficulties: DifficultyLevel[] = ["normal", "hard", "hard", "disaster"];
  const difficulty = difficulties[random(4)];

  const specialRuleOptions = [
    { onlyCommittees: true },
    { noAnnouncements: true },
    { doubleMediaNoise: true },
    { halfPatience: true },
    {},
  ];
  const specialRules = specialRuleOptions[random(5)];

  const bonusObjectives = [
    { type: "streak" as const, target: 5, bonusPoints: 100 },
    { type: "accuracy" as const, target: 80, bonusPoints: 150 },
    { type: "rounds" as const, target: 10, bonusPoints: 120 },
    { type: "noStrategy" as const, target: 0, strategyTag: "silent", bonusPoints: 200 },
  ];
  const bonusObjective = bonusObjectives[random(4)];

  return {
    date,
    seed,
    difficulty,
    specialRules: {
      ...specialRules,
      bonusObjective,
    },
    bonusPoints: 50 + random(100),
  };
}

// Leaderboard entry
export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  grade: string;
  difficulty: DifficultyLevel;
  rounds: number;
  accuracy: number;
  date: string;
  isDaily?: boolean;
}

// Local storage keys
export const STORAGE_KEYS = {
  difficulty: "game_difficulty",
  leaderboard: "game_leaderboard",
  dailyChallengeCompleted: "daily_challenge_completed",
  dailyChallengeScore: "daily_challenge_score",
  playerName: "player_name",
  totalGamesPlayed: "total_games_played",
  settings: "game_settings",
};

// Load/Save leaderboard
export function loadLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") return [];

  try {
    const saved = localStorage.getItem(STORAGE_KEYS.leaderboard);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function saveToLeaderboard(entry: Omit<LeaderboardEntry, "id" | "date">): LeaderboardEntry[] {
  if (typeof window === "undefined") return [];

  const leaderboard = loadLeaderboard();
  const newEntry: LeaderboardEntry = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    date: new Date().toISOString(),
  };

  leaderboard.push(newEntry);

  // Sort by score descending, keep top 100
  const sorted = leaderboard
    .sort((a, b) => b.score - a.score)
    .slice(0, 100);

  localStorage.setItem(STORAGE_KEYS.leaderboard, JSON.stringify(sorted));

  return sorted;
}

// Game settings
export interface GameSettings {
  soundEnabled: boolean;
  soundVolume: number;
  musicEnabled: boolean;
  musicVolume: number;
  showTutorial: boolean;
  language: "bn" | "en";
  reducedMotion: boolean;
}

export const DEFAULT_SETTINGS: GameSettings = {
  soundEnabled: true,
  soundVolume: 0.5,
  musicEnabled: true,
  musicVolume: 0.3,
  showTutorial: true,
  language: "bn",
  reducedMotion: false,
};

export function loadSettings(): GameSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;

  try {
    const saved = localStorage.getItem(STORAGE_KEYS.settings);
    return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: Partial<GameSettings>): void {
  if (typeof window === "undefined") return;

  const current = loadSettings();
  const updated = { ...current, ...settings };
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(updated));
}
