import * as React from 'react';
import { Icon } from '@iconify/react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import { getIcon } from 'Utils/GetIcon';
import DialogRoot, { IDialogReus } from 'Components/dialogs/DialogRoot';

export default function AddEmployee(props: IDialogReus) {
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
      form='formAddEmp'
      dialogTitle='New Employee'
    >
      <FormikProvider value={formik}>
        <Form
          id='formAddEmp'
          autoComplete='off'
          noValidate
          onSubmit={handleSubmit}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Name'
                {...getFieldProps('name')}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
                size='small'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='email'
                label='Email address'
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                size='small'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Contact No.'
                {...getFieldProps('contact')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                size='small'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size='small'>
                <InputLabel id='demo-simple-select-label'>Role</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={10}
                  label='Role'
                  // onChange={handleChange}
                >
                  <MenuItem value={10}>Project Manager</MenuItem>
                  <MenuItem value={20}>Developer</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size='small'
                fullWidth
                type={showPassword ? 'text' : 'password'}
                label='Password'
                {...getFieldProps('password')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={handleShowPassword} edge='end'>
                        <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size='small'
                fullWidth
                type={showPassword ? 'text' : 'password'}
                label='Confirm Password'
                {...getFieldProps('passwordConfirm')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={handleShowPassword} edge='end'>
                        <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(
                  touched.passwordConfirm && errors.passwordConfirm
                )}
                helperText={touched.passwordConfirm && errors.passwordConfirm}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label='Address'
                {...getFieldProps('address')}
                error={Boolean(touched.address && errors.address)}
                helperText={touched.address && errors.address}
                size='small'
              />
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </DialogRoot>
  );
}
