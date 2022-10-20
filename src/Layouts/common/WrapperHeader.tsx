import { Box, styled, Typography } from '@mui/material';
import React from 'react';

const Heading = styled(Typography)((theme) => ({
  textDecoration: 'underline',
  textUnderlinePosition: 'under',
}));

interface IWrapperHeadingProps {
  heading: string;
}

export const WrapperHeader = (props: IWrapperHeadingProps) => {
  return (
    <Box sx={{ pb: 3, px: 1 }}>
      <Heading variant='h5'>{props.heading}</Heading>
    </Box>
  );
};
