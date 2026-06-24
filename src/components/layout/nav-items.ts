import { Home, BarChart3, Timer, Folders } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { to: "/", label: "Home", icon: Home },
  { to: "/space", label: "Spaces", icon: Folders },
  { to: "/timer", label: "Timer", icon: Timer },
  { to: "/report", label: "Report", icon: BarChart3 },
]
