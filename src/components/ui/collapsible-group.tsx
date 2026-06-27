import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

export function CollapsibleGroup({
  icon,
  label,
  rightSlot,
  actions,
  children,
  defaultOpen = true,
}: {
  icon: React.ReactNode
  label: string
  rightSlot?: React.ReactNode
  actions?: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-muted/50"
        >
          <span className="shrink-0 text-muted-foreground/50 transition-colors hover:text-muted-foreground">
            {open ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
          </span>
          {icon}
          <span className="truncate text-sm font-medium text-foreground/80">
            {label}
          </span>
          {rightSlot && (
            <span className="ml-auto flex items-center gap-2">{rightSlot}</span>
          )}
        </button>

        {actions}
      </div>

      {open && <div className="space-y-2">{children}</div>}
    </div>
  )
}
