import React from 'react';
import { Avatar, AvatarGroup, styled, Typography } from '@mui/material';
import { RndCrndWrapper } from 'Layouts/common/RoundCornWrapper';
import { Project } from 'data';
import { Box } from '@mui/system';
import { teamMembers } from 'data';
import ProjectTabLayout from 'Components/ProjectView/ProjectTabLayout';

const InnerWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  gap: '2.5rem',
}));

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

const ProjectView = () => {
  return (
    <>
      <RndCrndWrapper>
        <InnerWrapper>
          <Box>
            <Typography
              variant='h3'
              sx={{
                textTransform: 'uppercase',
                fontWeight: 400,
                marginBottom: '0.5rem !important',
              }}
            >
              {Project.title}
            </Typography>
            <ProjHeadDetails>
              <Typography variant='subtitle1'>
                Created On : 10 October 2022
              </Typography>
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

          <ProjectTabLayout />
          {/* <Typography variant='body1'>{Project.description}</Typography> */}
        </InnerWrapper>
      </RndCrndWrapper>
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <RndCrndWrapper>
          <Typography variant='subtitle1'>{Project.title}</Typography>
        </RndCrndWrapper>
        <RndCrndWrapper>
          <Typography variant='subtitle1'>{Project.title}</Typography>
        </RndCrndWrapper>
      </Box>
    </>
  );
};

export default ProjectView;
