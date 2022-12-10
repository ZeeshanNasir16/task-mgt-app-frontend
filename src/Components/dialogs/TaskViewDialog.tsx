// import { Task } from 'Components/Task/TaskTable';
import { Task_DB } from 'interfaces/Task';
import React from 'react';

interface ITaskViewDialog {
  task: Task_DB;
  open: boolean;
}

const TaskViewDialog = (props: ITaskViewDialog) => {
  return <div>TaskViewDialog</div>;
};

export default TaskViewDialog;
