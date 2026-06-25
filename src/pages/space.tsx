import { Button } from "@/components/ui/button"
import { PageLayout, PageHeader } from "@/components/layout/page-layout"
import { Plus, ChevronDown, Funnel, Folders } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SpaceCard } from "@/components/space/space-card"
import { ProjectCard } from "@/components/space/project-card"
import type { Space, Project } from "@/components/space/types"

const initialSpaces: Space[] = [
  {
    id: 1,
    name: "Production",
    projects: [
      { id: 11, name: "API Gateway", color: "#10b981", updatedAt: "2h ago" },
      { id: 12, name: "Auth Service", color: "#3b82f6", updatedAt: "5h ago" },
      {
        id: 13,
        name: "Analytics Dashboard",
        color: "#f59e0b",
        updatedAt: "3d ago",
      },
    ],
  },
  {
    id: 2,
    name: "Staging",
    projects: [
      { id: 21, name: "Frontend App", color: "#8b5cf6", updatedAt: "1h ago" },
      {
        id: 22,
        name: "Mobile Backend",
        color: "#ec4899",
        updatedAt: "Yesterday",
      },
    ],
  },
  {
    id: 3,
    name: "Dev Sandbox",
    projects: [],
  },
]

const unspacedProjects: Project[] = [
  { id: 101, name: "Docs Site", color: "#06b6d4", updatedAt: "4h ago" },
  { id: 102, name: "CLI Tool", color: "#64748b", updatedAt: "1w ago" },
]

export default function SpacePage() {
  return (
    <PageLayout>
      <PageHeader
        icon={<Folders className="h-6 w-6" />}
        title="Spaces"
        actions={
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="gap-1.5">
              <Funnel className="h-4 w-4" />
              Filter
            </Button>
            <div className="flex items-center">
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 rounded-r-none border-r-0"
              >
                <Plus className="h-4 w-4" />
                New Project
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-l-none px-2"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Plus className="mr-2 h-4 w-4" />
                    New Space
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        }
      />

      <div className="space-y-1.5">
        {initialSpaces.map((space) => (
          <SpaceCard key={space.id} space={space} />
        ))}
        {unspacedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </PageLayout>
  )
}
