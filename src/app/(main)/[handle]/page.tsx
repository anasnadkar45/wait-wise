import prisma from "@/app/utils/db";
import React from "react";
import WaitingListBlack from "@/app/components/waitlist/WaitingListBlack";
import WaitingListGreen from "@/app/components/waitlist/WaitingListGreen";

// Function to fetch project data
const getProject = async (handle: string) => {
  return await prisma.project.findUnique({
    where: { handle },
  });
};

const Page = async ({ params }: { params: { handle: string } }) => {
  const project = await getProject(params.handle);

  if (!project) {
    return <div>Project not found</div>;
  }

  return project.waitListCode === "Green" ? (
    <WaitingListGreen project={project} />
  ) : project.waitListCode === "Black" ? (
    <WaitingListBlack project={project} />
  ) : (
    <div>Invalid category</div>
  );
};

export default Page;
