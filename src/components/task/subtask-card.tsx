import { Play, MoreHorizontal, Calendar, Timer } from "lucide-react"
import type { SubTask } from "./types"
import { TodoIcon, DoneIcon } from "./task-icons"
import { formatMinutes } from "./utils"
import { RowCard } from "@/components/ui/row-card"
import { DragHandle } from "@/components/ui/drag-handle"
import { IconButton } from "@/components/ui/icon-button"
import { StatLabel } from "@/components/ui/stat-label"

export function SubTaskCard({
  subtask,
  onToggleDone,
}: {
  subtask: SubTask
  onToggleDone: (id: number) => void
}) {
  return (
    <RowCard>
      <div className="flex min-w-0 flex-1 items-center">
        <div className="flex items-center">
          <DragHandle />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <IconButton
              variant={subtask.done ? "muted" : "primary"}
              onClick={() => onToggleDone(subtask.id)}
              className="shrink-0 [&>svg]:size-4.5"
            >
              {subtask.done ? <DoneIcon /> : <TodoIcon />}
            </IconButton>
            {/* title */}
            <span
              className={`truncate text-sm ${subtask.done ? "text-muted-foreground line-through" : ""}`}
            >
              {subtask.title}
            </span>
          </div>

          {/* meta */}
          <div className="mt-1 pl-1 sm:hidden">
            <div className="ml-px flex items-center gap-2">
              {subtask.deadline && (
                <StatLabel icon={<Calendar />}>{subtask.deadline}</StatLabel>
              )}
              <StatLabel icon={<Timer />}>
                {formatMinutes(subtask.timer_logged)}
                <span className="text-muted-foreground/40">/</span>
                {formatMinutes(subtask.estimasi_durasi)}
              </StatLabel>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden items-center gap-2 sm:flex">
        {subtask.deadline && (
          <StatLabel icon={<Calendar />}>{subtask.deadline}</StatLabel>
        )}
        <StatLabel icon={<Timer />}>
          {formatMinutes(subtask.timer_logged)}
          <span className="text-muted-foreground/40">/</span>
          {formatMinutes(subtask.estimasi_durasi)}
        </StatLabel>
      </div>

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
  )
}
