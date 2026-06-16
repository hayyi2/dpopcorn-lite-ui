import { Outlet } from "react-router"
import { TopNavbar } from "./top-navbar"
import { BottomNavbar } from "./bottom-navbar"

export default function AppLayout() {
  return (
    <div className="min-h-svh flex flex-col bg-background text-foreground transition-colors duration-200">
      {/* Top Navigation (Visible on both Mobile and Desktop) */}
      <TopNavbar />

      {/* Main Content Area */}
      <main className="flex-1 pt-20 pb-20 md:pb-6 overflow-y-auto">
        <Outlet />
      </main>

      {/* Mobile Navigation (Bottom Navbar, hidden on Desktop) */}
      <BottomNavbar />
    </div>
  )
}
