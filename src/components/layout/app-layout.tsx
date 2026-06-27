import { Outlet } from "react-router"
import { TopNavbar } from "./top-navbar"
import { BottomNavbar } from "./bottom-navbar"
import { TimerWidget } from "@/components/timer-widget/timer-widget"

export default function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground transition-colors duration-200">
      {/* Top Navigation (Visible on both Mobile and Desktop) */}
      <TopNavbar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pt-20 pb-32 md:pb-10">
        <Outlet />
      </main>

      {/* Mobile Navigation (Bottom Navbar, hidden on Desktop) */}
      <BottomNavbar />

      {/* Global Timer Widget */}
      <TimerWidget />
    </div>
  )
}
