import { Avatar, Box, styled, Typography } from '@mui/material';
import React from 'react';

export interface IActivity {
  id?: string;
  user: {
    name: string;
    image: string;
  };
  createdOn: string;
  headline: string;
  body: string;
}

const Wrapper = styled('div')((theme) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'start',
  '& > :not(:last-child)': {
    marginRight: '1rem',
  },

  '& h6': {},
}));

export const Activity = (props: IActivity) => {
  const { user, createdOn, headline, body } = props;

  return (
    <Wrapper>
      <Avatar alt={user.name} src={user.image} variant='rounded' />
      <Box>
        <Box
          display='flex'
          flexDirection='row'
          sx={{ gap: '1rem', justifyContent: 'space-between' }}
        >
          <Typography variant='subtitle2' sx={{ lineHeight: 1.4 }}>
            {headline}
          </Typography>
          <Typography
            variant='caption'
            color='text.secondary'
            sx={{ minWidth: 70 }}
            component='span'
          >
            {createdOn}
          </Typography>
        </Box>
        <Typography variant='body2' component='span' className='textLimit'>
          {body}
        </Typography>
      </Box>
    </Wrapper>
  );
};
