import { GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"

/**
 * DragHandle — reusable grip button.
 * Extracted from the repeated `-ml-1 flex h-5 w-4 cursor-grab ...` pattern.
 */
export function DragHandle({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      tabIndex={-1}
      className={cn(
        "-ml-1 flex h-5 w-4 shrink-0 cursor-grab items-center justify-center text-muted-foreground/40 transition-colors hover:text-muted-foreground active:cursor-grabbing",
        className
      )}
      {...props}
    >
      <GripVertical className="h-4 w-4" />
    </button>
  )
}
