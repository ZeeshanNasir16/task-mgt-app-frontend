import { styled, Theme, CSSObject, useTheme } from '@mui/material/styles';
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
import { ProjManagerSideBar } from 'Components/Drawer/DrawerNavConfig';
import { MHidden } from 'Components/@material-extend';
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
  const renderContent = (
    <>
      {/* <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={RouterLink} to='/' sx={{ display: 'inline-flex' }}>
          <Logo />
        </Box>
      </Box> */}

      <DrawerNavSection navConfig={ProjManagerSideBar} />
      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack
          alignItems='center'
          spacing={3}
          sx={{
            p: 2.5,
            pt: 5,
            borderRadius: 2,
            position: 'relative',
            bgcolor: 'grey.200',
          }}
        >
          <Box
            component='img'
            src='/static/illustrations/illustration_avatar.png'
            sx={{ width: 100, position: 'absolute', top: -50 }}
          />

          <Box sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant='h6'>
              Get more?
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              From only $69
            </Typography>
          </Box>

          <Button
            fullWidth
            href='https://material-ui.com/store/items/minimal-dashboard/'
            target='_blank'
            variant='contained'
          >
            Upgrade to Pro
          </Button>
        </Stack>
      </Box>
      {/* <List>
        {ProjManagerSideBar.map((el, index) => (
          <ListItem key={el.title} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: isOpenSidebar ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isOpenSidebar ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                {el.icon}
              </ListItemIcon>
              <ListItemText
                primary={el.title}
                sx={{ opacity: isOpenSidebar ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </>
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
          {console.log('first')}
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
              bgcolor: 'background.default',
            },
          }}
        >
          {console.log('second')}

          {renderContent}
        </MuiDrawer>
      </MHidden>
    </RootStyle>
  );
};
