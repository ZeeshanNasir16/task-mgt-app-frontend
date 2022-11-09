import { Avatar, Box, Typography, IconButton, styled } from '@mui/material';
import React from 'react';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import { getIcon } from 'Utils/GetIcon';

const FLWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '0.5rem',
  flexWrap: 'nowrap',
  border: `1px solid ${theme.palette.divider}`,
  justifyContent: 'space-between',
  padding: '1rem',
  borderRadius: 10,

  '& > :not(:last-child)': {
    marginRight: '0.5rem',
  },

  '& > div:first-child': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
}));

interface FLProps {
  name: string;
  src: string | undefined;
}

export const FileLayout = (props: FLProps) => {
  const { name, src } = props;
  return (
    <>
      <FLWrapper>
        <Box>
          <Avatar
            alt={name}
            src={src}
            variant='square'
            sx={{ width: 28, height: 28 }}
          />
          <Box display='flex' flexDirection='column'>
            <Typography variant='subtitle2'>{name}</Typography>
            <Typography variant='caption' color='text.secondary'>
              48MB - 18 Oct 2022
            </Typography>
          </Box>
        </Box>
        <IconButton>{getIcon(moreVerticalFill)}</IconButton>
      </FLWrapper>
    </>
  );
};
