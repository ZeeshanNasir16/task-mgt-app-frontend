import React from 'react';
import { Typography } from '@mui/material';

interface ILogo {
  variant:
    | 'body1'
    | 'body2'
    | 'button'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'inherit'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2';
  align?: 'inherit' | 'center' | 'left' | 'right' | 'justify' | undefined;
}

export const Logo = (props: ILogo) => {
  return (
    <Typography
      variant={props.variant}
      sx={{ fontWeight: 800 }}
      color='primary'
      align={props.align}
      component='span'
    >
      Manage.
    </Typography>
  );
};
