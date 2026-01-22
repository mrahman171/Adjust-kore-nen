"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

export interface TutorialStep {
  id: string;
  target?: string; // CSS selector for element to highlight
  title: string;
  titleBn: string;
  content: string;
  contentBn: string;
  position?: "top" | "bottom" | "left" | "right" | "center";
  highlight?: boolean;
  action?: "click" | "hover" | "none";
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: "welcome",
    title: "Welcome to Adjust Kore Nen!",
    titleBn: "অ্যাডজাস্ট করে নেন-এ স্বাগতম!",
    content: "You are a Crisis Management Officer. Your job is to 'adjust' problems - not solve them!",
    contentBn: "আপনি একজন ক্রাইসিস ম্যানেজমেন্ট অফিসার। আপনার কাজ সমস্যা 'অ্যাডজাস্ট' করা - সমাধান নয়!",
    position: "center",
    action: "none",
  },
  {
    id: "problem",
    target: "[data-tutorial='problem']",
    title: "The Crisis",
    titleBn: "সংকট",
    content: "Each round presents a new problem. Read it carefully to choose the right adjustment strategy.",
    contentBn: "প্রতিটি রাউন্ডে একটি নতুন সমস্যা আসে। সঠিক অ্যাডজাস্টমেন্ট কৌশল বেছে নিতে সাবধানে পড়ুন।",
    position: "bottom",
    highlight: true,
    action: "none",
  },
  {
    id: "adjustments",
    target: "[data-tutorial='adjustments']",
    title: "Adjustment Options",
    titleBn: "অ্যাডজাস্টমেন্ট অপশন",
    content: "Choose one of 4 strategies. Each problem has a 'correct' adjustment that matches best!",
    contentBn: "৪টি কৌশলের একটি বেছে নিন। প্রতিটি সমস্যার একটি 'সঠিক' অ্যাডজাস্টমেন্ট আছে!",
    position: "top",
    highlight: true,
    action: "none",
  },
  {
    id: "strategies",
    title: "The 6 Strategies",
    titleBn: "৬টি কৌশল",
    content: "Committee (👥), Announce (📢), Blame (👉), Delay (⏳), Investigate (🔍), Silence (🤫)",
    contentBn: "কমিটি (👥), ঘোষণা (📢), দায় (👉), বিলম্ব (⏳), তদন্ত (🔍), নীরবতা (🤫)",
    position: "center",
    action: "none",
  },
  {
    id: "meters",
    target: "[data-tutorial='meters']",
    title: "Monitor Your Meters",
    titleBn: "মিটার পর্যবেক্ষণ করুন",
    content: "Watch Public Patience (don't let it hit 0!), Chaos Level, and Media Noise.",
    contentBn: "জনগণের ধৈর্য (০ হতে দেবেন না!), বিশৃঙ্খলা এবং মিডিয়া নয়েজ লক্ষ্য রাখুন।",
    position: "left",
    highlight: true,
    action: "none",
  },
  {
    id: "correct",
    title: "Correct Adjustments",
    titleBn: "সঠিক অ্যাডজাস্টমেন্ট",
    content: "Correct adjustments increase patience and build streaks. Wrong ones decrease patience!",
    contentBn: "সঠিক অ্যাডজাস্টমেন্ট ধৈর্য বাড়ায় এবং স্ট্রিক তৈরি করে। ভুল হলে ধৈর্য কমে!",
    position: "center",
    action: "none",
  },
  {
    id: "endings",
    title: "Game Endings",
    titleBn: "গেম শেষ",
    content: "Game ends if: patience hits 0, too many committees, too many announcements, or overuse silence!",
    contentBn: "গেম শেষ হয়: ধৈর্য ০ হলে, অতিরিক্ত কমিটি, অতিরিক্ত ঘোষণা, বা বেশি নীরবতায়!",
    position: "center",
    action: "none",
  },
  {
    id: "score",
    title: "Scoring",
    titleBn: "স্কোরিং",
    content: "Earn points for correct adjustments, streaks, and bonuses. Aim for Grade S!",
    contentBn: "সঠিক অ্যাডজাস্টমেন্ট, স্ট্রিক এবং বোনাসে পয়েন্ট পান। গ্রেড S-এ লক্ষ্য রাখুন!",
    position: "center",
    action: "none",
  },
  {
    id: "ready",
    title: "Ready to Adjust?",
    titleBn: "অ্যাডজাস্ট করতে প্রস্তুত?",
    content: "Click 'Start Mission' to begin! Good luck, Officer!",
    contentBn: "'মিশন শুরু করুন' ক্লিক করুন! শুভকামনা, অফিসার!",
    position: "center",
    action: "none",
  },
];

interface TutorialProps {
  isActive: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

export function Tutorial({ isActive, onComplete, onSkip }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Find and highlight target element
  useEffect(() => {
    if (!isActive) return;

    const step = TUTORIAL_STEPS[currentStep];
    if (step?.target) {
      const element = document.querySelector(step.target);
      if (element) {
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        setTargetRect(null);
      }
    } else {
      setTargetRect(null);
    }
  }, [currentStep, isActive]);

  const nextStep = useCallback(() => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete();
    }
  }, [currentStep, onComplete]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  if (!mounted || !isActive) return null;

  const step = TUTORIAL_STEPS[currentStep];
  const progress = ((currentStep + 1) / TUTORIAL_STEPS.length) * 100;

