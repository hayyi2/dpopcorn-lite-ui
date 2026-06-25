import type { ReactNode } from "react"

interface PageLayoutProps {
  children: ReactNode
  className?: string
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div
      className={`container mx-auto max-w-5xl space-y-6 p-4 md:p-8 ${className ?? ""}`}
    >
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

export function PageHeader({
  icon,
  title,
  subtitle,
  actions,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
        <div className="shrink-0 rounded-lg bg-primary/10 p-2 text-primary">
          {icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  )
}
