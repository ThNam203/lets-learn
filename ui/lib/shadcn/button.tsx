import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer ease-linear duration-200 outline-none disabled:pointer-events-none disabled:opacity-50 disabled:select-none",
  {
    variants: {
      variant: {
        default:
          "bg-indigo-950 text-indigo-50 hover:bg-indigo-900 dark:bg-indigo-50 dark:text-indigo-950 dark:hover:bg-indigo-50/90",
        destructive:
          "bg-red-500 text-indigo-50 hover:bg-red-500/90 dark:bg-red-950 dark:text-indigo-50 dark:hover:bg-red-950/90",
        outline:
          "border border-indigo-500 bg-white hover:bg-indigo-100 text-indigo-800 dark:border-indigo-800 dark:bg-indigo-950 dark:hover:bg-indigo-800 dark:hover:text-indigo-50",
        secondary:
          "bg-indigo-100 text-indigo-950 hover:bg-indigo-200 dark:bg-indigo-800 dark:text-indigo-50 dark:hover:bg-indigo-800/80",
        ghost:
          "hover:bg-indigo-100 hover:text-indigo-950 dark:hover:bg-indigo-800 dark:hover:text-indigo-50",
        link: "text-indigo-700 underline-offset-4 hover:underline",
        indigo:
          "bg-indigo-50 text-indigo-950 hover:bg-indigo-950 hover:text-white dark:hover:bg-indigo-800 dark:hover:text-white",
        success: "bg-green-500 text-white hover:bg-green-600",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-9 p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
