import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@mui/lab';
import { Box, Grid, styled, Typography } from '@mui/material';
import { Activity } from 'Components/Activity';
import { FileLayout } from 'Components/FileLayout';
import { CustomTimeline } from 'Components/Timeline';
import { IProjFiles } from 'data';
import { RndCrndInnerWrapper } from 'Layouts/common/RoundCornInnerWrapper';
import React from 'react';
import { activity, loremlong } from 'data';

export interface IOverview {
  projFiles: IProjFiles[];
}

const FileWrapperLayout = styled('div')((theme) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}));

const TimeLineCnt = <></>;

export const Overview = (props: IOverview) => {
  const { projFiles } = props;

  return (
    <Box>
      <Typography variant='subtitle1' gutterBottom={true} mt={2}>
        Summary
      </Typography>
      <Typography variant='body1' component='span' gutterBottom={true} mt={1}>
        {loremlong}
      </Typography>

      <Grid container spacing={4} mt={2}>
        <Grid item xs={12} sm={12} md={6}>
          <Typography variant='subtitle1' mb={2}>
            Project Files
          </Typography>

          <FileWrapperLayout>
            {projFiles.map((el) => (
              <React.Fragment key={el._id}>
                <FileLayout name={el.name} src={el.image} />
              </React.Fragment>
            ))}
          </FileWrapperLayout>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Typography variant='subtitle1' mb={2}>
            Activities
          </Typography>
          <Box display='flex' flexDirection='column' sx={{ gap: '1.5rem' }}>
            {activity.map((el) => (
              <React.Fragment key={el._id}>
                <Activity {...el} />
              </React.Fragment>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