  // Calculate tooltip position
  const getTooltipStyle = (): React.CSSProperties => {
    if (!targetRect || step.position === "center") {
      return {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      };
    }

    const padding = 20;
    const tooltipWidth = 320;
    const tooltipHeight = 200;

    switch (step.position) {
      case "top":
        return {
          top: targetRect.top - tooltipHeight - padding,
          left: targetRect.left + targetRect.width / 2,
          transform: "translateX(-50%)",
        };
      case "bottom":
        return {
          top: targetRect.bottom + padding,
          left: targetRect.left + targetRect.width / 2,
          transform: "translateX(-50%)",
        };
      case "left":
        return {
          top: targetRect.top + targetRect.height / 2,
          left: targetRect.left - tooltipWidth - padding,
          transform: "translateY(-50%)",
        };
      case "right":
        return {
          top: targetRect.top + targetRect.height / 2,
          left: targetRect.right + padding,
          transform: "translateY(-50%)",
        };
      default:
        return {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        };
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[200]">
      {/* Overlay with cutout for highlighted element */}
      <div className="absolute inset-0 bg-black/60 transition-all duration-300">
        {targetRect && step.highlight && (
          <div
            className="absolute bg-transparent rounded-lg ring-4 ring-[var(--accent)] ring-offset-4 ring-offset-transparent animate-tutorial-pulse"
            style={{
              top: targetRect.top - 8,
              left: targetRect.left - 8,
              width: targetRect.width + 16,
              height: targetRect.height + 16,
              boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.6)",
            }}
          />
        )}
      </div>

      {/* Tutorial tooltip */}
      <div
        className="absolute w-80 max-w-[90vw] animate-tooltip"
        style={getTooltipStyle()}
      >
        <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-[var(--paper)] to-[var(--paper-strong)] p-6 shadow-2xl">
          {/* Progress bar */}
          <div className="mb-4 h-1 w-full rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-deep)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step counter */}
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)] mb-2">
            ধাপ {currentStep + 1}/{TUTORIAL_STEPS.length}
          </p>

          {/* Title */}
          <h3 className="text-lg font-bold text-[var(--ink)] mb-1">
            {step.titleBn}
          </h3>
          <p className="text-xs text-[var(--ink)]/50 mb-3">{step.title}</p>

          {/* Content */}
          <p className="text-sm text-[var(--ink)]/80 leading-relaxed mb-1">
            {step.contentBn}
          </p>
          <p className="text-xs text-[var(--ink)]/50 italic mb-4">
            {step.content}
          </p>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={onSkip}
              className="px-3 py-2 text-xs font-medium text-[var(--ink)]/50 hover:text-[var(--ink)] transition-colors"
            >
              এড়িয়ে যান
            </button>

            <div className="flex gap-2">
              {currentStep > 0 && (
                <button
                  onClick={prevStep}
                  className="px-4 py-2 text-xs font-semibold text-[var(--ink)]/70 hover:text-[var(--ink)] border border-[var(--line)] rounded-lg hover:bg-white/50 transition-all"
                >
                  ← আগে
                </button>
              )}

              <button
                onClick={nextStep}
                className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[var(--accent)] to-[var(--accent-deep)] rounded-lg hover:opacity-90 transition-opacity shadow-md"
              >
                {currentStep === TUTORIAL_STEPS.length - 1 ? "শুরু করুন!" : "পরবর্তী →"}
              </button>
            </div>
          </div>
        </div>

        {/* Arrow pointer for non-center positions */}
        {targetRect && step.position !== "center" && (
          <div
            className={`absolute w-4 h-4 bg-[var(--paper)] transform rotate-45 ${
              step.position === "top"
                ? "bottom-[-8px] left-1/2 -translate-x-1/2"
                : step.position === "bottom"
                  ? "top-[-8px] left-1/2 -translate-x-1/2"
                  : step.position === "left"
                    ? "right-[-8px] top-1/2 -translate-y-1/2"
                    : "left-[-8px] top-1/2 -translate-y-1/2"
            }`}
          />
        )}
      </div>
    </div>,
    document.body
  );
}

// Hook for tutorial state management
export function useTutorial() {
  const [showTutorial, setShowTutorial] = useState(false);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(true); // Default to true to avoid flash

  useEffect(() => {
    if (typeof window !== "undefined") {
      const seen = localStorage.getItem("tutorialCompleted");
      setHasSeenTutorial(seen === "true");

      // Show tutorial for first-time users
      if (!seen) {
        setShowTutorial(true);
      }
    }
  }, []);

  const completeTutorial = useCallback(() => {
    setShowTutorial(false);
    setHasSeenTutorial(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("tutorialCompleted", "true");
    }
  }, []);

  const skipTutorial = useCallback(() => {
    setShowTutorial(false);
    setHasSeenTutorial(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("tutorialCompleted", "true");
    }
  }, []);

  const restartTutorial = useCallback(() => {
    setShowTutorial(true);
  }, []);

  return {
    showTutorial,
    hasSeenTutorial,
    completeTutorial,
    skipTutorial,
    restartTutorial,
  };
}

// Quick tip component for in-game hints
export function QuickTip({
  tip,
  tipBn,
  onDismiss,
}: {
  tip: string;
  tipBn: string;
  onDismiss: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timeout = setTimeout(onDismiss, 5000);
    return () => clearTimeout(timeout);
  }, [onDismiss]);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 animate-slide-in-bottom">
      <div className="flex items-center gap-3 rounded-xl border border-[var(--accent)]/30 bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-3 shadow-lg">
        <span className="text-xl">💡</span>
        <div>
          <p className="text-sm font-medium text-[var(--ink)]">{tipBn}</p>
          <p className="text-xs text-[var(--ink)]/50">{tip}</p>
        </div>
        <button
          onClick={onDismiss}
          className="ml-2 p-1 text-[var(--ink)]/40 hover:text-[var(--ink)] transition-colors"
        >
          ✕
        </button>
      </div>
    </div>,
    document.body
  );
}
