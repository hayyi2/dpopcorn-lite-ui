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
      className={`flex items-center gap-1 px-3 py-2 rounded-lg border bg-card hover:bg-muted/40 group transition-colors shadow-sm ${
        task.done ? "opacity-60" : ""
      }`}
    >
      {/* drag handle */}
      <button className="h-5 w-4 flex items-center justify-center cursor-grab active:cursor-grabbing text-muted-foreground/40 hover:text-muted-foreground transition-colors -mx-1 shrink-0">
        <GripVertical className="h-3.5 w-3.5" />
      </button>

      {/* left: 2-line content */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        {/* row 1: project / milestone breadcrumb */}
        <div className="flex items-center pl-1 gap-1 text-xs text-muted-foreground/70">
          <SquareRoundedIcon color="red" className="h-3.5 w-3.5 shrink-0" />
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
            className={`h-6 w-6 rounded-md flex items-center justify-center transition-all shrink-0 ${
              task.done
                ? "text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted"
                : "text-primary hover:bg-primary/10"
            }`}
          >
            {task.done ? <DoneIcon /> : <TodoIcon />}
          </button>
          <span
            className={`text-sm leading-snug truncate ${
              task.done ? "line-through text-muted-foreground" : ""
            }`}
          >
            {task.title}
          </span>
        </div>
      </div>

      {/* right: meta + actions */}
      <div className="flex items-center gap-1.5 shrink-0">
        {task.deadline && (
          <span className="hidden sm:flex items-center gap-0.5 text-xs text-muted-foreground mr-1.5">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            {task.deadline}
          </span>
        )}
        <span className="hidden sm:flex items-center gap-0.5 text-xs text-muted-foreground mr-1.5">
          <Timer className="h-3.5 w-3.5 shrink-0" />
          {formatMinutes(task.timer_logged)}
          <span className="text-muted-foreground/40">/</span>
          {formatMinutes(task.estimasi_durasi)}
        </span>
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
