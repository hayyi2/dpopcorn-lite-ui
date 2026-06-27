import { MoreHorizontal } from "lucide-react"
import { NavLink } from "react-router"
import type { Project } from "./types"
import { SquareRoundedIcon } from "./square-rounded-icon"
import { RowCard } from "@/components/ui/row-card"
import { DragHandle } from "@/components/ui/drag-handle"
import { IconButton } from "@/components/ui/icon-button"
import { StatLabel } from "@/components/ui/stat-label"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <RowCard>
      <div className="flex min-w-0 flex-1 items-center">
        <div className="flex items-center">
          <DragHandle />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <div className="mx-px flex w-5 justify-center">
              <div className="flex h-6 w-6 items-center justify-center">
                <SquareRoundedIcon color={project.color} className="size-4.5" />
              </div>
            </div>
            <NavLink
              to={`/space/${project.id}/tasks`}
              className="truncate text-left text-sm hover:cursor-pointer"
            >
              <span className="truncate text-sm">{project.name}</span>
            </NavLink>
          </div>

          <div className="mt-1 pl-1 sm:hidden">
            <div className="ml-px flex items-center gap-2">
              <StatLabel>{project.updatedAt}</StatLabel>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden items-center gap-2 sm:flex">
        <StatLabel>{project.updatedAt}</StatLabel>
      </div>

      <div className="flex shrink-0 items-center">
        <IconButton>
          <MoreHorizontal />
        </IconButton>
      </div>
    </RowCard>
  )
}
