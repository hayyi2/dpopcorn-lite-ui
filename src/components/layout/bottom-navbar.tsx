import { NavLink } from "react-router"
import { navItems } from "./nav-items"

export function BottomNavbar() {
  return (
    <nav className="safe-bottom pb-safe fixed right-0 bottom-0 left-0 z-50 flex h-16 items-center justify-around border-t bg-background/95 px-2 backdrop-blur-md select-none md:hidden">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center justify-center gap-1 rounded-md py-1 text-[10px] font-medium transition-colors ${
              isActive
                ? "font-semibold text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div
                className={`rounded-lg p-1 transition-colors ${isActive ? "bg-primary/10" : ""}`}
              >
                <item.icon className="h-5 w-5" />
              </div>
              <span>{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
