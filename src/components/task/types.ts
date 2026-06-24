export type Task = {
  id: number
  title: string
  deadline: string | null
  estimasi_durasi: number // minutes
  timer_logged: number // minutes
  done: boolean
  subtasks: SubTask[]
}

export type SubTask = {
  id: number
  title: string
  deadline: string | null
  estimasi_durasi: number // minutes
  timer_logged: number // minutes
  done: boolean
}
