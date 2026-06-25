import {
  GripVertical,
  Calendar,
  Timer,
  Play,
  MoreHorizontal,
} from "lucide-react"
import { TodoIcon, DoneIcon } from "@/components/task/task-icons"
import { formatMinutes } from "@/components/task/utils"
import { SquareRoundedIcon } from "@/components/space/square-rounded-icon"
import type { HomeTask } from "./types"

export function HomeTaskRow({
  task,
  onToggleDone,
}: {
  task: HomeTask
  onToggleDone: (id: number) => void
}) {
  return (
    <div
      className={`group flex items-center gap-1 rounded-lg border bg-card px-3 py-2 shadow-sm transition-colors hover:bg-muted/40 ${
        task.done ? "opacity-60" : ""
      }`}
    >
      {/* drag handle */}
      <button className="-mx-1 flex h-5 w-4 shrink-0 cursor-grab items-center justify-center text-muted-foreground/40 transition-colors hover:text-muted-foreground active:cursor-grabbing">
        <GripVertical className="h-3.5 w-3.5" />
      </button>

      {/* left: 2-line content */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {/* row 1: project / milestone breadcrumb */}
        <div className="flex items-center gap-1 pl-1 text-xs text-muted-foreground/70">
          <SquareRoundedIcon
            color="red"
            className="mx-px h-3.5 w-3.5 shrink-0"
          />
          <span className="truncate">
            {task.project}
            {task.milestone_title && (
              <>
                <span className="mx-1 text-muted-foreground/40">/</span>
                {task.milestone_title}
              </>
            )}
          </span>
        </div>

        {/* row 2: checkbox + title */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onToggleDone(task.id)}
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-all ${
              task.done
                ? "text-muted-foreground/50 hover:bg-muted hover:text-muted-foreground"
                : "text-primary hover:bg-primary/10"
            }`}
          >
            {task.done ? <DoneIcon /> : <TodoIcon />}
          </button>
          <span
            className={`truncate text-sm leading-snug ${
              task.done ? "text-muted-foreground line-through" : ""
            }`}
          >
            {task.title}
          </span>
        </div>
      </div>

      {/* right: meta + actions */}
      <div className="flex shrink-0 items-center gap-1.5">
        {task.deadline && (
          <span className="mr-1.5 hidden items-center gap-0.5 text-xs text-muted-foreground sm:flex">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            {task.deadline}
          </span>
        )}
        <span className="mr-1.5 hidden items-center gap-0.5 text-xs text-muted-foreground sm:flex">
          <Timer className="h-3.5 w-3.5 shrink-0" />
          {formatMinutes(task.timer_logged)}
          <span className="text-muted-foreground/40">/</span>
          {formatMinutes(task.estimasi_durasi)}
        </span>
        <button className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary">
          <Play className="h-3.5 w-3.5" />
        </button>
        <button className="flex h-6 w-6 items-center justify-center rounded-md transition-all hover:bg-muted">
          <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </div>
    </div>
  )
}
