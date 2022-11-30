import { Box, Divider, Grid, styled, Theme, Typography } from '@mui/material';
import React from 'react';
import profileOutlined from '@iconify/icons-ant-design/profile-outlined';
import { Icon } from '@iconify/react';
import fileProtectOutlined from '@iconify/icons-ant-design/file-protect-outlined';
import { CircularProgressWithLabel } from 'Components/common/CircularProgress';
import Page from 'Components/common/Page';
// interface Props = {};

const ProjProgress = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: '1fr 1fr',
  gridTemplateColumns: '1fr 1fr',
  gap: '1rem',
  height: '100%',

  '& > div': {
    borderRadius: 15,
  },

  '& > div:nth-child(1)': {
    background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 60%, ${theme.palette.primary.main} 100%)`,
    gridRowStart: 1,
    gridColumnStart: 1,
    gridRowEnd: 3,
    gridColumnEnd: 2,
  },
  '& > div:nth-child(2)': {
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.grey[300]}`,
    gridRowStart: 1,
    gridColumnStart: 2,
    gridRowEnd: 2,
    gridColumnEnd: 3,
  },
  '& > div:nth-child(3)': {
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.grey[300]}`,
    gridRowStart: 2,
    gridColumnStart: 2,
    gridRowEnd: 3,
    gridColumnEnd: 3,
  },
}));
const ChartBox = styled('div')(({ theme }) => ({
  height: '100%',
  borderRadius: 15,
  padding: '2rem',
  backgroundColor: theme.palette.divider,
}));

const ProgInfoMini = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'nowrap',
  gap: '1rem',
  padding: '1.5rem',
}));

const ProjInfo = styled('div')(({ theme }) => ({
  color: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.5rem',
  padding: '1.5rem',
}));

export const Analytics = () => {
  return (
    <Page title='Analytics | Manager'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <ChartBox>
            <Typography variant='subtitle1'>Progress Chart</Typography>
          </ChartBox>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <ProjProgress>
            <ProjInfo>
              <Typography variant='subtitle1' align='center'>
                Progress
              </Typography>
              <CircularProgressWithLabel
                value={60}
                color='inherit'
                size='6.5rem'
                thickness={2}
              />
              <Divider
                sx={{
                  width: '100%',
                  borderColor: 'inherit',
                  opacity: 0.7,
                }}
                light={false}
              />
              <Box>
                <Typography variant='h4' align='center'>
                  20%
                </Typography>
                <Typography variant='subtitle1' align='center'>
                  Last Week
                </Typography>
              </Box>
            </ProjInfo>

            <ProgInfoMini>
              <div>
                <Typography variant='h3' sx={{ fontWeight: 700 }}>
                  24
                </Typography>
                <Typography variant='body1' component='span'>
                  Tasks Completed
                </Typography>
              </div>
              <Box display='content'>
                <Icon icon={profileOutlined} width={60} height={60} />
              </Box>
            </ProgInfoMini>

            <ProgInfoMini>
              <div>
                <Typography variant='h3' sx={{ fontWeight: 700 }}>
                  24
                </Typography>
                <Typography variant='body1' component='span'>
                  Tasks Remaining
                </Typography>
              </div>
              <Box display='content'>
                <Icon icon={profileOutlined} width={60} height={60} />
              </Box>
            </ProgInfoMini>
          </ProjProgress>
        </Grid>
      </Grid>
    </Page>
  );
};
