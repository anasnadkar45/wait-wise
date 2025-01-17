import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ProjectState {
  selectedProject: {
    id: string;
    name: string;
    description: string;
    handle: string;
    logo: string;
    userId?: string;
  } | null;
}

// Initial state with null selectedProject
const initialState: ProjectState = {
  selectedProject: null,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    selectProject: (state, action: PayloadAction<ProjectState["selectedProject"]>) => {
      state.selectedProject = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("selectedProject", JSON.stringify(action.payload));
      }
    },
    clearProject: (state) => {
      state.selectedProject = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("selectedProject");
      }
    },
  },
});

export const { selectProject, clearProject } = projectSlice.actions;
export default projectSlice.reducer;
