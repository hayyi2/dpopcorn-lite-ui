import { useOutletContext } from "react-router"
import type { ProjectOutletContext } from "@/components/layout/project-layout"

export default function OverviewPage() {
  const { project } = useOutletContext<ProjectOutletContext>()

  return (
    <div className="rounded-lg border border-dashed border-border/50 px-3 py-8 text-center">
      <i className="text-sm text-muted-foreground">
        Overview for {project.projectName} coming soon.
      </i>
    </div>
  )
}
