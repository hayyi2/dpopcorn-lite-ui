export function fmtDuration(minutes: number): string {
  if (minutes === 0) return "—"
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}m`
  if (m === 0) return `${h}j`
  return `${h}j ${m}m`
}
