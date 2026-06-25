import type { DayReport } from "./types"

export const weekData: DayReport[] = [
  { day: "Sen", date: "19 Jun", totalMinutes: 330, completed: 4, inProgress: 9 },
  { day: "Sel", date: "20 Jun", totalMinutes: 435, completed: 6, inProgress: 11 },
  { day: "Rab", date: "21 Jun", totalMinutes: 270, completed: 3, inProgress: 7 },
  { day: "Kam", date: "22 Jun", totalMinutes: 510, completed: 7, inProgress: 13 },
  { day: "Jum", date: "23 Jun", totalMinutes: 480, completed: 5, inProgress: 10 },
  { day: "Sab", date: "24 Jun", totalMinutes: 150, completed: 2, inProgress: 4 },
]

export const totalMinutes = weekData.reduce((s, d) => s + d.totalMinutes, 0)
export const activeDays = weekData.filter((d) => d.totalMinutes > 0).length
export const avgMinutes = activeDays > 0 ? Math.round(totalMinutes / activeDays) : 0
export const totalCompleted = weekData.reduce((s, d) => s + d.completed, 0)
export const totalProgress = weekData.reduce((s, d) => s + d.inProgress, 0)
export const maxMinutes = Math.max(...weekData.map((d) => d.totalMinutes), 1)
