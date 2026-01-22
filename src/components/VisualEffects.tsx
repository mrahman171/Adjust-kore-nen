"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";

// Screen shake effect
export function useScreenShake() {
  const [isShaking, setIsShaking] = useState(false);

  const shake = useCallback((intensity: "light" | "medium" | "heavy" = "medium") => {
    setIsShaking(true);

    const duration = intensity === "light" ? 200 : intensity === "medium" ? 400 : 600;

    setTimeout(() => {
      setIsShaking(false);
    }, duration);
  }, []);

  const shakeClass = isShaking ? "animate-shake" : "";

  return { shake, shakeClass, isShaking };
}

// Confetti particle
interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
  velocityX: number;
  velocityY: number;
  rotationSpeed: number;
  type: "square" | "circle" | "star";
}

// Confetti effect component
export function Confetti({
  active,
  duration = 3000,
  particleCount = 50,
  colors = ["#b5362e", "#f59e0b", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899"],
}: {
  active: boolean;
  duration?: number;
  particleCount?: number;
  colors?: string[];
}) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Store colors in a ref to avoid dependency issues with array references
  const colorsRef = useRef(colors);
  colorsRef.current = colors;

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    const currentColors = colorsRef.current;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 20,
        color: currentColors[Math.floor(Math.random() * currentColors.length)],
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
        velocityX: (Math.random() - 0.5) * 4,
        velocityY: 2 + Math.random() * 3,
        rotationSpeed: (Math.random() - 0.5) * 10,
        type: ["square", "circle", "star"][Math.floor(Math.random() * 3)] as Particle["type"],
      });
    }

    setParticles(newParticles);

    const timeout = setTimeout(() => {
      setParticles([]);
    }, duration);

    return () => clearTimeout(timeout);
  }, [active, duration, particleCount]);

  if (!mounted || particles.length === 0) return null;

  return createPortal(
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: `rotate(${particle.rotation}deg) scale(${particle.scale})`,
            animationDuration: `${duration}ms`,
            animationDelay: `${particle.id * 20}ms`,
            ["--velocity-x" as string]: particle.velocityX,
            ["--velocity-y" as string]: particle.velocityY,
            ["--rotation-speed" as string]: particle.rotationSpeed,
          }}
        >
          {particle.type === "square" && (
            <div
              className="w-3 h-3"
              style={{ backgroundColor: particle.color }}
            />
          )}
          {particle.type === "circle" && (
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: particle.color }}
            />
          )}
          {particle.type === "star" && (
            <div className="text-xl" style={{ color: particle.color }}>
              ★
            </div>
          )}
        </div>
      ))}
    </div>,
    document.body
  );
}

// Streak fire effect
export function StreakFire({
  streak,
  show,
}: {
  streak: number;
  show: boolean;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !show || streak < 3) return null;

  const fireSize = Math.min(streak, 10);
  const fireEmojis = streak >= 10 ? "🔥🔥🔥" : streak >= 7 ? "🔥🔥" : "🔥";

  return (
    <div className="fixed top-4 right-4 z-50 animate-bounce-in pointer-events-none">
      <div className="relative">
        <div
          className="text-4xl animate-pulse"
          style={{
            fontSize: `${1.5 + fireSize * 0.2}rem`,
            filter: `drop-shadow(0 0 ${fireSize * 2}px rgba(251, 146, 60, 0.8))`,
          }}
        >
          {fireEmojis}
        </div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
          {streak}x স্ট্রিক!
        </div>
      </div>
    </div>
  );
}

// Floating text effect (for score changes)
interface FloatingText {
  id: number;
  text: string;
  x: number;
  y: number;
  color: string;
  size: string;
}

