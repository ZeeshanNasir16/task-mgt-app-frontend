import { Project_CL, Project_DB } from 'interfaces/Project';
import { User } from 'interfaces/User';
import { API, getSECURE_API } from 'api';

const SECURE_API = getSECURE_API();

export const createNewProj = (values: Project_CL) =>
  SECURE_API.post('/projects', { ...values });

export const getAllProjs = () => SECURE_API.get('/projects');

export const getProj = (id: string) => SECURE_API.get(`/projects/${id}`);

export const updateProj = (id: string, body: Project_CL) =>
  SECURE_API.patch(`/projects/${id}`, { ...body });

export const delProj = (id: string) => SECURE_API.delete(`/projects/${id}`);
