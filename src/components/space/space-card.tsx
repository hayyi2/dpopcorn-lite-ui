import { useState } from "react"
import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  MoreHorizontal,
} from "lucide-react"
import type { Space } from "./types"
import { ProjectCard } from "./project-card"
import { RowCard } from "@/components/ui/row-card"
import { DragHandle } from "@/components/ui/drag-handle"
import { IconButton } from "@/components/ui/icon-button"
import { StatLabel } from "@/components/ui/stat-label"

export function SpaceCard({ space }: { space: Space }) {
  const [open, setOpen] = useState(true)
  const projectCount = `${space.projects.length} project${space.projects.length !== 1 ? "s" : ""}`

  return (
    <div className="space-y-2">
      <RowCard size="lg">
        <div className="flex min-w-0 flex-1 items-center">
          <div className="flex items-center">
            <DragHandle />

            <IconButton onClick={() => setOpen((v) => !v)}>
              {open ? <ChevronDown /> : <ChevronRight />}
            </IconButton>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <div className="mx-px flex w-5 justify-center">
                {open ? (
                  <FolderOpen className="size-4" />
                ) : (
                  <Folder className="size-4" />
                )}
              </div>
              <span className="truncate text-sm">{space.name}</span>
            </div>

            <div className="mt-1 pl-1 sm:hidden">
              <div className="ml-px flex items-center gap-2">
                <StatLabel>{projectCount}</StatLabel>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <StatLabel>{projectCount}</StatLabel>
        </div>

        <div className="flex shrink-0 items-center">
          <IconButton>
            <MoreHorizontal />
          </IconButton>
        </div>
      </RowCard>

      {open && (
        <div className="ml-6 space-y-2">
          {space.projects.length > 0 ? (
            space.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="rounded-lg border border-dashed border-border/50 px-3 py-2">
              <i className="line-clamp-1 text-xs text-muted-foreground">
                No projects in this space
              </i>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
