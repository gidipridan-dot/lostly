import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95 transform-gpu",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-primary-foreground hover:scale-105 shadow-soft hover:shadow-strong font-semibold tracking-tight",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-105",
        outline:
          "border-2 border-primary bg-background hover:bg-primary hover:text-primary-foreground text-foreground hover:scale-105 hover:shadow-soft font-medium",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105 hover:shadow-soft font-medium",
        ghost: "hover:bg-muted hover:text-foreground hover:scale-105 font-medium",
        link: "text-primary underline-offset-4 hover:underline hover:scale-105",
        hero: "bg-gradient-primary text-primary-foreground hover:scale-110 shadow-elegant hover:shadow-glow font-bold tracking-tight relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700",
        accent: "bg-accent text-accent-foreground hover:scale-105 shadow-soft hover:shadow-strong font-semibold",
        success: "bg-green-600 text-white hover:bg-green-700 hover:scale-105 shadow-soft hover:shadow-strong font-semibold",
        premium: "bg-gradient-premium text-primary-foreground hover:scale-110 shadow-premium hover:shadow-glow font-bold tracking-tight border border-accent/20"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-6 text-base",
        xl: "h-14 rounded-2xl px-8 text-lg",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
