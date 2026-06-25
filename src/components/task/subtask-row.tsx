import { MoreHorizontal, Play, GripVertical } from "lucide-react"
import type { SubTask } from "./types"
import { TodoIcon, DoneIcon } from "./task-icons"
import { formatMinutes } from "./utils"

export function SubTaskRow({
  subtask,
  onToggleDone,
}: {
  subtask: SubTask
  onToggleDone: (id: number) => void
}) {
  return (
    <div className="group flex items-center gap-2 rounded-lg border bg-card px-3 py-2 shadow-sm transition-colors hover:bg-muted/40">
      {/* drag handle */}
      <div className="flex items-center">
        <button className="-ml-1 flex h-5 w-4 shrink-0 cursor-grab items-center justify-center text-muted-foreground/40 transition-colors hover:text-muted-foreground active:cursor-grabbing">
          <GripVertical className="h-3.5 w-3.5" />
        </button>

        {/* toggle done */}
        <button
          onClick={() => onToggleDone(subtask.id)}
          className={`flex h-6 w-6 items-center justify-center rounded-md transition-all ${
            subtask.done
              ? "text-primary/50 hover:bg-muted hover:text-primary"
              : "text-primary hover:bg-primary/10"
          }`}
        >
          {subtask.done ? <DoneIcon /> : <TodoIcon />}
        </button>
      </div>

      <span
        className={`flex-1 truncate text-sm ${subtask.done ? "text-muted-foreground line-through" : ""}`}
      >
        {subtask.title}
      </span>

      <div className="flex shrink-0 items-center gap-1.5">
        {subtask.deadline && (
          <span className="mr-1.5 hidden text-xs text-muted-foreground sm:block">
            {subtask.deadline}
          </span>
        )}
        <span className="mr-1.5 hidden text-xs text-muted-foreground sm:block">
          {formatMinutes(subtask.timer_logged)}&nbsp;/&nbsp;
          {formatMinutes(subtask.estimasi_durasi)}
        </span>
        {/* start timer */}
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
