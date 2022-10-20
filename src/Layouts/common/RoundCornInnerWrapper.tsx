import { Box, styled } from '@mui/material';

export const RndCrndInnerWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: '1.5rem',
  borderRadius: 10,
  boxSizing: 'border-box',
  border: `1px solid ${theme.palette.divider}`,
  boxShadow:
    'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px',
}));
