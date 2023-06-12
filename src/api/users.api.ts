import { AddUser, UserBase } from 'interfaces/User';
import { API, getSECURE_API } from 'api';

const SECURE_API = getSECURE_API();

export const Login = (email: string, password: string) =>
  API.post('/auth/login', { email, password });

export const getMe = () => SECURE_API.get('/users/me');

export const addNewUser = (user: AddUser) =>
  SECURE_API.post('/users', { ...user });

export const getUsers = () => SECURE_API.get('/users');

export const updateUser = (id: string, body: UserBase) =>
  SECURE_API.patch(`/users/${id}`, { ...body });

export const deleteUser = (id: string) => SECURE_API.delete(`/users/${id}`);
