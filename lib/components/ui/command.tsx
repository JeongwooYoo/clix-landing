import * as React from "react";
import clsx from "clsx";

// Extremely lightweight mock of shadcn Command components (no keyboard nav)
export const Command = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx("flex flex-col gap-2", className)} {...props} />
);
export const CommandInput = (
  props: React.InputHTMLAttributes<HTMLInputElement>
) => (
  <input
    {...props}
    className={clsx(
      "h-8 w-full rounded bg-neutral-800/80 px-2 text-xs text-neutral-100 placeholder-neutral-400 focus:outline-none border border-white/10 focus:border-brand-500/40",
      props.className
    )}
  />
);
export const CommandList = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx("max-h-60 overflow-y-auto", className)} {...props} />
);
export const CommandEmpty = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx("py-4 text-center text-xs text-neutral-500", className)}
    {...props}
  />
);
export const CommandGroup = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx("flex flex-col gap-0.5", className)} {...props} />
);
export const CommandItem = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    type="button"
    className={clsx(
      "text-left px-2 py-1 rounded text-[11px] hover:bg-white/5 text-neutral-300 flex items-center gap-2",
      className
    )}
    {...props}
  />
);
