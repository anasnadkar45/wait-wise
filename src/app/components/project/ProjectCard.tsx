import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Users } from 'lucide-react'
import { projectType } from "@/app/utils/types"

export function ProjectCard({ project }: { project: projectType }) {

  return (
    <Link href={`/admin/${project.id}/dashboard`}>
      <Card className="bg-gradient-to-br from-primary/5 to-card p-6 border-2 border-muted/60 overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image src={project.logo || "/placeholder.svg"} alt={project.name} width={50} height={50} className="rounded-md"/>
                <div>
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">@{project.handle}</p>
                </div>
              </div>
              <ArrowUpRight className="text-primary h-5 w-5" />
            </div>
            <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{project.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted backdrop-blur-sm rounded-lg p-3">
                <div className="text-2xl font-bold tabular-nums">14</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users className="h-3 w-3" /> Total sign ups
                </div>
              </div>
              <div className="bg-muted backdrop-blur-sm rounded-lg p-3">
                <div className="text-2xl font-bold tabular-nums text-primary">08</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users className="h-3 w-3" /> Last 24h
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
