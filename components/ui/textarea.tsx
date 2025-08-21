import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.memo(function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-16 w-full rounded-md border border-gray-300 bg-white dark:bg-gray-950 dark:border-gray-700 px-3 py-2 text-base shadow-sm transition-colors outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100 resize-none",
        className
      )}
      {...props}
    />
  )
});

export { Textarea }
