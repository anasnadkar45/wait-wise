import { Suspense } from "react"
import { requireUser } from "@/app/utils/hooks"
import prisma from "@/app/utils/db"
import { AddProject } from "@/app/components/project/AddProject"
import ProjectListClient from "@/app/components/project/ProjectListClient"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import Link from "next/link"
import { signOut } from "@/app/utils/auth"
import { SubmitButton } from "@/app/components/buttons/SubmitButton"

const getProjects = async (userId: string) => {
  const data = await prisma.project.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      description: true,
      handle: true,
      logo: true,
      name: true,
      User: true,
      userId: true,
      waitListCode: true,
      waitListSubmission: true,
    },
  })

  return data
}

export default async function ProjectList() {
  const session = await requireUser()
  const projects = await getProjects(session.user?.id as string)

  return (
    <div className="min-h-screen p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Your Projects</h1>
        <div className="flex items-center gap-4">
          <AddProject />
          <form
            action={async () => {
              "use server"
              await signOut()
            }}
          >
            <SubmitButton text="Logout" variant={"outline"} className="hover:bg-muted"/>
          </form>
        </div>
      </header>

      <Suspense fallback={<div>Loading projects...</div>}>
        <ProjectListClient projects={projects} />
      </Suspense>
    </div>
  )
}

