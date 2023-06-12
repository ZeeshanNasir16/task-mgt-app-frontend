import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import { Typography } from '@mui/material';
import DrawerNavSection from 'Components/Drawer/DrawerNavSection';
import { MHidden } from 'Components/@material-extend';
import { NavLink } from 'react-router-dom';
import Scrollbar from 'Components/common/Scrollbar';
import { Logo } from 'Components/common/Logo';

import { useAppSelector } from 'store/hooks.store';

const DRAWER_WIDTH = 240;

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
  const { user } = useAppSelector((st) => st.auth);

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
          {!!user && (
            <Typography
              variant='subtitle2'
              sx={{ fontWeight: 500 }}
              color='text.primary'
            >
              {user.role}
            </Typography>
          )}
        </Box>
      </Box>
      <DrawerNavSection />
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
