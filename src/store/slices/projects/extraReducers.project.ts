import * as projAPI from 'api/project.api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Project_CL, updateProj } from 'interfaces/Project';
import { errorCallback } from 'api';

export const createProject = createAsyncThunk(
  'projects-addNew',
  async (values: Project_CL, { rejectWithValue }) =>
    projAPI
      .createNewProj(values)
      .then((res) => ({ project: res.data.project }))
      .catch((err: any) => rejectWithValue(errorCallback(err)))
);

export const fetchProjects = createAsyncThunk(
  'projects-getAll',
  async (_, { rejectWithValue }) =>
    projAPI
      .getAllProjs()
      .then((res) => ({ projects: res.data.projects }))
      .catch((err: any) => rejectWithValue(errorCallback(err)))
);

export const updateProject = createAsyncThunk(
  'project-update',
  async (values: updateProj, { rejectWithValue }) =>
    projAPI
      .updateProj(values.id, values.body)
      .then((res) => ({ proj: res.data.proj }))
      .catch((err: any) => rejectWithValue(errorCallback(err)))
);

export const deleteProj = createAsyncThunk(
  'project-delete',
  async (id: string, { rejectWithValue }) =>
    projAPI
      .delProj(id)
      .then((res) => ({ proj: res.data.proj }))
      .catch((err: any) => rejectWithValue(errorCallback(err)))
);
