import {
  AlertCircle,
  CalendarCheck2,
  CalendarRange,
  Clock,
} from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { SectionGroup } from "./section-group"
import { HomeTaskRow } from "./home-task-row"
import type { HomeTask } from "./types"

export function DeadlinePriorities({
  overdue,
  dueToday,
  upcoming,
  onToggleDone,
}: {
  overdue: HomeTask[]
  dueToday: HomeTask[]
  upcoming: HomeTask[]
  onToggleDone: (id: number) => void
}) {
  const total = overdue.length + dueToday.length + upcoming.length
  const defaultTab =
    overdue.length > 0 ? "overdue" : dueToday.length > 0 ? "today" : "upcoming"

  return (
    <SectionGroup
      icon={<CalendarRange className="h-3.5 w-3.5" />}
      label="Deadline Priorities"
      count={total}
      defaultOpen
    >
      <div>
        <Tabs defaultValue={defaultTab} className="gap-1.5">
          <TabsList className="h-8 gap-0.5">
            <TabsTrigger value="overdue" className="gap-1.5 text-xs px-3">
              <AlertCircle className="h-3.5 w-3.5 text-destructive/80" />
              Overdue
              {overdue.length > 0 && (
                <Badge
                  variant="secondary"
                  className="h-4 min-w-4 px-1 text-[10px] bg-destructive/15 text-destructive border-0"
                >
                  {overdue.length}
                </Badge>
              )}
            </TabsTrigger>

            <TabsTrigger value="today" className="gap-1.5 text-xs px-3">
              <Clock className="h-3.5 w-3.5 text-amber-500/80" />
              Due Today
              {dueToday.length > 0 && (
                <Badge
                  variant="secondary"
                  className="h-4 min-w-4 px-1 text-[10px] bg-amber-500/15 text-amber-600 border-0"
                >
                  {dueToday.length}
                </Badge>
              )}
            </TabsTrigger>

            <TabsTrigger value="upcoming" className="gap-1.5 text-xs px-3">
              <CalendarCheck2 className="h-3.5 w-3.5 text-emerald-500/80" />
              Upcoming
              {upcoming.length > 0 && (
                <Badge
                  variant="secondary"
                  className="h-4 min-w-4 px-1 text-[10px] bg-emerald-500/15 text-emerald-600 border-0"
                >
                  {upcoming.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overdue" className="space-y-1.5">
            {overdue.length === 0 ? (
              <p className="text-xs text-muted-foreground px-2 py-4 text-center">
                No overdue tasks
              </p>
            ) : (
              overdue.map((task) => (
                <HomeTaskRow key={task.id} task={task} onToggleDone={onToggleDone} />
              ))
            )}
          </TabsContent>

          <TabsContent value="today" className="space-y-1.5">
            {dueToday.length === 0 ? (
              <p className="text-xs text-muted-foreground px-2 py-4 text-center">
                No tasks due today
              </p>
            ) : (
              dueToday.map((task) => (
                <HomeTaskRow key={task.id} task={task} onToggleDone={onToggleDone} />
              ))
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-1.5">
            {upcoming.length === 0 ? (
              <p className="text-xs text-muted-foreground px-2 py-4 text-center">
                No upcoming tasks
              </p>
            ) : (
              upcoming.map((task) => (
                <HomeTaskRow key={task.id} task={task} onToggleDone={onToggleDone} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </SectionGroup>
  )
}
