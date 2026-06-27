import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"

type IconButtonVariant = "ghost" | "primary" | "muted"

const variantClass: Record<IconButtonVariant, string> = {
  /** default: hover muted bg, no color shift */
  ghost: "text-muted-foreground hover:bg-muted",
  /** primary: icon tinted primary, hover primary/10 bg */
  primary: "text-primary hover:bg-primary/10",
  /** muted: faded primary icon, hover back to primary */
  muted: "text-primary/50 hover:bg-muted hover:text-primary",
}

/**
 * IconButton — small square icon button (h-6 w-6).
 * Replaces repeated `flex h-6 w-6 items-center justify-center rounded-md transition-all ...` pattern.
 *
 * variant: "ghost" (MoreHorizontal, etc.) | "primary" (Play, todo toggle) | "muted" (done toggle)
 */
export function IconButton({
  className,
  variant = "ghost",
  ...props
}: ComponentProps<"button"> & { variant?: IconButtonVariant }) {
  return (
    <button
      className={cn(
        "flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-md transition-all [&>svg]:size-4",
        variantClass[variant],
        className
      )}
      {...props}
    />
  )
}
