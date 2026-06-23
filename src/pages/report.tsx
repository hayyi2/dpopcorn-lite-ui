import { Button } from "@/components/ui/button"
import { PageLayout, PageHeader } from "@/components/layout/page-layout"
import { BarChart3, Download, TrendingUp, AlertCircle, RefreshCw } from "lucide-react"

export default function ReportPage() {
  return (
    <PageLayout>
      <PageHeader
        icon={<BarChart3 className="h-6 w-6" />}
        title="Reports"
        actions={
          <>
            <Button size="sm" variant="outline" className="gap-1.5 flex-1 sm:flex-initial">
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
            <Button size="sm" className="gap-1.5 flex-1 sm:flex-initial">
              <Download className="h-4 w-4" /> Export
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-xl bg-card text-card-foreground shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-base">Performance Breakdown</h3>
            <span className="text-emerald-500 flex items-center gap-1 text-xs">
              <TrendingUp className="h-3.5 w-3.5" /> +12.4%
            </span>
          </div>
          <div className="h-40 flex items-end gap-2.5 pt-4 border-b">
            {[45, 60, 50, 75, 90, 85, 95].map((val, i) => (
              <div key={i} className="flex-1 bg-primary/25 hover:bg-primary/45 transition-colors rounded-t-sm" style={{ height: `${val}%` }}>
                <span className="sr-only">Bar {i+1}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        <div className="p-6 border rounded-xl bg-card text-card-foreground shadow-sm space-y-4">
          <h3 className="font-semibold text-base">Key Insights</h3>
          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3 text-xs md:text-sm">
              <AlertCircle className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium">Traffic Peak</h4>
                <p className="text-muted-foreground mt-0.5">Highest activity detected on Friday between 14:00 and 16:00 UTC.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-xs md:text-sm">
              <AlertCircle className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium">Latency Drop</h4>
                <p className="text-muted-foreground mt-0.5">Database scaling operations successfully lowered lookup latency by 20%.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
