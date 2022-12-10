import { createAsyncThunk } from '@reduxjs/toolkit';
import * as userAPI from 'api/users';
import { LoginUser } from 'interfaces/User';
import { errorCallback } from 'api';

export const login = createAsyncThunk(
  'auth-login',
  async (values: LoginUser, { rejectWithValue }) =>
    userAPI
      .Login(values.email, values.password)
      .then((res) => ({ token: res.data.token, user: res.data.user }))
      .catch((err: any) => rejectWithValue(errorCallback(err)))
);

export const getMe = createAsyncThunk(
  'auth-getMe',
  async (_, { rejectWithValue }) =>
    userAPI
      .getMe()
      .then((res) => ({ token: res.data.token, user: res.data.user }))
      .catch((err: any) => rejectWithValue(errorCallback(err)))
);
