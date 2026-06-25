import { GripVertical, MoreHorizontal } from "lucide-react"
import { NavLink } from "react-router"
import type { Project } from "./types"
import { SquareRoundedIcon } from "./square-rounded-icon"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex items-center gap-2 rounded-lg border bg-card px-3 py-2 shadow-sm transition-colors hover:bg-muted/40">
      <div className="flex items-center">
        <button className="-ml-1 flex h-5 w-4 shrink-0 cursor-grab items-center justify-center text-muted-foreground/50 transition-all hover:text-muted-foreground active:cursor-grabbing">
          <GripVertical className="h-3.5 w-3.5" />
        </button>
        <div className="flex h-6 w-6 items-center justify-center">
          <SquareRoundedIcon color={project.color} className="size-4.5" />
        </div>
      </div>
      <NavLink
        to={`/space/${project.id}/tasks`}
        className="flex-1 truncate text-left text-sm hover:cursor-pointer"
      >
        <span>{project.name}</span>
      </NavLink>
      <div className="flex shrink-0 items-center gap-2">
        <span className="hidden text-xs text-muted-foreground sm:block">
          {project.updatedAt}
        </span>
        <button className="flex h-6 w-6 items-center justify-center rounded-md transition-all hover:bg-muted">
          <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </div>
    </div>
  )
}
