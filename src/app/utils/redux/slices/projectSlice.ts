import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProjectType } from "../../types";

// Function to load state from localStorage
const loadState = (): ProjectState => {
  if (typeof window !== "undefined") {
    const savedState = localStorage.getItem("projectsState");
    return savedState ? JSON.parse(savedState) : { projects: [], selectedProject: null };
  }
  return { projects: [], selectedProject: null };
};

// Define the state interface
export interface ProjectState {
  projects: ProjectType[];
  selectedProject: ProjectType | null;
}

// Initialize state from localStorage
const initialState: ProjectState = loadState();

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<ProjectType[]>) => {
      state.projects = action.payload;
      localStorage.setItem("projectsState", JSON.stringify(state)); // Save to localStorage
    },
    selectProject: (state, action: PayloadAction<ProjectType | null>) => {
      state.selectedProject = action.payload;
      localStorage.setItem("projectsState", JSON.stringify(state)); // Save to localStorage
    },
    clearProject: (state) => {
      state.selectedProject = null;
      localStorage.setItem("projectsState", JSON.stringify(state)); // Save to localStorage
    },
  },
});

export const { setProjects, selectProject, clearProject } = projectSlice.actions;
export default projectSlice.reducer;
