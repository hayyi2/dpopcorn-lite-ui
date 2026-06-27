import { Play } from "lucide-react"
import { type SearchResult } from "@/contexts/timer-context"
import { RowCard } from "@/components/ui/row-card"
import { IconButton } from "@/components/ui/icon-button"

export function TimerTaskRow({
  result,
  onStart,
}: {
  result: SearchResult
  onStart: (r: SearchResult) => void
}) {
  return (
    <RowCard size="lg">
      <span
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: result.projectColor }}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm">{result.taskTitle}</p>
        <p className="truncate text-xs text-muted-foreground">
          {result.projectName}
          {result.parentTitle ? ` · ${result.parentTitle}` : ""}
        </p>
      </div>
      <IconButton variant="primary" onClick={() => onStart(result)}>
        <Play />
      </IconButton>
    </RowCard>
  )
}
