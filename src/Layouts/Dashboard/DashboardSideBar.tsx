import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
// import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import { Icon } from '@iconify/react';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import MenuIcon from '@iconify/icons-eva/menu-2-fill';

// import ChevronLeftIcon from '@iconify/icons-eva/chevron-left-fill';
import { Button, Stack, Typography } from '@mui/material';
import DrawerNavSection from 'Components/Drawer/DrawerNavSection';
import {
  AdminSideBar,
  ProjManagerSideBar,
  UserSidebar,
} from 'Components/Drawer/DrawerNavConfig';
import { MHidden } from 'Components/@material-extend';
import { NavLink } from 'react-router-dom';
import Scrollbar from 'Components/common/Scrollbar';
import { Logo } from 'Components/common/Logo';

import { users } from 'data';

const DRAWER_WIDTH = 240;

// const openedMixin = (theme: Theme): CSSObject => ({
//   width: DRAWER_WIDTH,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: 'hidden',
// });

// const closedMixin = (theme: Theme): CSSObject => ({
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: 'hidden',
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up('sm')]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// const Drawer1 = styled(MuiDrawer)(({ theme, open }) => ({
//   width: DRAWER_WIDTH,
//   flexShrink: 0,
//   whiteSpace: 'nowrap',
//   boxSizing: 'border-box',
//   [theme.breakpoints.down('md')]: {
//     ...(open && {
//       ...openedMixin(theme),
//       '& .MuiDrawer-paper': openedMixin(theme),
//     }),
//     ...(!open && {
//       ...closedMixin(theme),
//       '& .MuiDrawer-paper': closedMixin(theme),
//     }),
//   },
// }));

interface SideDrawerProps {
  isOpenSidebar: boolean;
  onCloseSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

export const DashboardSideBar = ({
  isOpenSidebar,
  onCloseSidebar,
}: SideDrawerProps) => {
  const user = users['admin'];

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 2.5 }}>
        <Box
          component={(props) => <NavLink {...props} to='/' sx={{ flex: 1 }} />}
          sx={{
            textDecoration: 'none',
          }}
        >
          <Logo variant='h4' />
          <Typography
            variant='subtitle2'
            sx={{ fontWeight: 500 }}
            color='text.primary'
          >
            {user.role === 'admin'
              ? 'Administrator'
              : user.role === 'manager'
              ? 'Project Manager'
              : 'User'}
          </Typography>
        </Box>
      </Box>

      <DrawerNavSection
        navConfig={
          user.role === 'admin'
            ? AdminSideBar
            : user.role === 'manager'
            ? ProjManagerSideBar
            : UserSidebar
        }
      />
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      <CssBaseline />
      <MHidden type='up' value={'lg'}>
        <MuiDrawer
          variant='temporary'
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH, zIndex: 1201 },
          }}
        >
          {renderContent}
        </MuiDrawer>
      </MHidden>

      <MHidden type='down' value={'lg'}>
        <MuiDrawer
          open
          variant='persistent'
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.paper',
            },
          }}
        >
          {renderContent}
        </MuiDrawer>
      </MHidden>
    </RootStyle>
  );
};
