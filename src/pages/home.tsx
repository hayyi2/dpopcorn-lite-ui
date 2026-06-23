import { Button } from "@/components/ui/button"
import { PageLayout, PageHeader } from "@/components/layout/page-layout"
import { Home, ArrowRight, Zap, Shield, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <PageLayout>
      <PageHeader
        icon={<Home className="h-6 w-6" />}
        title="Home"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 border rounded-xl bg-card text-card-foreground shadow-sm space-y-2">
          <Zap className="h-5 w-5 text-amber-500" />
          <h2 className="font-semibold text-base">Quick Performance</h2>
          <p className="text-xs text-muted-foreground">System speed is optimal at 99.8%. No latency detected.</p>
        </div>
        <div className="p-5 border rounded-xl bg-card text-card-foreground shadow-sm space-y-2">
          <Shield className="h-5 w-5 text-emerald-500" />
          <h2 className="font-semibold text-base">Security Status</h2>
          <p className="text-xs text-muted-foreground">All systems protected. Last scan performed 10m ago.</p>
        </div>
        <div className="p-5 border rounded-xl bg-card text-card-foreground shadow-sm space-y-2">
          <Sparkles className="h-5 w-5 text-indigo-500" />
          <h2 className="font-semibold text-base">AI Engine</h2>
          <p className="text-xs text-muted-foreground">Ready to process requests in active spaces.</p>
        </div>
      </div>

      <div className="p-6 border rounded-xl bg-muted/30 space-y-4">
        <h3 className="font-medium text-base">Get Started</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Navigate using the navigation bar. You can manage virtual spaces, inspect system logs, or view analysis reports seamlessly across device breakpoints.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" className="gap-1.5">
            Configure Space <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </PageLayout>
  )
}
