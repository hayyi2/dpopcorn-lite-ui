import { useState } from "react"
import { Home } from "lucide-react"
import { PageLayout, PageHeader } from "@/components/layout/page-layout"
import { ScheduleToday } from "@/components/home/schedule-today"
import { DeadlinePriorities } from "@/components/home/deadline-priorities"
import {
  scheduledEntries,
  overdueTasks,
  dueTodayTasks,
  upcomingTasks,
} from "@/components/home/mock-data"
import type { HomeTask } from "@/components/home/types"

export default function HomePage() {
  const [scheduled, setScheduled] = useState<HomeTask[]>(scheduledEntries)
  const [overdue, setOverdue] = useState<HomeTask[]>(overdueTasks)
  const [dueToday, setDueToday] = useState<HomeTask[]>(dueTodayTasks)
  const [upcoming, setUpcoming] = useState<HomeTask[]>(upcomingTasks)

  function toggleTimerDone(id: number) {
    setScheduled((prev) =>
      prev.map((e) => (e.id === id ? { ...e, done: !e.done } : e))
    )
  }

  function toggleTaskDone(id: number) {
    const toggle = (list: HomeTask[]) =>
      list.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    setOverdue(toggle)
    setDueToday(toggle)
    setUpcoming(toggle)
  }

  return (
    <PageLayout>
      <PageHeader icon={<Home className="h-6 w-6" />} title="Home" />
      <div className="space-y-6">
        <ScheduleToday entries={scheduled} onToggleDone={toggleTimerDone} />
        <DeadlinePriorities
          overdue={overdue}
          dueToday={dueToday}
          upcoming={upcoming}
          onToggleDone={toggleTaskDone}
        />
      </div>
    </PageLayout>
  )
}
