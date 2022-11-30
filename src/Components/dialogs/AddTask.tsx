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

export default function AddTask(props: IDialogReus) {
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
      project: 'WorkSpace Accessories',
      taskSummary: '',
      taskDescription: '',
      status: '',
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
      form='formAddTask'
      dialogTitle='New Task'
    >
      <FormikProvider value={formik}>
        <Form
          id='formAddTask'
          autoComplete='off'
          noValidate
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                {...getFieldProps('project')}
                // error={Boolean(touched.project && errors.project)}
                // helperText={touched.project && errors.project}
                size='small'
                variant='outlined'
                // label='Project'
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                {...getFieldProps('taskSummary')}
                // error={Boolean(touched.project && errors.project)}
                // helperText={touched.project && errors.project}
                size='small'
                variant='outlined'
                label='Task Summary'
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                {...getFieldProps('taskDescription')}
                // error={Boolean(touched.project && errors.project)}
                // helperText={touched.project && errors.project}
                size='small'
                variant='outlined'
                label='Task Description'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name='deadline-date'
                label=' Deadline'
                variant='outlined'
                type='date'
                size='small'
                value={dateFormat(new Date(), 'yyyy-MM-dd')}
                onChange={(e) =>
                  console.log(e.target.value, typeof e.target.value)
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                height='100%'
              >
                <Typography variant='subtitle1'>Assigned To</Typography>

                <Box
                  display='flex'
                  alignItems='center'
                  justifyContent='space-between'
                  gap='1rem'
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
                    <Avatar
                      key={teamMembers[0].email}
                      sx={{ ...UserAvatarSize }}
                      alt={teamMembers[0].name}
                      src={teamMembers[0].image}
                    />
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
              </Box>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </DialogRoot>
  );
}
