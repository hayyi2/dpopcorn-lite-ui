import type { ReactNode } from "react"

interface PageLayoutProps {
  children: ReactNode
  className?: string
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className={`container mx-auto p-4 md:p-8 space-y-6 max-w-3xl ${className ?? ""}`}>
      {children}
    </div>
  )
}

interface PageHeaderProps {
  icon: ReactNode
  title: string
  subtitle?: string
  actions?: ReactNode
}

export function PageHeader({ icon, title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 text-primary rounded-lg shrink-0">
          {icon}
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
          {subtitle && (
            <p className="text-muted-foreground text-sm">{subtitle}</p>
          )}
        </div>
      </div>
      {actions && (
        <div className="flex gap-2">
          {actions}
        </div>
      )}
    </div>
  )
}
