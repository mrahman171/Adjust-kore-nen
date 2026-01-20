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

export type Ending = {
  title: string;
  message: string;
  grade?: string;
  subtitle?: string;
};

export type Meters = {
  publicPatience: number;
  chaos: number;
  mediaNoise: number;
  adjustmentCount: number;
  committeeCount: number;
  announcementCount: number;
  silentCount: number;
};
