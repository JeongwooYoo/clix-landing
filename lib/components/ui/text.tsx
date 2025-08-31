import * as React from "react";
import clsx from "clsx";

export const Subtitle: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...props
}) => (
  <p
    className={clsx("text-sm font-medium text-neutral-300", className)}
    {...props}
  />
);
