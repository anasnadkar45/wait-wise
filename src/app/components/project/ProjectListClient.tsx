"use client"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setProjects } from "@/app/utils/redux/slices/projectSlice"
import { ProjectCard } from "./ProjectCard"
import { Card, CardContent } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { AddProject } from "./AddProject"

interface ProjectListClientProps {
  projects: any[]
}

export default function ProjectListClient({ projects }: ProjectListClientProps) {
  const dispatch = useDispatch()

  // Dispatch projects to Redux store on mount
  useEffect(() => {
    dispatch(setProjects(projects))
  }, [dispatch, projects])

  if (projects.length === 0) {
    return (
      <Card className="min-h-[84vh] bg-card p-6 border-2 flex justify-center items-center border-muted/60 overflow-hidden transition-all hover:shadow-lg">
        <CardContent className="p-0 flex flex-col items-center justify-center h-full text-center">
          <PlusCircle className="w-16 h-16 text-muted-foreground mb-4" />
          <h3 className="font-semibold text-lg mb-2">No projects created yet</h3>
          <p className="text-sm text-muted-foreground mb-4">Create your first project to get started</p>
          <AddProject />
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}

