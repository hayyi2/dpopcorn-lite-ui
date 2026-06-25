import { useState, useRef, useEffect } from "react"
import { NavLink } from "react-router"
import { Sun, Moon, User, Settings, LogOut, Shield } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { navItems } from "./nav-items"
import { Logo } from "./logo"

export function TopNavbar() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between border-b bg-background/85 px-4 backdrop-blur-md select-none md:px-6">
      <div className="flex items-center gap-4 md:gap-6">
        <Logo />
        {/* Navigation links - hidden on mobile (handled by bottom navbar) */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
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
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* User Menu Dropdown (UI Only) */}
        <div className="relative" ref={dropdownRef}>
          <Button
            variant="ghost"
            className="relative h-9 w-9 overflow-hidden rounded-full border bg-muted/50 p-0 hover:bg-muted"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex h-full w-full items-center justify-center bg-primary/10 text-xs font-bold text-primary uppercase">
              jd
            </div>
            <span className="sr-only">User Menu</span>
          </Button>

          {isOpen && (
            <div className="absolute right-0 z-50 mt-2 w-56 animate-in rounded-xl border bg-popover text-popover-foreground shadow-lg duration-150 fade-in-50 slide-in-from-top-1 focus:outline-none">
              <div className="flex flex-col gap-0.5 border-b p-3">
                <p className="text-sm leading-none font-semibold">John Doe</p>
                <p className="mt-1 text-xs leading-none text-muted-foreground">
                  john.doe@dpopcorn.dev
                </p>
              </div>
              <div className="space-y-0.5 p-1.5">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors hover:bg-muted"
                >
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>My Profile</span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors hover:bg-muted"
                >
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors hover:bg-muted"
                >
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span>Security</span>
                </button>
              </div>
              <div className="border-t p-1.5">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-destructive transition-colors hover:bg-destructive/10"
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
