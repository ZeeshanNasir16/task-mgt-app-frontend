import * as React from 'react';
import TextField from '@mui/material/TextField';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import {
  Grid,
  IconButton,
  Typography,
  styled,
  alpha,
  Box,
  Avatar,
  AvatarGroup,
  useTheme,
  DialogContent,
  Button,
} from '@mui/material';
import { Icon } from '@iconify/react';
import DialogRoot, { IDialogReus } from 'Components/dialogs/DialogRoot';
import { dateFormat } from 'Utils/Date';

import plusCircleFilled from '@iconify/icons-ant-design/plus-circle-filled';
import { useAppDispatch, useAppSelector } from 'store/hooks.store';
import {
  createProject,
  updateProject,
} from 'store/slices/projects/extraReducers.project';
import Scrollbar from 'Components/common/Scrollbar';
import { DialogActionsExt } from 'Components/dialogs/styled';
import { LoadingButton } from '@mui/lab';
import SelectParticipants from 'Components/common/SelectParticipants';
import { useState } from 'react';
import { User } from 'interfaces/User';

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

export default function ProjectFormDialog(props: IDialogReus) {
  const { open, toggleDialog } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const users = useAppSelector((st) =>
    st.users.users.filter((el) => el.role === 'manager')
  );

  const { loading } = useAppSelector((st) => st.proj);

  const assignedToInitial = props.update && props.update.assignedTo;

  const [assginedTo, setAssignedTo] = useState<User>(assignedToInitial);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelected = (arr: any) => {
    handleClose();
    delete arr[0].checked;
    setAssignedTo(arr[0]);
  };

  const schema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    startDate: Yup.date().required('Project start date is required'),
    deadlineDate: Yup.date().required('Project deadline is required'),
  });

  const theme = useTheme();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    formik.isSubmitting = loading;
  }, [loading]);

  const initialValues = props.update
    ? {
        title: `${props.update.title}`,
        description: `${props.update.description}`,
        startDate: new Date(props.update.startDate),
        deadlineDate: new Date(props.update.deadlineDate),
      }
    : {
        title: '',
        description: '',
        startDate: new Date(),
        deadlineDate: new Date(),
      };

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: () => {
      if (props.update)
        dispatch(
          updateProject({
            id: props.update._id,
            body: {
              ...formik.values,
              assignedTo: assginedTo?._id,
            },
          })
        ).then(toggleDialog);
      else
        dispatch(
          createProject({
            ...formik.values,
            assignedTo: assginedTo?._id,
          })
        ).then(toggleDialog);
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <DialogRoot
      open={open}
      toggleDialog={toggleDialog}
      dialogTitle={props.update ? 'Edit Project' : 'New Project'}
    >
      <Scrollbar
        sx={{
          maxHeight: 450,
        }}
      >
        <DialogContent>
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
                    {...getFieldProps('title')}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                    size='small'
                    variant='outlined'
                    label='Project Title'
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    label='Project Description'
                    {...getFieldProps('description')}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                    size='small'
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label=' Start Date'
                    variant='outlined'
                    type='date'
                    value={dateFormat(formik.values.startDate, 'yyyy-MM-dd')}
                    onChange={(e) => {
                      formik.setFieldValue(
                        'startDate',
                        new Date(e.target.value)
                      );
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label=' End Date'
                    variant='outlined'
                    type='date'
                    value={dateFormat(formik.values.deadlineDate, 'yyyy-MM-dd')}
                    onChange={(e) => {
                      formik.setFieldValue(
                        'deadlineDate',
                        new Date(e.target.value)
                      );
                    }}
                    fullWidth
                  />
                </Grid>
                {/* <Grid item xs={12} sm={12}>
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
                </Grid> */}
                <Grid item xs={12} sm={12}>
                  <Typography variant='subtitle1'>Assigned To</Typography>
                  <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    gap='1.5rem'
                    mt={1}
                  >
                    {!!assginedTo && (
                      <Box display='flex' gap={1} alignItems='center'>
                        <Avatar
                          key={assginedTo._id}
                          sx={{ ...UserAvatarSize }}
                          alt={assginedTo.fullName}
                          src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${assginedTo?.fullName
                            .split(' ')
                            .join('%20')}`}
                        />
                        <Typography variant='body1'>
                          {assginedTo.fullName}
                        </Typography>
                      </Box>
                    )}

                    <IconButton
                      color='primary'
                      aria-label='close dialog'
                      onClick={handleClick}
                    >
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
        </DialogContent>
      </Scrollbar>
      <DialogActionsExt>
        <Button
          onClick={() => {
            formik.resetForm();
            toggleDialog();
          }}
          variant='outlined'
          color={undefined}
        >
          Cancel
        </Button>
        <LoadingButton
          type='submit'
          form='formAddProj'
          loading={isSubmitting}
          variant='contained'
          color='primary'
        >
          {props.update ? 'Update' : 'Save'}
        </LoadingButton>
      </DialogActionsExt>
      {anchorEl && (
        <SelectParticipants
          anchorEl={anchorEl}
          handleClose={handleClose}
          handleSelected={handleSelected}
          selectionType='single'
          users={users}
        />
      )}
    </DialogRoot>
  );
}
