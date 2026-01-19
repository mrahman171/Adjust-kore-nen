import type { Ending } from "@/components/types";

export const ENDINGS: Record<string, Ending> = {
  national: {
    title: "জাতীয় সাফল্য",
    message: "জাতি সফলভাবে অ্যাডজাস্ট করেছে।",
  },
  committee: {
    title: "কমিটি ওভারফ্লো",
    message: "দায়িত্ব এখন সব কমিটির মধ্যে ভাগ হয়েছে।",
  },
  press: {
    title: "প্রেস কনফারেন্স",
    message: "মাইক বেড়েছে। প্রশ্ন নেওয়া হচ্ছে না।",
  },
  silent: {
    title: "পূর্ণ নীরবতা",
    message: "স্থিতিশীলতা বজায় আছে। নীরবতা চলমান।",
  },
};
