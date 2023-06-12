import { Box, IconButton, styled, Typography } from '@mui/material';
// import { users } from 'data';
import { getIcon } from 'Utils/GetIcon';

import NotificationIcon from '@iconify/icons-ant-design/bell-outlined';
import AccountIcon from '@iconify/icons-ant-design/user-outlined';

export const NavItems = [
  {
    title: 'Notifications',
    path: '/',
    icon: getIcon(NotificationIcon),
  },
  {
    title: 'Account',
    path: '/',
    icon: getIcon(AccountIcon),
  },
];

const NavWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1.5rem',

  '& .greeting': {
    flexGrow: 1,
  },

  '& .navOptions': {},
}));

const NavBar: React.FC = () => {
  return (
    <>
      <NavWrapper>
        <Typography variant='h5' className='greeting'>
          Welcome back
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'nowrap' }}>
          {NavItems.map((el) => (
            <IconButton
              key={el.title}
              color='primary'
              aria-label='Notifications'
              sx={{ width: 40, height: 40 }}
            >
              {el.icon}
            </IconButton>
          ))}
        </Box>
      </NavWrapper>
    </>
  );
};

export default NavBar;
