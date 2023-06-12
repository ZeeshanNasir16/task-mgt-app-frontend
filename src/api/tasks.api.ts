import { Task_CL, Upd_Task } from 'interfaces/Task';
import { API, getSECURE_API } from 'api';

const SECURE_API = getSECURE_API();

export const createNewTask = (values: Task_CL) =>
  SECURE_API.post('/tasks', { ...values });

export const getAllTasks = () => SECURE_API.get('/tasks');

export const getTask = (id: string) => SECURE_API.get(`/tasks/${id}`);

export const updateTask = (id: string, body: Upd_Task) =>
  SECURE_API.patch(`/tasks/${id}`, { ...body });

export const deleteTask = (id: string) => SECURE_API.delete(`/tasks/${id}`);
export const userSpecificTasks = (id: string) =>
  SECURE_API.get(`/tasks/random/${id}`);
