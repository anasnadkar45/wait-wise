import prisma from "@/app/utils/db";
import React from "react";
import WaitingListBlack from "@/app/components/waitlist/WaitingListBlack";
import WaitingListGreen from "@/app/components/waitlist/WaitingListGreen";
import { WaitingListDarkBlue } from "@/app/components/waitlist/WaitingListDarkBlue";

// Function to fetch project data
const getProjectData = async (handle: string) => {
  return await prisma.project.findUnique({
    where: { handle },
  });
};

const Page = async ({ params }: { params: { handle: string } }) => {
  const project = await getProjectData(params.handle);

  if (!project) {
    return <div>Project not found</div>;
  }

  return project.waitListCode === "Green" ? (
    <WaitingListGreen project={project as any} />
    // <WaitingListDarkBlue />
  ) : project.waitListCode === "Black" ? (
    <WaitingListBlack project={project as any} />
  ) : (
    <div>Invalid category</div>
  );
};

export default Page;
