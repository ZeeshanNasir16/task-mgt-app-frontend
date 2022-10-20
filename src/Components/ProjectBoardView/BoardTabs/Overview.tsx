import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@mui/lab';
import { Box, Grid, Typography } from '@mui/material';
import { Activity } from 'Components/Activity';
import { FileLayout } from 'Components/FileLayout';
import { CustomTimeline } from 'Components/Timeline';
import { IProjFiles } from 'data';
import { RndCrndInnerWrapper } from 'Layouts/common/RoundCornInnerWrapper';
import React from 'react';
import { activity } from 'data';

export interface IOverview {
  projFiles: IProjFiles[];
}

const TimeLineCnt = <></>;

export const Overview = (props: IOverview) => {
  const { projFiles } = props;

  return (
    <Box>
      <Typography variant='subtitle1' gutterBottom={true} mt={2}>
        Summary
      </Typography>

      <Grid container spacing={4} mt={2}>
        <Grid item xs={12} sm={12} md={6}>
          <Typography variant='subtitle1' mb={2}>
            Project Files
          </Typography>

          <RndCrndInnerWrapper>
            {projFiles.map((el) => (
              <React.Fragment key={el._id}>
                <FileLayout name={el.name} src={el.image} />
              </React.Fragment>
            ))}
          </RndCrndInnerWrapper>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Typography variant='subtitle1' mb={2}>
            Activities
          </Typography>
          <Box display='flex' flexDirection='column' sx={{ gap: '1rem' }}>
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
