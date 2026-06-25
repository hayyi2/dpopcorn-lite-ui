import { useState } from "react"
import { Square, Timer, ChevronUp, ChevronDown } from "lucide-react"
import { useTimer } from "@/contexts/timer-context"
import { cn } from "@/lib/utils"
import { formatElapsed } from "./format-elapsed"
import { PingDot } from "./ping-dot"
import { ExpandedContent } from "./expanded-content"

export function TimerWidget() {
  const { isRunning, activeTimer, elapsed, stopTimer } = useTimer()
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      {/* backdrop — mobile only */}
      {expanded && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setExpanded(false)}
        />
      )}

      <div
        className={cn(
          // base
          "fixed z-50 flex flex-col overflow-hidden border bg-background/95 backdrop-blur-md transition-all duration-200",
          // mobile: full-width bar above bottom navbar, no rounding
          "right-0 bottom-16 left-0 border-t md:border",
          // desktop: floating pill bottom-right, rounded
          "md:right-4 md:bottom-4 md:left-auto md:w-72 md:rounded-2xl md:shadow-xl"
        )}
      >
        {expanded && (
          <div className="max-h-[55vh] overflow-y-auto md:max-h-none">
            <ExpandedContent />
          </div>
        )}

        {/* bar */}
        <div className="flex items-center gap-2 p-3">
          <button
            onClick={() => setExpanded((e) => !e)}
            className={cn(
              "flex flex-1 items-center gap-2 overflow-hidden rounded-xl px-3 py-2 transition-colors",
              isRunning ? "bg-primary/10" : "bg-muted/50 hover:bg-muted"
            )}
          >
            {isRunning && activeTimer ? (
              <>
                <PingDot color={activeTimer.projectColor} />
                <span className="font-mono text-sm font-semibold text-primary tabular-nums">
                  {formatElapsed(elapsed)}
                </span>
                <span className="truncate text-xs text-primary/70">
                  · {activeTimer.taskTitle}
                </span>
              </>
            ) : (
              <>
                <Timer className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Timer</span>
              </>
            )}
            <span className="ml-auto">
              {expanded ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              )}
            </span>
          </button>

          {isRunning && (
            <button
              onClick={stopTimer}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-destructive/10 text-destructive transition-colors hover:bg-destructive/20"
            >
              <Square className="h-4 w-4 fill-current" />
            </button>
          )}
        </div>
      </div>
    </>
  )
}
