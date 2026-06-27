import { AlertCircle, CalendarCheck2, CalendarRange, Clock } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CollapsibleGroup } from "@/components/ui/collapsible-group"
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
  const defaultTab =
    overdue.length > 0 ? "overdue" : dueToday.length > 0 ? "today" : "upcoming"

  return (
    <CollapsibleGroup
      icon={<CalendarRange className="h-4 w-4 text-muted-foreground" />}
      label="Deadline Priorities"
      defaultOpen
    >
      <Tabs defaultValue={defaultTab} className="gap-1.5">
        <div className="scrollbar-hide w-full flex-nowrap justify-start overflow-x-auto overflow-y-hidden">
          <TabsList className="gap-0.5">
            <TabsTrigger value="overdue" className="gap-1.5 px-3 text-xs">
              <AlertCircle className="h-3.5 w-3.5 text-destructive/80" />
              <span>Overdue</span>
              {overdue.length > 0 && (
                <Badge
                  variant="secondary"
                  className="h-4 min-w-4 border-0 bg-destructive/15 px-1 text-[10px] text-destructive"
                >
                  {overdue.length}
                </Badge>
              )}
            </TabsTrigger>

            <TabsTrigger value="today" className="gap-1.5 px-3 text-xs">
              <Clock className="h-3.5 w-3.5 text-amber-500/80" />
              <span>Due Today</span>
              {dueToday.length > 0 && (
                <Badge
                  variant="secondary"
                  className="h-4 min-w-4 border-0 bg-amber-500/15 px-1 text-[10px] text-amber-600"
                >
                  {dueToday.length}
                </Badge>
              )}
            </TabsTrigger>

            <TabsTrigger value="upcoming" className="gap-1.5 px-3 text-xs">
              <CalendarCheck2 className="h-3.5 w-3.5 text-emerald-500/80" />
              <span>Upcoming</span>
              {upcoming.length > 0 && (
                <Badge
                  variant="secondary"
                  className="h-4 min-w-4 border-0 bg-emerald-500/15 px-1 text-[10px] text-emerald-600"
                >
                  {upcoming.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </div>

        {(
          [
            { value: "overdue", tasks: overdue, empty: "No overdue tasks" },
            { value: "today", tasks: dueToday, empty: "No tasks due today" },
            { value: "upcoming", tasks: upcoming, empty: "No upcoming tasks" },
          ] as const
        ).map(({ value, tasks, empty }) => (
          <TabsContent key={value} value={value} className="space-y-2">
            {tasks.length === 0 ? (
              <p className="px-2 py-4 text-center text-xs text-muted-foreground">
                {empty}
              </p>
            ) : (
              tasks.map((task) => (
                <HomeTaskRow
                  key={task.id}
                  task={task}
                  onToggleDone={onToggleDone}
                />
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>
    </CollapsibleGroup>
  )
}
