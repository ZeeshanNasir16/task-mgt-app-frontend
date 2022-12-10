import { alpha, Box, styled, Typography } from '@mui/material';
import Page from 'Components/common/Page';
// import { Task } from 'Components/Task/TaskTable';
import { TaskBoardItem } from 'Components/Task/TaskBoardItem';
import TaskBoardColumn from 'Components/Task/TaskBoardColumn';
import { tasks } from 'data';
import { WrapperHeader } from 'Layouts/common/WrapperHeader';
import React, { useState, useEffect } from 'react';
import { Task_DB } from 'interfaces/Task';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import BoardData from 'data/boardData.json';
import { useAppSelector } from 'store/hooks';
import { User } from 'interfaces/User';
import { userSpecificTasks } from 'api/tasks';
import Scrollbar from 'Components/common/Scrollbar';

// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

function createGuidId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
const getBoardHeaderColor = [
  'text.secondary',
  'warning.dark',
  'info.dark',
  'success.dark',
];

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'nowrap',
  overflow: 'auto hidden',
  padding: '1rem 0.5rem',
  gap: '1.25rem',
  '& > *': {
    flex: 1,
  },
}));

const InnerBox = styled(Box)(({ theme }) => ({
  overflowX: 'hidden',
  maxHeight: 'calc(100vh - 230px)',
  overflowY: 'auto',
  height: 'auto',

  '& > div:not(:last-of-type)': {
    marginBottom: '1rem',
  },
}));

interface IProps {
  userId: string;
}

export const TaskBoard = (props: IProps) => {
  const { userId } = props;

  let boardDetails = [
    {
      name: 'Todo',
      items: [],
    },
    {
      name: 'In Progress',
      items: [],
    },
    {
      name: 'Review',
      items: [],
    },
    {
      name: 'Completed',
      items: [],
    },
  ];

  // userTasks.tasks.map((el: Task_DB) => el.status === 'todo' ? boardDetails['todo']);

  const [ready, setReady] = useState(false);
  const [boardDetals, setBoardDetails] = useState<any>([]);
  const [boardData, setBoardData] = useState(BoardData);
  const [selectedBoard, setSelectedBoard] = useState(0);

  useEffect(() => {
    // if (process.browser) {
    (async () => {
      const response = await userSpecificTasks(userId);
      const taskList = await response.data.tasks;
      console.log('Tasks', taskList);
      setBoardDetails(taskList);
      setReady(true);
    })();
  }, [userId]);

  const onDragEnd = async (re: any) => {
    if (!re.destination) return;
    let newBoardData = boardDetals;
    var dragItem =
      newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
    newBoardData[parseInt(re.source.droppableId)].items.splice(
      re.source.index,
      1
    );
    newBoardData[parseInt(re.destination.droppableId)].items.splice(
      re.destination.index,
      0,
      dragItem
    );

    setBoardData(newBoardData);
  };
  // const onDragEnd = (re: any) => {
  //   if (!re.destination) return;
  //   let newBoardData = boardData;
  //   var dragItem =
  //     newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
  //   newBoardData[parseInt(re.source.droppableId)].items.splice(
  //     re.source.index,
  //     1
  //   );
  //   newBoardData[parseInt(re.destination.droppableId)].items.splice(
  //     re.destination.index,
  //     0,
  //     dragItem
  //   );
  //   setBoardData(newBoardData);
  // };

  return (
    <Page title='Task Board | Manager'>
      <WrapperHeader heading='Task Board' />
      <RootStyle>
        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
            {/* <RootStyle> */}
            {boardDetals.map((board: any, bIndex: number) => {
              return (
                <div key={board._id}>
                  <Droppable droppableId={bIndex.toString()}>
                    {(provided, snapshot) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <TaskBoardColumn
                          sx={{
                            backgroundColor: getBoardHeaderColor[bIndex],
                          }}
                          boardBg={
                            snapshot.isDraggingOver
                              ? 'secondary.main'
                              : 'inherit'
                          }
                          headerTitle={board._id}
                        >
                          <InnerBox>
                            {board.items.length > 0 &&
                              board.items.map((item: any, iIndex: number) => {
                                return (
                                  <TaskBoardItem
                                    key={item.id}
                                    task={item}
                                    index={iIndex}
                                    nodrag={false}
                                  />
                                );
                              })}
                            {provided.placeholder}
                          </InnerBox>
                        </TaskBoardColumn>
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
            {/* </RootStyle> */}
          </DragDropContext>
        )}

        <TaskBoardColumn
          sx={{
            backgroundColor: 'success.dark',
          }}
          headerTitle='Completed'
          boardBg={'inherit'}
        >
          <TaskBoardItem task={tasks[0]} nodrag={true} />
        </TaskBoardColumn>
      </RootStyle>
    </Page>
  );
};
