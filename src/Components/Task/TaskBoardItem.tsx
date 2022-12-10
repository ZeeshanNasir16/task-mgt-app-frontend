import React from 'react';

import { alpha, Divider, styled, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { getIcon } from 'Utils/GetIcon';

import optionsIcon from '@iconify/icons-eva/more-horizontal-fill';
import flagFill from '@iconify/icons-eva/flag-fill';
import messageSquareFill from '@iconify/icons-eva/message-square-fill';
import { dateFormat, shortDate } from 'Utils/Date';
import { Task_DB } from 'interfaces/Task';

import { Draggable } from 'react-beautiful-dnd';

interface IBoardItem {
  task: any;
  index?: any;
  key?: any;
  nodrag: boolean;
}

const RootStyle = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 6,
  padding: '1rem',
  position: 'relative',
  boxShadow: `${alpha('#919EAB', 0.16)} 0px 1px 2px 0px`,
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  '&:hover': {
    boxShadow: `${alpha('#919EAB', 0.16)} 0px 20px 40px -4px`,
    // boxShadow: `rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px`,
  },
}));

export const TaskBoardItem = (props: IBoardItem) => {
  const { task, index, nodrag } = props;
  const theme = useTheme();
  return (
    <>
      {!nodrag ? (
        <Draggable index={index} draggableId={`${task.id}`}>
          {(provided) => (
            <RootStyle
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className='cursorPointer'
            >
              <Typography variant='subtitle2'>{task.title}</Typography>
              <Typography variant='body2'>{task.description}</Typography>
              <Divider sx={{ mt: 2 }} />
              <Box
                className='dispFlexAlgnCentr'
                sx={{ justifyContent: 'space-between' }}
              >
                <Box display='flex' gap={1}>
                  {getIcon(flagFill, `${theme.palette.error.main}`)}
                  <Typography variant='body2' component='span'>
                    {dateFormat(task.deadLine, 'MM-dd-yyyy')}
                  </Typography>
                </Box>
                {/* <Box display='flex' gap={1}>
              {getIcon(messageSquareFill, `${theme.palette.info.main}`)}
              <Typography variant='body2' component='span'>
                3
              </Typography>
            </Box> */}
              </Box>
            </RootStyle>
          )}
        </Draggable>
      ) : (
        <RootStyle className='cursorPointer'>
          <Typography variant='subtitle2'>{task.title}</Typography>
          <Typography variant='body2'>{task.description}</Typography>
          <Divider sx={{ mt: 2 }} />
          <Box
            className='dispFlexAlgnCentr'
            sx={{ justifyContent: 'space-between' }}
          >
            <Box display='flex' gap={1}>
              {getIcon(flagFill, `${theme.palette.error.main}`)}
              <Typography variant='body2' component='span'>
                {dateFormat(task.deadLine, 'MM-dd-yyyy')}
              </Typography>
            </Box>
            <Box display='flex' gap={1}>
              {getIcon(messageSquareFill, `${theme.palette.info.main}`)}
              <Typography variant='body2' component='span'>
                3
              </Typography>
            </Box>
          </Box>
        </RootStyle>
      )}
    </>
  );
};
