import { configureStore } from '@reduxjs/toolkit';
import authSlice from 'store/slices/auth';
import projSlice from 'store/slices/projects';
import userSlice from 'store/slices/users';
import taskSlice from 'store/slices/tasks';

const store = configureStore({
  reducer: {
    auth: authSlice,
    proj: projSlice,
    users: userSlice,
    tasks: taskSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
