import { styled } from '@mui/material';

export const RndCrndWrapper: React.FunctionComponent = styled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.primary.contrastText,
    padding: '2rem',
    borderRadius: 13,
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
    position: 'relative',
    height: 'inherit',
  })
);
