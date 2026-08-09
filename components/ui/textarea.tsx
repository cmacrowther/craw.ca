import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.memo(function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-16 w-full resize-none rounded-md border border-white/15 bg-background/80 px-3 py-2 text-base text-foreground shadow-inner shadow-black/20 transition-[color,background-color,border-color,box-shadow] outline-none placeholder:text-muted-foreground/70 hover:border-white/30 focus:border-white/60 focus:bg-background focus:ring-2 focus:ring-white/15 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
});

export { Textarea }
