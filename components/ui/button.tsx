import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium tracking-[0.01em] transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "border border-white bg-white text-black shadow-sm hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-lg active:translate-y-0 active:shadow-sm",
        destructive:
          "border border-white bg-white text-black shadow-sm hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-lg active:translate-y-0 active:shadow-sm",
        outline:
          "border border-white/55 bg-white/5 text-white shadow-sm hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-black hover:shadow-lg active:translate-y-0 active:shadow-sm",
        secondary:
          "border border-white bg-white text-black shadow-sm hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-lg active:translate-y-0 active:shadow-sm",
        ghost:
          "text-white hover:bg-white/12 hover:text-white active:bg-white/20",
        link: "site-link text-white underline-offset-4",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
