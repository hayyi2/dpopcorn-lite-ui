import { useState } from "react"
import { ChevronDown, ChevronRight, Milestone as MilestoneIcon, MoreHorizontal, Calendar, ListTodo } from "lucide-react"
import type { Milestone, Task } from "./types"
import { TaskRow } from "./task-row"

export function MilestoneGroup({
  milestone,
  tasks,
  onToggleDone,
  onToggleSubDone,
}: {
  milestone: Milestone | null
  tasks: Task[]
  onToggleDone: (id: number) => void
  onToggleSubDone: (taskId: number, subId: number) => void
}) {
  const [open, setOpen] = useState(true)
  const done = tasks.filter((t) => t.done).length

  return (
    <div className="space-y-1.5">
      {milestone !== null && (
        <div className="flex items-center gap-1">
          {/* collapse + label */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 flex-1 min-w-0 px-2 py-1 rounded-md hover:bg-muted/50 transition-colors"
          >
            <span className="text-muted-foreground/50 hover:text-muted-foreground transition-colors shrink-0">
              {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
            </span>
            <MilestoneIcon className="h-3.5 w-4 text-primary/70 shrink-0" />
            <span className="text-sm font-medium text-foreground/80 truncate">{milestone.title}</span>
            <span className="ml-auto flex items-center gap-2 shrink-0 pr-1">
              {milestone.deadline && (
                <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 shrink-0" />
                  {milestone.deadline}
                </span>
              )}
              <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                <ListTodo className="h-3.5 w-3.5 shrink-0" />
                {done}
                <span className="text-muted-foreground/40">/</span>
                {tasks.length}
              </span>
            </span>
          </button>

          {/* more actions */}
          <button className="h-6 w-6 rounded-md flex items-center justify-center hover:bg-muted transition-all shrink-0">
            <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </div>
      )}

      {open && (
        <div className="space-y-1.5">
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onToggleDone={onToggleDone}
              onToggleSubDone={onToggleSubDone}
            />
          ))}
        </div>
      )}
    </div>
  )
}
