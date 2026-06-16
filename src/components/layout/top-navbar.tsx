import { useState, useRef, useEffect } from "react"
import { NavLink } from "react-router"
import { Sun, Moon, User, Settings, LogOut, Shield } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { navItems } from "./nav-items"

export function TopNavbar() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b bg-background/85 backdrop-blur-md flex items-center justify-between px-4 md:px-6 select-none">
      <div className="flex items-center gap-4 md:gap-6">
        <span className="font-bold text-base md:text-lg tracking-tight text-primary flex items-center gap-1.5">
          <span>Dpopcorn</span>
        </span>
        {/* Navigation links - hidden on mobile (handled by bottom navbar) */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          title="Toggle Theme (or press D)"
          className="h-9 w-9 rounded-full"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* User Menu Dropdown (UI Only) */}
        <div className="relative" ref={dropdownRef}>
          <Button
            variant="ghost"
            className="relative h-9 w-9 rounded-full p-0 overflow-hidden border bg-muted/50 hover:bg-muted"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex h-full w-full items-center justify-center font-bold text-xs bg-primary/10 text-primary uppercase">
              jd
            </div>
            <span className="sr-only">User Menu</span>
          </Button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border bg-popover text-popover-foreground shadow-lg focus:outline-none z-50 animate-in fade-in-50 slide-in-from-top-1 duration-150">
              <div className="p-3 border-b flex flex-col gap-0.5">
                <p className="text-sm font-semibold leading-none">John Doe</p>
                <p className="text-xs text-muted-foreground leading-none mt-1">john.doe@dpopcorn.dev</p>
              </div>
              <div className="p-1.5 space-y-0.5">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-left hover:bg-muted transition-colors"
                >
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>My Profile</span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-left hover:bg-muted transition-colors"
                >
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-left hover:bg-muted transition-colors"
                >
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span>Security</span>
                </button>
              </div>
              <div className="p-1.5 border-t">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-left hover:bg-destructive/10 text-destructive transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
