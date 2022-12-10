import { User } from 'interfaces/User';

interface Project_Base {
  title: string;
  description: string;
  startDate: Date;
  deadlineDate: Date;
}

export interface Project_CL extends Project_Base {
  assignedTo: string | undefined;
  teamMembers?: User[];
}

export interface Project_DB extends Project_Base {
  _id: string;
  assignedTo: User;
}

export interface updateProj {
  id: string;
  body: Project_CL;
}
