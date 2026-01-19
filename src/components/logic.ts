import type { Meters } from "@/components/types";

export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export const calculateScore = (meters: Meters) => {
  const base =
    meters.adjustmentCount * 80 + meters.chaos * 3 + meters.mediaNoise * 2;
  const bonus = meters.publicPatience;
  const penalty =
    meters.committeeCount * 25 +
    meters.announcementCount * 15 +
    meters.silentCount * 35;
  return Math.max(0, Math.round(base + bonus - penalty));
};

export const calculateScoreDetails = (meters: Meters) => {
  const adjustments = meters.adjustmentCount * 80;
  const chaos = meters.chaos * 3;
  const media = meters.mediaNoise * 2;
  const bonus = meters.publicPatience;
  const committees = meters.committeeCount * 25;
  const announcements = meters.announcementCount * 15;
  const silent = meters.silentCount * 35;

  const score = Math.max(
    0,
    Math.round(adjustments + chaos + media + bonus - committees - announcements - silent),
  );

  const breakdown = [
    `অ্যাডজাস্ট পয়েন্ট: ${adjustments}`,
    `বিশৃঙ্খলা পয়েন্ট: ${chaos}`,
    `মিডিয়া চিৎকার: ${media}`,
    `ধৈর্য বোনাস: ${bonus}`,
    `কমিটি কাটছাঁট: -${committees}`,
    `ঘোষণা কাটছাঁট: -${announcements}`,
    `নীরবতা কাটছাঁট: -${silent}`,
  ];

  return { score, breakdown };
};
