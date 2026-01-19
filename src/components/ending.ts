import type { Ending } from "@/components/types";
import { ENDINGS } from "@/components/data/endings";

export const resolveEnding = ({
  round,
  committeeCount,
  announcementCount,
  silentCount,
}: {
  round: number;
  committeeCount: number;
  announcementCount: number;
  silentCount: number;
}): Ending | null => {
  if (silentCount >= 2 && round >= 4) return ENDINGS.silent;
  if (committeeCount >= 4) return ENDINGS.committee;
  if (announcementCount >= 4) return ENDINGS.press;
  if (round >= 10) return ENDINGS.national;
  return null;
};
