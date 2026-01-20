import type { Meters } from "@/components/types";

export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export const calculateScore = (meters: Meters) => {
  const base =
    meters.correctAdjustmentCount * 80 +
    meters.chaos * 3 +
    meters.mediaNoise * 2;
  const bonus = meters.publicPatience;
  const committeePenalty =
    (meters.committeeCount - meters.correctCommitteeCount) * 25 +
    meters.correctCommitteeCount * 12;
  const announcementPenalty =
    (meters.announcementCount - meters.correctAnnouncementCount) * 15 +
    meters.correctAnnouncementCount * 7;
  const silentPenalty =
    (meters.silentCount - meters.correctSilentCount) * 35 +
    meters.correctSilentCount * 18;
  const penalty = committeePenalty + announcementPenalty + silentPenalty;
  return Math.max(0, Math.round(base + bonus - penalty));
};

export const calculateScoreDetails = (meters: Meters) => {
  const adjustments = meters.correctAdjustmentCount * 80;
  const chaos = meters.chaos * 3;
  const media = meters.mediaNoise * 2;
  const patience = meters.publicPatience;
  const committees =
    (meters.committeeCount - meters.correctCommitteeCount) * 25 +
    meters.correctCommitteeCount * 12;
  const announcements =
    (meters.announcementCount - meters.correctAnnouncementCount) * 15 +
    meters.correctAnnouncementCount * 7;
  const silent =
    (meters.silentCount - meters.correctSilentCount) * 35 +
    meters.correctSilentCount * 18;

  const score = Math.max(
    0,
    Math.round(
      adjustments + chaos + media + patience - committees - announcements - silent
    )
  );

  // Legacy breakdown for ScoreModal
  const breakdown = [
    `অ্যাডজাস্ট পয়েন্ট: ${adjustments}`,
    `বিশৃঙ্খলা পয়েন্ট: ${chaos}`,
    `মিডিয়া চিৎকার: ${media}`,
    `ধৈর্য বোনাস: ${patience}`,
    `কমিটি কাটছাঁট: -${committees}`,
    `ঘোষণা কাটছাঁট: -${announcements}`,
    `নীরবতা কাটছাঁট: -${silent}`,
  ];

  // Detailed breakdown for EndingModal
  const detailedBreakdown = {
    adjustments,
    chaos,
    media,
    patience,
    committees,
    announcements,
    silent,
  };

  return { score, breakdown, detailedBreakdown };
};
