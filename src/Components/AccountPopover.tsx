import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import { NavLink as RouterLink } from 'react-router-dom';
import {
  alpha,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material';
import MenuPopover from 'Layouts/common/MenuPopover';
import { useAppDispatch, useAppSelector } from 'store/hooks.store';
import { logout } from 'store/slices/auth';
// material
// import { alpha } from '@material-ui/core/styles';
// import {
//   Button,
//   Box,
//   Divider,
//   MenuItem,
//   Typography,
//   Avatar,
//   IconButton,
// } from '@material-ui/core';
// components
// import MenuPopover from '../../components/MenuPopover';
//
// import account from '../../_mocks_/account';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const { user } = useAppSelector((st) => st.auth);
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        {user?.role === 'admin' ? (
          <Avatar
            src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=Admin`}
            alt=' photoURL'
            sizes='small'
          />
        ) : (
          <Avatar
            src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${user?.fullName
              .split(' ')
              .join('%20')}`}
            alt=' photoURL'
            sizes='small'
          />
        )}
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEL={anchorRef.current}
        sx={{ width: 'fit-content' }}
      >
        {user?.role !== 'admin' ? (
          <>
            <Box sx={{ my: 1.5, px: 2.5 }}>
              <Typography variant='subtitle1' noWrap>
                {user?.fullName}
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: 'text.secondary' }}
                noWrap
              >
                {user?.email}
              </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            <MenuItem
              to='/myprofile'
              component={RouterLink}
              onClick={handleClose}
              sx={{ typography: 'body2', py: 1, px: 2.5 }}
            >
              <Box
                component={Icon}
                icon={personFill}
                sx={{
                  mr: 2,
                  width: 24,
                  height: 24,
                }}
              />
              Profile
            </MenuItem>
          </>
        ) : (
          <>
            <Box sx={{ my: 1, px: 2.5, textAlign: 'center' }}>
              <Typography variant='subtitle1' noWrap>
                Admin
              </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />
          </>
        )}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color='primary'
            variant='contained'
            onClick={handleLogout}
            size='small'
          >
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
