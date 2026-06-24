import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PageLayout, PageHeader } from "@/components/layout/page-layout"
import { Plus, Timer } from "lucide-react"
import { DateGroup } from "@/components/timer/date-group"
import { groupByDate } from "@/components/timer/utils"
import type { TimerEntry } from "@/components/timer/types"

const initialTimers: TimerEntry[] = [
  {
    id: 1,
    project: "dpopcorn-ui",
    task: "Implement Timer Page",
    parentTask: "Frontend Tasks",
    running: true,
    startedAt: "09:15",
    duration: 0,
    note: "Styling & layout pass",
    done: false,
    date: "2026-06-24",
    timer_type: "flow_session",
  },
  {
    id: 2,
    project: "dpopcorn-ui",
    task: "Fix Auth Middleware",
    running: false,
    startedAt: "08:00",
    duration: 3720,
    done: false,
    date: "2026-06-24",
    timer_type: "pomodoro",
  },
  {
    id: 3,
    project: "dpopcorn-api",
    task: "Setup Database Schema",
    parentTask: "Backend Setup",
    running: false,
    startedAt: "14:30",
    duration: 5400,
    note: "PostgreSQL + migrations",
    done: true,
    date: "2026-06-23",
    timer_type: "flowtime",
  },
  {
    id: 4,
    project: "dpopcorn-api",
    task: "Write Unit Tests",
    running: false,
    startedAt: "11:00",
    duration: 2700,
    done: false,
    date: "2026-06-23",
    timer_type: "quick_timer",
  },
]

export default function TimerPage() {
  const [timers, setTimers] = useState<TimerEntry[]>(initialTimers)

  function toggleDone(id: number) {
    setTimers((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const groups = groupByDate(timers)

  return (
    <PageLayout>
      <PageHeader
        icon={<Timer className="h-6 w-6" />}
        title="Timer"
        actions={
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" /> Add Manual
          </Button>
        }
      />

      <div className="space-y-6">
        {groups.length === 0 ? (
          <div className="px-3 py-8 rounded-lg border border-dashed border-border/50 text-center">
            <i className="text-sm text-muted-foreground">No timer entries yet. Add one to get started.</i>
          </div>
        ) : (
          groups.map(([date, entries]) => (
            <DateGroup
              key={date}
              date={date}
              entries={entries}
              onToggleDone={toggleDone}
            />
          ))
        )}
      </div>

      {/* Mobile FAB */}
      <div className="flex sm:hidden flex-col gap-2 pt-2">
        <Button className="w-full gap-1.5">
          <Plus className="h-4 w-4" /> Add Manual
        </Button>
      </div>
    </PageLayout>
  )
}
