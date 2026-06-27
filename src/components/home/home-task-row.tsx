import { Play, MoreHorizontal, Calendar, Timer } from "lucide-react"
import { TodoIcon, DoneIcon } from "@/components/task/task-icons"
import { formatMinutes } from "@/components/task/utils"
import { SquareRoundedIcon } from "@/components/space/square-rounded-icon"
import type { HomeTask } from "./types"
import { RowCard } from "@/components/ui/row-card"
import { IconButton } from "@/components/ui/icon-button"
import { StatLabel } from "@/components/ui/stat-label"
import { getProjectColor } from "@/lib/project-colors"
import { DragHandle } from "@/components/ui/drag-handle"

export function HomeTaskRow({
  task,
  onToggleDone,
}: {
  task: HomeTask
  onToggleDone: (id: number) => void
}) {
  return (
    <RowCard className={task.done ? "opacity-60" : ""}>
      {/* left: 2-line content — mirrors TimerCard layout */}
      <div className="flex min-w-0 flex-1 items-center">
        <DragHandle />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          {/* row 1: project / milestone breadcrumb */}
          <div className="flex items-center gap-1 pl-1 text-xs text-muted-foreground/70">
            <SquareRoundedIcon
              color={getProjectColor(task.project)}
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

          {/* row 2: toggle + title */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <IconButton
                variant={task.done ? "muted" : "primary"}
                className="[&>svg]:size-4.5"
                onClick={() => onToggleDone(task.id)}
              >
                {task.done ? <DoneIcon /> : <TodoIcon />}
              </IconButton>
              <span
                className={`truncate text-sm leading-snug ${task.done ? "text-muted-foreground line-through" : ""}`}
              >
                {task.title}
              </span>
            </div>
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
      </div>

      {/* meta */}
      <div className="hidden items-center justify-center gap-2 sm:flex">
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
  )
}
