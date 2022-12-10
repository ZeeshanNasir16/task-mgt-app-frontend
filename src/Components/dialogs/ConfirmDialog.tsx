import {
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { DialogActionsExt } from 'Components/dialogs/styled';

interface IConfirmDialog {
  open: boolean;
  toggleDialog: () => void;
  description: string;
  confirmAction: () => void;
}

export default function ConfirmDialog(props: IConfirmDialog) {
  const { open, toggleDialog, description, confirmAction } = props;

  return (
    <Dialog open={open}>
      <DialogTitle>
        <Typography variant='subtitle1' component='span'>
          Are you sure ?
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActionsExt>
        <Button variant='outlined' color='info' onClick={toggleDialog}>
          Cancel
        </Button>
        <Button variant='contained' color='error' onClick={confirmAction}>
          Submit
        </Button>
      </DialogActionsExt>
    </Dialog>
  );
}
