export type TimerType = "flow_session" | "pomodoro" | "flowtime" | "quick_timer" | null

export type TimerEntry = {
  id: number
  project: string
  task: string
  parentTask?: string
  running: boolean
  startedAt: string // HH:MM
  duration: number // seconds
  note?: string
  done: boolean
  date: string // YYYY-MM-DD
  timer_type: TimerType
}
