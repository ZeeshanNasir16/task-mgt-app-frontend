import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  Container,
  Link,
  Paper,
  Stack,
  styled,
  Typography,
} from '@mui/material';

import { MHidden } from 'Components/@material-extend';
import AuthLayout from 'Components/AuthLayout';
import Page from 'Components/common/Page';
import LoginForm from 'Components/authentication/LoginForm';
import { Logo } from 'Components/common/Logo';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    backgroundColor: 'transparent',
  },
}));

const SectionStyle = styled('div')(({ theme }) => ({
  width: '100%',
  // maxWidth: 464,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(4, 0),
  position: 'relative',
  flexGrow: 1,
}));

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: '-1',
  width: '100%',
  height: '100%',
  position: 'absolute',
  transform: 'scaleX(-1)',
  background:
    'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)) center center / cover no-repeat, url("/assets/overlay.jpg")',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(12, 5),
  },
}));

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <RootStyle title='Login | Minimal-UI'>
      {/* <AuthLayout>
        Don’t have an account? &nbsp;
        <Link
          underline='none'
          variant='subtitle2'
          component={RouterLink}
          to='/register'
        >
          Get started
        </Link>
      </AuthLayout> */}

      <MHidden type='down' value='md'>
        <SectionStyle>
          <Box
            display='flex'
            flexDirection='column'
            mb={2}
            sx={{ px: 5, mb: 5 }}
          >
            <Logo variant='h3' />
            <Typography variant='body1' component='span' sx={{ mt: 3 }}>
              Manage your tasks effectively using <strong>Manage.</strong>
            </Typography>
          </Box>
          {/* <Typography variant='h3' sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography> */}
          <Box sx={{ maxWidth: 450 }}>
            <img src='/Assets/login_Illustration.png' alt='login' />
          </Box>
          <OverlayStyle />
        </SectionStyle>
      </MHidden>

      <Container maxWidth='sm' sx={{ backgroundColor: '#fff' }}>
        <ContentStyle>
          <MHidden type='up' value='md'>
            <Box mb={2}>
              <Logo variant='h3' align='center' />
            </Box>
          </MHidden>
          <Stack sx={{ mb: 5 }}>
            <Typography variant='h5'>SignIn to get started</Typography>
          </Stack>
          {/* <AuthSocial /> */}

          <LoginForm />

          {/* <MHidden type='up' value='sm'>
            <Typography variant='body2' component='span' align='center' sx={{ mt: 3 }}>
              Don’t have an account?&nbsp;
              <Link variant='subtitle2' component={RouterLink} to='register'>
                Get started
              </Link>
            </Typography>
          </MHidden> */}
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
