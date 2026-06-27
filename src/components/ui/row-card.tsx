import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"

/**
 * RowCard — horizontal card primitive.
 * Replaces the repeated `group flex items-center gap-2 rounded-lg border bg-card ...` pattern
 * across task-row, subtask-row, project-card, space-card, timer-row, home-task-row, timer-task-row.
 *
 * size: "default" (py-2) | "lg" (py-2.5)
 */
export function RowCard({
  className,
  size = "default",
  ...props
}: ComponentProps<"div"> & { size?: "default" | "lg" }) {
  return (
    <div
      className={cn(
        "group flex items-center gap-2 rounded-lg border bg-card shadow-sm transition-colors hover:bg-muted/40",
        size === "default" ? "px-2 py-2 sm:px-3" : "px-2 py-2.5 sm:px-3",
        className
      )}
      {...props}
    />
  )
}
