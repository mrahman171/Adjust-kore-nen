type Props = {
  title: string;
  subtitle: string;
};

export function Header({ title, subtitle }: Props) {
  return (
    <section className="relative overflow-hidden rounded-3xl panel-surface px-6 py-10 sm:px-10 sm:py-12">
      {/* Animated background gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(181,54,46,0.15),_transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(127,31,24,0.1),_transparent_50%)]" />

      {/* Decorative orbs */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-[var(--accent)]/20 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[var(--accent-deep)]/15 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-40 w-40 rounded-full bg-[var(--accent-muted)]/10 blur-2xl" />

      {/* Top accent line with shimmer */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 animate-shimmer" />

      {/* Stamps with improved styling */}
      <div className="absolute -right-4 top-8 rotate-12 rounded-lg border-2 border-[var(--stamp)] bg-[var(--stamp)]/5 px-5 py-2.5 text-xs font-bold tracking-wider text-[var(--stamp)] shadow-lg shadow-[var(--stamp)]/10 backdrop-blur-sm sm:right-6">
        TOP SECRET
      </div>
      <div className="absolute -left-6 bottom-6 rotate-[-8deg] rounded-lg border-2 border-[var(--accent)] bg-[var(--accent)]/5 px-4 py-2 text-[0.65rem] font-bold tracking-wider text-[var(--accent)] shadow-lg shadow-[var(--accent)]/10 backdrop-blur-sm sm:left-6">
        CLASSIFIED
      </div>

      {/* Live indicator with enhanced animation */}
      <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1.5 backdrop-blur-sm sm:right-6">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
        </span>
        <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-wider text-red-600">
          LIVE
        </span>
      </div>

      {/* Main content with animations */}
      <div className="relative flex flex-col gap-5">
        {/* Subtitle badge */}
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--accent)]/10 px-4 py-1.5 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          <p className="font-display text-xs font-semibold tracking-[0.2em] text-[var(--accent)]">
            ব্যুরোক্রেসি সিমুলেটর ২০২৬
          </p>
        </div>

        {/* Title with gradient effect */}
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl tracking-wider sm:text-5xl lg:text-6xl">
            <span className="gradient-text">{title}</span>
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-[var(--ink)]/80 sm:text-lg">
            {subtitle}
          </p>
        </div>

        {/* Tags with improved styling */}
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/30 bg-white/50 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-[var(--accent)] backdrop-blur-sm transition-all hover:border-[var(--accent)] hover:bg-[var(--accent)]/10">
            <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
            সমাধান নিষিদ্ধ
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/30 bg-white/50 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-[var(--accent)] backdrop-blur-sm transition-all hover:border-[var(--accent)] hover:bg-[var(--accent)]/10">
            <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
            ঘোষণা বাধ্যতামূলক
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/30 bg-white/50 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-[var(--accent)] backdrop-blur-sm transition-all hover:border-[var(--accent)] hover:bg-[var(--accent)]/10">
            <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
            কমিটি অপরিহার্য
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[var(--stamp)] to-[var(--accent-deep)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg shadow-[var(--stamp)]/20">
            ১০-১৫ মিনিট
          </span>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--line-strong)] to-transparent" />
    </section>
  );
}
