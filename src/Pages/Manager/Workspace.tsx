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
import Page from 'Components/common/Page';
import { WrapperHeader } from 'Layouts/common/WrapperHeader';
import { Overview } from 'Components/ProjectBoardView/BoardTabs/Overview';
import { Analytics } from 'Components/ProjectBoardView/BoardTabs/Analytics';
import { TabLayout } from 'Layouts/common/TabLayout';
import { TaskList } from 'Components/ProjectBoardView/BoardTabs/TaskTable';

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
    label: 'Tasks',
    Component: <TaskList />,
  },
  // {
  //   label: 'Analytics',
  //   Component: (
  //     <React.Fragment>
  //       <Analytics />
  //     </React.Fragment>
  //   ),
  // },
];

export const WorkSpace = () => {
  return (
    <Page title='Workspace | Manager'>
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
    </Page>
  );
};
