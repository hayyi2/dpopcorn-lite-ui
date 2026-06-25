import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { PageLayout, PageHeader } from "@/components/layout/page-layout"
import { BarChart3, Funnel } from "lucide-react"
import { SummaryCards } from "@/components/report/summary-cards"
import { DailyTable } from "@/components/report/daily-table"
import { DailyList } from "@/components/report/daily-list"
import {
  weekData,
  totalMinutes,
  avgMinutes,
  activeDays,
  totalCompleted,
  totalProgress,
  maxMinutes,
} from "@/components/report/report-data"

export default function ReportPage() {
  return (
    <PageLayout>
      <PageHeader
        icon={<BarChart3 className="h-6 w-6" />}
        title="Report"
        actions={
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="gap-1.5">
              <Funnel className="h-4 w-4" />
              Filter
            </Button>
          </div>
        }
      />

      <SummaryCards
        totalMinutes={totalMinutes}
        avgMinutes={avgMinutes}
        activeDays={activeDays}
        totalCompleted={totalCompleted}
        totalProgress={totalProgress}
      />

      <Card className="gap-0 py-0">
        <CardHeader className="border-b px-5 py-4 pb-4!">
          <CardTitle>Detail Harian</CardTitle>
        </CardHeader>

        <div className="hidden md:block">
          <DailyTable
            data={weekData}
            maxMinutes={maxMinutes}
            totalMinutes={totalMinutes}
            totalCompleted={totalCompleted}
            totalProgress={totalProgress}
          />
        </div>

        <DailyList data={weekData} maxMinutes={maxMinutes} />
      </Card>
    </PageLayout>
  )
}
