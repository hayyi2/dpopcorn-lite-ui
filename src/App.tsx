import { Routes, Route } from "react-router"
import AppLayout from "@/components/layout/app-layout"
import HomePage from "@/pages/home"
import SpacePage from "@/pages/space"
import LogsPage from "@/pages/logs"
import ReportPage from "@/pages/report"
import TaskPage from "@/pages/task"

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="space" element={<SpacePage />} />
        <Route path="space/:projectId/tasks" element={<TaskPage />} />
        <Route path="logs" element={<LogsPage />} />
        <Route path="report" element={<ReportPage />} />
      </Route>
    </Routes>
  )
}

export default App
