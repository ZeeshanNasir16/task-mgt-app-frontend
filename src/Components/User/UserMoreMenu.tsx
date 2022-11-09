import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import plusFill from '@iconify/icons-eva/plus-fill';
import minusFill from '@iconify/icons-eva/minus-fill';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Task } from 'Components/ProjectBoardView/BoardTabs/TaskTable';
// import AssignmentIcon from '@material-ui/icons/Assignment';
// material
// import {
//   Menu,
//   MenuItem,
//   IconButton,
//   ListItemIcon,
//   ListItemText,
//   Button,
// } from '@material-ui/core';

// ----------------------------------------------------------------------

interface IUserMoreMenu {
  currentTask: Task;
  setSelected: React.Dispatch<React.SetStateAction<Task | undefined>>;
  viewLink: string;
  viewTask: boolean;
  toggleDelOpen?: () => void | undefined;
  toggleEditOpen?: () => void | undefined;
  toggleAddToOpen?: () => void | undefined;
  addToSlug?: string;
  removeFromTable?: boolean;
  handleRemoveFrom?: () => void | undefined;
  removeFromSlug?: string;
  addToTable?: boolean;
  noDelete?: boolean;
  noEdit?: boolean;
}

export default function UserMoreMenu({
  currentTask,
  setSelected,
  toggleDelOpen,
  toggleEditOpen,
  addToTable,
  toggleAddToOpen,
  addToSlug,
  removeFromTable,
  handleRemoveFrom,
  removeFromSlug,
  noDelete,
  noEdit,
  viewTask,
  viewLink,
}: IUserMoreMenu) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    setSelected(currentTask);
    setIsOpen(false);
    // toggleDelOpen();
  };
  const handleEdit = () => {
    setSelected(currentTask);
    setIsOpen(false);
    // toggleEditOpen();
  };
  const handleAddTo = () => {
    setIsOpen(false);
    // toggleAddToOpen();
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
        {!noDelete && (
          <MenuItem sx={{ color: 'text.secondary' }} onClick={handleDelete}>
            <ListItemIcon>
              <Icon icon={trash2Outline} width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary='Delete'
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </MenuItem>
        )}
        {!noEdit && (
          <MenuItem sx={{ color: 'text.secondary' }} onClick={handleEdit}>
            <ListItemIcon>
              <Icon icon={editFill} width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary='Edit'
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </MenuItem>
        )}
        {addToTable && (
          <MenuItem sx={{ color: 'text.secondary' }} onClick={handleAddTo}>
            <ListItemIcon>
              <Icon icon={plusFill} width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary={addToSlug}
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </MenuItem>
        )}
        {removeFromTable && (
          <MenuItem
            sx={{ color: 'text.secondary' }}
            onClick={() => {
              setIsOpen(false);
              // handleRemoveFrom();
            }}
          >
            <ListItemIcon>
              <Icon icon={minusFill} width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary={removeFromSlug}
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </MenuItem>
        )}
        {viewTask && (
          <MenuItem
            sx={{ color: 'text.secondary' }}
            onClick={() => navigate(viewLink, { replace: true })}
          >
            {/* <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon> */}
            <ListItemText
              primary='View Task'
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
