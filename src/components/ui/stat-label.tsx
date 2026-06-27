import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

/**
 * StatLabel — inline icon + text metadata display.
 * Used for deadline, timer duration, clock time, etc.
 * Hidden on mobile (sm:flex).
 *
 * Intentionally separate from Badge — Badge = categorization label (filled bg),
 * StatLabel = contextual info (transparent, muted text).
 */
export function StatLabel({
  icon,
  className,
  children,
}: {
  icon?: ReactNode
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        "flex justify-center gap-1 text-xs text-nowrap text-muted-foreground [&>svg]:size-3.5",
        className
      )}
    >
      {icon}
      {children}
    </div>
  )
}
