import { useState } from "react"
import {
  Play,
  ChevronDown,
  ChevronRight,
  Calendar,
  Timer,
  MoreHorizontal,
} from "lucide-react"
import type { Task } from "./types"
import { TodoIcon, DoneIcon } from "./task-icons"
import { formatMinutes } from "./utils"
import { SubTaskCard } from "./subtask-card"
import { RowCard } from "@/components/ui/row-card"
import { DragHandle } from "@/components/ui/drag-handle"
import { IconButton } from "@/components/ui/icon-button"
import { StatLabel } from "@/components/ui/stat-label"

export function TaskCard({
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
    <div className="space-y-2">
      <RowCard size="lg">
        <div className="flex min-w-0 flex-1 items-center">
          <div className="flex items-center">
            <DragHandle />

            {hasSubtasks && (
              <IconButton
                onClick={() => setOpen((v) => !v)}
                className="text-muted-foreground/50"
              >
                {open ? <ChevronDown /> : <ChevronRight />}
              </IconButton>
            )}
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <IconButton
                variant={task.done ? "muted" : "primary"}
                onClick={() => onToggleDone(task.id)}
                className="shrink-0 [&>svg]:size-4.5"
              >
                {task.done ? <DoneIcon /> : <TodoIcon />}
              </IconButton>
              {/* title */}
              <span
                className={`truncate text-sm ${task.done ? "text-muted-foreground line-through" : ""}`}
              >
                {task.title}
              </span>
            </div>

            {/* meta */}
            <div className="mt-1 pl-1 sm:hidden">
              <div className="ml-px flex items-center gap-2">
                {task.deadline && (
                  <StatLabel icon={<Calendar />}>{task.deadline}</StatLabel>
                )}
                <StatLabel icon={<Timer />}>
                  {formatMinutes(task.timer_logged)}
                  <span className="text-muted-foreground/40">/</span>
                  {formatMinutes(task.estimasi_durasi)}
                </StatLabel>
              </div>
            </div>
          </div>
        </div>

        {/* meta */}
        <div className="hidden items-center gap-2 sm:flex">
          {task.deadline && (
            <StatLabel icon={<Calendar />}>{task.deadline}</StatLabel>
          )}
          <StatLabel icon={<Timer />}>
            {formatMinutes(task.timer_logged)}
            <span className="text-muted-foreground/40">/</span>
            {formatMinutes(task.estimasi_durasi)}
          </StatLabel>
        </div>

        {/* actions */}
        <div className="flex items-center">
          <IconButton
            variant="primary"
            className="text-muted-foreground hover:text-primary"
          >
            <Play />
          </IconButton>
          <IconButton>
            <MoreHorizontal />
          </IconButton>
        </div>
      </RowCard>

      {open && hasSubtasks && (
        <div className="ml-6 space-y-2">
          {task.subtasks.map((sub) => (
            <SubTaskCard
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
