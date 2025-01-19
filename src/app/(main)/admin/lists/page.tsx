
import { ProjectCard } from "@/app/components/project/ProjectCard"
import { AddProject } from "@/app/components/project/AddProject"
import { requireUser } from "@/app/utils/hooks"
import prisma from "@/app/utils/db"
import { Logo } from "../../../../../public/logo"

const getProjects = async (userId: string) => {
  const data = await prisma.project.findMany({
    where: {
      userId: userId,
    },
    select:{
      id:true,
      description:true,
      handle:true,
      logo:true,
      name:true,
      User:true,
      userId:true,
      waitListCode:true,
      waitListSubmission:true,
    }
  })

  return data
}
export default async function ProjectList() {
  const session = await requireUser()
  const projects = await getProjects(session.user?.id as string)
  console.log(projects)
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <nav className="flex w-[240px] m-4 flex-col bg-card border rounded-lg">
        <div className="flex h-14 items-center gap-2 px-4">
          <Logo />
          <span className="font-medium">Waitless</span>
        </div>

        
      </nav>

      {/* Main Content */}
      <main className="flex-1 border-l">
        <header className="flex h-14 items-center justify-between border-b px-4">
          <h1 className="text-lg font-medium">Your projects</h1>
          <AddProject />
        </header>

        <div className="grid gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project as any}
            />
          ))}
        </div>
      </main>
    </div>
  )
}



