import { ShareCard } from "@/app/components/project/ShareCard";
import prisma from "@/app/utils/db";

const getProjectData = async (id: string) => {
  return await prisma.project.findUnique({
    where: { id },
  });
};

const Dashboard = async ({ params }: { params: { id: string } }) => {
  const projectData = await getProjectData(params.id);
  
  return (
    <div className='text-black'>
      <ShareCard project={projectData as any}/>
    </div>
  )
}

export default Dashboard