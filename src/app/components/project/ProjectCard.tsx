"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Users } from 'lucide-react'
import { useDispatch } from "react-redux"
import { selectProject } from "@/app/utils/store/features/project/projectSlice"

export function ProjectCard({ project }: { project: any }) {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(selectProject(project))
  }

  return (
    <Link href={`/admin/${project.id}/dashboard`} onClick={handleClick}>
      <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
                  <Image src={project.logo || "/placeholder.svg"} alt={project.name} width={32} height={32} className="rounded-full" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">@{project.handle}</p>
                </div>
              </div>
              <ArrowUpRight className="text-primary h-5 w-5" />
            </div>
            <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{project.description}</p>
            {/* <div className="grid grid-cols-2 gap-4">
              <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3">
                <div className="text-2xl font-bold tabular-nums">{project.totalSignUps.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users className="h-3 w-3" /> Total sign ups
                </div>
              </div>
              <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3">
                <div className="text-2xl font-bold tabular-nums text-primary">{project.last24h.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users className="h-3 w-3" /> Last 24h
                </div>
              </div>
            </div> */}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
