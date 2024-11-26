import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer ease-linear duration-200 outline-none disabled:pointer-events-none disabled:opacity-50 disabled:select-none",
  {
    variants: {
      variant: {
        default: "bg-blue-700 text-blue-50 hover:bg-blue-800",
        destructive: "bg-red-500 text-blue-50 hover:bg-red-500/90",
        outline:
          "border border-blue-500 bg-white hover:bg-blue-100 text-blue-800",
        secondary: "bg-blue-100 text-blue-950 hover:bg-blue-200",
        ghost: "hover:bg-blue-100 text-blue-800 hover:text-blue-900",
        link: "text-blue-700 underline-offset-4 hover:underline",
        blue: "bg-blue-50 text-blue-950 hover:bg-blue-950 hover:text-white",
        cyan: "bg-cyan-500 text-white hover:bg-cyan-600",
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
