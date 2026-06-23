import { Button } from "@/components/ui/button"
import { PageLayout, PageHeader } from "@/components/layout/page-layout"
import { Play, RotateCcw, AlertTriangle, Timer } from "lucide-react"

export default function LogsPage() {
  const logs = [
    { time: "10:32:15", type: "info", module: "AUTH", msg: "Token generated successfully for uid_7812" },
    { time: "10:31:02", type: "warn", module: "DB", msg: "Connection pool utilization reached 85%" },
    { time: "10:29:44", type: "error", module: "SERVER", msg: "Failed to dispatch event to webhook hook_88a" },
    { time: "10:25:12", type: "info", module: "CORE", msg: "Background cron task completed in 12.4ms" },
    { time: "10:20:00", type: "info", module: "VITE", msg: "Hot Reload triggered for component/navbar" }
  ]

  return (
    <PageLayout>
      <PageHeader
        icon={<Timer className="h-6 w-6" />}
        title="Timer Logs"
        actions={
          <>
            <Button size="sm" variant="outline" className="gap-1.5 flex-1 sm:flex-initial">
              <RotateCcw className="h-4 w-4" /> Clear
            </Button>
            <Button size="sm" className="gap-1.5 flex-1 sm:flex-initial">
              <Play className="h-4 w-4" /> Stream
            </Button>
          </>
        }
      />

      <div className="border rounded-xl bg-card overflow-hidden shadow-sm">
        <div className="border-b px-4 py-3 bg-muted/40 flex items-center justify-between text-xs text-muted-foreground font-medium">
          <span>Live Console</span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Connected
          </span>
        </div>
        <div className="p-4 font-mono text-xs md:text-sm divide-y divide-border/50 max-h-100 overflow-y-auto">
          {logs.map((log, index) => (
            <div key={index} className="py-2.5 flex items-start gap-3">
              <span className="text-muted-foreground select-none shrink-0 w-16">{log.time}</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wider select-none shrink-0 ${
                log.type === "info" ? "bg-blue-500/10 text-blue-500" :
                log.type === "warn" ? "bg-amber-500/10 text-amber-500" : "bg-red-500/10 text-red-500"
              }`}>
                {log.type.toUpperCase()}
              </span>
              <span className="text-foreground/70 font-semibold select-none shrink-0">[{log.module}]</span>
              <span className="text-foreground/90 break-all">{log.msg}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 p-4 border rounded-xl bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs md:text-sm">
        <AlertTriangle className="h-5 w-5 shrink-0" />
        <p className="leading-relaxed">
          <strong>Notice:</strong> Filter controls are currently disabled in mock mode. Live production stream requires environment variables setup.
        </p>
      </div>
    </PageLayout>
  )
}
