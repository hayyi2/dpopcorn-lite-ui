import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react"
import { mockProjects } from "@/lib/mock-projects"

export type TimerTask = {
  taskId: number
  taskTitle: string
  projectId: string
  projectName: string
  projectColor: string
  parentTitle?: string // milestone title
  startedAt: number // timestamp ms
}

type TimerContextValue = {
  activeTimer: TimerTask | null
  elapsed: number // seconds
  isRunning: boolean
  note: string
  setNote: (n: string) => void
  startTimer: (task: TimerTask) => void
  stopTimer: () => void
  searchQuery: string
  setSearchQuery: (q: string) => void
  searchResults: SearchResult[]
  recentTasks: SearchResult[]
}

export type SearchResult = {
  taskId: number
  taskTitle: string
  projectId: string
  projectName: string
  projectColor: string
  parentTitle?: string
}

const TimerContext = createContext<TimerContextValue | null>(null)

export function TimerProvider({ children }: { children: ReactNode }) {
  const [activeTimer, setActiveTimer] = useState<TimerTask | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [note, setNote] = useState("")
  const [recentTasks, setRecentTasks] = useState<SearchResult[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Tick
  useEffect(() => {
    if (isRunning && activeTimer) {
      intervalRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - activeTimer.startedAt) / 1000))
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, activeTimer])

  const startTimer = useCallback((task: TimerTask) => {
    const t = { ...task, startedAt: Date.now() }
    setActiveTimer(t)
    setElapsed(0)
    setIsRunning(true)
    // push to recent (dedupe by taskId, cap at 5)
    const entry: SearchResult = {
      taskId: task.taskId,
      taskTitle: task.taskTitle,
      projectId: task.projectId,
      projectName: task.projectName,
      projectColor: task.projectColor,
      parentTitle: task.parentTitle,
    }
    setRecentTasks((prev) => {
      const filtered = prev.filter((r) => r.taskId !== entry.taskId)
      return [entry, ...filtered].slice(0, 5)
    })
  }, [])

  const stopTimer = useCallback(() => {
    setIsRunning(false)
    setActiveTimer(null)
    setElapsed(0)
    setNote("")
  }, [])

  // Search across all projects & tasks
  const searchResults: SearchResult[] = (() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return []
    const results: SearchResult[] = []
    for (const [projectId, project] of Object.entries(mockProjects)) {
      for (const task of project.tasks) {
        const milestone = project.milestones.find(
          (m) => m.id === task.milestone_id
        )
        if (
          task.title.toLowerCase().includes(q) ||
          project.projectName.toLowerCase().includes(q) ||
          (milestone?.title.toLowerCase().includes(q) ?? false)
        ) {
          results.push({
            taskId: task.id,
            taskTitle: task.title,
            projectId,
            projectName: project.projectName,
            projectColor: project.color,
            parentTitle: milestone?.title,
          })
        }
        // also search subtasks
        for (const sub of task.subtasks) {
          if (sub.title.toLowerCase().includes(q)) {
            results.push({
              taskId: sub.id,
              taskTitle: sub.title,
              projectId,
              projectName: project.projectName,
              projectColor: project.color,
              parentTitle: task.title,
            })
          }
        }
      }
    }
    return results.slice(0, 8)
  })()

  return (
    <TimerContext.Provider
      value={{
        activeTimer,
        elapsed,
        isRunning,
        note,
        setNote,
        startTimer,
        stopTimer,
        searchQuery,
        setSearchQuery,
        searchResults,
        recentTasks,
      }}
    >
      {children}
    </TimerContext.Provider>
  )
}

export function useTimer() {
  const ctx = useContext(TimerContext)
  if (!ctx) throw new Error("useTimer must be used within TimerProvider")
  return ctx
}
