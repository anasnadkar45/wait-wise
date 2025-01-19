import { SubmissionTable } from "@/app/components/project/SubmissionTable";
import prisma from "@/app/utils/db";

const getProjectData = async (id: string) => {
  return await prisma.project.findUnique({
    where: { id },
    include:{
      waitListSubmission: true
    }
  });
};

export default async function PeoplePage({ params }: { params: { id: string } }) {
  const projectData = await getProjectData(params.id);
  console.log(projectData)
  return (
    <div>
      <SubmissionTable project={projectData as any}/>
    </div>
  )
}

