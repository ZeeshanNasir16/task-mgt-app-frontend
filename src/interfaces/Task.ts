import { Project_DB } from 'interfaces/Project';
import { User } from 'interfaces/User';

interface Task_Base {
  title: string;
  description: string;
  deadLine: Date;
  status: string;
  check: string;
}

export interface Task_DB extends Task_Base {
  _id: string;
  project: string;
  assignedBy: User;
  assignedTo: { user: User; date: Date };
  completionDate?: Date;
}

export interface Task_CL extends Task_Base {
  assignedTo?: {
    user: string | undefined;
    date: Date | undefined;
  };
  assignedBy: string;
  project: string;
}

export interface Upd_Task {
  title?: string;
  description?: string;
  deadLine?: Date;
  status?: string;
  check?: string;
  assignedTo?: {
    user?: string;
    date?: Date;
  };
  assignedBy?: string;
  completionDate?: Date;
}
