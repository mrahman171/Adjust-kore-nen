// Achievement System for the game

export type AchievementId =
  | 'first_adjustment'
  | 'committee_king'
  | 'silent_ninja'
  | 'announcement_master'
  | 'blame_expert'
  | 'delay_tactician'
  | 'investigator'
  | 'perfect_round'
  | 'streak_5'
  | 'streak_10'
  | 'chaos_survivor'
  | 'patience_master'
  | 'media_manipulator'
  | 'grade_s'
  | 'grade_a'
  | 'grade_b'
  | 'first_game'
  | 'ten_games'
  | 'hundred_adjustments'
  | 'diversity_master'
  | 'efficiency_expert'
  | 'speed_demon'
  | 'comeback_kid'
  | 'all_strategies'
  | 'no_committees'
  | 'no_announcements'
  | 'high_scorer'
  | 'low_chaos'
  | 'full_patience'
  | 'marathon';

export interface Achievement {
  id: AchievementId;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  icon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  secret?: boolean;
  points: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  // Common achievements
  {
    id: 'first_adjustment',
    title: 'First Adjustment',
    titleBn: 'প্রথম অ্যাডজাস্টমেন্ট',
    description: 'Make your first adjustment',
    descriptionBn: 'আপনার প্রথম অ্যাডজাস্টমেন্ট করুন',
    icon: '🎯',
    rarity: 'common',
    points: 10,
  },
  {
    id: 'first_game',
    title: 'Welcome to Bureaucracy',
    titleBn: 'আমলাতন্ত্রে স্বাগতম',
    description: 'Complete your first game',
    descriptionBn: 'আপনার প্রথম গেম সম্পন্ন করুন',
    icon: '🏛️',
    rarity: 'common',
    points: 10,
  },
  {
    id: 'streak_5',
    title: 'On a Roll',
    titleBn: 'ধারাবাহিক সাফল্য',
    description: 'Get a 5 correct streak',
    descriptionBn: 'একটানা ৫টি সঠিক উত্তর দিন',
    icon: '🔥',
    rarity: 'common',
    points: 20,
  },
  {
    id: 'grade_b',
    title: 'Competent Officer',
    titleBn: 'দক্ষ কর্মকর্তা',
    description: 'Achieve Grade B or higher',
    descriptionBn: 'গ্রেড B বা তার উপরে অর্জন করুন',
    icon: '📋',
    rarity: 'common',
    points: 25,
  },

  // Uncommon achievements
  {
    id: 'committee_king',
    title: 'Committee King',
    titleBn: 'কমিটির রাজা',
    description: 'Form 10 committees in total across all games',
    descriptionBn: 'সব গেমে মোট ১০টি কমিটি গঠন করুন',
    icon: '👥',
    rarity: 'uncommon',
    points: 30,
  },
  {
    id: 'announcement_master',
    title: 'Announcement Master',
    titleBn: 'ঘোষণার মাস্টার',
    description: 'Make 15 announcements across all games',
    descriptionBn: 'সব গেমে মোট ১৫টি ঘোষণা দিন',
    icon: '📢',
    rarity: 'uncommon',
    points: 30,
  },
  {
    id: 'blame_expert',
    title: 'Blame Expert',
    titleBn: 'দায় বিশেষজ্ঞ',
    description: 'Successfully blame others 10 times',
    descriptionBn: 'সফলভাবে ১০ বার অন্যদের দোষ দিন',
    icon: '👉',
    rarity: 'uncommon',
    points: 30,
  },
  {
    id: 'delay_tactician',
    title: 'Delay Tactician',
    titleBn: 'বিলম্ব কৌশলী',
    description: 'Use delay strategy 12 times correctly',
    descriptionBn: 'সঠিকভাবে ১২ বার বিলম্ব কৌশল ব্যবহার করুন',
    icon: '⏳',
    rarity: 'uncommon',
    points: 30,
  },
  {
    id: 'investigator',
    title: 'Chief Investigator',
    titleBn: 'প্রধান তদন্তকারী',
    description: 'Launch 10 investigations across all games',
    descriptionBn: 'সব গেমে মোট ১০টি তদন্ত করুন',
    icon: '🔍',
    rarity: 'uncommon',
    points: 30,
  },
  {
    id: 'streak_10',
    title: 'Unstoppable',
    titleBn: 'অপ্রতিরোধ্য',
    description: 'Get a 10 correct streak',
    descriptionBn: 'একটানা ১০টি সঠিক উত্তর দিন',
    icon: '🔥',
    rarity: 'uncommon',
    points: 40,
  },
  {
    id: 'grade_a',
    title: 'Senior Officer',
    titleBn: 'সিনিয়র কর্মকর্তা',
    description: 'Achieve Grade A',
    descriptionBn: 'গ্রেড A অর্জন করুন',
    icon: '⭐',
    rarity: 'uncommon',
    points: 40,
  },
  {
    id: 'ten_games',
    title: 'Regular Employee',
    titleBn: 'নিয়মিত কর্মচারী',
    description: 'Play 10 games',
    descriptionBn: '১০টি গেম খেলুন',
    icon: '🎮',
    rarity: 'uncommon',
    points: 35,
  },

