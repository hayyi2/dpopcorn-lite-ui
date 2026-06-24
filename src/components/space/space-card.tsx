import { useState } from "react"
import { ChevronDown, ChevronRight, Folder, FolderOpen, MoreHorizontal, GripVertical } from "lucide-react"
import type { Space } from "./types"
import { ProjectCard } from "./project-card"

export function SpaceCard({ space }: { space: Space }) {
  const [open, setOpen] = useState(true)

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border bg-card hover:bg-muted/40 group transition-colors shadow-sm">
        <div className="flex items-center">
          <button className="h-5 w-4 flex items-center justify-center cursor-grab active:cursor-grabbing text-muted-foreground/50 hover:text-muted-foreground transition-all -ml-1 shrink-0">
            <GripVertical className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="h-6 w-6 rounded-md flex items-center justify-center transition-all text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted"
          >
            {/* className="shrink-0 text-muted-foreground hover:text-foreground transition-colors" */}
            {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          </button>
          <div className="text-primary w-6 flex justify-center">
            {open ? <FolderOpen className="size-4.5" /> : <Folder className="size-4.5" />}
          </div>
        </div>
        <span className="text-sm flex-1 truncate">{space.name}</span>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] text-muted-foreground hidden sm:block">
            {space.projects.length} project{space.projects.length !== 1 ? "s" : ""}
          </span>
          <button className="h-6 w-6 rounded-md flex items-center justify-center hover:bg-muted transition-all">
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
            <div className="px-3 py-2 rounded-lg border border-dashed border-border/50">
              <i className="text-xs text-muted-foreground line-clamp-1">No projects in this space</i>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
