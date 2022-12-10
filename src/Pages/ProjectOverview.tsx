import React, { useEffect } from 'react';
import { RndCrndWrapper } from 'Layouts/common/RoundCornWrapper';
// import { Project, projFiles } from 'data';
import { Box } from '@mui/system';
import { teamMembers } from 'data';
import ProjDetHeader from 'Components/Project/ProjBoardHeader';
import Page from 'Components/common/Page';
import { WrapperHeader } from 'Layouts/common/WrapperHeader';
import { Overview } from 'Components/Project/ProjOverview';
import { TabLayout } from 'Layouts/common/TabLayout';
import TaskTable from 'Components/Task/TaskTable';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { dateFormat } from 'Utils/Date';

import fieldTimeOutlined from '@iconify/icons-ant-design/field-time-outlined';
import dashboardOutlined from '@iconify/icons-ant-design/dashboard-outlined';
import { Icon, IconifyIcon } from '@iconify/react';
import Loading from 'Components/common/Loading';

const ProjectOverwiew = () => {
  const { id } = useParams();
  const projStore = useAppSelector((st) => ({
    project: st.proj.projects.filter((el: any) => el._id === id),
    loading: st.proj.loading,
  }));

  // const Tabs = [
  //   {
  //     label: 'Overview',
  //     Component: (
  //       <React.Fragment>
  //         <Overview projFiles={projFiles} />
  //       </React.Fragment>
  //     ),
  //   },
  //   {
  //     label: 'Tasks',
  //     Component: <TaskList />,
  //   },

  // ];

  if (projStore.loading) return <Loading />;

  return (
    <Page title='Workspace | Manager'>
      <WrapperHeader heading='Project Board' />
      <RndCrndWrapper>
        <ProjDetHeader project={projStore.project[0]} viewer='manager' />
        <Box mt={3} width='100%'>
          {/* <TabLayout tabs={Tabs} /> */}
          <Typography variant='subtitle1' gutterBottom={true} mt={2}>
            Summary
          </Typography>
          <Typography
            variant='body1'
            component='span'
            gutterBottom={true}
            mt={1}
          >
            {projStore.project[0].description}
          </Typography>

          <TaskTable
            projectId={projStore.project[0]._id}
            managerId={projStore.project[0].assignedTo._id}
          />
        </Box>
      </RndCrndWrapper>
    </Page>
  );
};

export default ProjectOverwiew;
