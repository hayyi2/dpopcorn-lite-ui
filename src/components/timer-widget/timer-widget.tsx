import { useState } from "react"
import { Square, Timer, ChevronUp, ChevronDown } from "lucide-react"
import { useTimer } from "@/contexts/timer-context"
import { cn } from "@/lib/utils"
import { formatElapsed } from "@/lib/format-elapsed"
import { PingDot } from "./ping-dot"
import { ExpandedContent } from "./expanded-content"
import { Card, CardAction, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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

      <Card
        className={cn(
          "fixed z-50 gap-0 py-0",
          // mobile
          "right-2 bottom-18 left-2",
          // desktop
          "md:right-4 md:bottom-4 md:left-auto md:w-72"
        )}
      >
        {expanded && (
          <CardContent className="overflow-y-auto p-2 sm:p-3 md:max-h-[60vh]">
            <ExpandedContent onMinimize={() => setExpanded(false)} />
          </CardContent>
        )}
        {!(isRunning && expanded) && (
          <CardAction className="flex w-full items-center p-0.5">
            {isRunning && activeTimer && (
              <Button
                onClick={stopTimer}
                variant="secondary"
                className="group bg-transparent px-2 text-muted-foreground hover:bg-muted"
              >
                <div>
                  <div className="block w-4 px-1 group-hover:hidden">
                    <PingDot />
                  </div>
                  <Square className="hidden size-4 group-hover:block" />
                </div>
                <span className="text-sm tabular-nums">
                  {formatElapsed(elapsed)}
                </span>
              </Button>
            )}
            <div className="min-w-0 flex-1">
              <Button
                onClick={() => setExpanded((e) => !e)}
                variant="secondary"
                className="w-full bg-transparent hover:bg-muted"
              >
                {isRunning && activeTimer ? (
                  <>
                    <span className="truncate text-sm">
                      {activeTimer.taskTitle}
                    </span>
                  </>
                ) : (
                  <>
                    <Timer className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Start Timer
                    </span>
                  </>
                )}
                <span className="ml-auto shrink-0">
                  {expanded ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  )}
                </span>
              </Button>
            </div>
          </CardAction>
        )}
      </Card>
    </>
  )
}
