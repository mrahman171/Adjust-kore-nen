"use client";

import { useState, useEffect } from "react";
import {
  DIFFICULTY_CONFIGS,
  POWER_UPS,
  loadLeaderboard,
  type DifficultyLevel,
  type LeaderboardEntry,
} from "@/lib/gameConfig";
import {
  ACHIEVEMENTS,
  loadAchievements,
  getTotalPoints,
  getProgressPercentage,
  getRarityColor,
  getRarityBorder,
  getRarityGlow,
  type AchievementState,
} from "@/lib/achievements";

// Difficulty Selection Modal
export function DifficultySelector({
  currentDifficulty,
  onSelect,
  onClose,
}: {
  currentDifficulty: DifficultyLevel;
  onSelect: (difficulty: DifficultyLevel) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl border border-[var(--glass-border)] bg-gradient-to-b from-[var(--paper-soft)] to-[var(--paper)] shadow-2xl animate-scale-in overflow-hidden">
        {/* Header */}
        <div className="border-b border-[var(--line)] bg-gradient-to-r from-[var(--accent)]/5 to-transparent px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">অসুবিধা নির্বাচন করুন</h2>
              <p className="text-xs text-[var(--ink)]/50">Choose Difficulty</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[var(--ink)]/40 hover:text-[var(--ink)] transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Difficulty options */}
        <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
          {Object.values(DIFFICULTY_CONFIGS).map((config) => (
            <button
              key={config.id}
              onClick={() => {
                onSelect(config.id);
                onClose();
              }}
              className={`w-full rounded-xl border p-4 text-left transition-all hover:scale-[1.02] ${
                currentDifficulty === config.id
                  ? "border-[var(--accent)] bg-[var(--accent)]/5 ring-2 ring-[var(--accent)]/20"
                  : "border-[var(--line)] bg-white/50 hover:border-[var(--accent)]/50"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${config.color} text-2xl`}
                >
                  {config.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[var(--ink)]">{config.nameBn}</h3>
                    <span className="text-xs text-[var(--ink)]/40">({config.name})</span>
                    {config.scoreMultiplier !== 1 && (
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        config.scoreMultiplier > 1
                          ? "bg-amber-100 text-amber-700"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {config.scoreMultiplier}x স্কোর
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--ink)]/60 mt-1">{config.descriptionBn}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-[var(--ink)]/40">
                    <span>ধৈর্য: {config.initialPatience}</span>
                    <span>•</span>
                    <span>পাওয়ার-আপ: {config.startingPowerUps}</span>
                    {!config.powerUpsEnabled && (
                      <>
                        <span>•</span>
                        <span className="text-red-500">পাওয়ার-আপ নিষিদ্ধ</span>
                      </>
                    )}
                  </div>
                </div>
                {currentDifficulty === config.id && (
                  <div className="text-[var(--accent)]">✓</div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Power-ups Bar Component
export function PowerUpsBar({
  powerUps,
  onUsePowerUp,
  disabled,
}: {
  powerUps: { [key: string]: number };
  onUsePowerUp: (type: string) => void;
  disabled: boolean;
}) {
  const availablePowerUps = Object.entries(powerUps).filter(([, count]) => count > 0);

  if (availablePowerUps.length === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-semibold text-[var(--ink)]/50 uppercase tracking-wider">
        পাওয়ার-আপ:
      </span>
      {availablePowerUps.map(([type, count]) => {
        const powerUp = POWER_UPS[type as keyof typeof POWER_UPS];
        if (!powerUp) return null;

        return (
          <button
            key={type}
            onClick={() => onUsePowerUp(type)}
            disabled={disabled || count === 0}
            className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
              disabled || count === 0
                ? "border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed"
                : `border-[var(--line)] bg-gradient-to-r ${powerUp.color} bg-opacity-10 hover:scale-105 hover:shadow-md`
            }`}
            title={`${powerUp.nameBn}: ${powerUp.descriptionBn}`}
          >
            <span className="text-lg">{powerUp.icon}</span>
            <span className="text-xs font-bold text-white bg-[var(--accent)] rounded-full w-5 h-5 flex items-center justify-center">
              {count}
            </span>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[var(--ink)] text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
              <p className="font-semibold">{powerUp.nameBn}</p>
              <p className="text-white/70">{powerUp.descriptionBn}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// Achievements Display Modal
export function AchievementsModal({ onClose }: { onClose: () => void }) {
  const [achievements, setAchievements] = useState<AchievementState | null>(null);

  useEffect(() => {
    setAchievements(loadAchievements());
  }, []);

  if (!achievements) return null;

  const totalPoints = getTotalPoints(achievements);
  const progress = getProgressPercentage(achievements);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-fade-in">
      <div className="w-full max-w-2xl max-h-[85vh] rounded-2xl border border-[var(--glass-border)] bg-gradient-to-b from-[var(--paper-soft)] to-[var(--paper)] shadow-2xl animate-scale-in overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-[var(--line)] bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                🏆 অ্যাচিভমেন্ট
              </h2>
              <p className="text-xs text-[var(--ink)]/50">Achievements</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[var(--ink)]/40 hover:text-[var(--ink)] transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Progress summary */}
          <div className="mt-4 flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-[var(--ink)]/60">অগ্রগতি</span>
                <span className="font-bold">{achievements.unlocked.length}/{ACHIEVEMENTS.length}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div className="text-center px-4 py-2 bg-white/50 rounded-lg">
              <p className="text-2xl font-bold text-amber-600">{totalPoints}</p>
              <p className="text-[10px] text-[var(--ink)]/50">পয়েন্ট</p>
            </div>
          </div>
        </div>

        {/* Achievements list */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {ACHIEVEMENTS.map((achievement) => {
              const isUnlocked = achievements.unlocked.includes(achievement.id);
              const isSecret = achievement.secret && !isUnlocked;

              return (
                <div
                  key={achievement.id}
                  className={`rounded-xl border p-4 transition-all ${
                    isUnlocked
                      ? `${getRarityBorder(achievement.rarity)} bg-gradient-to-br from-white to-gray-50 ${getRarityGlow(achievement.rarity)}`
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg text-xl ${
                        isUnlocked
                          ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)} text-white`
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {isSecret ? "❓" : achievement.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className={`font-bold text-sm truncate ${isUnlocked ? "text-[var(--ink)]" : "text-gray-400"}`}>
                          {isSecret ? "গোপন অ্যাচিভমেন্ট" : achievement.titleBn}
                        </h4>
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                          isUnlocked
                            ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white`
                            : "bg-gray-200 text-gray-500"
                        }`}>
                          +{achievement.points}
                        </span>
                      </div>
                      <p className={`text-xs mt-0.5 ${isUnlocked ? "text-[var(--ink)]/60" : "text-gray-400"}`}>
                        {isSecret ? "এটি আনলক করতে খেলা চালিয়ে যান" : achievement.descriptionBn}
                      </p>
                    </div>
                    {isUnlocked && (
                      <div className="text-green-500">✓</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Leaderboard Modal
export function LeaderboardModal({ onClose }: { onClose: () => void }) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [filter, setFilter] = useState<"all" | DifficultyLevel>("all");

  useEffect(() => {
    setLeaderboard(loadLeaderboard());
  }, []);

  const filteredLeaderboard = filter === "all"
    ? leaderboard
    : leaderboard.filter((entry) => entry.difficulty === filter);

  const gradeColors: Record<string, string> = {
    S: "text-amber-500",
    A: "text-emerald-500",
    B: "text-blue-500",
    C: "text-orange-500",
    D: "text-gray-500",
    F: "text-red-500",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-fade-in">
      <div className="w-full max-w-lg max-h-[85vh] rounded-2xl border border-[var(--glass-border)] bg-gradient-to-b from-[var(--paper-soft)] to-[var(--paper)] shadow-2xl animate-scale-in overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-[var(--line)] bg-gradient-to-r from-[var(--accent)]/5 to-transparent px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                📊 লিডারবোর্ড
              </h2>
              <p className="text-xs text-[var(--ink)]/50">Leaderboard</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[var(--ink)]/40 hover:text-[var(--ink)] transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {(["all", "easy", "normal", "hard", "disaster"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                  filter === f
                    ? "bg-[var(--accent)] text-white"
                    : "bg-white/50 text-[var(--ink)]/60 hover:bg-white"
                }`}
              >
                {f === "all" ? "সব" : DIFFICULTY_CONFIGS[f].nameBn}
              </button>
            ))}
          </div>
        </div>

        {/* Leaderboard list */}
        <div className="flex-1 overflow-y-auto">
          {filteredLeaderboard.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <span className="text-4xl mb-3">🏆</span>
              <p className="text-[var(--ink)]/60">এখনও কোনো স্কোর নেই</p>
              <p className="text-xs text-[var(--ink)]/40">খেলা শুরু করুন!</p>
            </div>
          ) : (
            <div className="divide-y divide-[var(--line)]">
              {filteredLeaderboard.slice(0, 50).map((entry, index) => (
                <div
                  key={entry.id}
                  className={`flex items-center gap-3 px-4 py-3 ${
                    index < 3 ? "bg-gradient-to-r from-amber-50/50 to-transparent" : ""
                  }`}
                >
                  {/* Rank */}
                  <div className="w-8 text-center">
                    {index === 0 && <span className="text-xl">🥇</span>}
                    {index === 1 && <span className="text-xl">🥈</span>}
                    {index === 2 && <span className="text-xl">🥉</span>}
                    {index > 2 && <span className="text-sm font-bold text-[var(--ink)]/40">{index + 1}</span>}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{entry.name || "অজ্ঞাত"}</p>
                    <div className="flex items-center gap-2 text-xs text-[var(--ink)]/50">
                      <span>{entry.rounds} রাউন্ড</span>
                      <span>•</span>
                      <span>{entry.accuracy}% নির্ভুলতা</span>
                    </div>
                  </div>

                  {/* Score & Grade */}
                  <div className="text-right">
                    <p className="font-bold text-lg">{entry.score}</p>
                    <p className={`text-sm font-bold ${gradeColors[entry.grade] || "text-gray-500"}`}>
                      {entry.grade}
                    </p>
                  </div>

                  {/* Difficulty badge */}
                  <div className="text-lg" title={DIFFICULTY_CONFIGS[entry.difficulty]?.nameBn}>
                    {DIFFICULTY_CONFIGS[entry.difficulty]?.icon || "⚖️"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Settings type
type SettingsState = {
  soundEnabled: boolean;
  soundVolume: number;
};

// Settings Modal
export function SettingsModal({
  settings,
  onUpdateSettings,
  onClose,
  onRestartTutorial,
}: {
  settings: SettingsState;
  onUpdateSettings: (settings: Partial<SettingsState>) => void;
  onClose: () => void;
  onRestartTutorial: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-fade-in">
      <div className="w-full max-w-sm rounded-2xl border border-[var(--glass-border)] bg-gradient-to-b from-[var(--paper-soft)] to-[var(--paper)] shadow-2xl animate-scale-in overflow-hidden">
        {/* Header */}
        <div className="border-b border-[var(--line)] bg-gradient-to-r from-[var(--accent)]/5 to-transparent px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                ⚙️ সেটিংস
              </h2>
              <p className="text-xs text-[var(--ink)]/50">Settings</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[var(--ink)]/40 hover:text-[var(--ink)] transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Settings options */}
        <div className="p-6 space-y-6">
          {/* Sound toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">সাউন্ড ইফেক্ট</p>
              <p className="text-xs text-[var(--ink)]/50">Sound Effects</p>
            </div>
            <button
              onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.soundEnabled ? "bg-[var(--accent)]" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  settings.soundEnabled ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Volume slider */}
          {settings.soundEnabled && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-[var(--ink)]/70">ভলিউম</p>
                <p className="text-sm font-semibold">{Math.round(settings.soundVolume * 100)}%</p>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.soundVolume}
                onChange={(e) => onUpdateSettings({ soundVolume: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
              />
            </div>
          )}

          {/* Tutorial restart */}
          <div className="pt-4 border-t border-[var(--line)]">
            <button
              onClick={() => {
                onRestartTutorial();
                onClose();
              }}
              className="w-full px-4 py-2 text-sm font-semibold text-[var(--accent)] border border-[var(--accent)]/30 rounded-lg hover:bg-[var(--accent)]/5 transition-colors"
            >
              📖 টিউটোরিয়াল আবার দেখুন
            </button>
          </div>

          {/* Reset data warning */}
          <div className="pt-2">
            <button
              onClick={() => {
                if (confirm("সব ডেটা মুছে ফেলতে চান? এটি পূর্বাবস্থায় ফেরানো যাবে না।")) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
              className="w-full px-4 py-2 text-sm font-semibold text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
            >
              🗑️ সব ডেটা মুছুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Quick Menu Bar (for in-game access)
export function QuickMenuBar({
  onOpenAchievements,
  onOpenLeaderboard,
  onOpenSettings,
  onOpenDifficulty,
  currentDifficulty,
}: {
  onOpenAchievements: () => void;
  onOpenLeaderboard: () => void;
  onOpenSettings: () => void;
  onOpenDifficulty: () => void;
  currentDifficulty: DifficultyLevel;
}) {
  const difficultyConfig = DIFFICULTY_CONFIGS[currentDifficulty];

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      <button
        onClick={onOpenDifficulty}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--line)] bg-gradient-to-r ${difficultyConfig.color} bg-opacity-10 hover:scale-105 transition-transform text-sm font-semibold text-white`}
      >
        <span>{difficultyConfig.icon}</span>
        <span>{difficultyConfig.nameBn}</span>
      </button>

      <button
        onClick={onOpenAchievements}
        className="p-2 rounded-lg border border-[var(--line)] bg-white/50 hover:bg-white transition-colors"
        title="অ্যাচিভমেন্ট"
      >
        🏆
      </button>

      <button
        onClick={onOpenLeaderboard}
        className="p-2 rounded-lg border border-[var(--line)] bg-white/50 hover:bg-white transition-colors"
        title="লিডারবোর্ড"
      >
        📊
      </button>

      <button
        onClick={onOpenSettings}
        className="p-2 rounded-lg border border-[var(--line)] bg-white/50 hover:bg-white transition-colors"
        title="সেটিংস"
      >
        ⚙️
      </button>
    </div>
  );
}
