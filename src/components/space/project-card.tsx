import { GripVertical, MoreHorizontal } from "lucide-react"
import { NavLink } from "react-router"
import type { Project } from "./types"
import { SquareRoundedIcon } from "./square-rounded-icon"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-card hover:bg-muted/40 group transition-colors shadow-sm">
      <div className="flex items-center">
        <button className="h-5 w-4 flex items-center justify-center cursor-grab active:cursor-grabbing text-muted-foreground/50 hover:text-muted-foreground transition-all -ml-1 shrink-0">
          <GripVertical className="h-3.5 w-3.5" />
        </button>
        <div className="h-6 w-6 flex items-center justify-center">
          <SquareRoundedIcon color={project.color} className="size-4.5" />
        </div>
      </div>
      <NavLink
        to={`/space/${project.id}/tasks`}
        className="text-sm flex-1 truncate text-left hover:cursor-pointer"
      >
        <span>{project.name}</span>
      </NavLink>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-[11px] text-muted-foreground hidden sm:block">{project.updatedAt}</span>
        <button className="h-6 w-6 rounded-md flex items-center justify-center hover:bg-muted transition-all">
          <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </div>
    </div>
  )
}
