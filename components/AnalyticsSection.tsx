"use client";

import React, { useState } from "react";
import { BarChart2, Activity } from "lucide-react";
import clsx from "clsx";

interface Point {
  date: string; // yyyy-mm-dd
  sent: number;
  delivered: number;
  tapped: number;
}

// Demo dataset (static) – mirrors real journey metrics concept
const DATA: Point[] = [
  { date: "2025-07-01", sent: 1200, delivered: 1120, tapped: 180 },
  { date: "2025-07-02", sent: 1380, delivered: 1295, tapped: 210 },
  { date: "2025-07-03", sent: 1600, delivered: 1510, tapped: 245 },
  { date: "2025-07-04", sent: 1550, delivered: 1460, tapped: 232 },
  { date: "2025-07-05", sent: 1720, delivered: 1625, tapped: 281 },
  { date: "2025-07-06", sent: 1810, delivered: 1700, tapped: 295 },
  { date: "2025-07-07", sent: 1890, delivered: 1775, tapped: 310 },
];

// Derive funnel (end of range)
const latest = DATA[DATA.length - 1];
const funnel = [
  { label: "Targeted", value: 2100, color: "bg-brand-500" },
  { label: "Sent", value: latest.sent, color: "bg-pink-500" },
  { label: "Delivered", value: latest.delivered, color: "bg-purple-500" },
  { label: "Tapped", value: latest.tapped, color: "bg-amber-500" },
];
const maxFunnel = funnel[0].value;

