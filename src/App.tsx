import { Routes, Route } from "react-router"
import AppLayout from "@/components/layout/app-layout"
import HomePage from "@/pages/home"
import SpacePage from "@/pages/space"
import LogsPage from "@/pages/logs"
import ReportPage from "@/pages/report"

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="space" element={<SpacePage />} />
        <Route path="logs" element={<LogsPage />} />
        <Route path="report" element={<ReportPage />} />
      </Route>
    </Routes>
  )
}

export default App
