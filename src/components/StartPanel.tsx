type Props = {
  started: boolean;
  onStart: () => void;
};

export function StartPanel({ started, onStart }: Props) {
  if (started) return null;

  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      {/* Main briefing card */}
      <div className="relative overflow-hidden rounded-3xl panel-surface p-8 sm:p-10">
        {/* Animated gradient background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(181,54,46,0.12),_transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(127,31,24,0.08),_transparent_50%)]" />

        {/* Top accent bar */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[var(--accent)]/80 via-[var(--accent-muted)]/60 to-transparent" />

        {/* Decorative blurs */}
        <div className="pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-gradient-to-tl from-[var(--accent)]/15 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute -left-10 top-1/2 h-32 w-32 rounded-full bg-[var(--accent-deep)]/10 blur-2xl" />

        {/* Status indicators */}
        <div className="absolute right-4 top-4 flex items-center gap-3 sm:right-6">
          <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-wider text-green-600">
              STANDBY
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--accent)]/10 px-3 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              MISSION BRIEF
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl">
            <span className="gradient-text">মিশন ব্রিফিং</span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[var(--ink)]/80 sm:text-lg">
            আপনাকে নিয়োগ দেওয়া হয়েছে{" "}
            <span className="font-semibold text-[var(--accent)]">
              ক্রাইসিস ম্যানেজমেন্ট অফিসার
            </span>{" "}
            হিসেবে। আপনার মিশন: সমস্যার সমাধান নয় — সমস্যাকে{" "}
            <span className="italic">অ্যাডজাস্ট</span> করা। ঘোষণাই বাস্তবতা। কমিটিই
            সমাধান। নীরবতাই কৌশল।
          </p>

          {/* System info badges */}
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--line)] bg-white/60 px-3 py-1.5 font-mono text-xs text-[var(--ink)]/70 backdrop-blur-sm">
              <span className="h-1 w-1 rounded-full bg-green-500" />
              BUILD 2.0.25
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--line)] bg-white/60 px-3 py-1.5 text-xs text-[var(--ink)]/70 backdrop-blur-sm">
              <span className="h-1 w-1 rounded-full bg-blue-500" />
              STATUS: OPERATIONAL
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--line)] bg-white/60 px-3 py-1.5 text-xs text-[var(--ink)]/70 backdrop-blur-sm">
              <span className="h-1 w-1 rounded-full bg-amber-500" />
              CLEARANCE: LEVEL 5
            </span>
          </div>

          {/* Start button with enhanced styling */}
          <button
            className="group relative mt-8 overflow-hidden rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-deep)] px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-xl shadow-[var(--accent)]/25 transition-all duration-300 hover:translate-y-[-3px] hover:shadow-2xl hover:shadow-[var(--accent)]/30"
            onClick={onStart}
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            <span className="relative flex items-center gap-3">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              গেম শুরু করুন
            </span>
          </button>
        </div>
      </div>

      {/* Manual card */}
      <div className="relative hidden overflow-hidden rounded-3xl lg:flex lg:flex-col">
        {/* Glass background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-[var(--paper-soft)]/90 to-[var(--paper-strong)]/80 backdrop-blur-xl" />
        <div className="absolute inset-0 border border-white/50 rounded-3xl" />

        {/* Decorative elements */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--accent)]/10 blur-2xl" />
        <div className="pointer-events-none absolute -left-10 bottom-10 h-24 w-24 rounded-full bg-[var(--accent-deep)]/10 blur-2xl" />

        <div className="relative flex flex-1 flex-col p-7">
          {/* Header */}
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-deep)] text-white shadow-lg shadow-[var(--accent)]/20">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--accent)]">অপারেশন ম্যানুয়াল</h3>
              <p className="text-xs text-[var(--ink)]/50">FIELD OPERATIONS GUIDE</p>
            </div>
          </div>

          {/* Rules list */}
          <ul className="space-y-3 text-sm leading-relaxed">
            {[
              "প্রতিটি রাউন্ডে নতুন ক্রাইসিস রিপোর্ট আসবে",
              "৪টি কৌশল থেকে একটি বেছে নিন",
              "পাবলিক ট্রাস্ট শূন্য হলে মিশন ফেইলড",
              "৪ রাউন্ডের পর ২ বার নীরবতা নিলে গেম শেষ",
              "কমিটি ৪ বার বা ঘোষণা ৪ বার হলে গেম শেষ",
              "সমাধান করবেন না — অ্যাডজাস্ট করুন!",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3 group">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--stamp)]/10 text-[0.6rem] font-bold text-[var(--stamp)] transition-colors group-hover:bg-[var(--stamp)]/20">
                  {index + 1}
                </span>
                <span className="text-[var(--ink)]/80">{item}</span>
              </li>
            ))}
          </ul>

          {/* Intel box */}
          <div className="mt-auto pt-5">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[var(--accent)]/10 to-[var(--accent-deep)]/10 p-4 backdrop-blur-sm">
              <div className="absolute inset-0 border border-[var(--accent)]/20 rounded-xl" />
              <div className="relative flex items-start gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] text-white">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">INTEL</p>
                  <p className="mt-1 text-xs text-[var(--ink)]/70">
                    সংকট বড় হলে কমিটি গঠন করুন। সংকট ছোট হলেও কমিটি গঠন করুন।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
