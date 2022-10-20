import styled from '@emotion/styled';
import { Avatar, Typography } from '@mui/material';
import React from 'react';

const FLWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '0.5rem',
  flexWrap: 'nowrap',
}));

interface FLProps {
  name: string;
  src: string | undefined;
}

export const FileLayout = (props: FLProps) => {
  const { name, src } = props;
  return (
    <FLWrapper>
      <Avatar alt={name} src={src} variant='square' />
      <Typography variant='body1' mb={2}>
        {name}
      </Typography>
    </FLWrapper>
  );
};
