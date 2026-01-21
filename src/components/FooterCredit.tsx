export function FooterCredit() {
  return (
    <footer className="relative overflow-hidden rounded-3xl panel-surface px-6 py-6 text-center">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(181,54,46,0.05),_transparent_70%)]" />
      <div className="pointer-events-none absolute left-1/4 top-0 h-20 w-20 rounded-full bg-[var(--accent)]/5 blur-2xl" />
      <div className="pointer-events-none absolute right-1/4 bottom-0 h-20 w-20 rounded-full bg-[var(--accent-deep)]/5 blur-2xl" />

      {/* Top accent line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent" />

      {/* Content */}
      <div className="relative">
        {/* Logo/Brand mark */}
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-deep)] text-white shadow-lg shadow-[var(--accent)]/20">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>

        {/* Designer credit */}
        <p className="text-sm font-medium text-[var(--ink)]">
          Designed by{" "}
          <span className="font-semibold text-[var(--accent)]">M.A. Rahman</span>
        </p>

        {/* File number badge */}
        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/5 px-4 py-1.5 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            File No. AK-2026
          </span>
        </div>

        {/* Decorative stamps */}
        <div className="mt-4 flex items-center justify-center gap-4 text-[0.55rem] uppercase tracking-widest text-[var(--ink)]/30">
          <span>CLASSIFIED</span>
          <span className="h-1 w-1 rounded-full bg-[var(--ink)]/20" />
          <span>BUREAUCRACY SIM</span>
          <span className="h-1 w-1 rounded-full bg-[var(--ink)]/20" />
          <span>2026</span>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--line-strong)] to-transparent" />
    </footer>
  );
}
