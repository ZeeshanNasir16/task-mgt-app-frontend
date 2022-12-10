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
import minusCircleFilled from '@iconify/icons-ant-design/minus-circle-filled';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { createTask, updTask } from 'store/slices/tasks/extraReducers';
import Scrollbar from 'Components/common/Scrollbar';
import { DialogActionsExt } from 'Components/dialogs/styled';
import { LoadingButton } from '@mui/lab';
import SelectParticipants from 'Components/common/SelectParticipants';
import { useState } from 'react';
import { User } from 'interfaces/User';
import { Task_CL } from 'interfaces/Task';
import Loading from 'Components/common/Loading';

const UserAvatarSize = {
  width: 25,
  height: 25,
};

interface ITaskFormProps {
  dialogProps: IDialogReus;
  managerId: string;
  projectId: string;
}

interface IAssignee {
  user: User;
  date: Date;
}

export default function TaskFormDialog(props: ITaskFormProps) {
  const { open, toggleDialog } = props.dialogProps;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const users = useAppSelector((st) =>
    st.users.users.filter((el) => el.role !== 'manager')
  );

  const { loading } = useAppSelector((st) => st.tasks);

  const assignedToInitial =
    props.dialogProps.update && props.dialogProps.update.assignedTo;

  const [assginedTo, setAssignedTo] = useState<IAssignee | null>(
    assignedToInitial
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelected = (arr: any) => {
    handleClose();
    delete arr[0].checked;
    setAssignedTo({ user: arr[0], date: new Date() });
  };

  const handleUnAssigned = () => {
    setAssignedTo(null);
  };

  const schema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    deadLine: Yup.date().required('Deadline date is required'),
    status: Yup.string().oneOf(['todo', 'inProgress', 'review', 'completed']),
  });

  const theme = useTheme();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    formik.isSubmitting = loading;
    return;
  }, [loading]);

  const initialValues = props.dialogProps.update
    ? {
        title: `${props.dialogProps.update.title}`,
        description: `${props.dialogProps.update.description}`,
        deadLine: new Date(props.dialogProps.update.deadLine),
        status: props.dialogProps.update.status,
      }
    : {
        title: '',
        description: '',
        deadLine: new Date(),
        status: 'todo',
      };

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: () => {
      const formValues: Task_CL = {
        ...formik.values,
        assignedTo: {
          user: assginedTo?.user?._id,
          date: assginedTo?.user && new Date(),
        },
        assignedBy: props.managerId,
        check: assginedTo?.user._id ? 'assigned' : 'unassigned',
        project: props.projectId,
      };

      // !assginedTo && delete formValues.assignedTo;

      if (props.dialogProps.update)
        dispatch(
          updTask({
            id: props.dialogProps.update._id,
            body: {
              ...formValues,
            },
          })
        ).then(() => {
          formik.resetForm();
          toggleDialog();
        });
      else
        dispatch(
          createTask({
            ...formValues,
          })
        ).then(() => {
          formik.resetForm();
          toggleDialog();
        });
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <DialogRoot
      open={open}
      toggleDialog={toggleDialog}
      dialogTitle={props.dialogProps.update ? 'Edit Task' : 'New Task'}
    >
      <Scrollbar
        sx={{
          maxHeight: 450,
        }}
      >
        <DialogContent>
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
                    {...getFieldProps('title')}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                    size='small'
                    variant='outlined'
                    label='Task Title'
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    label='Task Description'
                    {...getFieldProps('description')}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                    size='small'
                    multiline
                    rows={5}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label=' Deadline Date'
                    variant='outlined'
                    type='date'
                    value={dateFormat(formik.values.deadLine, 'yyyy-MM-dd')}
                    onChange={(e) => {
                      formik.setFieldValue(
                        'deadLine',
                        new Date(e.target.value)
                      );
                    }}
                    fullWidth
                    size='small'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Status'
                    {...getFieldProps('status')}
                    error={Boolean(touched.status && errors.status)}
                    helperText={touched.status && errors.status}
                    size='small'
                    disabled
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Typography variant='subtitle1'>Assigned To</Typography>
                  <Box
                    display='flex'
                    alignItems='center'
                    gap='0.25rem'
                    justifyContent={!!assginedTo ? 'space-between' : 'start'}
                  >
                    {!!assginedTo && assginedTo.user && (
                      <>
                        <Avatar
                          key={assginedTo.user._id}
                          sx={{ ...UserAvatarSize }}
                          alt={assginedTo.user.firstName}
                          src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${assginedTo.user?.firstName} ${assginedTo.user?.lastName}`}
                        />
                      </>
                    )}

                    <Box>
                      {!!assginedTo && (
                        <IconButton
                          color='primary'
                          aria-label='close dialog'
                          onClick={handleUnAssigned}
                          size='small'
                        >
                          <Icon
                            icon={minusCircleFilled}
                            width={27}
                            height={27}
                            color={theme.palette.primary.main}
                          />
                        </IconButton>
                      )}
                      <IconButton
                        color='primary'
                        aria-label='close dialog'
                        onClick={handleClick}
                        size='small'
                      >
                        <Icon
                          icon={plusCircleFilled}
                          width={27}
                          height={27}
                          color={theme.palette.primary.main}
                        />
                      </IconButton>
                    </Box>
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
          form='formAddTask'
          loading={isSubmitting}
          variant='contained'
          color='primary'
        >
          {props.dialogProps.update ? 'Update' : 'Save'}
        </LoadingButton>
      </DialogActionsExt>

      <SelectParticipants
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleSelected={handleSelected}
        selectionType='single'
        users={users}
      />
    </DialogRoot>
  );
}
