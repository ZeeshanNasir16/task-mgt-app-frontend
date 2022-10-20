import { styled, Theme } from '@mui/material';
import { DashBoardNavBar } from './DashboardNavBar';
import { DashboardSideBar } from './DashboardSideBar';
import React, { useState } from 'react';

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

export const Dashboard = () => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((st) => !st);
  };
  return (
    <RootStyle>
      <DashBoardNavBar onOpenSidebar={toggleOpen} open={open} />
      <DashboardSideBar isOpenSidebar={open} onCloseSidebar={toggleOpen} />
    </RootStyle>
  );
};
