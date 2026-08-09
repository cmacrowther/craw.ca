import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.memo(function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full min-w-0 rounded-md border border-white/15 bg-background/80 px-3 py-1 text-base text-foreground shadow-inner shadow-black/20 transition-[color,background-color,border-color,box-shadow] outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/70 hover:border-white/30 focus:border-white/60 focus:bg-background focus:ring-2 focus:ring-white/15 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
});

export { Input }
