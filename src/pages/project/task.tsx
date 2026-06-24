import { useState } from "react"
import { useOutletContext } from "react-router"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { MilestoneGroup } from "@/components/task/milestone-group"
import type { Milestone, Task } from "@/components/task/types"
import type { ProjectOutletContext } from "@/components/layout/project-layout"

export default function TaskPage() {
  const { project } = useOutletContext<ProjectOutletContext>()

  const [tasks, setTasks] = useState<Task[]>(project.tasks)

  function toggleDone(id: number) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  function toggleSubDone(taskId: number, subId: number) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              subtasks: t.subtasks.map((s) =>
                s.id === subId ? { ...s, done: !s.done } : s
              ),
            }
          : t
      )
    )
  }

  const milestoneGroups: { milestone: Milestone|null; tasks: Task[]; }[] = [
    ...project.milestones.map((m) => ({
      milestone: m,
      tasks: tasks.filter((t) => t.milestone_id === m.id),
    })),
  ]

  const ungrouped = tasks.filter((t) => t.milestone_id === null)
  if (ungrouped.length > 0) {
    milestoneGroups.push({ milestone: null, tasks: ungrouped })
  }

  return (
    <>
      {tasks.length === 0 ? (
        <div className="px-3 py-8 rounded-lg border border-dashed border-border/50 text-center">
          <i className="text-sm text-muted-foreground">No tasks yet. Create one to get started.</i>
        </div>
      ) : (
        <div className="space-y-6">
          {milestoneGroups.map((group) => (
            <MilestoneGroup
              key={group.milestone?.id ?? "ungrouped"}
              milestone={group.milestone}
              tasks={group.tasks}
              onToggleDone={toggleDone}
              onToggleSubDone={toggleSubDone}
            />
          ))}
        </div>
      )}

      {/* Mobile FAB */}
      <div className="flex sm:hidden flex-col gap-2 pt-2">
        <Button className="w-full gap-1.5">
          <Plus className="h-4 w-4" /> New Task
        </Button>
      </div>
    </>
  )
}
