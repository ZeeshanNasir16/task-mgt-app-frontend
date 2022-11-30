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
  styled,
  Divider,
  Box,
  useTheme,
} from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';

import closeCircleOutline from '@iconify/icons-eva/close-circle-outline';
import closeFill from '@iconify/icons-eva/close-fill';
import { getIcon } from 'Utils/GetIcon';
import Scrollbar from 'Components/common/Scrollbar';

interface IDialogRoot {
  open: boolean;
  toggleDialog: React.MouseEventHandler<any> | undefined;
  dialogTitle: string;
  children: React.ReactNode;
  form: string;
  formType?: 'add' | 'delete' | 'edit';
}

export interface IDialogReus {
  open: boolean;
  toggleDialog: React.MouseEventHandler<HTMLButtonElement>;
}

const DiaTitleCont = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  flexWrap: 'nowrap',
}));

const DialogActionsExt = styled(DialogActions)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: '16px 24px',
}));

const DialogRoot = (props: IDialogRoot) => {
  const { open, toggleDialog, dialogTitle, form, formType } = props;
  const theme = useTheme();

  return (
    <Dialog
      fullWidth
      maxWidth='sm'
      open={open}
      onClose={toggleDialog}
      sx={{ padding: '1rem' }}
    >
      <DialogTitle
        sx={{
          mb: 1,
        }}
      >
        <DiaTitleCont>
          <Typography variant='subtitle1'>{dialogTitle}</Typography>
          <IconButton color='error' aria-label='close dialog'>
            <Icon
              icon={closeFill}
              width={22}
              height={22}
              color={theme.palette.error.main}
              onClick={toggleDialog}
            />
          </IconButton>
        </DiaTitleCont>
        <Divider />
      </DialogTitle>
      <Scrollbar
        sx={{
          maxHeight: 400,
        }}
      >
        <DialogContent>
          <React.Fragment>{props.children}</React.Fragment>
        </DialogContent>
      </Scrollbar>
      {/* <React.Fragment>{props.children}</React.Fragment> */}
      <DialogActionsExt>
        <Button onClick={toggleDialog} variant='outlined' color={undefined}>
          Cancel
        </Button>
        <Button type='submit' form={form} variant='contained'>
          Submit
        </Button>
      </DialogActionsExt>
    </Dialog>
  );
};

export default DialogRoot;
