import { Task_DB } from 'interfaces/Task';
import { toast } from 'react-toastify';
import { createSlice } from '@reduxjs/toolkit';
import { createTask, deleteTask, fetchTasks, updTask } from './extraReducers';

interface IInitialState {
  tasks: Task_DB[] | [];
  loading: boolean;
}

const initialState: IInitialState = {
  tasks: [],
  loading: false,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, { payload }: any) => {
        toast.success('New Task created successfully');
        state.loading = false;
        state.tasks = state.tasks
          ? [...state.tasks, payload.task]
          : [payload.task];
      })
      .addCase(createTask.rejected, (state, { payload }: any) => {
        toast.error(payload);
        state.loading = false;
      });

    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, { payload }: any) => {
        state.tasks = payload.tasks;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, { payload }: any) => {
        toast.error(payload);
        state.loading = false;
      });

    builder
      .addCase(updTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updTask.fulfilled, (state, { payload }: any) => {
        toast.success('Task updated successfully');
        state.tasks =
          state.tasks.length > 0
            ? state.tasks.map((el: Task_DB) =>
                el._id === payload.task._id ? payload.task : el
              )
            : [payload.task];
        state.loading = false;
      })
      .addCase(updTask.rejected, (state, { payload }: any) => {
        toast.error(payload);
        state.loading = false;
      });

    builder
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, { payload }: any) => {
        toast.success('Task deleted successfully');

        if (state.tasks.length > 0)
          state.tasks = state.tasks.filter(
            (el: Task_DB) => el._id !== payload.task._id
          );

        state.loading = false;
      })
      .addCase(deleteTask.rejected, (state, { payload }: any) => {
        toast.error(payload);
        state.loading = false;
      });
  },
});

export default taskSlice.reducer;
