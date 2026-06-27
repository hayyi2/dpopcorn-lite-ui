import { MoreHorizontal, Clock, Timer, StickyNotes } from "lucide-react"
import { TodoIcon, DoneIcon } from "@/components/task/task-icons"
import { formatDuration } from "./utils"
import type { TimerEntry, TimerType } from "./types"
import { SquareRoundedIcon } from "@/components/space/square-rounded-icon"
import { Badge } from "@/components/ui/badge"
import { RowCard } from "@/components/ui/row-card"
import { IconButton } from "@/components/ui/icon-button"
import { StatLabel } from "@/components/ui/stat-label"
import { getProjectColor } from "@/lib/project-colors"

const TIMER_BADGE: Record<
  NonNullable<TimerType>,
  { label: string; class: string }
> = {
  flow_session: {
    label: "Flow Session",
    class: "bg-violet-500/10 text-violet-500",
  },
  pomodoro: { label: "Pomodoro", class: "bg-red-500/10 text-red-500" },
  flowtime: { label: "Flowtime", class: "bg-blue-500/10 text-blue-500" },
  quick_timer: {
    label: "Quick Timer",
    class: "bg-amber-500/10 text-amber-500",
  },
}

export function TimerCard({
  entry,
  onToggleDone,
}: {
  entry: TimerEntry
  onToggleDone: (id: number) => void
}) {
  const timerBadge = entry.timer_type ? TIMER_BADGE[entry.timer_type] : null

  return (
    <RowCard className={entry.done ? "opacity-60" : ""}>
      {/* 3-line content */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {/* project + parent task */}
        <div className="flex min-w-0 items-center gap-1 pl-1 text-xs text-muted-foreground/70">
          <SquareRoundedIcon
            color={getProjectColor(entry.project)}
            className="ml-px h-3.5 w-3.5"
          />
          <span className="flex-1 truncate">
            {entry.project}
            {entry.parentTask && (
              <>
                <span className="text-muted-foreground/40">/</span>
                {entry.parentTask}
              </>
            )}
          </span>
        </div>

        {/* task title */}
        <div className="flex min-w-0 items-center gap-2">
          <IconButton
            variant={entry.done ? "muted" : "primary"}
            className="shrink-0 [&>svg]:size-4.5"
            onClick={() => onToggleDone(entry.id)}
          >
            {entry.done ? <DoneIcon /> : <TodoIcon />}
          </IconButton>
          <span
            className={`truncate text-sm leading-snug ${entry.done ? "text-muted-foreground line-through" : ""}`}
          >
            {entry.task}
          </span>
        </div>

        <div className="mt-1 flex items-center gap-2 pl-1 @sm:hidden">
          {timerBadge && !entry.running && (
            <Badge variant="secondary" className={timerBadge.class}>
              {timerBadge.label}
            </Badge>
          )}
          <StatLabel icon={<Clock />}>{entry.startedAt}</StatLabel>
          <StatLabel icon={<Timer />}>
            {entry.running ? "Running..." : formatDuration(entry.duration)}
          </StatLabel>
        </div>

        {/* note */}
        {entry.note && (
          <div className="flex min-w-0 items-center gap-1 pl-1 text-xs text-muted-foreground/60 @sm:mt-1">
            <StickyNotes className="mx-px h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{entry.note}</span>
          </div>
        )}
      </div>

      {/* meta */}
      <div className="hidden items-center gap-2 @sm:flex">
        {timerBadge && !entry.running && (
          <Badge variant="secondary" className={timerBadge.class}>
            {timerBadge.label}
          </Badge>
        )}
        <StatLabel icon={<Clock />}>{entry.startedAt}</StatLabel>
        <StatLabel icon={<Timer />}>
          {entry.running ? "Running..." : formatDuration(entry.duration)}
        </StatLabel>
      </div>

      {/* actions */}
      <div className="flex items-center gap-2">
        <IconButton>
          <MoreHorizontal />
        </IconButton>
      </div>
    </RowCard>
  )
}
