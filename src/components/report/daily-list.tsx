import type { DayReport } from "./types"
import { fmtDuration } from "./utils"

type DailyListProps = {
  data: DayReport[]
  maxMinutes: number
}

export function DailyList({ data, maxMinutes }: DailyListProps) {
  return (
    <div className="divide-y md:hidden">
      {data.map((row) => {
        const pct = (row.totalMinutes / maxMinutes) * 100
        const isEmpty = row.totalMinutes === 0
        const notDone = row.inProgress - row.completed
        return (
          <div key={row.day} className="space-y-2.5 px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">{row.day}</span>
                <span className="ml-1.5 text-xs text-muted-foreground">
                  {row.date}
                </span>
              </div>
              <span className="text-sm font-semibold tabular-nums">
                {fmtDuration(row.totalMinutes)}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              {!isEmpty && (
                <div
                  className="h-full rounded-full bg-primary/60"
                  style={{ width: `${pct}%` }}
                />
              )}
            </div>
            <div className="flex gap-3 text-xs text-muted-foreground">
              {isEmpty ? (
                <span>Tidak ada aktivitas</span>
              ) : (
                <>
                  <span>
                    <span className="font-medium text-emerald-600">
                      {row.completed}
                    </span>{" "}
                    selesai
                  </span>
                  <span>
                    <span className="font-medium text-foreground">
                      {row.inProgress}
                    </span>{" "}
                    in progress
                  </span>
                  {notDone > 0 && (
                    <span>
                      <span className="font-medium text-amber-600">
                        {notDone}
                      </span>{" "}
                      belum
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
