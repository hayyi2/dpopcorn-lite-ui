import {
  MoreHorizontal,
  Clock,
  Timer,
  StickyNotes
} from "lucide-react"
import { TodoIcon, DoneIcon } from "@/components/task/task-icons"
import { formatDuration } from "./utils"
import type { TimerEntry, TimerType } from "./types"
import { SquareRoundedIcon } from '../space/square-rounded-icon'
import { Badge } from '../ui/badge'

const TIMER_BADGE: Record<NonNullable<TimerType>, { label: string; class: string }> = {
  flow_session: {
    label: "Flow Session",
    class: "bg-violet-500/10 text-violet-500",
  },
  pomodoro: {
    label: "Pomodoro",
    class: "bg-red-500/10 text-red-500",
  },
  flowtime: {
    label: "Flowtime",
    class: "bg-blue-500/10 text-blue-500",
  },
  quick_timer: {
    label: "Quick Timer",
    class: "bg-amber-500/10 text-amber-500",
  },
}

export function TimerRow({
  entry,
  onToggleDone,
}: {
  entry: TimerEntry
  onToggleDone: (id: number) => void
}) {
  const timerBadge = entry.timer_type ? TIMER_BADGE[entry.timer_type] : null

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border bg-card hover:bg-muted/40 group transition-colors shadow-sm ${entry.done ? "opacity-60" : ""
        }`}
    >
      {/* 3-line content */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        {/* row 1: project + parent task */}
        <div className="flex items-center pl-1 gap-1 text-xs text-muted-foreground/70">
          <SquareRoundedIcon color='red' className="h-3.5 w-3.5 shrink-0 opacity-" />
          <span className="truncate">
            {entry.project}
            {entry.parentTask && (
              <>
                <span className="mx-1 text-muted-foreground/40">/</span>
                {entry.parentTask}
              </>
            )}
          </span>
        </div>

        {/* row 2: task title */}
        <div className='flex items-center gap-1.5 mb-1'>
          {/* toggle done */}
          <button
            onClick={() => onToggleDone(entry.id)}
            className={`h-6 w-6 rounded-md flex items-center justify-center transition-all shrink-0 ${entry.done
              ? "text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted"
              : "text-primary hover:bg-primary/10"
              }`}
          >
            {entry.done ? <DoneIcon /> : <TodoIcon />}
          </button>
          <span
            className={`text-sm leading-snug truncate ${entry.done ? "line-through text-muted-foreground" : ""
              }`}
          >
            {entry.task}
          </span>
        </div>

        {/* row 3: note */}
        {entry.note && (
          <div className="flex items-center pl-1 gap-1 text-xs text-muted-foreground/60">
            <StickyNotes className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{entry.note}</span>
          </div>
        )}
      </div>

      {/* right meta + actions */}
      <div className="flex justify-center items-center gap-1.5 shrink-0">
        {/* timer type badge */}
        {timerBadge && !entry.running && (
          <Badge variant="secondary" className={timerBadge.class}>{timerBadge.label}</Badge>
        )}

        {/* meta */}
        <span className="justify-center gap-0.5 text-xs text-muted-foreground hidden sm:flex mr-1.5">
          <Clock className="h-3.5 w-3.5 shrink-0" />
          {entry.startedAt}
        </span>
        <span className="justify-center gap-0.5 text-xs text-muted-foreground hidden sm:flex mr-1.5">
          <Timer className="h-3.5 w-3.5 shrink-0" />
          {entry.running ? "Running..." : formatDuration(entry.duration)}
        </span>

        <button className="h-6 w-6 rounded-md flex items-center justify-center hover:bg-muted transition-all">
          <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </div>
    </div>
  )
}
