import React from 'react';
import {
  Avatar,
  AvatarGroup,
  Container,
  Grid,
  styled,
  Typography,
} from '@mui/material';
import { RndCrndWrapper } from 'Layouts/common/RoundCornWrapper';
import { Project, projFiles } from 'data';
import { Box } from '@mui/system';
import { teamMembers } from 'data';
import ProjDetHeader from 'Components/ProjectBoardView/ProjBoardHeader';
import Page from 'Components/Page';
import { WrapperHeader } from 'Layouts/common/WrapperHeader';
import { Overview } from 'Components/ProjectBoardView/BoardTabs/Overview';
import { TabLayout } from 'Layouts/common/TabLayout';

const Tabs = [
  {
    label: 'Overview',
    Component: (
      <React.Fragment>
        <Overview projFiles={projFiles} />
      </React.Fragment>
    ),
  },
  {
    label: 'Progress',
    Component: (
      <div>
        <h1>Tab with heading</h1>
        <p>Hello I am a tab with a heading</p>
      </div>
    ),
  },
  {
    label: 'Analytics',
    Component: (
      <div>
        <h1>Tab with heading</h1>
        <p>Hello I am a tab with a heading</p>
      </div>
    ),
  },
];

export const ProjectBoardView = () => {
  return (
    <>
      <Page title='Project Board | Manager'>
        <Container maxWidth='xl'>
          <WrapperHeader heading='Project Board' />
          <RndCrndWrapper>
            <ProjDetHeader
              projTitle={Project.title}
              teamMembers={teamMembers}
              createdOn='Created On : 10 October 2022'
              viewer='manager'
            />
            <Box mt={3} width='100%'>
              <TabLayout tabs={Tabs} />
            </Box>
          </RndCrndWrapper>
        </Container>
      </Page>
    </>
  );
};
