import React, { useState } from 'react';
import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
} from 'react-router-dom';
import {
  alpha,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import { NavItem } from 'Components/Drawer/DrawerNavConfig';
import { useAppSelector } from 'store/hooks.store';
import {
  AdminSideBar,
  ProjManagerSideBar,
  UserSidebar,
} from 'Components/Drawer/DrawerNavConfig';

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

interface SingleItemProps {
  item: NavItem;
  active: (val: string) => boolean;
}

function DrawerItem({ item, active }: SingleItemProps) {
  const theme = useTheme();
  const { title, path, icon } = item;
  const isActiveRoot = active(path);
  // const { title, path, icon, info, children } = item;
  const [open, setOpen] = useState(isActiveRoot);
  // const [open, setOpen] = useState(true);

  // const handleOpen = () => {
  //   setOpen((prev) => !prev);
  // };

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
    '&:before': {
      top: 0,
      right: 0,
      width: 3,
      bottom: 0,
      content: "''",
      display: 'block',
      position: 'absolute',
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      backgroundColor: theme.palette.primary.main,
    },
    '& .MuiListItemIcon-root': {
      color: 'primary.main',
    },
  };

  return (
    <>
      <ListItemButton
        component={RouterLink}
        to={path}
        sx={{
          ...(isActiveRoot && activeRootStyle),
        }}
      >
        <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
        <ListItemText disableTypography primary={title} />
      </ListItemButton>
    </>
  );
}

const getSidrBarList = (role: string) => {
  return role === 'admin'
    ? AdminSideBar
    : role === 'manager'
    ? ProjManagerSideBar
    : UserSidebar;
};

export default function NavSection() {
  const { pathname } = useLocation();
  const { user } = useAppSelector((st) => st.auth);
  const match = (path: string) =>
    path ? !!matchPath({ path, end: false }, pathname) : false;

  return (
    <Box sx={{ mt: 1 }}>
      <List disablePadding>
        {!!user &&
          getSidrBarList(user.role).map((item) => (
            <React.Fragment key={item.title}>
              <DrawerItem item={item} active={match} />
            </React.Fragment>
          ))}
      </List>
    </Box>
  );
}
