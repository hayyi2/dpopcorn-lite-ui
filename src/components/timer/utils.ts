import type { TimerEntry } from "./types"

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m ${s}s`
  return `${s}s`
}

export function formatDate(date: string): string {
  const today = new Date().toISOString().slice(0, 10)
  const d = new Date()
  d.setDate(d.getDate() - 1)
  const yesterday = d.toISOString().slice(0, 10)
  if (date === today) return "Today"
  if (date === yesterday) return "Yesterday"
  return new Date(date).toLocaleDateString([], {
    weekday: "long",
    month: "short",
    day: "numeric",
  })
}

export function groupByDate(entries: TimerEntry[]): [string, TimerEntry[]][] {
  const map = new Map<string, TimerEntry[]>()
  for (const e of entries) {
    if (!map.has(e.date)) map.set(e.date, [])
    map.get(e.date)!.push(e)
  }
  return Array.from(map.entries()).sort((a, b) => (a[0] < b[0] ? 1 : -1))
}