  // Rare achievements
  {
    id: 'silent_ninja',
    title: 'Silent Ninja',
    titleBn: 'নীরব নিঞ্জা',
    description: 'Use silence strategy correctly 5 times in one game',
    descriptionBn: 'এক গেমে সঠিকভাবে ৫ বার নীরবতা কৌশল ব্যবহার করুন',
    icon: '🤫',
    rarity: 'rare',
    points: 50,
  },
  {
    id: 'chaos_survivor',
    title: 'Chaos Survivor',
    titleBn: 'বিশৃঙ্খলার বীর',
    description: 'Win a game with chaos level above 90',
    descriptionBn: 'বিশৃঙ্খলা ৯০+ নিয়ে গেম জিতুন',
    icon: '🌀',
    rarity: 'rare',
    points: 50,
  },
  {
    id: 'patience_master',
    title: 'Patience Master',
    titleBn: 'ধৈর্যের মাস্টার',
    description: 'End a game with 80+ public patience',
    descriptionBn: '৮০+ জনগণের ধৈর্য নিয়ে গেম শেষ করুন',
    icon: '😌',
    rarity: 'rare',
    points: 50,
  },
  {
    id: 'media_manipulator',
    title: 'Media Manipulator',
    titleBn: 'মিডিয়া ম্যানিপুলেটর',
    description: 'Reach 100 media noise without ending the game',
    descriptionBn: 'গেম শেষ না করে মিডিয়া নয়েজ ১০০ করুন',
    icon: '📺',
    rarity: 'rare',
    points: 50,
  },
  {
    id: 'diversity_master',
    title: 'Diversity Master',
    titleBn: 'বৈচিত্র্য মাস্টার',
    description: 'Use all 6 strategies correctly in one game',
    descriptionBn: 'এক গেমে সব ৬টি কৌশল সঠিকভাবে ব্যবহার করুন',
    icon: '🎨',
    rarity: 'rare',
    points: 60,
  },
  {
    id: 'hundred_adjustments',
    title: 'Adjustment Veteran',
    titleBn: 'অ্যাডজাস্টমেন্ট অভিজ্ঞ',
    description: 'Make 100 total adjustments',
    descriptionBn: 'মোট ১০০টি অ্যাডজাস্টমেন্ট করুন',
    icon: '🔧',
    rarity: 'rare',
    points: 60,
  },
  {
    id: 'no_committees',
    title: 'Committee-Free',
    titleBn: 'কমিটি-মুক্ত',
    description: 'Win a game without forming any committees',
    descriptionBn: 'কোনো কমিটি না করে গেম জিতুন',
    icon: '🚫',
    rarity: 'rare',
    points: 50,
  },
  {
    id: 'no_announcements',
    title: 'Silent Administration',
    titleBn: 'নীরব প্রশাসন',
    description: 'Win a game without any announcements',
    descriptionBn: 'কোনো ঘোষণা না দিয়ে গেম জিতুন',
    icon: '🔇',
    rarity: 'rare',
    points: 50,
  },

