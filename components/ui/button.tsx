import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-upr-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-upr-blue text-white shadow-lg shadow-upr-blue/25 hover:bg-upr-navy hover:shadow-xl dark:bg-upr-blue dark:hover:bg-upr-navy",
        secondary:
          "bg-upr-red text-white shadow-lg shadow-upr-red/25 hover:bg-red-700",
        outline:
          "border-2 border-upr-blue bg-transparent text-upr-blue hover:bg-upr-blue hover:text-white dark:border-upr-gold dark:text-upr-gold dark:hover:bg-upr-gold dark:hover:text-upr-navy",
        ghost:
          "hover:bg-upr-blue/10 text-upr-blue dark:text-upr-light dark:hover:bg-white/10",
        gold:
          "bg-gradient-to-r from-upr-gold to-upr-yellow text-upr-navy shadow-lg hover:brightness-110",
        glass:
          "glass text-foreground hover:bg-white/90 dark:hover:bg-white/10",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-13 px-8 text-base",
        icon: "h-10 w-10",
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
