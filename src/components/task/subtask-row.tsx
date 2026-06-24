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
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-card hover:bg-muted/40 group transition-colors shadow-sm">
      {/* drag handle */}
      <div className="flex items-center">
        <button className="h-5 w-4 flex items-center justify-center cursor-grab active:cursor-grabbing text-muted-foreground/40 hover:text-muted-foreground transition-colors -ml-1 shrink-0">
          <GripVertical className="h-3.5 w-3.5" />
        </button>

        {/* toggle done */}
        <button
          onClick={() => onToggleDone(subtask.id)}
          className={`h-6 w-6 rounded-md flex items-center justify-center transition-all ${subtask.done
            ? "text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted"
            : "text-primary hover:bg-primary/10"
            }`}
        >
          {subtask.done ? <DoneIcon /> : <TodoIcon />}
        </button>
      </div>

      <span className={`text-sm flex-1 truncate ${subtask.done ? "line-through text-muted-foreground" : ""}`}>
        {subtask.title}
      </span>

      <div className="flex items-center gap-1.5 shrink-0">
        {subtask.deadline && (
          <span className="text-[11px] text-muted-foreground hidden sm:block mr-1.5">{subtask.deadline}</span>
        )}
        <span className="text-[11px] text-muted-foreground hidden sm:block mr-1.5">
          {formatMinutes(subtask.timer_logged)}&nbsp;/&nbsp;{formatMinutes(subtask.estimasi_durasi)}
        </span>
        {/* start timer */}
        <button className="h-6 w-6 rounded-md flex items-center justify-center hover:bg-primary/10 hover:text-primary text-muted-foreground transition-all">
          <Play className="h-3.5 w-3.5" />
        </button>
        <button className="h-6 w-6 rounded-md flex items-center justify-center hover:bg-muted transition-all">
          <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </div>
    </div>
  )
}
