import { alpha, Box, styled, Typography } from '@mui/material';
import Page from 'Components/common/Page';
import { Task } from 'Components/Task/TaskTable';
import { TaskBoardItem } from 'Components/Task/TaskBoardItem';
import TaskBoardColumn from 'Components/Task/TaskBoardColumn';
import { tasks } from 'data';
import { WrapperHeader } from 'Layouts/common/WrapperHeader';
import React from 'react';

// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

type Props = {};

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'nowrap',
  overflow: 'auto hidden',
  padding: '1rem 0.5rem',

  '& > div:not(last-child)': {
    marginRight: '1rem',
  },
}));

export const TaskBoard = (props: Props) => {
  return (
    <Page title='Task Board | Manager'>
      <WrapperHeader heading='Task Board' />
      <RootStyle>
        <TaskBoardColumn
          sx={{
            backgroundColor: 'text.secondary',
          }}
          headerTitle='To Do'
        >
          {tasks.map((el: Task) => (
            <TaskBoardItem task={el} />
          ))}
        </TaskBoardColumn>
        <TaskBoardColumn
          sx={{
            backgroundColor: 'warning.dark',
          }}
          headerTitle='In Progress'
        >
          <TaskBoardItem task={tasks[0]} />
          <TaskBoardItem task={tasks[0]} />
          <TaskBoardItem task={tasks[0]} />
        </TaskBoardColumn>
        <TaskBoardColumn
          sx={{
            backgroundColor: 'info.dark',
          }}
          headerTitle='Review'
        >
          <TaskBoardItem task={tasks[0]} />
          <TaskBoardItem task={tasks[0]} />
        </TaskBoardColumn>
        <TaskBoardColumn
          sx={{
            backgroundColor: 'success.dark',
          }}
          headerTitle='Completed'
        >
          <TaskBoardItem task={tasks[0]} />
          <TaskBoardItem task={tasks[0]} />
          <TaskBoardItem task={tasks[0]} />
          <TaskBoardItem task={tasks[0]} />
        </TaskBoardColumn>
      </RootStyle>
    </Page>
  );
};
