import { Project_DB } from 'interfaces/Project';
import { toast } from 'react-toastify';
import { createSlice } from '@reduxjs/toolkit';
import {
  createProject,
  deleteProj,
  fetchProjects,
  updateProject,
} from './extraReducers.project';

interface IInitialState {
  projects: Project_DB[] | [];
  loading: boolean;
}

const initialState: IInitialState = {
  projects: [],
  loading: false,
};

const projSlice = createSlice({
  name: 'projectList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProject.fulfilled, (state, { payload }: any) => {
        toast.success('New Project created successfully');
        state.projects = state.projects
          ? [...state.projects, payload.project]
          : [payload.project];
        state.loading = false;
      })
      .addCase(createProject.rejected, (state, { payload }: any) => {
        toast.error(payload);
        state.loading = false;
      });

    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, { payload }: any) => {
        state.projects = payload.projects;
        state.loading = false;
      })
      .addCase(fetchProjects.rejected, (state, { payload }: any) => {
        toast.error(payload);
        state.loading = false;
      });

    builder
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProject.fulfilled, (state, { payload }: any) => {
        toast.success('Project updated successfully');
        state.projects =
          state.projects.length > 0
            ? state.projects.map((el: Project_DB) =>
                el._id === payload.proj._id ? payload.proj : el
              )
            : [payload.user];
        state.loading = false;
      })
      .addCase(updateProject.rejected, (state, { payload }: any) => {
        toast.error(payload);
        state.loading = false;
      });

    builder
      .addCase(deleteProj.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProj.fulfilled, (state, { payload }: any) => {
        toast.success('Project deleted successfully');
        state.loading = false;
        if (state.projects.length > 0)
          state.projects = state.projects.filter(
            (el: Project_DB) => el._id !== payload.proj._id
          );
      })
      .addCase(deleteProj.rejected, (state, { payload }: any) => {
        toast.error(payload);
        state.loading = false;
      });
  },
});

export default projSlice.reducer;
