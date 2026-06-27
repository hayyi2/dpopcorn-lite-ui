import { cn } from "@/lib/utils"

export function PingDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex h-2 w-2 shrink-0", className)}>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-600 opacity-60" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-600" />
    </span>
  )
}
