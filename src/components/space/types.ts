export type Project = {
  id: number
  name: string
  color: string
  updatedAt: string
}

export type Space = {
  id: number
  name: string
  projects: Project[]
}
