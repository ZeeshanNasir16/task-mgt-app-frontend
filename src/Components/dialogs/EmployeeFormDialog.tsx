import { Icon } from '@iconify/react';
import {
  Button,
  TextField,
  DialogContent,
  IconButton,
  InputAdornment,
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
import DialogRoot, { IDialogReus } from 'Components/dialogs/DialogRoot';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { addUser, updatUser } from 'store/slices/users/extraReducers';
import Scrollbar from 'Components/common/Scrollbar';
import { DialogActionsExt } from 'Components/dialogs/styled';
import { LoadingButton } from '@mui/lab';
import { Project_DB } from 'interfaces/Project';

interface IEmployeeDialog {
  dialogProps: IDialogReus;
}

export default function EmployeeFormDialog(props: IEmployeeDialog) {
  const { open, toggleDialog, update } = props.dialogProps;
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(update ? update.role : 'manager');

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((st) => st.users);

  const baseSchema = {
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string(),
    address: Yup.string(),
    project: Yup.string(),
  };

  const updateSchema = Yup.object().shape({ ...baseSchema });

  const createSchema = Yup.object().shape({
    ...baseSchema,
    password: Yup.string().required('Password is required'),
    passwordConfirm: Yup.string().required('Password Confirm is required'),
  });

  const formik = useFormik({
    initialValues: !!update
      ? {
          firstName: `${update.firstName}`,
          lastName: `${update.lastName}`,
          email: `${update.email}`,
          address: `${!!update.address ? update.address : ''}`,

          password: '',
          passwordConfirm: '',
        }
      : {
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          password: '',
          passwordConfirm: '',
        },
    validationSchema: update ? updateSchema : createSchema,
    onSubmit: () => {
      if (update) {
        let { firstName, lastName, email, address } = formik.values;
        dispatch(
          updatUser({
            id: update._id,
            body: {
              firstName,
              lastName,
              email,
              address,
              role,
            },
          })
        ).then(() => toggleDialog());
      } else {
        dispatch(
          addUser({
            ...formik.values,
            role,
          })
        ).then(() => toggleDialog());
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  useEffect(() => {
    formik.setSubmitting(loading);
  }, [loading]);

  return (
    <DialogRoot
      open={open}
      toggleDialog={toggleDialog}
      dialogTitle={`${update ? 'Update Employee' : 'New Employee'}`}
    >
      <Scrollbar
        sx={{
          maxHeight: 450,
        }}
      >
        <DialogContent>
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
                    label='First Name'
                    {...getFieldProps('firstName')}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    size='small'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Last Name'
                    {...getFieldProps('lastName')}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
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
                  <FormControl fullWidth size='small'>
                    <InputLabel id='demo-simple-select-label'>Role</InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={role}
                      label='Role'
                      onChange={(e: any) => {
                        setRole(e.target.value);
                      }}
                    >
                      <MenuItem value='manager'>Project Manager</MenuItem>
                      <MenuItem value='user'>User</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {!update && (
                  <>
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
                              <IconButton
                                onClick={handleShowPassword}
                                edge='end'
                              >
                                <Icon
                                  icon={showPassword ? eyeFill : eyeOffFill}
                                />
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
                              <IconButton
                                onClick={handleShowPassword}
                                edge='end'
                              >
                                <Icon
                                  icon={showPassword ? eyeFill : eyeOffFill}
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        error={Boolean(
                          touched.passwordConfirm && errors.passwordConfirm
                        )}
                        helperText={
                          touched.passwordConfirm && errors.passwordConfirm
                        }
                      />
                    </Grid>
                  </>
                )}

                {/* <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size='small'>
                    <InputLabel id='demo-simple-select-label'>
                      Project
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={selectedProj}
                      label='Project Member'
                      onChange={(e: any) => {
                        setSelecProj(e.target.value);
                      }}
                    >
                      {projects.length > 0 &&
                        projects.map((el: any) => (
                          <MenuItem value={el._id}>{el.name}</MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid> */}
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
        </DialogContent>
      </Scrollbar>
      <DialogActionsExt>
        <Button onClick={toggleDialog} variant='outlined' color={undefined}>
          Cancel
        </Button>
        <LoadingButton
          type='submit'
          form='formAddEmp'
          loading={isSubmitting}
          variant='contained'
          color='primary'
        >
          Submit
        </LoadingButton>
      </DialogActionsExt>
    </DialogRoot>
  );
}
