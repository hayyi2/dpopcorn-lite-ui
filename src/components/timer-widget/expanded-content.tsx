import { useEffect, useRef } from "react"
import { Square, Search, X } from "lucide-react"
import { useTimer, type SearchResult } from "@/contexts/timer-context"
import { formatElapsed } from "./format-elapsed"
import { TimerTaskRow } from "./timer-task-row"

export function ExpandedContent() {
  const {
    activeTimer,
    elapsed,
    isRunning,
    note,
    setNote,
    stopTimer,
    searchQuery,
    setSearchQuery,
    searchResults,
    recentTasks,
    startTimer,
  } = useTimer()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isRunning) setTimeout(() => inputRef.current?.focus(), 80)
  }, [isRunning])

  function handleStart(r: SearchResult) {
    startTimer({
      taskId: r.taskId,
      taskTitle: r.taskTitle,
      projectId: r.projectId,
      projectName: r.projectName,
      projectColor: r.projectColor,
      parentTitle: r.parentTitle,
      startedAt: Date.now(),
    })
    setSearchQuery("")
  }

  if (isRunning && activeTimer) {
    return (
      <div className="space-y-3 p-4">
        <div className="flex items-center gap-1.5">
          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: activeTimer.projectColor }}
          />
          <span className="truncate text-xs text-muted-foreground">
            {activeTimer.projectName}
            {activeTimer.parentTitle ? ` · ${activeTimer.parentTitle}` : ""}
          </span>
        </div>
        <div>
          <p className="truncate text-sm font-semibold">
            {activeTimer.taskTitle}
          </p>
          <p className="font-mono text-2xl font-bold text-primary tabular-nums">
            {formatElapsed(elapsed)}
          </p>
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note…"
          rows={3}
          className="w-full resize-none rounded-lg border bg-muted/40 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
        />
        <button
          onClick={stopTimer}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-destructive/10 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20"
        >
          <Square className="h-3.5 w-3.5 fill-current" />
          Stop
        </button>
      </div>
    )
  }

  const listItems = searchQuery ? searchResults : recentTasks
  const showRecent = !searchQuery && recentTasks.length > 0

  return (
    <div className="space-y-2 p-4">
      <div className="relative">
        <Search className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search task…"
          className="w-full rounded-lg border bg-muted/40 py-2 pr-8 pl-9 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {listItems.length > 0 && (
        <p className="px-1 text-xs text-muted-foreground">
          {showRecent ? "Recent" : "Results"}
        </p>
      )}

      {listItems.length > 0 ? (
        <div className="max-h-52 space-y-1.5 overflow-y-auto">
          {listItems.map((r) => (
            <TimerTaskRow
              key={`${r.projectId}-${r.taskId}`}
              result={r}
              onStart={handleStart}
            />
          ))}
        </div>
      ) : searchQuery ? (
        <p className="py-2 text-center text-xs text-muted-foreground">
          No tasks found
        </p>
      ) : null}
    </div>
  )
}
