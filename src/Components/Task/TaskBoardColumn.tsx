import { alpha, Box, styled, SxProps, Theme, Typography } from '@mui/material';
import React from 'react';

const BoardColmn = styled(Box)(({ theme }) => ({
  display: 'flex',
  // justifyContent: 'center',
  flexDirection: 'column',
  padding: '0.75rem',
  borderRadius: 6,
  gap: '1rem',
  border: `1px dashed ${alpha('#637381', 0.24)}`,
  minWidth: 220,
  maxWidth: 280,
  height: '100%',
}));

const BoardColHeader = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  borderRadius: 'inherit',
  padding: '0.5rem 1rem',
  '& > h6': {
    marginBottom: '0 !important',
  },
}));

interface ITaskBoardColumn {
  sx?: SxProps<Theme> | undefined;
  children: React.ReactElement | React.ReactElement[];
  headerTitle: string;
  boardBg: string;
}

export const TaskBoardColumn = (props: ITaskBoardColumn) => {
  const { children, sx, headerTitle, boardBg } = props;
  return (
    <BoardColmn sx={{ backgroundColor: boardBg }}>
      <BoardColHeader
        className='dispFlexAlgnCentr'
        sx={{
          ...sx,
        }}
      >
        <Typography variant='subtitle2' sx={{ mb: 2 }}>
          {headerTitle}
        </Typography>
      </BoardColHeader>
      {children}
    </BoardColmn>
  );
};

export default TaskBoardColumn;
