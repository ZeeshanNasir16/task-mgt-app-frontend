import { alpha, Box, styled, Typography } from '@mui/material';
import Page from 'Components/common/Page';
import { Task } from 'Components/ProjectBoardView/BoardTabs/TaskTable';
import { BoardItem } from 'Components/Task/BoardItem';
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
            <BoardItem task={el} />
          ))}
        </TaskBoardColumn>
        <TaskBoardColumn
          sx={{
            backgroundColor: 'warning.dark',
          }}
          headerTitle='In Progress'
        >
          <BoardItem task={tasks[0]} />
          <BoardItem task={tasks[0]} />
          <BoardItem task={tasks[0]} />
        </TaskBoardColumn>
        <TaskBoardColumn
          sx={{
            backgroundColor: 'info.dark',
          }}
          headerTitle='Review'
        >
          <BoardItem task={tasks[0]} />
          <BoardItem task={tasks[0]} />
        </TaskBoardColumn>
        <TaskBoardColumn
          sx={{
            backgroundColor: 'success.dark',
          }}
          headerTitle='Completed'
        >
          <BoardItem task={tasks[0]} />
          <BoardItem task={tasks[0]} />
          <BoardItem task={tasks[0]} />
          <BoardItem task={tasks[0]} />
        </TaskBoardColumn>
      </RootStyle>
    </Page>
  );
};
