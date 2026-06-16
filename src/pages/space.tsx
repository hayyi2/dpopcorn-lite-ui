import { Button } from "@/components/ui/button"
import { Globe, Plus, Folder, Users, Settings } from "lucide-react"

export default function SpacePage() {
  const spaces = [
    { id: 1, name: "Production API", status: "Active", users: 5, type: "API Space" },
    { id: 2, name: "Frontend Sandbox", status: "Active", users: 2, type: "Web App" },
    { id: 3, name: "Data Processing", status: "Inactive", users: 0, type: "Pipeline" },
  ]

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <Globe className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Spaces</h1>
            <p className="text-muted-foreground text-sm">Manage workspaces and environment configurations.</p>
          </div>
        </div>
        <Button size="sm" className="gap-1.5 hidden sm:flex">
          <Plus className="h-4 w-4" /> New Space
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {spaces.map((space) => (
          <div key={space.id} className="p-5 border rounded-xl bg-card text-card-foreground shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-muted rounded-lg hidden sm:block">
                <Folder className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-base flex items-center gap-2">
                  {space.name}
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    space.status === "Active" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground"
                  }`}>
                    {space.status}
                  </span>
                </h3>
                <p className="text-xs text-muted-foreground">{space.type} • Updated 2 hours ago</p>
              </div>
            </div>

            <div className="flex items-center gap-6 justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{space.users} members</span>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center sm:hidden pt-2">
        <Button className="w-full gap-1.5">
          <Plus className="h-4 w-4" /> New Space
        </Button>
      </div>
    </div>
  )
}
