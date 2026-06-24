import { useState } from "react"
import { MoreHorizontal, Play, ChevronDown, ChevronRight, GripVertical } from "lucide-react"
import type { Task } from "./types"
import { TodoIcon, DoneIcon } from "./task-icons"
import { formatMinutes } from "./utils"
import { SubTaskRow } from "./subtask-row"

export function TaskRow({
  task,
  onToggleDone,
  onToggleSubDone,
}: {
  task: Task
  onToggleDone: (id: number) => void
  onToggleSubDone: (taskId: number, subId: number) => void
}) {
  const [open, setOpen] = useState(true)
  const hasSubtasks = task.subtasks.length > 0

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border bg-card hover:bg-muted/40 group transition-colors shadow-sm">
        {/* drag handle */}
        <div className="flex items-center">
          <button className="h-5 w-4 flex items-center justify-center cursor-grab active:cursor-grabbing text-muted-foreground/40 hover:text-muted-foreground transition-colors -ml-1 shrink-0">
            <GripVertical className="h-3.5 w-3.5" />
          </button>

          {/* collapse toggle */}
          {hasSubtasks && (
            <button
              onClick={() => setOpen((v) => !v)}
              className="h-6 w-6 rounded-md flex items-center justify-center transition-all text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted"
              >
              {/* className="shrink-0 text-muted-foreground hover:text-foreground transition-colors" */}
              {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
            </button>
          )}
          {/* toggle done */}
          <button
            onClick={() => onToggleDone(task.id)}
            className={`h-6 w-6 rounded-md flex items-center justify-center transition-all ${task.done
                ? "text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted"
                : "text-primary hover:bg-primary/10"
              }`}
          >
            {task.done ? <DoneIcon /> : <TodoIcon />}
          </button>
        </div>

        {/* title */}
        <span className={`text-sm flex-1 truncate ${task.done ? "line-through text-muted-foreground" : ""}`}>
          {task.title}
        </span>

        {/* meta + actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {task.deadline && (
            <span className="text-[11px] text-muted-foreground hidden sm:block mr-1.5">{task.deadline}</span>
          )}
          <span className="text-[11px] text-muted-foreground hidden sm:block mr-1.5">
            {formatMinutes(task.timer_logged)}&nbsp;/&nbsp;{formatMinutes(task.estimasi_durasi)}
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

      {open && hasSubtasks && (
        <div className="ml-6 space-y-1.5">
          {task.subtasks.map((sub) => (
            <SubTaskRow
              key={sub.id}
              subtask={sub}
              onToggleDone={(subId) => onToggleSubDone(task.id, subId)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
