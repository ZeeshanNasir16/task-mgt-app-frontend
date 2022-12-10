import { createAsyncThunk } from '@reduxjs/toolkit';
import { Task_CL, updateTask } from 'interfaces/Task';
import * as taskAPI from 'api/tasks';
import { errorCallback } from 'api';

export const createTask = createAsyncThunk(
  'task-addNew',
  async (values: Task_CL, { rejectWithValue }) => {
    console.log('Createn values', values);
    return taskAPI
      .createNewTask(values)
      .then((res) => ({ task: res.data.task }))
      .catch((err: any) => rejectWithValue(errorCallback(err)));
  }
);

export const fetchTasks = createAsyncThunk(
  'task-getAll',
  async (_, { rejectWithValue }) =>
    taskAPI
      .getAllTasks()
      .then((res) => ({ tasks: res.data.tasks }))
      .catch((err: any) => rejectWithValue(errorCallback(err)))
);

export const updTask = createAsyncThunk(
  'task-update',
  async (values: updateTask, { rejectWithValue }) =>
    taskAPI
      .updateTask(values.id, values.body)
      .then((res) => ({ task: res.data.task }))
      .catch((err: any) => rejectWithValue(errorCallback(err)))
);

export const deleteTask = createAsyncThunk(
  'task-delete',
  async (id: string, { rejectWithValue }) =>
    taskAPI
      .deleteTask(id)
      .then((res) => ({ task: res.data.task }))
      .catch((err: any) => rejectWithValue(errorCallback(err)))
);
