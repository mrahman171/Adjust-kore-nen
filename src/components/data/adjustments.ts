import type { Adjustment } from "@/components/types";

export const ADJUSTMENTS: Adjustment[] = [
  {
    label: "কমিটি গঠন",
    tag: "committee",
    result: "কমিটি গঠন করা হয়েছে পূর্ণ ক্ষমতা সহকারে।",
  },
  {
    label: "জরুরি মিটিং",
    tag: "delay",
    result: "জরুরি মিটিং হয়েছে। সিদ্ধান্ত পরের মিটিংয়ে হবে।",
  },
  {
    label: "সিদ্ধান্ত স্থগিত",
    tag: "delay",
    result: "সিদ্ধান্ত স্থগিত। বিশেষজ্ঞ মতামত নেওয়া হবে।",
  },
  {
    label: "প্রেস রিলিজ",
    tag: "announce",
    result: "প্রেস রিলিজ দেওয়া হয়েছে। জনগণ সন্তুষ্ট।",
  },
  {
    label: "আবহাওয়ার দোষ",
    tag: "blame",
    result: "আবহাওয়াকে সাময়িক কারণ বলা হয়েছে। অ্যাডজাস্ট চলছে।",
  },
  {
    label: "তদন্ত ঘোষণা",
    tag: "investigate",
    result: "তদন্ত ঘোষণা হয়েছে। শিগগিরই জানানো হবে।",
  },
  {
    label: "কিছুই না",
    tag: "silent",
    result: "কোনো পদক্ষেপ নেই। দীর্ঘমেয়াদি স্থিতিশীলতা দেখা যাচ্ছে।",
  },
];
