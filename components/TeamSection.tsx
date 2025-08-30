"use client";
import React from "react";
import clsx from "clsx";

interface TeamSectionProps {
  className?: string;
}

interface Founder {
  name: string;
  role: string;
  bio: string;
  initials: string;
  linkedIn: string;
  github: string;
  image?: string; // optional future real photo path
}

const founders: Founder[] = [
  {
    name: "Minyong Lee",
    role: "Founder & CEO",
    bio: "Ex-Airbnb Senior Data Scientist; Stanford Statistics PhD. Built large-scale messaging & experimentation pipelines moving 100M+ notifications.",
    initials: "ML",
    linkedIn: "https://www.linkedin.com/in/minyong-lee/",
    github: "https://github.com/minyonglee",
  },
  {
    name: "Alan Cho",
    role: "CTO",
    bio: "Former CTO at GGtics (your.gg). Engineered backend systems at Coupang & Naver serving millions of daily users.",
    initials: "AC",
    linkedIn: "https://www.linkedin.com/in/cho-minkyu/",
    github: "https://github.com/pitzcarraldo",
  },
];

const investors = [
  { name: "StartX", logo: null },
  { name: "Springcamp", logo: null },
  { name: "Schmidt", logo: null },
  { name: "Mashup Ventures", logo: null },
];

export function TeamSection({ className }: TeamSectionProps) {
  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className={clsx(
        "relative mx-auto max-w-6xl px-4 md:px-6 py-28",
        className
      )}
    >
      <div className="mb-14 max-w-3xl">
        <h2
          id="team-heading"
          className="text-balance font-semibold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-neutral-100"
        >
          Built by engineers who have shipped this at scale
        </h2>
        <p className="mt-6 text-sm sm:text-base leading-relaxed text-neutral-400">
          We've seen push break inside global products: painful setup, silent
          failures, and zero visibility for iteration. Clix is the platform we
          wished existed—developer‑first reliability & clarity from day one.
        </p>
      </div>
      <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 mb-20">
        {founders.map((f) => (
          <article
            key={f.name}
            className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 backdrop-blur-sm hover:border-white/20 transition"
          >
            <div className="flex items-start gap-4">
              <div className="relative">
                {f.image ? (
                  // Real image path can replace the placeholder div
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={f.image}
                    alt={`${f.name} profile photo`}
                    className="h-16 w-16 rounded-xl object-cover ring-1 ring-white/10"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-brand-500/40 to-purple-600/40 flex items-center justify-center text-sm font-semibold text-white ring-1 ring-white/10">
                    {f.initials}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-neutral-100 leading-tight">
                  {f.name}
                </h3>
                <p className="text-[11px] uppercase tracking-wide text-brand-300 mt-1 font-medium">
                  {f.role}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-neutral-400">
                  {f.bio}
                </p>
                <div className="mt-4 flex items-center gap-3 text-[11px] font-medium">
                  <a
                    href={f.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 text-neutral-300 hover:text-white hover:bg-white/10"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0A66C2]" />
                    LinkedIn ↗
                  </a>
                  <a
                    href={f.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 text-neutral-300 hover:text-white hover:bg-white/10"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-500" />
                    GitHub ↗
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="space-y-6">
        <h3 className="text-sm font-semibold tracking-wide text-neutral-400 uppercase">
          Backed by
        </h3>
        <ul className="flex flex-wrap items-center gap-4 sm:gap-6">
          {investors.map((inv) => (
            <li key={inv.name} className="flex">
              <div
                className="h-14 w-36 rounded-lg border border-white/10 bg-neutral-900/40 flex items-center justify-center text-[13px] font-medium text-neutral-300 tracking-wide hover:border-white/20 transition"
                aria-label={inv.name}
              >
                {inv.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default TeamSection;
