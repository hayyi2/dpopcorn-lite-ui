import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { DayReport } from "./types"
import { fmtDuration } from "./utils"

type DailyTableProps = {
  data: DayReport[]
  maxMinutes: number
  totalMinutes: number
  totalCompleted: number
  totalProgress: number
}

export function DailyTable({
  data,
  maxMinutes,
  totalMinutes,
  totalCompleted,
  totalProgress,
}: DailyTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-36 px-5">Hari</TableHead>
          <TableHead className="px-5">Durasi</TableHead>
          <TableHead className="w-28 px-5 text-right">Total</TableHead>
          <TableHead className="w-28 px-5 text-right">Selesai</TableHead>
          <TableHead className="w-28 px-5 text-right">In Progress</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => {
          const pct = (row.totalMinutes / maxMinutes) * 100
          const isEmpty = row.totalMinutes === 0
          return (
            <TableRow key={row.day}>
              <TableCell className="px-5 py-3.5">
                <span className="font-medium">{row.day}</span>
                <span className="ml-1.5 text-xs text-muted-foreground">
                  {row.date}
                </span>
              </TableCell>
              <TableCell className="px-5 py-3.5">
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  {!isEmpty && (
                    <div
                      className="h-full rounded-full bg-primary/60"
                      style={{ width: `${pct}%` }}
                    />
                  )}
                </div>
              </TableCell>
              <TableCell className="px-5 py-3.5 text-right text-xs tabular-nums">
                {fmtDuration(row.totalMinutes)}
              </TableCell>
              <TableCell className="px-5 py-3.5 text-right text-xs tabular-nums">
                {row.completed > 0 ? (
                  <span>{row.completed}</span>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell className="px-5 py-3.5 text-right text-xs tabular-nums">
                {row.inProgress > 0 ? (
                  <span>{row.inProgress}</span>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="px-5 py-3 font-semibold">Total</TableCell>
          <TableCell className="px-5 py-3" />
          <TableCell className="px-5 py-3 text-right text-xs tabular-nums">
            {fmtDuration(totalMinutes)}
          </TableCell>
          <TableCell className="px-5 py-3 text-right text-xs tabular-nums">
            {totalCompleted}
          </TableCell>
          <TableCell className="px-5 py-3 text-right text-xs tabular-nums">
            {totalProgress}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
