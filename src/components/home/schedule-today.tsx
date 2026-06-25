import { CalendarClock } from "lucide-react"
import { SectionGroup } from "./section-group"
import { HomeTaskRow } from "./home-task-row"
import type { HomeTask } from "./types"

export function ScheduleToday({
  entries,
  onToggleDone,
}: {
  entries: HomeTask[]
  onToggleDone: (id: number) => void
}) {
  return (
    <SectionGroup
      icon={<CalendarClock className="h-3.5 w-3.5" />}
      label="Schedule Today"
      count={entries.length}
      defaultOpen
    >
      {entries.map((entry) => (
        <HomeTaskRow key={entry.id} task={entry} onToggleDone={onToggleDone} />
      ))}
    </SectionGroup>
  )
}
