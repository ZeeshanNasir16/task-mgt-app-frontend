import { Link } from 'react-router-dom';
import { CircularProgressProps, styled, Button } from '@mui/material';

export const UserAvatarSize = {
  width: 25,
  height: 25,
};

export const RootStyle = styled(Link)(({ theme }) => ({
  padding: theme.spacing(4, 0),
  minWidth: 230,
  borderRadius: 10,
  color: 'inherit',

  //   boxShadow: `${alpha(theme.palette.grey[500], 0.2)} 0px 0px 2px 0px, ${alpha(
  //     theme.palette.grey[500],
  //     0.12
  //   )} 0px 12px 24px -4px`,
  //   boxShadow:
  //     'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
  boxShadow:
    'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
}));

export const CardInnerWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 3),
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'nowrap',
  justifyContent: 'space-between',
  gap: '1rem',
}));
export const ProgressText = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const NewProjRoot = styled(Button)(({ theme }) => ({
  padding: theme.spacing(4, 3),
  minWidth: 230,
  borderRadius: 10,
  color: 'inherit',
  boxShadow:
    'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
  height: '100%',
  display: 'flex',
  gap: '0.5rem',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));
