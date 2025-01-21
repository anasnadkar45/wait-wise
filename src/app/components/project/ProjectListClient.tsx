"use client"; // Mark as a Client Component

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProjects } from "@/app/utils/redux/slices/projectSlice";
import { ProjectCard } from "./ProjectCard";

interface ProjectListClientProps {
  projects: any[];
}

export default function ProjectListClient({ projects }: ProjectListClientProps) {
  const dispatch = useDispatch();

  // Dispatch projects to Redux store on mount
  useEffect(() => {
    dispatch(setProjects(projects));
  }, [dispatch, projects]);

  return (
    <div className="grid gap-4  sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
