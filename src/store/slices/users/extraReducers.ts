import { errorCallback } from 'api';
import { UpdateUser, AddUser } from 'interfaces/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as userAPI from 'api/users';

export const addUser = createAsyncThunk(
  'add-user',
  async (values: AddUser, { rejectWithValue }) =>
    userAPI
      .addNewUser({ ...values })
      .then((res) => ({
        user: res.data.user,
      }))
      .catch((err: any) => rejectWithValue(errorCallback(err)))
);

export const fetchUsers = createAsyncThunk(
  'get-users',
  async (_, { rejectWithValue }) =>
    userAPI
      .getUsers()
      .then((res) => ({
        users: res.data.users,
      }))
      .catch((err: any) => rejectWithValue(errorCallback(err)))
);

export const updatUser = createAsyncThunk(
  'user-update',
  async (values: UpdateUser, { rejectWithValue }) =>
    userAPI
      .updateUser(values.id, values.body)
      .then((res) => ({ user: res.data.user }))
      .catch((err: any) => rejectWithValue(errorCallback(err)))
);

export const delUser = createAsyncThunk(
  'user-del',
  async (id: string, { rejectWithValue }) =>
    userAPI
      .deleteUser(id)
      .then((res) => ({
        user: res.data.user,
      }))
      .catch((err: any) => rejectWithValue(errorCallback(err)))
);
