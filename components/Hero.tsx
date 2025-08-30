import Link from 'next/link';
import { ArrowRight } from 'react-feather';

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-28 pb-28 hero-gradient">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-40" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full surface-border px-3 py-1 text-xs font-medium text-neutral-300 mb-6">
            <span className="h-2 w-2 rounded-full bg-brand-400 animate-pulse" />
            <span>Early access open</span>
          </div>
          <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-gradient">Build Duolingo-grade</span>{' '}
            <span className="text-neutral-300">push notifications in 5 minutes.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-neutral-400">
            Clix gives you an adaptive notification engine: test, personalize, and scale high-retention push campaigns without touching your backend stack.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="#get-started"
              className="group relative inline-flex items-center justify-center gap-2 rounded-md bg-brand-500 px-7 py-3 text-sm font-medium text-white shadow-[0_0_0_0_rgba(0,196,159,0.5)] transition hover:bg-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
            >
              Get Started
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#docs"
              className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.02] px-7 py-3 text-sm font-medium text-neutral-200 hover:border-white/20 hover:bg-white/[0.05]"
            >
              View Docs
            </Link>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-neutral-950 to-transparent" />
    </section>
  );
}
