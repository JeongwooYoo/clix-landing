import * as React from "react";
import clsx from "clsx";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={clsx(
        "text-sm font-medium leading-none select-none",
        className
      )}
      {...props}
    />
  )
);
Label.displayName = "Label";
