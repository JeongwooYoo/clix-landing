"use client";
import React, { useState } from "react";
import clsx from "clsx";
import { FaApple, FaAndroid } from "react-icons/fa";
import { SiReact, SiFlutter } from "react-icons/si";

interface Platform {
  id: string;
  name: string;
  href: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const platforms: Platform[] = [
  {
    id: "ios",
    name: "iOS",
    href: "https://docs.clix.so/sdk-quickstart-ios",
    Icon: FaApple,
  },
  {
    id: "android",
    name: "Android",
    href: "https://docs.clix.so/sdk-quickstart-android",
    Icon: FaAndroid,
  },
  {
    id: "react-native",
    name: "React Native",
    href: "https://docs.clix.so/sdk-quickstart-react-native",
    Icon: SiReact,
  },
  {
    id: "flutter",
    name: "Flutter",
    href: "https://docs.clix.so/sdk-quickstart-flutter",
    Icon: SiFlutter,
  },
];

export function PlatformsSection({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <section
      className={clsx(
        "relative mx-auto max-w-6xl px-4 md:px-6 py-14",
        className
      )}
      aria-labelledby="platforms-heading"
    >
      <div className="flex flex-col items-start gap-3 mb-8">
        <h2
          id="platforms-heading"
          className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-300"
        >
          Ready for every environment.
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 max-w-xl">
          The easiest, most automated push SDK setup—plug in and you&apos;re
          done.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        {platforms.map((p) => {
          const Icon = p.Icon;
          return (
            <a
              key={p.id}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setActive(p.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(p.id)}
              onBlur={() => setActive(null)}
              className={clsx(
                "group relative flex items-center justify-center transition outline-none",
                "h-14 w-14 rounded-lg ring-1 ring-white/10",
                active && active !== p.id
                  ? "opacity-30"
                  : "opacity-70 hover:opacity-100 focus:opacity-100",
                "bg-neutral-900/40 hover:bg-neutral-800/60"
              )}
              aria-label={`${p.name} installation guide`}
            >
              <Icon className="w-7 h-7 text-neutral-300 group-hover:text-white group-focus:text-white transition" />
              <span className="sr-only">{p.name}</span>
              <span className="pointer-events-none absolute -bottom-6 text-[10px] font-medium tracking-wide text-brand-300 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition">
                Docs ↗
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default PlatformsSection;
