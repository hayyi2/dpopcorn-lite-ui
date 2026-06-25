import { useState } from "react"
import {
  MoreHorizontal,
  Play,
  ChevronDown,
  ChevronRight,
  GripVertical,
  Calendar,
  Timer,
} from "lucide-react"
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
      <div className="group flex items-center gap-2 rounded-lg border bg-card px-3 py-2.5 shadow-sm transition-colors hover:bg-muted/40">
        {/* drag handle */}
        <div className="flex items-center">
          <button className="-ml-1 flex h-5 w-4 shrink-0 cursor-grab items-center justify-center text-muted-foreground/40 transition-colors hover:text-muted-foreground active:cursor-grabbing">
            <GripVertical className="h-3.5 w-3.5" />
          </button>

          {/* collapse toggle */}
          {hasSubtasks && (
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground/50 transition-all hover:bg-muted hover:text-muted-foreground"
            >
              {/* className="shrink-0 text-muted-foreground hover:text-foreground transition-colors" */}
              {open ? (
                <ChevronDown className="h-3.5 w-3.5" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5" />
              )}
            </button>
          )}
          {/* toggle done */}
          <button
            onClick={() => onToggleDone(task.id)}
            className={`flex h-6 w-6 items-center justify-center rounded-md transition-all ${
              task.done
                ? "text-primary/50 hover:bg-muted hover:text-primary"
                : "text-primary hover:bg-primary/10"
            }`}
          >
            {task.done ? <DoneIcon /> : <TodoIcon />}
          </button>
        </div>

        {/* title */}
        <span
          className={`flex-1 truncate text-sm ${task.done ? "text-muted-foreground line-through" : ""}`}
        >
          {task.title}
        </span>

        {/* meta + actions */}
        <div className="flex shrink-0 items-center gap-1.5">
          {task.deadline && (
            <span className="mr-1.5 hidden justify-center gap-0.5 text-xs text-muted-foreground sm:flex">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              {task.deadline}
            </span>
          )}
          <span className="mr-1.5 hidden justify-center gap-0.5 text-xs text-muted-foreground sm:flex">
            <Timer className="h-3.5 w-3.5 shrink-0" />
            {formatMinutes(task.timer_logged)}
            <span className="text-muted-foreground/40">/</span>
            {formatMinutes(task.estimasi_durasi)}
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
