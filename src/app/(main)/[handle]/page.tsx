import prisma from '@/app/utils/db';
import React from 'react'

const getProject = async (handle: string) => {
    const data = await prisma.project.findUnique({
        where: {
            handle: handle,
        }
    })
    return data;
}

const page = async ({ params }: { params: Promise<{ handle: string }> }) => {
    const handle = (await params).handle;
    const project = await getProject(handle);
    return (
        <div key={project?.id}>
            <h1>{project?.name}</h1>
        </div>
    )
}

export default page