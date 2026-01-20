import type { Ending } from "@/components/types";
import { ENDINGS } from "@/components/data/endings";

export const resolveEnding = ({
  round,
  committeeCount,
  announcementCount,
  silentCount,
  publicPatience,
}: {
  round: number;
  committeeCount: number;
  announcementCount: number;
  silentCount: number;
  publicPatience: number;
}): Ending | null => {
  if (publicPatience <= 0) return ENDINGS.patience;
  if (silentCount >= 2 && round >= 4) return ENDINGS.silent;
  if (committeeCount >= 4) return ENDINGS.committee;
  if (announcementCount >= 4) return ENDINGS.press;
  return null;
};
