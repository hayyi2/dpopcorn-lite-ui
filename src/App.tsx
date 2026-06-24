import { Routes, Route } from "react-router"
import AppLayout from "@/components/layout/app-layout"
import ProjectLayout from "@/components/layout/project-layout"
import HomePage from "@/pages/home"
import SpacePage from "@/pages/space"
import LogsPage from "@/pages/logs"
import ReportPage from "@/pages/report"
import DetailPage from "@/pages/project/detail"
import TaskPage from "@/pages/project/task"
import TimerPage from "@/pages/project/timer"

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="space" element={<SpacePage />} />
        <Route path="space/:projectId" element={<ProjectLayout />}>
          <Route index element={<DetailPage />} />
          <Route path="tasks" element={<TaskPage />} />
          <Route path="timer" element={<TimerPage />} />
        </Route>
        <Route path="logs" element={<LogsPage />} />
        <Route path="report" element={<ReportPage />} />
      </Route>
    </Routes>
  )
}

export default App
