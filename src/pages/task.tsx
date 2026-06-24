import { useState } from "react"
import { useParams, useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { PageLayout, PageHeader } from "@/components/layout/page-layout"
import { Plus, ListFilter, LayoutList, ArrowLeft } from "lucide-react"
import { MilestoneGroup } from "@/components/task/milestone-group"
import type { Milestone, Task } from "@/components/task/types"

type ProjectData = {
  projectName: string
  color: string
  milestones: Milestone[]
  tasks: Task[]
}

const mockTasksByProject: Record<string, ProjectData> = {
  "11": {
    projectName: "API Gateway",
    color: "#10b981",
    milestones: [
      { id: 1, title: "Phase 1 – Core", deadline: "2026-06-30" },
      { id: 2, title: "Phase 2 – Docs", deadline: "2026-07-10" },
    ],
    tasks: [
      {
        id: 1,
        title: "Setup rate limiting middleware",
        deadline: "2026-06-30",
        estimasi_durasi: 120,
        timer_logged: 45,
        done: false,
        milestone_id: 1,
        subtasks: [
          { id: 11, title: "Research libraries", deadline: null, estimasi_durasi: 30, timer_logged: 30, done: true },
          { id: 12, title: "Implement token bucket", deadline: null, estimasi_durasi: 60, timer_logged: 15, done: false },
          { id: 13, title: "Write unit tests", deadline: null, estimasi_durasi: 30, timer_logged: 0, done: false },
        ],
      },
      {
        id: 2,
        title: "Add request logging",
        deadline: "2026-07-05",
        estimasi_durasi: 90,
        timer_logged: 90,
        done: true,
        milestone_id: 1,
        subtasks: [],
      },
      {
        id: 3,
        title: "Document API endpoints",
        deadline: null,
        estimasi_durasi: 60,
        timer_logged: 10,
        done: false,
        milestone_id: 2,
        subtasks: [
          { id: 31, title: "Auth endpoints", deadline: null, estimasi_durasi: 20, timer_logged: 10, done: false },
          { id: 32, title: "Data endpoints", deadline: null, estimasi_durasi: 20, timer_logged: 0, done: false },
          { id: 33, title: "Admin endpoints", deadline: null, estimasi_durasi: 20, timer_logged: 0, done: false },
        ],
      },
    ],
  },
  "12": {
    projectName: "Auth Service",
    color: "#3b82f6",
    milestones: [
      { id: 1, title: "MVP", deadline: "2026-06-28" },
    ],
    tasks: [
      {
        id: 4,
        title: "Implement JWT refresh token",
        deadline: "2026-06-28",
        estimasi_durasi: 180,
        timer_logged: 60,
        done: false,
        milestone_id: 1,
        subtasks: [
          { id: 41, title: "Design token schema", deadline: null, estimasi_durasi: 30, timer_logged: 30, done: true },
          { id: 42, title: "Implement rotation logic", deadline: null, estimasi_durasi: 90, timer_logged: 30, done: false },
          { id: 43, title: "Handle revocation", deadline: null, estimasi_durasi: 60, timer_logged: 0, done: false },
        ],
      },
      {
        id: 5,
        title: "Add OAuth2 provider",
        deadline: "2026-07-10",
        estimasi_durasi: 240,
        timer_logged: 0,
        done: false,
        milestone_id: null,
        subtasks: [],
      },
    ],
  },
  "21": {
    projectName: "Frontend App",
    color: "#8b5cf6",
    milestones: [
      { id: 1, title: "React 19 Migration", deadline: null },
    ],
    tasks: [
      {
        id: 6,
        title: "Migrate to React 19",
        deadline: null,
        estimasi_durasi: 300,
        timer_logged: 120,
        done: false,
        milestone_id: 1,
        subtasks: [
          { id: 61, title: "Update dependencies", deadline: null, estimasi_durasi: 30, timer_logged: 30, done: true },
          { id: 62, title: "Fix breaking changes", deadline: null, estimasi_durasi: 180, timer_logged: 90, done: false },
          { id: 63, title: "Run regression tests", deadline: null, estimasi_durasi: 90, timer_logged: 0, done: false },
        ],
      },
    ],
  },
  "101": {
    projectName: "Docs Site",
    color: "#06b6d4",
    milestones: [],
    tasks: [
      {
        id: 7,
        title: "Write getting started guide",
        deadline: "2026-07-01",
        estimasi_durasi: 120,
        timer_logged: 30,
        done: false,
        milestone_id: null,
        subtasks: [],
      },
    ],
  },
}

export default function TaskPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()

  const data = projectId ? mockTasksByProject[projectId] : undefined

  const [tasks, setTasks] = useState<Task[]>(data?.tasks ?? [])

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

  if (!data) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center gap-4 py-16 text-muted-foreground">
          <p>Project not found.</p>
          <Button variant="outline" onClick={() => navigate("/space")}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Spaces
          </Button>
        </div>
      </PageLayout>
    )
  }

  // Group tasks by milestone, then ungrouped at the end
  const milestoneGroups: { milestone: Milestone | null; tasks: Task[] }[] = [
    ...data.milestones.map((m) => ({
      milestone: m,
      tasks: tasks.filter((t) => t.milestone_id === m.id),
    })),
  ]

  const ungrouped = tasks.filter((t) => t.milestone_id === null)
  if (ungrouped.length > 0) {
    milestoneGroups.push({ milestone: null, tasks: ungrouped })
  }

  return (
    <PageLayout>
      <PageHeader
        icon={<LayoutList className="h-6 w-6" />}
        title={data.projectName}
        actions={
          <div className="hidden sm:flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => navigate("/space")} className="gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              Spaces
            </Button>
            <Button size="sm" variant="outline" className="gap-1.5">
              <ListFilter className="h-4 w-4" />
              Filter
            </Button>
            <Button size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              New Task
            </Button>
          </div>
        }
      />

      <div className="space-y-6">
        {tasks.length === 0 ? (
          <div className="px-3 py-8 rounded-lg border border-dashed border-border/50 text-center">
            <i className="text-sm text-muted-foreground">No tasks yet. Create one to get started.</i>
          </div>
        ) : (
          milestoneGroups.map((group) => (
            <MilestoneGroup
              key={group.milestone?.id ?? "ungrouped"}
              milestone={group.milestone}
              tasks={group.tasks}
              onToggleDone={toggleDone}
              onToggleSubDone={toggleSubDone}
            />
          ))
        )}
      </div>

      <div className="flex sm:hidden flex-col gap-2 pt-2">
        <Button className="w-full gap-1.5">
          <Plus className="h-4 w-4" /> New Task
        </Button>
        <Button variant="outline" className="w-full gap-1.5" onClick={() => navigate("/space")}>
          <ArrowLeft className="h-4 w-4" /> Back to Spaces
        </Button>
      </div>
    </PageLayout>
  )
}
