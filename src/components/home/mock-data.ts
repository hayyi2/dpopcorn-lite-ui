import type { HomeTask } from "./types"

const TODAY = new Date().toISOString().slice(0, 10)

export const scheduledEntries: HomeTask[] = [
  {
    id: 1,
    project: "DPopcorn",
    title: "Design new onboarding flow Design new onboarding flow",
    done: false,
    deadline: "2026-06-20",
    estimasi_durasi: 120,
    timer_logged: 45,
    subtasks: [],
    milestone_id: null,
  },
  {
    id: 2,
    project: "DPopcorn",
    title: "Fix auth bug on login page",
    done: true,
    deadline: "2026-06-20",
    estimasi_durasi: 120,
    timer_logged: 45,
    subtasks: [],
    milestone_id: null,
  },
  {
    id: 3,
    project: "Internal",
    title: "Weekly sync prep",
    done: false,
    deadline: "2026-06-20",
    estimasi_durasi: 120,
    timer_logged: 45,
    subtasks: [],
    milestone_id: null,
  },
]

export const overdueTasks: HomeTask[] = [
  {
    id: 10,
    project: "DPopcorn",
    title: "Update API documentation",
    deadline: "2026-06-20",
    estimasi_durasi: 120,
    timer_logged: 45,
    done: false,
    subtasks: [],
    milestone_id: null,
  },
  {
    id: 11,
    project: "DPopcorn",
    milestone_title: "v1.2 Release",
    title: "Migrate database schema",
    deadline: "2026-06-22",
    estimasi_durasi: 240,
    timer_logged: 60,
    done: false,
    subtasks: [],
    milestone_id: 1,
  },
]

export const dueTodayTasks: HomeTask[] = [
  {
    id: 20,
    project: "Internal",
    title: "Submit sprint review report",
    deadline: TODAY,
    estimasi_durasi: 60,
    timer_logged: 20,
    done: false,
    subtasks: [],
    milestone_id: null,
  },
  {
    id: 21,
    project: "DPopcorn",
    milestone_title: "Q2 Sprint",
    title: "Implement task drag-and-drop",
    deadline: TODAY,
    estimasi_durasi: 180,
    timer_logged: 90,
    done: false,
    subtasks: [],
    milestone_id: 2,
  },
]

export const upcomingTasks: HomeTask[] = [
  {
    id: 30,
    project: "Internal",
    title: "Plan Q3 roadmap",
    deadline: "2026-06-28",
    estimasi_durasi: 90,
    timer_logged: 0,
    done: false,
    subtasks: [],
    milestone_id: null,
  },
  {
    id: 31,
    project: "Research",
    title: "User interview sessions",
    deadline: "2026-07-01",
    estimasi_durasi: 120,
    timer_logged: 0,
    done: false,
    subtasks: [],
    milestone_id: null,
  },
]
