import type { Meters } from "@/components/types";

export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export const calculateScore = (meters: Meters) => {
  const base =
    meters.adjustmentCount * 120 +
    meters.chaos * 4 +
    meters.mediaNoise * 3 -
    (100 - meters.publicPatience) * 2;
  const penalty =
    meters.committeeCount * 30 +
    meters.announcementCount * 20 +
    meters.silentCount * 40;
  return Math.max(0, Math.round(base - penalty));
};
