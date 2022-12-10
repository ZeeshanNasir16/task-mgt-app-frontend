import { toast } from 'react-toastify';
import { LOCALSTORAGE_TOKEN_KEY } from '../../../api/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'interfaces/User';
import { login, getMe } from './extraReducers';

export interface ILogin {
  token: string;
  user: User;
}

interface IInitialState {
  authenticating: boolean;
  isLoggedIn: boolean;
  loading: boolean;
  user: User | null;
  token: string | null;
}

const initialState: IInitialState = {
  authenticating: true,
  isLoggedIn: false,
  loading: false,
  user: null,
  token: window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY) || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        login.fulfilled,
        (state, { payload }: PayloadAction<{ token: string; user: User }>) => {
          console.log('User Loggd in');
          state.token = payload.token;
          state.user = payload.user;
          localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, payload.token);
          state.isLoggedIn = true;
          state.loading = false;
        }
      )
      .addCase(login.rejected, (state, { payload }: any) => {
        console.log('Eror:', payload);
        toast.error(payload);
        state.loading = false;
      });

    builder
      .addCase(getMe.pending, (state) => {
        state.authenticating = true;
      })
      .addCase(
        getMe.fulfilled,
        (state, { payload }: PayloadAction<{ token: string; user: User }>) => {
          state.authenticating = false;
          state.token = payload.token;
          state.user = payload.user;
          state.isLoggedIn = true;
        }
      )
      .addCase(getMe.rejected, (state, { payload }: any) => {
        console.log('Get Me Fiailed :', payload);
        state.authenticating = false;
      });
  },
});

export default authSlice.reducer;
