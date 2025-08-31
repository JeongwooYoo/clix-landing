"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
  Sparkles,
  Gauge,
  KeyRound,
  Activity,
  Globe2,
  LayoutDashboard,
} from "lucide-react";

interface LovesItSectionProps {
  className?: string;
}

const ROLES = ["User", "Developer", "Marketer"] as const;

export function LovesItSection({ className }: LovesItSectionProps) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ROLES.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className={clsx(
        "relative mx-auto max-w-6xl px-4 md:px-6 py-24 flex flex-col items-center text-center",
        className
      )}
      aria-labelledby="loves-it-heading"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.15] [mask-image:radial-gradient(circle_at_center,white,transparent_70%)] bg-[radial-gradient(circle_at_center,theme(colors.brand.500/.4),transparent_60%)]" />
      <div className="relative">
        <h2
          id="loves-it-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-balance flex items-center"
        >
          <AnimatedRole role={ROLES[index]} />{" "}
          <span className="text-neutral-300">loves it.</span>
        </h2>
        <span className="sr-only" aria-live="polite">
          {ROLES[index]} loves it.
        </span>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 text-left">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.02] p-5 flex flex-col overflow-hidden hover:border-white/20 transition"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_top_left,rgba(0,196,159,0.25),transparent_70%)]" />
              <div className="relative flex items-center gap-3 mb-3">
                <div className="shrink-0 size-9 rounded-lg bg-white/[0.04] grid place-items-center border border-white/10 text-brand-300 group-hover:shadow-[0_0_0_1px_rgba(0,196,159,0.4)] group-hover:border-brand-400/40 transition">
                  <f.icon className="size-4" />
                </div>
                <h3 className="text-sm font-medium text-neutral-100">
                  {f.title}
                </h3>
              </div>
              <p className="relative text-xs leading-relaxed text-neutral-400">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedRole({ role }: { role: string }) {
  const [prev, setPrev] = React.useState(role);
  const [animating, setAnimating] = React.useState(false);

  React.useEffect(() => {
    if (role !== prev) {
      setAnimating(true);
      const timeout = setTimeout(() => {
        setPrev(role);
        setAnimating(false);
      }, 500); // match animation duration
      return () => clearTimeout(timeout);
    }
  }, [role, prev]);

  return (
    <span
      className="relative inline-block h-[1em] min-w-[8ch] overflow-hidden align-baseline"
      aria-hidden="true"
    >
      {animating && (
        <span className="absolute inset-0 bg-gradient-to-r from-emerald-700 via-emerald-400 to-teal-300 bg-clip-text text-transparent animate-role-out">
          {prev}
        </span>
      )}
      <span
        key={role}
        className={clsx(
          "absolute inset-0 bg-gradient-to-r from-emerald-700 via-emerald-400 to-teal-300 bg-clip-text text-transparent",
          animating ? "animate-role-in" : ""
        )}
      >
        {role}
      </span>
    </span>
  );
}

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const features: Feature[] = [
  {
    title: "Personalized dynamic content",
    description:
      "Template with user traits & real‑time events so every push feels 1:1, not broadcast.",
    icon: Sparkles,
  },
  {
    title: "Frequency control",
    description:
      "Adaptive throttling prevents notification fatigue while preserving key moments.",
    icon: Gauge,
  },
  {
    title: "Smart token management",
    description:
      "Automatic cleanup & rotation keeps your device token inventory healthy and reliable.",
    icon: KeyRound,
  },
  {
    title: "Real-time delivery insights",
    description:
      "See send → deliver → tap metrics stream in seconds after firing a campaign.",
    icon: Activity,
  },
  {
    title: "Timezone & locale support",
    description:
      "Ship globally: schedule by local hour & localize content without branching code.",
    icon: Globe2,
  },
  {
    title: "Intuitive console",
    description:
      "Growth & product teams launch, test and iterate without waiting on app releases.",
    icon: LayoutDashboard,
  },
];

export default LovesItSection;
