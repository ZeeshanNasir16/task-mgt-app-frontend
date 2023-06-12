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
import { useAppSelector } from 'store/hooks.store';
import { User } from 'interfaces/User';
import { updateTask, userSpecificTasks } from 'api/tasks.api';
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

const columns = ['todo', 'inProgress', 'review', 'completed'];

const includeColsNotFound = (arr: []) => {
  // console.log(arr.length);
  if (arr.length > 0) {
    let filtArr: any[] = [...Array(4)];
    let colsNotFound: string[] = [];
    let cols = arr.map((el: any) => el._id);

    columns.forEach((e: string) => !cols.includes(e) && colsNotFound.push(e));

    let newCols = colsNotFound.map((el: string) => ({ _id: el, items: [] }));
    [...arr, ...newCols].forEach(
      (el: any) => (filtArr[columns.indexOf(el._id)] = el)
    );
    return filtArr;
  } else {
    let a = columns.map((el: string) => ({ _id: el, items: [] }));
    return a;
  }
};

export const TaskBoard = (props: IProps) => {
  const { userId } = props;

  // userTasks.tasks.map((el: Task_DB) => el.status === 'todo' ? boardDetails['todo']);

  const [ready, setReady] = useState(false);
  const [boardDetals, setBoardDetails] = useState<any>([]);
  const [boardData, setBoardData] = useState(BoardData);
  const [selectedBoard, setSelectedBoard] = useState(0);

  useEffect(() => {
    // if (process.browser) {
    (async () => {
      const response: any = await userSpecificTasks(userId);
      const taskList = await response.data.tasks;

      setBoardDetails(includeColsNotFound(taskList));
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

    console.log(dragItem);
    console.log(re);

    // const statusCol = columns[+re.destination.droppableId];
    // console.log('Status', statusCol);
    // const response = await updateTask(dragItem.id, { status: statusCol });

    setBoardDetails(newBoardData);
  };

  return (
    <Page title='Task Board | Manager'>
      <WrapperHeader heading='Task Board' />
      <RootStyle>
        {ready && (
          <>
            <DragDropContext onDragEnd={onDragEnd}>
              {boardDetals.map(
                (board: any, bIndex: number) =>
                  board._id !== 'completed' && (
                    <div key={board._id}>
                      <Droppable droppableId={bIndex.toString()}>
                        {(provided, snapshot) => (
                          <Box
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            sx={{ height: '100%' }}
                          >
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
                                  board.items.map(
                                    (item: any, iIndex: number) => (
                                      <TaskBoardItem
                                        key={item.id}
                                        task={item}
                                        index={iIndex}
                                        nodrag={false}
                                      />
                                    )
                                  )}
                                {provided.placeholder}
                              </InnerBox>
                            </TaskBoardColumn>
                          </Box>
                        )}
                      </Droppable>
                    </div>
                  )
              )}
            </DragDropContext>
            <TaskBoardColumn
              sx={{
                backgroundColor: 'success.dark',
              }}
              headerTitle='Completed'
              boardBg='inherit'
            >
              {/* {console.log(boardDetals[3].items.length)} */}
              {boardDetals[3].items.length > 0 &&
                boardDetals[3].items.map((item: any, iIndex: number) => (
                  <TaskBoardItem
                    key={item.id}
                    task={item}
                    index={iIndex}
                    nodrag={true}
                  />
                ))}
            </TaskBoardColumn>
          </>
        )}
      </RootStyle>
    </Page>
  );
};
