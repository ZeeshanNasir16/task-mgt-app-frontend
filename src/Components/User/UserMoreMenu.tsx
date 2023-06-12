import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ConfirmDialog from 'Components/dialogs/ConfirmDialog';
import { useAppDispatch } from 'store/hooks.store';
import { User } from 'interfaces/User';
import { delUser } from 'store/slices/users/extraReducers.user';
import EmployeeFormDialog from 'Components/dialogs/EmployeeFormDialog';

// ----------------------------------------------------------------------

interface IProps {
  currentUser: User;
}

export default function EmpMoreMenu({ currentUser }: IProps) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [updEmpDialog, setUpdEmpDialog] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    setDialogOpen((st) => !st);
    setIsOpen((st) => !st);
  };

  const deleteAction = () => {
    setDialogOpen((st) => !st);
    dispatch(delUser(currentUser._id));
  };
  const handleEdit = () => {
    setIsOpen(false);
    setUpdEmpDialog((st) => !st);
  };

  const dialogProps = {
    open: updEmpDialog,
    toggleDialog: () => setUpdEmpDialog((st) => !st),
    update: currentUser,
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick={handleEdit}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary='Edit'
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
        <MenuItem sx={{ color: 'text.secondary' }} onClick={handleDelete}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary='Delete'
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
      </Menu>
      <EmployeeFormDialog dialogProps={dialogProps} />

      <ConfirmDialog
        open={dialogOpen}
        toggleDialog={() => setDialogOpen((st) => !st)}
        description='Deleting employee will permanently remove it !'
        confirmAction={deleteAction}
      />
    </>
  );
}
