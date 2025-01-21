import UpdateProject from '@/app/components/settings/UpdateProject'
import prisma from '@/app/utils/db'
import React from 'react'

const getProjectData = async(projectId:string) =>{
  const data = await prisma.project.findUnique({
    where:{
      id: projectId
    }
  })
  return data
}

const page = async({ params }: { params: { id: string } }) => {
  const project = await getProjectData(params.id)
  return (
    <div className='p-2'>
      <h1 className='text-2xl font-bold'>Settings</h1>
      <UpdateProject project={project as any}/>
    </div>
  )
}

export default page