  // Epic achievements
  {
    id: 'grade_s',
    title: 'Legendary Bureaucrat',
    titleBn: 'কিংবদন্তি আমলা',
    description: 'Achieve Grade S',
    descriptionBn: 'গ্রেড S অর্জন করুন',
    icon: '👑',
    rarity: 'epic',
    points: 100,
  },
  {
    id: 'perfect_round',
    title: 'Perfect Adjuster',
    titleBn: 'পারফেক্ট অ্যাডজাস্টার',
    description: 'Complete a game with 100% accuracy',
    descriptionBn: '১০০% নির্ভুলতায় গেম সম্পন্ন করুন',
    icon: '💯',
    rarity: 'epic',
    points: 100,
  },
  {
    id: 'high_scorer',
    title: 'High Scorer',
    titleBn: 'উচ্চ স্কোরার',
    description: 'Score 600 or more points',
    descriptionBn: '৬০০ বা তার বেশি পয়েন্ট অর্জন করুন',
    icon: '🏆',
    rarity: 'epic',
    points: 100,
  },
  {
    id: 'marathon',
    title: 'Marathon Runner',
    titleBn: 'ম্যারাথন রানার',
    description: 'Play 15+ rounds in a single game',
    descriptionBn: 'এক গেমে ১৫+ রাউন্ড খেলুন',
    icon: '🏃',
    rarity: 'epic',
    points: 80,
  },

  // Legendary achievements
  {
    id: 'comeback_kid',
    title: 'Comeback Kid',
    titleBn: 'কামব্যাক কিড',
    description: 'Win after patience dropped below 20',
    descriptionBn: 'ধৈর্য ২০ এর নিচে নামার পর জিতুন',
    icon: '🦸',
    rarity: 'legendary',
    points: 150,
    secret: true,
  },
  {
    id: 'all_strategies',
    title: 'Master of All',
    titleBn: 'সব কিছুর মাস্টার',
    description: 'Use every strategy at least 5 times correctly in one game',
    descriptionBn: 'এক গেমে প্রতিটি কৌশল অন্তত ৫ বার সঠিকভাবে ব্যবহার করুন',
    icon: '🎭',
    rarity: 'legendary',
    points: 200,
    secret: true,
  },
  {
    id: 'efficiency_expert',
    title: 'Efficiency Expert',
    titleBn: 'দক্ষতা বিশেষজ্ঞ',
    description: 'Achieve 90%+ efficiency index',
    descriptionBn: '৯০%+ দক্ষতা সূচক অর্জন করুন',
    icon: '⚡',
    rarity: 'legendary',
    points: 150,
  },
  {
    id: 'low_chaos',
    title: 'Order Keeper',
    titleBn: 'শৃঙ্খলা রক্ষক',
    description: 'Win with chaos below 30',
    descriptionBn: 'বিশৃঙ্খলা ৩০ এর নিচে রেখে জিতুন',
    icon: '☮️',
    rarity: 'legendary',
    points: 150,
    secret: true,
  },
  {
    id: 'full_patience',
    title: 'People\'s Champion',
    titleBn: 'জনগণের চ্যাম্পিয়ন',
    description: 'End a game with exactly 100 patience',
    descriptionBn: 'ঠিক ১০০ ধৈর্য নিয়ে গেম শেষ করুন',
    icon: '❤️',
    rarity: 'legendary',
    points: 200,
    secret: true,
  },
];

// Get achievement by ID
export function getAchievement(id: AchievementId): Achievement | undefined {
  return ACHIEVEMENTS.find(a => a.id === id);
}

// Get rarity color
export function getRarityColor(rarity: Achievement['rarity']): string {
  switch (rarity) {
    case 'common':
      return 'from-gray-400 to-gray-500';
    case 'uncommon':
      return 'from-green-400 to-green-600';
    case 'rare':
      return 'from-blue-400 to-blue-600';
    case 'epic':
      return 'from-purple-400 to-purple-600';
    case 'legendary':
      return 'from-amber-400 to-orange-500';
  }
}

export function getRarityBorder(rarity: Achievement['rarity']): string {
  switch (rarity) {
    case 'common':
      return 'border-gray-400/50';
    case 'uncommon':
      return 'border-green-400/50';
    case 'rare':
      return 'border-blue-400/50';
    case 'epic':
      return 'border-purple-400/50';
    case 'legendary':
      return 'border-amber-400/50';
  }
}

export function getRarityGlow(rarity: Achievement['rarity']): string {
  switch (rarity) {
    case 'common':
      return '';
    case 'uncommon':
      return 'shadow-[0_0_15px_rgba(74,222,128,0.3)]';
    case 'rare':
      return 'shadow-[0_0_20px_rgba(96,165,250,0.4)]';
    case 'epic':
      return 'shadow-[0_0_25px_rgba(192,132,252,0.5)]';
    case 'legendary':
      return 'shadow-[0_0_30px_rgba(251,191,36,0.6)]';
  }
}

