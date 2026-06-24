export type Milestone = {
  id: number
  title: string
  deadline: string | null
}

export type Task = {
  id: number
  title: string
  deadline: string | null
  estimasi_durasi: number // minutes
  timer_logged: number // minutes
  done: boolean
  subtasks: SubTask[]
  milestone_id: number | null
}

export type SubTask = {
  id: number
  title: string
  deadline: string | null
  estimasi_durasi: number // minutes
  timer_logged: number // minutes
  done: boolean
}
