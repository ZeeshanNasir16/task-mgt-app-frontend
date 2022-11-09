import {
  Avatar,
  AvatarGroup,
  Box,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import { getIcon } from 'Utils/GetIcon';
import { User } from 'Components/User.interface';
import { RndCrndInnerWrapper } from 'Layouts/common/RoundCornInnerWrapper';
import { RndCrndWrapper } from 'Layouts/common/RoundCornWrapper';
import React from 'react';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import formOutlined from '@iconify/icons-ant-design/form-outlined';

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
  projTitle: string;
  teamMembers: User[];
  createdOn: string;
  viewer: 'user' | 'manager' | 'admin';
}

export const ProjBoardHeader = (props: ProjBoardHeadProps) => {
  const { projTitle, teamMembers, createdOn, viewer } = props;
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
            {projTitle}
          </Typography>
          <Box sx={{ display: 'content' }}>
            <IconButton sx={{ display: 'content' }}>
              {getIcon(formOutlined)}
            </IconButton>
          </Box>
        </Box>
        <ProjHeadDetails>
          <Typography variant='subtitle1'>{createdOn}</Typography>
          <AvatarGroup
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
          </AvatarGroup>
        </ProjHeadDetails>
      </Box>
    </RndCrndInnerWrapper>
  );
};

export default ProjBoardHeader;
