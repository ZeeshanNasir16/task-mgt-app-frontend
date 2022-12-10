import { Box } from '@mui/system';
import React from 'react';

const Loading = () => {
  return (
    <Box
      component='span'
      width='100vw'
      height='100vh'
      position='absolute'
      top='50%'
      margin='0 auto'
      left={0}
      right={0}
      fontSize='3rem'
      sx={{ textAlign: 'center' }}
    >
      Manage.
    </Box>
  );
};

export default Loading;
