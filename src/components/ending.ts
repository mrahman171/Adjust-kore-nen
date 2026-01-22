import type { Ending } from "@/components/types";
import { ENDINGS } from "@/components/data/endings";

export const resolveEnding = ({
  round,
  committeeCount,
  announcementCount,
  silentCount,
  publicPatience,
  // Optional difficulty thresholds with defaults
  committeeLimitForEnding = 4,
  announcementLimitForEnding = 4,
  silentLimitForEnding = 2,
  silentLimitRoundThreshold = 4,
}: {
  round: number;
  committeeCount: number;
  announcementCount: number;
  silentCount: number;
  publicPatience: number;
  committeeLimitForEnding?: number;
  announcementLimitForEnding?: number;
  silentLimitForEnding?: number;
  silentLimitRoundThreshold?: number;
}): Ending | null => {
  if (publicPatience <= 0) return { ...ENDINGS.patience, type: "patience_exhaustion" };
  if (silentCount >= silentLimitForEnding && round >= silentLimitRoundThreshold) return { ...ENDINGS.silent, type: "silent_overuse" };
  if (committeeCount >= committeeLimitForEnding) return { ...ENDINGS.committee, type: "committee_overflow" };
  if (announcementCount >= announcementLimitForEnding) return { ...ENDINGS.press, type: "announcement_saturation" };
  return null;
};
