import { Calendar, ListTodo, Timer } from "lucide-react"
import { TimerCard } from "./timer-card"
import { formatDate, formatDuration } from "./utils"
import type { TimerEntry } from "./types"
import { CollapsibleGroup } from "@/components/ui/collapsible-group"
import { StatLabel } from "@/components/ui/stat-label"

export function DateGroup({
  date,
  entries,
  onToggleDone,
}: {
  date: string
  entries: TimerEntry[]
  onToggleDone: (id: number) => void
}) {
  const totalSecs = entries
    .filter((e) => !e.running)
    .reduce((s, e) => s + e.duration, 0)
  const done = entries.filter((e) => e.done).length

  return (
    <CollapsibleGroup
      icon={<Calendar className="size-4 text-muted-foreground" />}
      label={formatDate(date)}
      rightSlot={
        <>
          <StatLabel icon={<Timer />}>
            {totalSecs > 0 ? formatDuration(totalSecs) : "—"}
          </StatLabel>
          <StatLabel icon={<ListTodo />}>
            {done}
            <span className="text-muted-foreground/40">/</span>
            {entries.length}
          </StatLabel>
        </>
      }
    >
      {entries.map((entry) => (
        <TimerCard key={entry.id} entry={entry} onToggleDone={onToggleDone} />
      ))}
    </CollapsibleGroup>
  )
}
