import type { Task } from "@/components/task/types"

export type HomeTask = Task & {
  project: string
  milestone_title?: string
}
