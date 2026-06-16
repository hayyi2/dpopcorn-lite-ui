import { Home, BarChart3, LayoutGrid, Timer } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { to: "/", label: "Home", icon: Home },
  { to: "/space", label: "Space", icon: LayoutGrid },
  { to: "/logs", label: "Logs", icon: Timer },
  { to: "/report", label: "Report", icon: BarChart3 },
]
