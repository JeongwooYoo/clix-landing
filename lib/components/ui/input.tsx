import * as React from "react";

import clsx from "clsx";

import { cn } from "@/lib/utils/style";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

function InputGroup({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      data-slot="control"
      className={clsx(
        "relative isolate block",
        "has-[svg:first-child]:[&_input]:pl-8 has-[svg:last-child]:[&_input]:pr-8",
        '[&_svg]:absolute [&_svg]:z-10 [&_svg]:top-2.5 [&_svg:not([class*="size-"])]:size-4',
        "[&_svg:first-child]:left-2.5 [&_svg:last-child]:right-2.5",
        "[&_svg]:text-core-500",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { Input, InputGroup };
