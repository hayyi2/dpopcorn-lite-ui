import { useEffect, useRef } from "react"
import { Square, Search, X, ChevronDown } from "lucide-react"
import { useTimer, type SearchResult } from "@/contexts/timer-context"
import { Button } from "@/components/ui/button"
import { IconButton } from "@/components/ui/icon-button"
import { formatElapsed } from "@/lib/format-elapsed"
import { PingDot } from "./ping-dot"
import { TimerTaskRow } from "./timer-task-row"
import { SquareRoundedIcon } from "@/components/space/square-rounded-icon"
import { StatLabel } from "@/components/ui/stat-label"

function RunningContent({ onMinimize }: { onMinimize: () => void }) {
  const { activeTimer, elapsed, note, setNote, stopTimer } = useTimer()
  if (!activeTimer) return null

  return (
    <div className="space-y-2">
      {/* header */}
      <div className="flex items-center gap-2">
        <PingDot className="mx-1" />
        <h5 className="my-1 flex-1 text-sm font-semibold">Timer Running</h5>
      </div>

      {/* big timer */}
      <p className="text-5xl font-semibold text-primary tabular-nums">
        {formatElapsed(elapsed)}
      </p>

      {/* project breadcrumb */}
      <div className="rounded-md border px-3 py-2 text-sm">
        <div className="mb-1 flex">
          <StatLabel
            icon={
              <SquareRoundedIcon
                color={activeTimer.projectColor}
                className="mx-px h-3.5 w-3.5 shrink-0"
              />
            }
          >
            <span className="truncate text-xs text-muted-foreground">
              {activeTimer.projectName}
              {activeTimer.parentTitle ? ` · ${activeTimer.parentTitle}` : ""}
            </span>
          </StatLabel>
        </div>
        <p className="truncate">{activeTimer.taskTitle}</p>
      </div>

      {/* note */}
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a note…"
        rows={3}
        className="w-full resize-none rounded-md border px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
      />

      <div className="flex">
        <div className="flex-1">
          <Button
            variant="destructive"
            onClick={stopTimer}
            className="w-full cursor-pointer"
          >
            <Square className="h-4 w-4 text-current" />
            Stop
          </Button>
        </div>
        <Button
          onClick={onMinimize}
          className="shrink-0 cursor-pointer px-2.5"
          variant="secondary"
        >
          <ChevronDown />
        </Button>
      </div>
    </div>
  )
}

function IdleContent() {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    recentTasks,
    startTimer,
  } = useTimer()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const id = setTimeout(() => inputRef.current?.focus(), 80)
    return () => clearTimeout(id)
  }, [])

  function handleStart(r: SearchResult) {
    startTimer({
      taskId: r.taskId,
      taskTitle: r.taskTitle,
      projectId: r.projectId,
      projectName: r.projectName,
      projectColor: r.projectColor,
      parentTitle: r.parentTitle,
      startedAt: 0, // overwritten by context
    })
    setSearchQuery("")
  }

  const showSearch = !!searchQuery

  return (
    <div className="space-y-2">
      {/* header */}
      <div className="flex items-center gap-2">
        <h5 className="my-1 flex-1 text-sm font-semibold">Start Timer</h5>
      </div>

      {/* search */}
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
          <IconButton
            variant="ghost"
            onClick={() => setSearchQuery("")}
            className="absolute top-1/2 right-2 -translate-y-1/2"
          >
            <X />
          </IconButton>
        )}
      </div>

      {/* results or recent */}
      {showSearch ? (
        searchResults.length > 0 ? (
          <div className="space-y-2 overflow-y-auto">
            <p className="px-1 text-xs text-muted-foreground">Results</p>
            <div className="max-h-52 space-y-2">
              {searchResults.map((r) => (
                <TimerTaskRow
                  key={`${r.projectId}-${r.taskId}`}
                  result={r}
                  onStart={handleStart}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="py-2 text-center text-xs text-muted-foreground">
            No tasks found
          </p>
        )
      ) : recentTasks.length > 0 ? (
        <div className="space-y-2 overflow-y-auto">
          <p className="px-1 text-xs text-muted-foreground">Recent</p>
          <div className="max-h-52 space-y-2">
            {recentTasks.map((r) => (
              <TimerTaskRow
                key={`${r.projectId}-${r.taskId}`}
                result={r}
                onStart={handleStart}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1 py-4 text-center">
          <p className="text-xs font-medium text-muted-foreground">
            No recent timers
          </p>
          <p className="text-xs text-muted-foreground/60">
            Search a task above to get started
          </p>
        </div>
      )}
    </div>
  )
}

export function ExpandedContent({ onMinimize }: { onMinimize: () => void }) {
  const { isRunning } = useTimer()
  return isRunning ? (
    <RunningContent onMinimize={onMinimize} />
  ) : (
    <IdleContent />
  )
}
