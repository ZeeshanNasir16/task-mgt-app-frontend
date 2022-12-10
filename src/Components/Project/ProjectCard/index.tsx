import {
  Avatar,
  AvatarGroup,
  Box,
  CircularProgress,
  circularProgressClasses,
  CircularProgressProps,
  Divider,
  styled,
  Typography,
} from '@mui/material';
import React from 'react';
import fieldTimeOutlined from '@iconify/icons-ant-design/field-time-outlined';
import dashboardOutlined from '@iconify/icons-ant-design/dashboard-outlined';
import { getIcon } from 'Utils/GetIcon';
import { teamMembers } from 'data';
import { Link } from 'react-router-dom';
import {
  RootStyle,
  CardInnerWrapper,
  UserAvatarSize,
  ProgressText,
} from 'Components/Project/ProjectCard/styled';
import { Project_DB } from 'interfaces/Project';
import { dateFormat } from 'Utils/Date';

const CircularProgressWithLabel = (
  props: CircularProgressProps & { value: number }
) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant='determinate'
        sx={{
          color: (theme) => theme.palette.grey[300],
        }}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant='determinate'
        sx={{
          color: (theme) => '#1a90ff',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={40}
        thickness={4}
        {...props}
      />
      <ProgressText>
        <Typography
          variant='caption'
          component='div'
          color='text.secondary'
        >{`${Math.round(props.value)}%`}</Typography>
      </ProgressText>
    </Box>
  );
};

interface IProjectDetails {
  projDetails: Project_DB;
}

const ProjectCard = (props: IProjectDetails) => {
  const { _id, title, description, startDate, deadlineDate, assignedTo } =
    props.projDetails;
  console.log(props.projDetails.assignedTo);
  return (
    <RootStyle className='cursorPointer' to={`/projects/${_id}`}>
      <CardInnerWrapper>
        <Box>
          <Typography variant='subtitle1'>{title}</Typography>
          <Typography variant='body2' component='span' color='text.secondary'>
            {assignedTo?.fullName}
          </Typography>
        </Box>
        <Avatar
          key={assignedTo._id}
          // sx={{ ...UserAvatarSize }}
          alt={assignedTo.fullName}
          src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${assignedTo.fullName
            .split(' ')
            .join('%20')}`}
        />
        {/* <CircularProgressWithLabel value={50} /> */}
      </CardInnerWrapper>
      {/* <Divider /> */}
      <CardInnerWrapper>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          gap={0.5}
        >
          <Box display='flex' alignItems='center' gap={1}>
            {getIcon(fieldTimeOutlined, '#637381')}
            <Typography component='span' variant='body2' color='text.secondary'>
              {`${dateFormat(startDate, 'MM-dd-yyyy')}`}
            </Typography>
          </Box>
          <Box display='flex' alignItems='center' gap={1}>
            {getIcon(dashboardOutlined, '#FF4842')}
            <Typography component='span' variant='body2' color='text.secondary'>
              {`${dateFormat(deadlineDate, 'MM-dd-yyyy')}`}
            </Typography>
          </Box>
        </Box>

        <AvatarGroup
          max={4}
          {...UserAvatarSize}
          sx={{
            '&.MuiAvatarGroup-root .MuiAvatarGroup-avatar': {
              ...UserAvatarSize,
              fontSize: '0.8rem',
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
        </AvatarGroup>
      </CardInnerWrapper>
    </RootStyle>
  );
};

export default ProjectCard;