export function useFloatingText() {
  const [texts, setTexts] = useState<FloatingText[]>([]);
  const idRef = useRef(0);

  const addFloatingText = useCallback(
    (text: string, x: number, y: number, color: string = "green", size: string = "text-xl") => {
      const id = idRef.current++;
      setTexts((prev) => [...prev, { id, text, x, y, color, size }]);

      setTimeout(() => {
        setTexts((prev) => prev.filter((t) => t.id !== id));
      }, 1500);
    },
    []
  );

  const FloatingTextContainer = () => (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {texts.map((item) => (
        <div
          key={item.id}
          className={`absolute ${item.size} font-bold animate-float-up`}
          style={{
            left: item.x,
            top: item.y,
            color: item.color === "green" ? "#22c55e" : item.color === "red" ? "#ef4444" : item.color,
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );

  return { addFloatingText, FloatingTextContainer };
}

// Pulse ring effect (for correct answers)
export function PulseRing({
  active,
  color = "green",
}: {
  active: boolean;
  color?: "green" | "red" | "gold";
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (active) {
      setShow(true);
      const timeout = setTimeout(() => setShow(false), 600);
      return () => clearTimeout(timeout);
    }
  }, [active]);

  if (!show) return null;

  const colorClass =
    color === "green"
      ? "border-green-500"
      : color === "red"
        ? "border-red-500"
        : "border-amber-400";

  return (
    <div className="fixed inset-0 pointer-events-none z-40 flex items-center justify-center">
      <div
        className={`w-64 h-64 rounded-full border-4 ${colorClass} animate-pulse-ring opacity-0`}
      />
    </div>
  );
}

// Flash overlay effect
export function FlashOverlay({
  active,
  color = "green",
}: {
  active: boolean;
  color?: "green" | "red" | "gold";
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (active) {
      setShow(true);
      const timeout = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [active]);

  if (!show) return null;

  const bgColor =
    color === "green"
      ? "bg-green-500/20"
      : color === "red"
        ? "bg-red-500/20"
        : "bg-amber-400/20";

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-30 ${bgColor} animate-flash`}
    />
  );
}

// Achievement popup notification
export function AchievementPopup({
  achievement,
  onClose,
}: {
  achievement: {
    title: string;
    titleBn: string;
    icon: string;
    rarity: string;
  } | null;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (achievement) {
      const timeout = setTimeout(onClose, 4000);
      return () => clearTimeout(timeout);
    }
  }, [achievement, onClose]);

  if (!mounted || !achievement) return null;

  const rarityColors: Record<string, string> = {
    common: "from-gray-400 to-gray-600",
    uncommon: "from-green-400 to-green-600",
    rare: "from-blue-400 to-blue-600",
    epic: "from-purple-400 to-purple-600",
    legendary: "from-amber-400 to-orange-500",
  };

  const rarityGlow: Record<string, string> = {
    common: "",
    uncommon: "shadow-[0_0_20px_rgba(74,222,128,0.5)]",
    rare: "shadow-[0_0_25px_rgba(96,165,250,0.5)]",
    epic: "shadow-[0_0_30px_rgba(192,132,252,0.6)]",
    legendary: "shadow-[0_0_40px_rgba(251,191,36,0.7)]",
  };

  return createPortal(
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[110] animate-achievement-pop">
      <div
        className={`relative overflow-hidden rounded-xl border-2 border-white/30 bg-gradient-to-r ${rarityColors[achievement.rarity]} ${rarityGlow[achievement.rarity]} px-6 py-4 text-white`}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="relative flex items-center gap-4">
          <div className="text-4xl animate-bounce">{achievement.icon}</div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider opacity-80">
              🏆 অ্যাচিভমেন্ট আনলক!
            </p>
            <p className="text-lg font-bold">{achievement.titleBn}</p>
            <p className="text-sm opacity-80">{achievement.title}</p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

// Number counter animation
export function AnimatedNumber({
  value,
  duration = 500,
  className = "",
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValueRef = useRef(value);

  useEffect(() => {
    const prevValue = prevValueRef.current;
    const diff = value - prevValue;

    if (diff === 0) return;

    const steps = 20;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      setDisplayValue(Math.round(prevValue + diff * eased));

      if (currentStep >= steps) {
        clearInterval(interval);
        setDisplayValue(value);
      }
    }, stepDuration);

    prevValueRef.current = value;

    return () => clearInterval(interval);
  }, [value, duration]);

  return <span className={className}>{displayValue}</span>;
}

// Progress bar with animation
export function AnimatedProgressBar({
  value,
  max = 100,
  color = "accent",
  showValue = false,
  height = "h-2",
}: {
  value: number;
  max?: number;
  color?: "accent" | "green" | "red" | "blue" | "amber";
  showValue?: boolean;
  height?: string;
}) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const colorClass = {
    accent: "bg-[var(--accent)]",
    green: "bg-green-500",
    red: "bg-red-500",
    blue: "bg-blue-500",
    amber: "bg-amber-500",
  }[color];

  return (
    <div className="relative w-full">
      <div className={`w-full ${height} bg-gray-200/60 rounded-full overflow-hidden`}>
        <div
          className={`${height} ${colorClass} rounded-full transition-all duration-500 ease-out relative overflow-hidden`}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>
      </div>
      {showValue && (
        <span className="absolute right-0 -top-5 text-xs font-medium text-[var(--ink)]/60">
          {value}/{max}
        </span>
      )}
    </div>
  );
}

// Glow text effect
export function GlowText({
  children,
  color = "accent",
  className = "",
}: {
  children: React.ReactNode;
  color?: "accent" | "gold" | "green";
  className?: string;
}) {
  const glowColor = {
    accent: "text-[var(--accent)] [text-shadow:0_0_10px_var(--glow-accent),0_0_20px_var(--glow-accent)]",
    gold: "text-amber-500 [text-shadow:0_0_10px_rgba(251,191,36,0.5),0_0_20px_rgba(251,191,36,0.3)]",
    green: "text-green-500 [text-shadow:0_0_10px_rgba(34,197,94,0.5),0_0_20px_rgba(34,197,94,0.3)]",
  }[color];

  return (
    <span className={`animate-text-glow ${glowColor} ${className}`}>
      {children}
    </span>
  );
}
