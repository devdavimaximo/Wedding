const SCROLL_TARGET_ID = 'sistema-financeiro';

export default function HeroSection() {
  const scrollToSystem = () => {
    document.getElementById(SCROLL_TARGET_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 text-white"
      aria-labelledby="hero-heading"
    >
      {/* Camadas decorativas — sem imagem */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>
      <div
        className="pointer-events-none absolute -right-32 top-1/2 h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-y-1/2 rounded-full bg-gradient-to-br from-champagne/25 via-brand-500/15 to-transparent blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-brand-600/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[12%] top-[18%] h-3 w-3 rounded-full bg-champagne/80 shadow-[0_0_24px_rgba(201,169,98,0.6)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[22%] top-[42%] h-2 w-2 rounded-full bg-white/40"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.28em] text-champagne-light">
            Planejamento financeiro
          </p>
          <h1
            id="hero-heading"
            className="font-display text-4xl font-bold leading-[1.15] tracking-tight md:text-5xl lg:text-6xl"
          >
            WeddingPlanner
          </h1>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-champagne/70 to-transparent" />
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-brand-100/95 md:text-xl">
            Organize o orçamento do grande dia com clareza: distribua valores entre buffet, fotografia,
            decoração e muito mais, com base em prioridades que fazem sentido para vocês.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <button
              type="button"
              onClick={scrollToSystem}
              className="inline-flex min-w-[240px] items-center justify-center rounded-full bg-champagne px-8 py-3.5 text-base font-semibold text-brand-950 shadow-soft transition-all duration-500 ease-out hover:-translate-y-0.5 hover:brightness-[1.06] hover:shadow-[0_10px_36px_-12px_rgba(201,169,98,0.38)] focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne-light/80 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900"
            >
              Acessar sistema financeiro
            </button>
            <span className="max-w-xs text-sm text-brand-200/90 sm:max-w-none sm:text-left">
              Role a página ou use o atalho abaixo para ir ao calculador.
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-8 md:pb-10">
        <button
          type="button"
          onClick={scrollToSystem}
          className="flex flex-col items-center gap-1 text-xs text-brand-200/80 transition hover:text-white"
          aria-label="Rolar até o sistema financeiro"
        >
          <span className="uppercase tracking-widest">Explorar</span>
          <span className="inline-block animate-bounce text-lg" aria-hidden>
            ↓
          </span>
        </button>
      </div>
    </section>
  );
}
