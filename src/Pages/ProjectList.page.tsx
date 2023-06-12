import { Box, Button, styled } from '@mui/material';
import Page from 'Components/common/Page';
import ProjectFormDialog from 'Components/dialogs/ProjectFormDialog';
import ProjectCard from 'Components/Project/ProjectCard';
import NewProjCard from 'Components/Project/ProjectCard/NewProjCard';
import { Project_DB } from 'interfaces/Project';
import { RndCrndWrapper } from 'Layouts/common/RoundCornWrapper';
import { TabLayout } from 'Layouts/common/TabLayout';
import { WrapperHeader } from 'Layouts/common/WrapperHeader';
import React, { useState } from 'react';
import { useAppSelector } from 'store/hooks.store';

type Props = {};

const ListRoot = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(265px, 1fr))',
  justifyContent: 'stretch',
  alignItems: 'center',
  gap: '1.5rem',
  flexWrap: 'wrap',
}));

// const AddNewProjBtn = styled(Button)(({ theme }) => ({
//   top: 10,
//   right: 10,
//   position: 'absolute',
// }));

const ProjectList = (props: Props) => {
  const [newProjDialog, setNewProjDialog] = useState(false);
  const { projects, loading } = useAppSelector((st) => st.proj);

  const toggleDialog = () => {
    setNewProjDialog((st) => !st);
  };

  const Tabs = [
    {
      label: 'In Progress',
      Component: (
        <ListRoot>
          {!loading && (
            <React.Fragment>
              <NewProjCard handleClick={toggleDialog} />
              {projects &&
                projects.length > 0 &&
                projects.map((el: any) => (
                  <ProjectCard key={el._id} projDetails={el} />
                ))}
            </React.Fragment>
          )}
        </ListRoot>
      ),
    },
    {
      label: 'Completed',
      Component: (
        <ListRoot>
          {/* <ProjectCard />
          <ProjectCard /> */}
        </ListRoot>
      ),
    },
  ];

  return (
    <Page title='Workspace | Manager'>
      <Box display='flex' justifyContent='space-between' py={1}>
        <WrapperHeader heading='Projects' />
        {/* <Button
          variant='contained'
          color='primary'
          size='small'
          sx={{ maxHeight: 40 }}
          onClick={toggleDialog}
        >
          New Project
        </Button> */}
      </Box>

      <RndCrndWrapper>
        <TabLayout tabs={Tabs} />
      </RndCrndWrapper>

      <ProjectFormDialog open={newProjDialog} toggleDialog={toggleDialog} />
    </Page>
  );
};

export default ProjectList;
