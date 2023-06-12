import {
  Avatar,
  AvatarGroup,
  Box,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import { getIcon } from 'Utils/GetIcon';
import { User } from 'Components/User/User.interface';
import { RndCrndInnerWrapper } from 'Layouts/common/RoundCornInnerWrapper';
import { RndCrndWrapper } from 'Layouts/common/RoundCornWrapper';
import React, { useState } from 'react';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import formOutlined from '@iconify/icons-ant-design/form-outlined';
import fieldTimeOutlined from '@iconify/icons-ant-design/field-time-outlined';
import dashboardOutlined from '@iconify/icons-ant-design/dashboard-outlined';
import ProjectFormDialog from 'Components/dialogs/ProjectFormDialog';
import { Project_DB } from 'interfaces/Project';
import { dateFormat } from 'Utils/Date';

import closeCircleOutlined from '@iconify/icons-ant-design/close-circle-outlined';
import ConfirmDialog from 'Components/dialogs/ConfirmDialog';
import { useAppDispatch } from 'store/hooks.store';
import { deleteProj } from 'store/slices/projects/extraReducers.project';

const ProjHeadDetails = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'nowrap',
  gap: '1.5rem',
  '& *': {
    marginBottom: '0 !important',
  },
}));

const UserAvatarSize = {
  width: 40,
  height: 40,
};

interface ProjBoardHeadProps {
  project: Project_DB;
  viewer: 'user' | 'manager' | 'admin';
}

export const ProjBoardHeader = (props: ProjBoardHeadProps) => {
  const { project } = props;

  const [editFormDialog, setEditFormDialog] = useState(false);
  const [deleteFormDialog, setDeleteFormDialog] = useState(false);

  const dispatch = useAppDispatch();

  const toggleDelFormDialog: any = () => {
    setDeleteFormDialog((st) => !st);
  };
  const toggleDialog: any = () => {
    setEditFormDialog((st) => !st);
  };

  const handleConfirmDel = () => {
    dispatch(deleteProj(project._id));
  };

  React.useEffect(() => {
    return;
  }, []);

  return (
    <RndCrndInnerWrapper>
      <Box>
        <Box display='flex' justifyContent='space-between'>
          <Typography
            variant='h3'
            sx={{
              textTransform: 'uppercase',
              fontWeight: 400,
              marginBottom: '0.5rem !important',
            }}
          >
            {project.title}
          </Typography>
          <Box sx={{ display: 'content' }}>
            <IconButton
              sx={{ display: 'content' }}
              color='error'
              onClick={toggleDelFormDialog}
            >
              {getIcon(closeCircleOutlined)}
            </IconButton>

            <IconButton
              sx={{ display: 'content' }}
              color='info'
              onClick={toggleDialog}
            >
              {getIcon(formOutlined)}
            </IconButton>
          </Box>
        </Box>
        <ProjHeadDetails>
          {/* <Box display='flex' gap={1} alignItems='center'>
            <Avatar
              key={project.assignedTo._id}
              sx={{ width: 30, height: 30 }}
              alt={project.assignedTo.fullName}
              src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${project.assignedTo?.fullName
                .split(' ')
                .join('%20')}`}
            />
            <Typography variant='body1'>
              {project.assignedTo.fullName}
            </Typography>
          </Box> */}
          <Box>
            <Typography variant='subtitle2' color='text.secondary'>
              {`Start Date :   ${dateFormat(project.startDate, 'MM-dd-yyyy')}`}
            </Typography>
            <Typography variant='subtitle2' color='text.secondary'>
              {`Deadline Date :   ${dateFormat(
                project.deadlineDate,
                'MM-dd-yyyy'
              )}`}
            </Typography>
          </Box>

          {/* <AvatarGroup
            max={4}
            {...UserAvatarSize}
            sx={{
              '&.MuiAvatarGroup-root .MuiAvatarGroup-avatar': {
                ...UserAvatarSize,
              },
            }}
          >
            {teamMembers.map((el) => (
              <Avatar
                key={el.email}
                sx={{ ...UserAvatarSize }}
                alt={el.name}
                src={el.image}
              />
            ))}
          </AvatarGroup> */}
        </ProjHeadDetails>
      </Box>
      <ConfirmDialog
        open={deleteFormDialog}
        toggleDialog={toggleDelFormDialog}
        description='Deleting project will permanently remove it'
        confirmAction={handleConfirmDel}
      />
      <ProjectFormDialog
        open={editFormDialog}
        toggleDialog={toggleDialog}
        update={project}
      />
    </RndCrndInnerWrapper>
  );
};

export default ProjBoardHeader;
