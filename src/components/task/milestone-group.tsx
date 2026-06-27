import {
  Milestone as MilestoneIcon,
  MoreHorizontal,
  Calendar,
  ListTodo,
} from "lucide-react"
import type { Milestone, Task } from "./types"
import { TaskCard } from "./task-card"
import { CollapsibleGroup } from "@/components/ui/collapsible-group"
import { IconButton } from "@/components/ui/icon-button"
import { StatLabel } from "@/components/ui/stat-label"

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
  const done = tasks.filter((t) => t.done).length

  const cards = tasks.map((task) => (
    <TaskCard
      key={task.id}
      task={task}
      onToggleDone={onToggleDone}
      onToggleSubDone={onToggleSubDone}
    />
  ))

  if (milestone === null) {
    return <div className="space-y-2">{cards}</div>
  }

  return (
    <CollapsibleGroup
      icon={<MilestoneIcon className="size-4 text-muted-foreground" />}
      label={milestone.title}
      rightSlot={
        <>
          {milestone.deadline && (
            <StatLabel icon={<Calendar />}>{milestone.deadline}</StatLabel>
          )}
          <StatLabel icon={<ListTodo />}>
            {done}
            <span className="text-muted-foreground/40">/</span>
            {tasks.length}
          </StatLabel>
        </>
      }
      actions={
        <IconButton>
          <MoreHorizontal />
        </IconButton>
      }
    >
      {cards}
    </CollapsibleGroup>
  )
}
