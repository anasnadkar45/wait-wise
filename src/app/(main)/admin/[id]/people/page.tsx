import { getProjectData } from "@/app/actions"
import { SubmissionTable } from "@/app/components/people/SubmissionTable"


export default async function PeoplePage({ params }: { params: { id: string } }) {
  const projectData = await getProjectData(params.id, 0)
  return (
    <div>
      <SubmissionTable project={projectData as any} />
    </div>
  )
}

