import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ProjectType } from "@/app/utils/types"
import Image from "next/image"
import ReactMarkdown from "react-markdown"

export function ProjectOverview({ project }: { project: ProjectType }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Overview</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <Image
          src={project.logo || "/placeholder.svg"}
          alt={project.name}
          width={64}
          height={64}
          className="rounded-lg"
        />
        <div>
          <h2 className="text-2xl font-bold">{project.name}</h2>
          <p className="text-muted-foreground">@{project.handle}</p>
          <ReactMarkdown>{project.description}</ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  )
}