// Achievement tracking state
export interface AchievementState {
  unlocked: AchievementId[];
  stats: {
    totalGames: number;
    totalAdjustments: number;
    totalCommittees: number;
    totalAnnouncements: number;
    totalBlames: number;
    totalDelays: number;
    totalInvestigations: number;
    totalSilent: number;
    correctCommittees: number;
    correctAnnouncements: number;
    correctBlames: number;
    correctDelays: number;
    correctInvestigations: number;
    correctSilent: number;
    highestScore: number;
    highestStreak: number;
    bestAccuracy: number;
    bestEfficiency: number;
  };
  newlyUnlocked: AchievementId[];
}

const defaultState: AchievementState = {
  unlocked: [],
  stats: {
    totalGames: 0,
    totalAdjustments: 0,
    totalCommittees: 0,
    totalAnnouncements: 0,
    totalBlames: 0,
    totalDelays: 0,
    totalInvestigations: 0,
    totalSilent: 0,
    correctCommittees: 0,
    correctAnnouncements: 0,
    correctBlames: 0,
    correctDelays: 0,
    correctInvestigations: 0,
    correctSilent: 0,
    highestScore: 0,
    highestStreak: 0,
    bestAccuracy: 0,
    bestEfficiency: 0,
  },
  newlyUnlocked: [],
};

// Load achievements from localStorage
export function loadAchievements(): AchievementState {
  if (typeof window === 'undefined') return defaultState;

  try {
    const saved = localStorage.getItem('achievements');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...defaultState,
        ...parsed,
        stats: { ...defaultState.stats, ...parsed.stats },
        newlyUnlocked: [], // Always reset newly unlocked on load
      };
    }
  } catch (e) {
    console.warn('Failed to load achievements:', e);
  }

  return defaultState;
}

// Save achievements to localStorage
export function saveAchievements(state: AchievementState): void {
  if (typeof window === 'undefined') return;

  try {
    // Don't save newlyUnlocked to storage
    const toSave = {
      unlocked: state.unlocked,
      stats: state.stats,
    };
    localStorage.setItem('achievements', JSON.stringify(toSave));
  } catch (e) {
    console.warn('Failed to save achievements:', e);
  }
}

// Check and unlock achievements based on game state
export interface GameEndState {
  score: number;
  grade: string;
  rounds: number;
  accuracy: number;
  efficiency: number;
  streak: number;
  chaos: number;
  patience: number;
  minPatience: number;
  mediaNoise: number;
  committees: number;
  correctCommittees: number;
  announcements: number;
  correctAnnouncements: number;
  blames: number;
  correctBlames: number;
  delays: number;
  correctDelays: number;
  investigations: number;
  correctInvestigations: number;
  silent: number;
  correctSilent: number;
  adjustments: number;
  isWin: boolean;
}

