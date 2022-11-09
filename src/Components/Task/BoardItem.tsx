import React from 'react';

import { alpha, Divider, styled, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { Task } from 'Components/ProjectBoardView/BoardTabs/TaskTable';
import { getIcon } from 'Utils/GetIcon';

import optionsIcon from '@iconify/icons-eva/more-horizontal-fill';
import flagFill from '@iconify/icons-eva/flag-fill';
import messageSquareFill from '@iconify/icons-eva/message-square-fill';
import { shortDate } from 'Utils/Date';

interface IBoardItem {
  task: Task;
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
  cursor: 'pointer',

  '&:hover': {
    boxShadow: `${alpha('#919EAB', 0.16)} 0px 20px 40px -4px`,
    // boxShadow: `rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px`,
  },
}));

export const BoardItem = (props: IBoardItem) => {
  const { task } = props;
  const theme = useTheme();
  return (
    <RootStyle>
      <Typography variant='subtitle2'>{task.description}</Typography>
      <Divider sx={{ mt: 2 }} />
      <Box
        className='dispFlexAlgnCentr'
        sx={{ justifyContent: 'space-between' }}
      >
        <Box display='flex' gap={1}>
          {getIcon(flagFill, `${theme.palette.error.main}`)}
          <Typography variant='body2'>{task.deadline}</Typography>
        </Box>
        <Box display='flex' gap={1}>
          {getIcon(messageSquareFill, `${theme.palette.info.main}`)}
          <Typography variant='body2'>3</Typography>
        </Box>
      </Box>
    </RootStyle>
  );
};
