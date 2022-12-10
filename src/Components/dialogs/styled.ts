import { DialogActions, styled } from '@mui/material';

export const DialogActionsExt = styled(DialogActions)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: '16px 24px',
}));
