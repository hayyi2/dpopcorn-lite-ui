import { useState } from "react"
import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  MoreHorizontal,
  GripVertical,
} from "lucide-react"
import type { Space } from "./types"
import { ProjectCard } from "./project-card"

export function SpaceCard({ space }: { space: Space }) {
  const [open, setOpen] = useState(true)

  return (
    <div className="space-y-1.5">
      <div className="group flex items-center gap-2 rounded-lg border bg-card px-3 py-2.5 shadow-sm transition-colors hover:bg-muted/40">
        <div className="flex items-center">
          <button className="-ml-1 flex h-5 w-4 shrink-0 cursor-grab items-center justify-center text-muted-foreground/50 transition-all hover:text-muted-foreground active:cursor-grabbing">
            <GripVertical className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground/50 transition-all hover:bg-muted hover:text-muted-foreground"
          >
            {/* className="shrink-0 text-muted-foreground hover:text-foreground transition-colors" */}
            {open ? (
              <ChevronDown className="h-3.5 w-3.5" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" />
            )}
          </button>
          <div className="flex w-6 justify-center">
            {open ? (
              <FolderOpen className="size-4.5" />
            ) : (
              <Folder className="size-4.5" />
            )}
          </div>
        </div>
        <span className="flex-1 truncate text-sm">{space.name}</span>
        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden text-xs text-muted-foreground sm:block">
            {space.projects.length} project
            {space.projects.length !== 1 ? "s" : ""}
          </span>
          <button className="flex h-6 w-6 items-center justify-center rounded-md transition-all hover:bg-muted">
            <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {open && (
        <div className="ml-6 space-y-1.5">
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
