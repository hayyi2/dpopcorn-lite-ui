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

type DeadlineSection = "overdue" | "today" | "upcoming"
type DeadlineTask = HomeTask & { section: DeadlineSection }

const toDeadline = (
  tasks: HomeTask[],
  section: DeadlineSection
): DeadlineTask[] => tasks.map((t) => ({ ...t, section }))

const fromSection = (tasks: DeadlineTask[], section: DeadlineSection) =>
  tasks.filter((t) => t.section === section)

export default function HomePage() {
  const [scheduled, setScheduled] = useState<HomeTask[]>(scheduledEntries)
  const [deadlines, setDeadlines] = useState<DeadlineTask[]>([
    ...toDeadline(overdueTasks, "overdue"),
    ...toDeadline(dueTodayTasks, "today"),
    ...toDeadline(upcomingTasks, "upcoming"),
  ])

  function toggleScheduled(id: number) {
    setScheduled((prev) =>
      prev.map((e) => (e.id === id ? { ...e, done: !e.done } : e))
    )
  }

  function toggleDeadline(id: number) {
    setDeadlines((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  return (
    <PageLayout>
      <PageHeader icon={<Home className="h-6 w-6" />} title="Home" />
      <div className="space-y-6">
        <ScheduleToday entries={scheduled} onToggleDone={toggleScheduled} />
        <DeadlinePriorities
          overdue={fromSection(deadlines, "overdue")}
          dueToday={fromSection(deadlines, "today")}
          upcoming={fromSection(deadlines, "upcoming")}
          onToggleDone={toggleDeadline}
        />
      </div>
    </PageLayout>
  )
}
