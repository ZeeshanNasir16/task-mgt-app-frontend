import React, { ReactElement } from 'react';
import TabLayout from 'Layouts/common/TabLayout';
import { Project, projFiles } from 'data';
import { Avatar, Box, Grid, styled, Typography } from '@mui/material';
import { GeneratedIdentifierFlags } from 'typescript';
import { RndCrndInnerWrapper } from 'Layouts/common/RoundCornInnerWrapper';

const FileLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '0.5rem',
  flexWrap: 'nowrap',
}));

const Overview: JSX.Element = (
  <Box>
    <Typography variant='subtitle1' gutterBottom={true} mt={2}>
      Summary
    </Typography>
    {/* <Typography variant='body1' component='span'>
      {Project.description}
    </Typography> */}

    <Grid container spacing={4} mt={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant='subtitle1' mb={2}>
          Project Files
        </Typography>
        <RndCrndInnerWrapper>
          {projFiles.map((el) => {
            <FileLayout key={el._id}>
              <Avatar alt={el.name} src={el.image} variant='square' />
              <Typography variant='body1' mb={2}>
                {el.name}
              </Typography>
            </FileLayout>;
          })}
        </RndCrndInnerWrapper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant='subtitle1' mb={2}>
          Activities
        </Typography>
        {/* <RndCrndInnerWrapper>
          <FileLayout></FileLayout>
        </RndCrndInnerWrapper> */}
      </Grid>
    </Grid>
  </Box>
);

const tabs = [
  {
    label: 'Overview',
    Component: Overview,
  },
  {
    label: 'Progress',
    Component: Overview,
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

const ProjectTabLayout = () => {
  return (
    <>
      <TabLayout tabs={tabs} />
    </>
  );
};

export default ProjectTabLayout;
