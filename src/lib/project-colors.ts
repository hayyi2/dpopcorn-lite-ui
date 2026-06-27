/**
 * Project color registry.
 * In a real app this would come from the API / project data.
 * Add entries here as projects are created.
 */
const PROJECT_COLOR_MAP: Record<string, string> = {
  DPopcorn: "#f97316", // orange-500
  Internal: "#8b5cf6", // violet-500
  Research: "#10b981", // emerald-500
}

/**
 * Deterministic fallback: hash the project name to one of several accent colors
 * so unknown projects always get a consistent, distinct color.
 */
const FALLBACK_COLORS = [
  "#3b82f6", // blue-500
  "#ec4899", // pink-500
  "#14b8a6", // teal-500
  "#f59e0b", // amber-500
  "#6366f1", // indigo-500
  "#ef4444", // red-500
]

function hashProjectName(name: string): number {
  let h = 0
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) >>> 0
  }
  return h % FALLBACK_COLORS.length
}

export function getProjectColor(projectName: string): string {
  return (
    PROJECT_COLOR_MAP[projectName] ??
    FALLBACK_COLORS[hashProjectName(projectName)]
  )
}
