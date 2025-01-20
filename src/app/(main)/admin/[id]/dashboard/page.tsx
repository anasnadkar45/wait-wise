import { ShareCard } from "@/app/components/project/ShareCard"
import { Users, TrendingUp, Clock } from "lucide-react"
import prisma from "@/app/utils/db"
import { ProjectOverview } from "@/app/components/dashboard/ProjectOverview"
import { StatCard } from "@/app/components/dashboard/StatCard"
import { RecentSubmissions } from "@/app/components/dashboard/RecentSubmissions"
import { SignupChart } from "@/app/components/dashboard/SignupChart"

export const getProjectData = async (id: string) => {
  return await prisma.project.findUnique({
    where: { id },
    include: {
      waitListSubmission: {
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      },
      _count: {
        select: { waitListSubmission: true },
      },
    },
  })
}



const Dashboard = async ({ params }: { params: { id: string } }) => {
  const projectData = await getProjectData(params.id)

  if (!projectData) {
    return <div>Project not found</div>
  }

  const totalSignups = projectData._count.waitListSubmission
  const last24HrSignUps = projectData.waitListSubmission.filter((signUp) => {
    const signUpDate = new Date(signUp.createdAt)
    const now = new Date()
    const timeDifference = now.getTime() - signUpDate.getTime()
    const hoursDifference = timeDifference / (1000 * 3600)
    return hoursDifference <= 24
  }).length

  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const signupData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(thirtyDaysAgo)
    date.setDate(date.getDate() + i)
    return {
      date: date.toISOString().split("T")[0],
      count: projectData.waitListSubmission.filter(
        (signup) => new Date(signup.createdAt).toISOString().split("T")[0] === date.toISOString().split("T")[0],
      ).length,
    }
  })
  return (
    <div className="space-y-4 ">
      <ProjectOverview project={projectData as any} />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Total Signups" value={totalSignups} icon={Users} />
        <StatCard title="Last 24 Hours" value={last24HrSignUps} icon={TrendingUp} />
        <StatCard title="Average Daily" value={Math.round(totalSignups / 30)} icon={Clock} />
      </div>

      <SignupChart data={signupData} />

      <div className="grid gap-4 md:grid-cols-2">
        <RecentSubmissions project={projectData as any} />
        <ShareCard project={projectData as any} />
      </div>
    </div>
  )
}

export default Dashboard

