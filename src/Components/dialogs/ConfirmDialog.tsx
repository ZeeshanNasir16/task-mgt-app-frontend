import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@mui/material';
import React from 'react';
import { Icon } from '@iconify/react';
import infoFill from '@iconify/icons-eva/info-fill';
// import { makeStyles } from '@material-ui/core/styles';
// import Avatar from '@material-ui/core/Avatar';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemText from '@material-ui/core/ListItemText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Dialog from '@material-ui/core/Dialog';
// import { blue, red } from '@material-ui/core/colors';

// import CheckIcon from '@material-ui/icons/CheckCircle';
// import CancelIcon from '@material-ui/icons/Cancel';

// const useStyles = makeStyles({
//   root: {},
//   Title: {
//     // width: '300px',
//     '& h2': {
//       fontFamily: 'sans-serif',
//     },
//   },
//   List: {
//     '& span': {
//       fontFamily: 'sans-serif',
//     },
//   },
//   yesIcon: {
//     backgroundColor: blue[100],
//     color: blue[600],
//   },
//   cancelIcon: {
//     backgroundColor: red[100],
//     color: red[600],
//   },
// });

interface IConfirmDialog {
  open: boolean;
  toggleDialog: () => void;
  dialogTitle: string;
  confirmDelete: () => void;
}

export const ConfirmDialog = (props: IConfirmDialog) => {
  const { open, toggleDialog, dialogTitle, confirmDelete } = props;
  //   const classes = useStyles();

  return (
    <Dialog
      onClose={toggleDialog}
      aria-labelledby='simple-dialog-title'
      open={open}
    >
      <DialogTitle id='simple-dialog-title'>{dialogTitle}</DialogTitle>
      <List>
        <ListItem button onClick={confirmDelete} key={'yes-123'}>
          <ListItemAvatar>
            <Avatar>{/* <CheckIcon /> */}</Avatar>
          </ListItemAvatar>
          <ListItemText primary='Yes' />
        </ListItem>

        <ListItem button onClick={toggleDialog} key={'cancel-123'}>
          <ListItemAvatar>
            <Avatar>{/* <CancelIcon /> */}</Avatar>
          </ListItemAvatar>
          <ListItemText primary='Cancel' />
        </ListItem>
      </List>
    </Dialog>
  );
};
