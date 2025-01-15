import { Card, CardContent } from "@/components/ui/card"
import { Logo } from "../../../public/logo"

export function ProjectCard({ name, totalSignUps, last24h }: { 
    name: string
    totalSignUps: number
    last24h: number 
  }) {
    return (
      <Card className="transition-all hover:shadow-md">
        <CardContent className="p-4">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
              <Logo />
            </div>
            <span className="font-medium">{name}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-medium tabular-nums">{totalSignUps}</div>
              <div className="text-xs text-muted-foreground">Total sign ups</div>
            </div>
            <div>
              <div className="text-2xl font-medium tabular-nums">{last24h}</div>
              <div className="text-xs text-muted-foreground">Last 24h</div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }