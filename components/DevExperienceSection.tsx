"use client";
import React from "react";
import clsx from "clsx";

export function DevExperienceSection({ className }: { className?: string }) {
  const items = [
    {
      title: "One-line CLI installer",
      body: "Bootstrap projects, add the SDK, configure platforms and environment keys in seconds.",
    },
    {
      title: "Doctor: static + runtime checks",
      body: "Local command that inspects integration, missing permission prompts, incorrect token handling and mis-ordered lifecycle events before you ship.",
    },
    {
      title: "SDK & Server API docs",
      body: "Clear, versioned references with copy‑paste snippets, event schemas and end‑to‑end examples for every platform.",
    },
    {
      title: "Human, senior support",
      body: "Fast responses from the engineers building Clix – architecture reviews, scaling guidance & migration help.",
    },
  ];

  return (
    <section
      className={clsx(
        "relative mx-auto max-w-6xl px-4 md:px-6 py-20 border-t border-white/5",
        className
      )}
      aria-labelledby="dev-exp-heading"
    >
      <div className="max-w-3xl mb-10">
        <h2
          id="dev-exp-heading"
          className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-100"
        >
          Install the SDK and you&apos;re production‑ready.
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-neutral-400 max-w-xl">
          We obsessed over the developer experience so you don&apos;t spend
          cycles wiring plumbing. Ship faster, with confidence.
        </p>
      </div>
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 list-decimal list-inside">
        {items.map((it, idx) => (
          <li
            key={it.title}
            className="rounded-lg surface-border p-5 bg-white/[0.02] border border-white/10 flex flex-col"
          >
            <h3 className="text-sm font-medium text-neutral-100 mb-2 pr-2">
              {it.title}
            </h3>
            <p className="text-xs leading-relaxed text-neutral-400 flex-1">
              {it.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default DevExperienceSection;
