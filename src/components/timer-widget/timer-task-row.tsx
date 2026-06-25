import { Play } from "lucide-react"
import { type SearchResult } from "@/contexts/timer-context"

export function TimerTaskRow({
  result,
  onStart,
}: {
  result: SearchResult
  onStart: (r: SearchResult) => void
}) {
  return (
    <div className="group flex items-center gap-2 rounded-lg border bg-card px-3 py-2.5 shadow-sm transition-colors hover:bg-muted/40">
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
      <button
        onClick={() => onStart(result)}
        className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
      >
        <Play className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
