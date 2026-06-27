import { CalendarClock } from "lucide-react"
import { CollapsibleGroup } from "@/components/ui/collapsible-group"
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
    <CollapsibleGroup
      icon={<CalendarClock className="h-4 w-4 text-muted-foreground" />}
      label="Schedule Today"
      defaultOpen
    >
      {entries.map((entry) => (
        <HomeTaskRow key={entry.id} task={entry} onToggleDone={onToggleDone} />
      ))}
    </CollapsibleGroup>
  )
}
