import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Clock, CheckCircle2 } from "lucide-react"
import { fmtDuration } from "./utils"

type SummaryCardsProps = {
  totalMinutes: number
  avgMinutes: number
  activeDays: number
  totalCompleted: number
  totalProgress: number
}

export function SummaryCards({
  totalMinutes,
  avgMinutes,
  activeDays,
  totalCompleted,
  totalProgress,
}: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Card className="gap-0 py-4">
        <CardContent className="space-y-2 px-5">
          <CardTitle className="flex items-center gap-2 text-sm font-normal text-muted-foreground">
            <Clock className="h-4 w-4" /> Waktu Kerja
          </CardTitle>
          <p className="text-3xl font-bold tracking-tight">
            {fmtDuration(totalMinutes)}
          </p>
          <p className="text-xs text-muted-foreground">
            Rata-rata{" "}
            <span className="font-medium text-foreground">
              {fmtDuration(avgMinutes)}
            </span>
            /hari · {activeDays} hari aktif
          </p>
        </CardContent>
      </Card>

      <Card className="gap-0 py-4">
        <CardContent className="space-y-2 px-5">
          <CardTitle className="flex items-center gap-2 text-sm font-normal text-muted-foreground">
            <CheckCircle2 className="h-4 w-4" /> Task Progress
          </CardTitle>
          <p className="text-3xl font-bold tracking-tight">
            {totalCompleted}
            <span className="font-normal text-muted-foreground">
              {" "}
              / {totalProgress}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            Selesai / in progress ·{" "}
            <span className="font-medium text-foreground">
              {totalProgress - totalCompleted}
            </span>{" "}
            belum diselesaikan
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
