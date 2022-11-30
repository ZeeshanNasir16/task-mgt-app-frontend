import * as React from 'react';
import TextField from '@mui/material/TextField';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import {
  MenuItem,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Select,
  Typography,
  FormControl,
  styled,
  alpha,
  Box,
  Avatar,
  AvatarGroup,
  useTheme,
} from '@mui/material';
import { Icon } from '@iconify/react';
import DialogRoot, { IDialogReus } from 'Components/dialogs/DialogRoot';
import { dateFormat } from 'Utils/Date';
import { teamMembers } from 'data';

import plusCircleFilled from '@iconify/icons-ant-design/plus-circle-filled';

const UserAvatarSize = {
  width: 25,
  height: 25,
};

const UploadFileRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  border: `1px dashed ${alpha('#919EAB', 0.52)}`,
  borderRadius: 10,
}));

const UploadFileInner = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: '30px 8px',

  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
  },

  '& .imgBox': {
    width: 130,
  },
  '& .content': {
    [theme.breakpoints.up('sm')]: {
      marginLeft: '1em',
    },
  },
}));

export default function AddProject(props: IDialogReus) {
  const { open, toggleDialog } = props;
  const [showPassword, setShowPassword] = React.useState(false);

  const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
    passwordConfirm: Yup.string().required('Password Confirm is required'),
    contact: Yup.string().required('Contact is required'),
    address: Yup.string().required('Address is required'),
  });

  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      contact: '',
      address: '',
      remember: true,
    },
    validationSchema: schema,
    onSubmit: () => {
      // navigate('/', { replace: true });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <DialogRoot
      open={open}
      toggleDialog={toggleDialog}
      form='formAddProj'
      dialogTitle='New Project'
    >
      <FormikProvider value={formik}>
        <Form
          id='formAddProj'
          autoComplete='off'
          noValidate
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                {...getFieldProps('name')}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
                size='small'
                variant='outlined'
                label='Project Name'
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label='Project Description'
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                size='small'
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name='start-date'
                label=' Start Date'
                variant='outlined'
                type='date'
                value={dateFormat(new Date(), 'yyyy-MM-dd')}
                onChange={(e) =>
                  console.log(e.target.value, typeof e.target.value)
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name='end-date'
                label=' End Date'
                variant='outlined'
                type='date'
                value={dateFormat(new Date(), 'yyyy-MM-dd')}
                onChange={(e) =>
                  console.log(e.target.value, typeof e.target.value)
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <UploadFileRoot>
                <UploadFileInner>
                  <div className='imgBox'>
                    <img
                      src='/Assets/fileUpload.svg'
                      alt='Upload File'
                      width='100%'
                      height='100%'
                    />
                  </div>
                  <div className='content'>
                    <Typography variant='subtitle1'>
                      Drop or Select file
                    </Typography>
                    <Typography variant='body2'>
                      Drop files here or click browse through your machine
                    </Typography>
                  </div>
                </UploadFileInner>
              </UploadFileRoot>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography variant='subtitle1'>Participants</Typography>
              <Box
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                gap='1.5rem'
                mt={1}
              >
                <AvatarGroup
                  max={8}
                  {...UserAvatarSize}
                  sx={{
                    '&.MuiAvatarGroup-root .MuiAvatarGroup-avatar': {
                      ...UserAvatarSize,
                      fontSize: '1rem',
                    },
                  }}
                >
                  {teamMembers.map((el) => (
                    <Avatar
                      key={el.email}
                      sx={{ ...UserAvatarSize }}
                      alt={el.name}
                      src={el.image}
                    />
                  ))}
                </AvatarGroup>
                <IconButton color='primary' aria-label='close dialog'>
                  <Icon
                    icon={plusCircleFilled}
                    width={22}
                    height={22}
                    color={theme.palette.primary.main}
                  />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </DialogRoot>
  );
}
