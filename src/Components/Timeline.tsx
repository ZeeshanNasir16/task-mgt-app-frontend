import {
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineContent,
  Timeline,
} from '@mui/lab';
import React from 'react';

interface ICustomTimeline {
  comp: JSX.Element;
}

export const CustomTimeline = (props: ICustomTimeline) => {
  return (
    <Timeline>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>{props.comp}</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};
