import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
} from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
import {
  alpha,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Theme,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import { NavItem } from 'Components/Drawer/DrawerNavConfig';

// material
// import { alpha, useTheme, styled } from '@material-ui/core/styles';
// import {
//   Box,
//   List,
//   Collapse,
//   ListItemText,
//   ListItemIcon,
//   ListItemButton,
// } from '@material-ui/core';

// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => (
  <ListItemButton disableGutters {...props} />
))((theme: Theme) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  '&:before': {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: 'none',
    position: 'absolute',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: theme.palette.primary.main,
  },
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// ----------------------------------------------------------------------

// NavItem.propTypes = {
//   item: PropTypes.object,
//   active: PropTypes.func,
// };

interface SingleItemProps {
  item: NavItem;
  active: boolean;
}

function DrawerItem({ item, active }: SingleItemProps) {
  // const theme = useTheme();
  // const isActiveRoot = active(item.path);
  // const { title, path, icon, info, children } = item;
  const { title, path, icon } = item;
  // const [open, setOpen] = useState(isActiveRoot);
  // const [open, setOpen] = useState(true);

  // const handleOpen = () => {
  //   setOpen((prev) => !prev);
  // };

  // const activeRootStyle = {
  //   color: 'primary.main',
  //   fontWeight: 'fontWeightMedium',
  //   bgcolor: alpha(
  //     theme.palette.primary.main,
  //     theme.palette.action.selectedOpacity
  //   ),
  //   '&:before': { display: 'block' },
  // };

  // const activeSubStyle = {
  //   color: 'text.primary',
  //   fontWeight: 'fontWeightMedium',
  // };

  return (
    <ListItemButton
    // component={RouterLink}
    // to={path}
    // sx={{
    //   ...(isActiveRoot && activeRootStyle),
    // }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
      {/* {info && info} */}
    </ListItemButton>
  );
}

interface NavSectionProps {
  navConfig: NavItem[];
}

export default function NavSection({ navConfig }: NavSectionProps) {
  //   const { pathname } = useLocation();
  //   const match = (path) =>
  //     path ? !!matchPath({ path, end: false }, pathname) : false;

  return (
    <Box
    //  {...other}
    >
      <List disablePadding>
        {navConfig.map((item) => (
          <React.Fragment key={item.title}>
            <DrawerItem item={item} active={true} />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}
