import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
// material
// import { alpha, styled } from '@material-ui/core/styles';
// import { Box, Stack, AppBar, Toolbar, IconButton } from '@material-ui/core';
// components
// import { MHidden } from Ccomponents/@material-extend';
//
import { MHidden } from 'Components/@material-extend';
// import Searchbar from './Searchbar';
// import AccountPopover from './AccountPopover';
// import LanguagePopover from './LanguagePopover';
// import NotificationsPopover from './NotificationsPopover';
import {
  alpha,
  Box,
  styled,
  Toolbar,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';

import MuiAppBar from '@mui/material/AppBar';
import NotificationsPopover from 'Layouts/Dashboard/NotificationPopover';
import { Logo } from 'Components/common/Logo';

const DRAWER_WIDTH = 240;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 75;

const RootStyle = styled(MuiAppBar)(({ theme }) => ({
  boxShadow: 'none',
  // backdropFilter: 'blur(6px)',
  // WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  // backgroundColor: alpha(theme.palette.background.default, 0.72),
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

interface DashboardProps {
  onOpenSidebar: (ev: any) => void;
  open: boolean;
}

export const DashBoardNavBar = (props: DashboardProps) => {
  const { onOpenSidebar } = props;

  return (
    <RootStyle>
      <ToolbarStyle>
        <MHidden type='up' value='lg'>
          <React.Fragment>
            <IconButton
              onClick={onOpenSidebar}
              sx={{ mr: 1, color: 'text.primary' }}
            >
              <Icon icon={menu2Fill} />
            </IconButton>
            <Logo variant='h4' />
          </React.Fragment>
        </MHidden>
        <MHidden type='down' value='lg'>
          <Typography variant='h5' color='text.secondary'>
            Welcome
          </Typography>
        </MHidden>
        {/* <Searchbar /> */}
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction='row'
          alignItems='center'
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          {/* <LanguagePopover /> */}
          <NotificationsPopover />
          {/* <AccountPopover /> */}
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
};
