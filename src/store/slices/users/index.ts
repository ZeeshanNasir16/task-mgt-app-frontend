import { toast } from 'react-toastify';
import { addUser, delUser, fetchUsers, updatUser } from './extraReducers';
import { createSlice } from '@reduxjs/toolkit';
import { User } from 'interfaces/User';

interface IInitialState {
  users: User[] | [];
  loading: boolean;
  fetching: boolean;
}

const initialState: IInitialState = {
  users: [],
  loading: false,
  fetching: true,
};

const userSlice = createSlice({
  name: 'Users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, { payload }: any) => {
        toast.success('New User created successfully');
        state.loading = false;
        console.log(payload);
        state.users = state.users
          ? [...state.users, payload.user]
          : [payload.user];
      })
      .addCase(addUser.rejected, (state, { payload }: any) => {
        state.loading = false;
        toast.error(payload);
      });

    builder
      .addCase(fetchUsers.pending, (state) => {
        state.fetching = true;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }: any) => {
        state.users = payload.users;
        state.fetching = false;
      })
      .addCase(fetchUsers.rejected, (state, { payload }: any) => {
        state.fetching = false;
        toast.error(payload);
      });

    builder
      .addCase(updatUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatUser.fulfilled, (state, { payload }: any) => {
        toast.success('User updated successfully');
        state.users =
          state.users.length > 0
            ? state.users.map((el: User) =>
                el._id === payload.user._id ? payload.user : el
              )
            : [payload.user];
        state.loading = false;
      })
      .addCase(updatUser.rejected, (state, { payload }: any) => {
        toast.error(payload);
        state.loading = false;
      });

    builder
      .addCase(delUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(delUser.fulfilled, (state, { payload }: any) => {
        toast.success('User deleted successfully');
        if (state.users.length > 0)
          state.users = state.users.filter(
            (el: User) => el._id !== payload.user._id
          );

        state.loading = false;
      })
      .addCase(delUser.rejected, (state, { payload }: any) => {
        state.loading = false;
        toast.error(payload);
      });
  },
});

export default userSlice.reducer;
