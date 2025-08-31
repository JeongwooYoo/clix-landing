"use client";

import React from "react";
import clsx from "clsx";
import { Step2Audience } from "./mocks/step-2-audience";

export function CampaignSection({ className }: { className?: string }) {
  return (
    <section
      className={clsx(
        "relative mx-auto max-w-6xl px-4 md:px-6 py-24",
        className
      )}
      id="campaigns"
      aria-labelledby="campaigns-heading"
    >
      <div className="mb-12 flex flex-col gap-10 lg:gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl">
          <h2
            id="campaigns-heading"
            className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-100"
          >
            Sky is the limit – Precision audience & timing automation
          </h2>
          <p className="mt-4 text-neutral-400 text-sm leading-relaxed">
            Send each campaign to the right users at the perfect moment without
            constraints. Combine behavior, attributes, app version and session
            patterns to segment; toggle logic live to preview reach before you
            ship. This demo embeds the actual (mocked) Audience Builder
            component used in the console.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-neutral-300">
            <li className="flex items-start gap-2">
              <span className="inline-block size-4 mt-0.5 rounded-sm bg-brand-400" />
              Real component (fully mocked) – no backend needed
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block size-4 mt-0.5 rounded-sm bg-gradient-to-tr from-pink-500 to-purple-500" />
              Debounced audience estimate (synthetic)
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block size-4 mt-0.5 rounded-sm bg-amber-500" />
              AND cluster + OR branching visualization
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block size-4 mt-0.5 rounded-sm bg-blue-500" />
              Type–aware operators & value inputs
            </li>
          </ul>
        </div>
        <div className="flex-1 w-full">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-3 sm:p-5 shadow-inner shadow-black/40">
            <Step2Audience />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CampaignSection;