export function AnalyticsSection({ className }: { className?: string }) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const active = hoverIndex == null ? latest : DATA[hoverIndex];

  // Simple line generator (no external deps)
  const pad = 12;
  const w = 620;
  const h = 180;
  const sentMax = Math.max(...DATA.map((d) => d.sent));
  const sentMin = Math.min(...DATA.map((d) => d.tapped)); // lowest of tapped for baseline spacing
  const scaleX = (i: number) => pad + (i / (DATA.length - 1)) * (w - pad * 2);
  const scaleY = (v: number) =>
    h - pad - ((v - sentMin) / (sentMax - sentMin)) * (h - pad * 2);
  type NumericKey = Exclude<keyof Point, "date">;
  const buildPath = (key: NumericKey) =>
    DATA.map(
      (d, i) => `${i === 0 ? "M" : "L"}${scaleX(i)},${scaleY(d[key])}`
    ).join(" ");

  return (
    <section
      className={clsx(
        "relative mx-auto max-w-6xl px-4 md:px-6 py-24",
        className
      )}
      id="analytics"
      aria-labelledby="analytics-heading"
    >
      <div className="mb-12 flex flex-col gap-10 lg:gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl">
          <h2
            id="analytics-heading"
            className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-100"
          >
            Full-funnel push analytics & conversion clarity
          </h2>
          <p className="mt-4 text-neutral-400 text-sm leading-relaxed">
            Go beyond open rates. Clix links every notification to delivery,
            tap, in-app action and downstream revenue so you can tune journeys
            with surgical precision. No spreadsheet stitching or custom BI
            queries required.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-neutral-300">
            <li className="flex items-start gap-2">
              <BarChart2 className="size-4 mt-0.5 text-brand-400" /> Cohort &
              day-by-day breakdowns
            </li>
            <li className="flex items-start gap-2">
              <Activity className="size-4 mt-0.5 text-brand-400" /> Journey step
              drop-off visualization
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block size-4 mt-0.5 rounded-sm bg-brand-400" />{" "}
              Attribution to conversion events
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block size-4 mt-0.5 rounded-sm bg-gradient-to-tr from-pink-500 to-purple-500" />{" "}
              Instant failure reason drill-down
            </li>
          </ul>
        </div>
        <div className="flex-1 w-full">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-4 sm:p-5 shadow-inner shadow-black/40">
            {/* Conversion mini-sankey bars */}
            <div className="mb-6">
              <div className="grid grid-cols-2 xs:grid-cols-4 gap-4 mb-3">
                {funnel.map((f) => {
                  const pct = Math.round((f.value / maxFunnel) * 100);
                  return (
                    <div key={f.label} className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-neutral-400">
                        <span>{f.label}</span>
                        <span className="font-mono text-neutral-300">
                          {pct}%
                        </span>
                      </div>
                      <div className="h-2 rounded bg-neutral-800 overflow-hidden">
                        <div
                          className={clsx(
                            "h-full rounded transition-all",
                            f.color
                          )}
                          style={{ width: pct + "%" }}
                        />
                      </div>
                      <div className="text-[11px] font-mono text-neutral-500">
                        {f.value.toLocaleString()}
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-[11px] text-neutral-500">
                Sample anonymized journey: targeted users flowing through each
                delivery stage.
              </p>
            </div>
            {/* Line chart */}
            <div className="relative">
              <div className="flex items-center gap-4 text-[11px] mb-3">
                <LegendDot className="bg-pink-500" label="Sent" />
                <LegendDot className="bg-purple-500" label="Delivered" />
                <LegendDot className="bg-amber-500" label="Tapped" />
                <div className="ml-auto font-mono text-neutral-300">
                  {formatDate(active.date)}
                </div>
              </div>
              <div className="w-full overflow-x-auto scrollbar-thin pb-2">
                <svg
                  viewBox={`0 0 ${w} ${h}`}
                  role="img"
                  aria-label="Daily performance line chart"
                  className="min-w-[520px] w-full select-none"
                >
                  <defs>
                    <linearGradient id="gradSent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ec4899" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#ec4899" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="gradDelivered"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradTapped" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  {/* Grid */}
                  {Array.from({ length: 4 }).map((_, i) => {
                    const y = pad + (i / 3) * (h - pad * 2);
                    return (
                      <line
                        key={i}
                        x1={pad}
                        x2={w - pad}
                        y1={y}
                        y2={y}
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth={1}
                      />
                    );
                  })}
                  <path
                    d={buildPath("sent")}
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                  <path
                    d={buildPath("delivered")}
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                  <path
                    d={buildPath("tapped")}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                  {/* Hover points */}
                  {DATA.map((p, i) => {
                    const cx = scaleX(i);
                    return (
                      <g key={p.date}>
                        <circle
                          cx={cx}
                          cy={scaleY(p.sent)}
                          r={hoverIndex === i ? 4 : 3}
                          fill="#ec4899"
                          className="transition-all"
                        />
                        <circle
                          cx={cx}
                          cy={scaleY(p.delivered)}
                          r={hoverIndex === i ? 4 : 3}
                          fill="#8b5cf6"
                          className="transition-all"
                        />
                        <circle
                          cx={cx}
                          cy={scaleY(p.tapped)}
                          r={hoverIndex === i ? 4 : 3}
                          fill="#f59e0b"
                          className="transition-all"
                        />
                        <rect
                          x={cx - w / DATA.length / 2}
                          y={0}
                          width={w / DATA.length}
                          height={h}
                          fill="transparent"
                          className="cursor-pointer"
                          onMouseEnter={() => setHoverIndex(i)}
                          onMouseLeave={() => setHoverIndex(null)}
                          aria-label={`Data for ${p.date}`}
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>
              {/* Active stats */}
              <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
                <Stat label="Sent" value={active.sent} color="text-pink-400" />
                <Stat
                  label="Delivered"
                  value={active.delivered}
                  color="text-purple-400"
                />
                <Stat
                  label="Tapped"
                  value={active.tapped}
                  color="text-amber-400"
                />
              </div>
            </div>
            <p className="mt-6 text-[11px] leading-relaxed text-neutral-500">
              This interactive preview mirrors the production console component
              (no external libraries here). Real data streams in live, supports
              CSV export, failure drill-down and cohort overlays.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {valueProps.map((p) => (
          <div
            key={p.title}
            className="rounded-lg surface-border p-5 bg-white/[0.02] border border-white/10"
          >
            <h3 className="text-sm font-medium text-neutral-100 mb-2">
              {p.title}
            </h3>
            <p className="text-xs leading-relaxed text-neutral-400">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const valueProps = [
  {
    title: "Conversion-aware decisions",
    body: "See exactly which step leaks users: targeting, send, delivery or tap – optimize where it matters instead of guessing.",
  },
  {
    title: "Instant failure intel",
    body: "Drill into error causes (invalid token, throttled, vendor) without leaving the dashboard – fix reliability fast.",
  },
  {
    title: "Attribution that sticks",
    body: "Link pushes to retained sessions, purchases or custom events so growth experiments prove real impact.",
  },
];

function Stat({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wide text-neutral-500 mb-1">
        {label}
      </div>
      <div className={clsx("font-mono text-sm", color)}>
        {value.toLocaleString()}
      </div>
    </div>
  );
}

function LegendDot({ label, className }: { label: string; className: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={clsx("w-3 h-0.5 rounded", className)} />
      <span>{label}</span>
    </div>
  );
}

function formatDate(s: string) {
  const d = new Date(s);
  return d.toLocaleDateString(undefined, { month: "short", day: "2-digit" });
}

export default AnalyticsSection;
