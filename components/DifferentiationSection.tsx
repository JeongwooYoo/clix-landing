"use client";
import React from "react";
import clsx from "clsx";

interface DifferentiationSectionProps {
  className?: string;
}

export function DifferentiationSection({
  className,
}: DifferentiationSectionProps) {
  return (
    <section
      className={clsx(
        "relative mx-auto max-w-6xl px-4 md:px-6 py-28 flex items-center justify-center text-center",
        className
      )}
      aria-labelledby="clix-diff-heading"
    >
      <div className="relative">
        <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-br from-brand-500/20 via-purple-600/10 to-transparent blur-2xl" />
        <h2
          id="clix-diff-heading"
          className="relative text-balance font-semibold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.15] overflow-visible"
        >
          <span className="text-neutral-300">Ditch legacy push tools.</span>
          <br className="hidden sm:block" />
          <span className="text-gradient block mt-8 text-5xl sm:text-6xl lg:text-7xl leading-[1.05] pb-1">
            Grow mobile engagement with an adaptive notification engine.
          </span>
        </h2>
        <p className="sr-only">
          Replace legacy broadcast tooling with Clix: an adaptive engine that
          learns per-user timing, frequency and content to drive sustained
          mobile engagement.
        </p>
      </div>
    </section>
  );
}

export default DifferentiationSection;
