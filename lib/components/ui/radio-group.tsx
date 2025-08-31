import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import clsx from "clsx";

export const RadioGroup = RadioGroupPrimitive.Root;

export const RadioGroupItem = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={clsx(
      "aspect-square h-4 w-4 rounded-full border border-white/20 text-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 data-[state=checked]:bg-brand-500",
      className
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <div className="h-2.5 w-2.5 rounded-full bg-white" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = "RadioGroupItem";