export function checkAchievements(
  state: AchievementState,
  gameEnd: GameEndState
): AchievementState {
  const newState = {
    ...state,
    stats: { ...state.stats },
    newlyUnlocked: [] as AchievementId[],
  };

  // Update stats
  newState.stats.totalGames++;
  newState.stats.totalAdjustments += gameEnd.adjustments;
  newState.stats.totalCommittees += gameEnd.committees;
  newState.stats.totalAnnouncements += gameEnd.announcements;
  newState.stats.totalBlames += gameEnd.blames;
  newState.stats.totalDelays += gameEnd.delays;
  newState.stats.totalInvestigations += gameEnd.investigations;
  newState.stats.totalSilent += gameEnd.silent;
  newState.stats.correctCommittees += gameEnd.correctCommittees;
  newState.stats.correctAnnouncements += gameEnd.correctAnnouncements;
  newState.stats.correctBlames += gameEnd.correctBlames;
  newState.stats.correctDelays += gameEnd.correctDelays;
  newState.stats.correctInvestigations += gameEnd.correctInvestigations;
  newState.stats.correctSilent += gameEnd.correctSilent;

  if (gameEnd.score > newState.stats.highestScore) {
    newState.stats.highestScore = gameEnd.score;
  }
  if (gameEnd.streak > newState.stats.highestStreak) {
    newState.stats.highestStreak = gameEnd.streak;
  }
  if (gameEnd.accuracy > newState.stats.bestAccuracy) {
    newState.stats.bestAccuracy = gameEnd.accuracy;
  }
  if (gameEnd.efficiency > newState.stats.bestEfficiency) {
    newState.stats.bestEfficiency = gameEnd.efficiency;
  }

  const unlock = (id: AchievementId) => {
    if (!newState.unlocked.includes(id)) {
      newState.unlocked.push(id);
      newState.newlyUnlocked.push(id);
    }
  };

  // Check achievements

  // First adjustment (if any adjustments made)
  if (gameEnd.adjustments > 0) {
    unlock('first_adjustment');
  }

  // First game completed
  unlock('first_game');

  // Streak achievements
  if (gameEnd.streak >= 5 || newState.stats.highestStreak >= 5) {
    unlock('streak_5');
  }
  if (gameEnd.streak >= 10 || newState.stats.highestStreak >= 10) {
    unlock('streak_10');
  }

  // Grade achievements
  if (gameEnd.grade === 'S') {
    unlock('grade_s');
    unlock('grade_a');
    unlock('grade_b');
  } else if (gameEnd.grade === 'A') {
    unlock('grade_a');
    unlock('grade_b');
  } else if (gameEnd.grade === 'B') {
    unlock('grade_b');
  }

  // Total games
  if (newState.stats.totalGames >= 10) {
    unlock('ten_games');
  }

  // Total adjustments
  if (newState.stats.totalAdjustments >= 100) {
    unlock('hundred_adjustments');
  }

  // Strategy-specific achievements
  if (newState.stats.totalCommittees >= 10) {
    unlock('committee_king');
  }
  if (newState.stats.totalAnnouncements >= 15) {
    unlock('announcement_master');
  }
  if (newState.stats.correctBlames >= 10) {
    unlock('blame_expert');
  }
  if (newState.stats.correctDelays >= 12) {
    unlock('delay_tactician');
  }
  if (newState.stats.totalInvestigations >= 10) {
    unlock('investigator');
  }

  // Single game achievements
  if (gameEnd.correctSilent >= 5) {
    unlock('silent_ninja');
  }

  if (gameEnd.isWin && gameEnd.chaos >= 90) {
    unlock('chaos_survivor');
  }

  if (gameEnd.patience >= 80) {
    unlock('patience_master');
  }

  if (gameEnd.mediaNoise >= 100) {
    unlock('media_manipulator');
  }

  // Diversity - used all 6 strategies correctly
  if (
    gameEnd.correctCommittees > 0 &&
    gameEnd.correctAnnouncements > 0 &&
    gameEnd.correctBlames > 0 &&
    gameEnd.correctDelays > 0 &&
    gameEnd.correctInvestigations > 0 &&
    gameEnd.correctSilent > 0
  ) {
    unlock('diversity_master');
  }

  // No committees/announcements wins
  if (gameEnd.isWin && gameEnd.committees === 0) {
    unlock('no_committees');
  }
  if (gameEnd.isWin && gameEnd.announcements === 0) {
    unlock('no_announcements');
  }

  // Perfect accuracy
  if (gameEnd.accuracy >= 100 && gameEnd.adjustments >= 5) {
    unlock('perfect_round');
  }

  // High score
  if (gameEnd.score >= 600) {
    unlock('high_scorer');
  }

  // Marathon
  if (gameEnd.rounds >= 15) {
    unlock('marathon');
  }

  // Comeback kid
  if (gameEnd.isWin && gameEnd.minPatience < 20) {
    unlock('comeback_kid');
  }

  // Master of all
  if (
    gameEnd.correctCommittees >= 5 &&
    gameEnd.correctAnnouncements >= 5 &&
    gameEnd.correctBlames >= 5 &&
    gameEnd.correctDelays >= 5 &&
    gameEnd.correctInvestigations >= 5 &&
    gameEnd.correctSilent >= 5
  ) {
    unlock('all_strategies');
  }

  // Efficiency expert
  if (gameEnd.efficiency >= 90) {
    unlock('efficiency_expert');
  }

  // Low chaos
  if (gameEnd.isWin && gameEnd.chaos < 30) {
    unlock('low_chaos');
  }

  // Full patience
  if (gameEnd.patience === 100) {
    unlock('full_patience');
  }

  return newState;
}

// Calculate total achievement points
export function getTotalPoints(state: AchievementState): number {
  return state.unlocked.reduce((total, id) => {
    const achievement = getAchievement(id);
    return total + (achievement?.points || 0);
  }, 0);
}

// Get achievement progress percentage
export function getProgressPercentage(state: AchievementState): number {
  return Math.round((state.unlocked.length / ACHIEVEMENTS.length) * 100);
}
