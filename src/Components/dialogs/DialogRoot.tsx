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
  // form: string;
  // formType?: 'add' | 'delete' | 'edit';
}

export interface IDialogReus {
  open: boolean;
  toggleDialog: any;
  update?: any;
}

const DialogRoot = (props: IDialogRoot) => {
  const { open, toggleDialog, dialogTitle } = props;

  return (
    <Dialog
      fullWidth
      maxWidth='sm'
      open={open}
      onClose={toggleDialog}
      sx={{ padding: '1rem' }}
    >
      <DialogTitle>
        <Typography variant='subtitle1' component='span'>
          {dialogTitle}
        </Typography>
      </DialogTitle>
      <Divider />
      <React.Fragment>{props.children}</React.Fragment>
    </Dialog>
  );
};
export default DialogRoot;
