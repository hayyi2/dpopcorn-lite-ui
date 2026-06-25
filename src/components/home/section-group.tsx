import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

export function SectionGroup({
  icon,
  label,
  accent,
  children,
  defaultOpen = true,
}: {
  icon: React.ReactNode
  label: string
  count: number
  accent?: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 flex-1 min-w-0 px-2 py-1 rounded-md hover:bg-muted/50 transition-colors"
        >
          <span className="text-muted-foreground/50 hover:text-muted-foreground transition-colors shrink-0">
            {open ? (
              <ChevronDown className="h-3.5 w-3.5" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" />
            )}
          </span>
          <span className={`shrink-0 ${accent ?? "text-primary/70"}`}>{icon}</span>
          <span className="text-sm font-medium text-foreground/80 truncate">{label}</span>
        </button>
      </div>

      {open && <div className="space-y-1.5">{children}</div>}
    </div>
  )
}
