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
import { Task_DB } from 'interfaces/Task';
import TaskFormDialog from 'Components/dialogs/TaskFormDialog';
import ConfirmDialog from 'Components/dialogs/ConfirmDialog';
import { useAppDispatch } from 'store/hooks.store';
import { deleteTask } from 'store/slices/tasks/extraReducers.tasks';

// ----------------------------------------------------------------------

interface ITaskMoreMenu {
  currentTask: Task_DB;
  projectId: string;
  managerId: string;
}

export default function TaskMoreMenu({
  currentTask,
  projectId,
  managerId,
}: ITaskMoreMenu) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [updTaskDialog, setUpdTaskDialog] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [toggleDeleteDialog, setToggleDeleteDialog] = useState(false);
  const dispatch = useAppDispatch();

  const handleToggleForm = () => {
    setUpdTaskDialog((st) => !st);
  };

  const toggleDeleteForm = () => {
    setToggleDeleteDialog((st) => !st);
  };

  const handleDelete = () => {
    setIsOpen(false);
    setDialogOpen((st) => !st);

    dispatch(deleteTask(currentTask._id));
  };
  const handleEdit = () => {
    setIsOpen(false);
    setUpdTaskDialog((st) => !st);
  };

  const dialogProps = {
    open: updTaskDialog,
    toggleDialog: handleToggleForm,
    update: currentTask,
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
        <MenuItem sx={{ color: 'text.secondary' }} onClick={toggleDeleteForm}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary='Delete'
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
      </Menu>
      <TaskFormDialog
        dialogProps={dialogProps}
        managerId={managerId}
        projectId={projectId}
      />
      <ConfirmDialog
        open={toggleDeleteDialog}
        toggleDialog={toggleDeleteForm}
        description='Are you sure you want to delete ?'
        confirmAction={handleDelete}
      />
    </>
  );
}
