import { useState } from "react"
import { ChevronDown, ChevronRight, Calendar, Timer } from "lucide-react"
import { TimerRow } from "./timer-row"
import { formatDate, formatDuration } from "./utils"
import type { TimerEntry } from "./types"

export function DateGroup({
  date,
  entries,
  onToggleDone,
}: {
  date: string
  entries: TimerEntry[]
  onToggleDone: (id: number) => void
}) {
  const [open, setOpen] = useState(true)
  const totalSecs = entries
    .filter((e) => !e.running)
    .reduce((s, e) => s + e.duration, 0)
  const done = entries.filter((e) => e.done).length

  return (
    <div className="space-y-1.5">
      {/* group header */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-muted/50"
        >
          <span className="shrink-0 text-muted-foreground/50 transition-colors hover:text-muted-foreground">
            {open ? (
              <ChevronDown className="h-3.5 w-3.5" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" />
            )}
          </span>
          <Calendar className="h-3.5 w-3.5 shrink-0 text-primary/70" />
          <span className="truncate text-sm font-medium text-foreground/80">
            {formatDate(date)}
          </span>
          <span className="ml-auto flex shrink-0 items-center gap-3 pr-1">
            <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
              <Timer className="h-3.5 w-3.5 shrink-0" />
              {totalSecs > 0 ? formatDuration(totalSecs) : "—"}
            </span>
            <span className="text-xs text-muted-foreground">
              {done}
              <span className="text-muted-foreground/40">/</span>
              {entries.length}
            </span>
          </span>
        </button>
      </div>

      {/* rows */}
      {open && (
        <div className="space-y-1.5">
          {entries.map((entry) => (
            <TimerRow
              key={entry.id}
              entry={entry}
              onToggleDone={onToggleDone}
            />
          ))}
        </div>
      )}
    </div>
  )
}
