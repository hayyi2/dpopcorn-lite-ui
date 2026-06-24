import { Outlet, useParams, useNavigate } from "react-router"
import { useLocation } from "react-router"
import { LayoutDashboard, ListTodo, Timer, ArrowLeft, ListFilter, Plus, FolderX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SquareRoundedIcon } from "@/components/space/square-rounded-icon"
import { mockProjects } from "@/lib/mock-projects"
import type { ProjectData } from "@/lib/mock-projects"
import { PageHeader, PageLayout } from './page-layout'

const projectTabs = [
  { to: "", label: "Detail", icon: LayoutDashboard },
  { to: "tasks", label: "Tasks", icon: ListTodo },
  { to: "timer", label: "Timer", icon: Timer },
]

export type ProjectOutletContext = {
  project: ProjectData
}

export default function ProjectLayout() {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const project = projectId ? mockProjects[projectId] : undefined

  if (!project) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center flex-1 gap-3 text-center py-20">
          <FolderX className="size-12 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Project not found</h2>
          <p className="text-sm text-muted-foreground">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Button size="sm" variant="outline" onClick={() => navigate("/space")} className="gap-1.5">
            <ArrowLeft className="h-4 w-4" />
            Back to Space
          </Button>
        </div>
      </PageLayout>
    )
  }

  const activeTab = projectTabs.find((t) => pathname.endsWith(`/${t.to}`))?.to ?? "detail"
  const isTasksTab = activeTab === "tasks"

  return (
    <PageLayout>
      <PageHeader
        icon={<SquareRoundedIcon color={project.color} className="size-6" />}
        title={project.projectName}
      />

      {/* Sub navigation */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 min-w-0">
          <Tabs value={activeTab}>
            <TabsList>
              <TabsTrigger
                value="back"
                onClick={() => navigate(`/space`)}
                className="gap-1.5"
              >
                <ArrowLeft className="h-4 w-4" />
              </TabsTrigger>
              {projectTabs.map((tab) => (
                <TabsTrigger
                  key={tab.to}
                  value={tab.to}
                  onClick={() => navigate(`/space/${projectId}/${tab.to}`)}
                  className="gap-1.5"
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Contextual actions — hanya di Tasks tab */}
        {isTasksTab && (
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <Button size="sm" variant="outline" className="gap-1.5">
              <ListFilter className="h-4 w-4" />
              Filter
            </Button>
            <Button size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              New Task
            </Button>
          </div>
        )}
      </div>

      {/* Page content */}
      <Outlet context={{ project } satisfies ProjectOutletContext} />
    </PageLayout>
  )
}
