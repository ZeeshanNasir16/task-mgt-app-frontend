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
import { getIcon } from 'Utils/GetIcon';
import { teamMembers } from 'data';
import { Link } from 'react-router-dom';

type Props = {};

const UserAvatarSize = {
  width: 25,
  height: 25,
};

const RootStyle = styled(Link)(({ theme }) => ({
  padding: theme.spacing(4, 0),
  minWidth: 230,
  borderRadius: 10,
  color: 'inherit',

  //   boxShadow: `${alpha(theme.palette.grey[500], 0.2)} 0px 0px 2px 0px, ${alpha(
  //     theme.palette.grey[500],
  //     0.12
  //   )} 0px 12px 24px -4px`,
  //   boxShadow:
  //     'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
  boxShadow:
    'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
}));

const CardInnerWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 3),
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'nowrap',
  justifyContent: 'space-between',
  gap: '1rem',
}));

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
      {/* <CircularProgress variant='determinate' {...props} /> */}
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant='caption'
          component='div'
          color='text.secondary'
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};

const ProjectCard = (props: Props) => {
  return (
    <RootStyle className='cursorPointer' to='/projects/workload-accessories'>
      <CardInnerWrapper>
        <Box>
          <Typography variant='subtitle1'>Workload Accessories</Typography>
          <Typography variant='body2' component='span' color='text.secondary'>
            Aslam Naseer
          </Typography>
        </Box>
        <CircularProgressWithLabel value={50} />
      </CardInnerWrapper>
      <Divider />
      <CardInnerWrapper>
        <Box display='flex' alignItems='center' gap={1}>
          {getIcon(fieldTimeOutlined, '#637381')}
          <Typography component='span' variant='body2' color='text.secondary'>
            23/10/2022
          </Typography>
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
