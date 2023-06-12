import { Container, styled, Theme } from '@mui/material';
import { DashBoardNavBar } from './DashboardNavBar';
import { DashboardSideBar } from './DashboardSideBar';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Page from 'Components/common/Page';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((st) => !st);
  };

  return (
    <RootStyle>
      <DashBoardNavBar onOpenSidebar={toggleOpen} open={open} />
      <DashboardSideBar isOpenSidebar={open} onCloseSidebar={toggleOpen} />
      <MainStyle>
        <Container maxWidth='xl' sx={{ height: '100%' }}>
          <Outlet />
        </Container>
      </MainStyle>
    </RootStyle>
  );
};
