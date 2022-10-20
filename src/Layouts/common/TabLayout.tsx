import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';

interface ITabPanel {
  index: number;
  value: number;
  children: JSX.Element;
}

function TabPanel(props: ITabPanel) {
  const { children, value, index } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component='span'>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// function a11yProps(index: number) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };d
// }

interface ITabProps {
  label: string;
  Component: JSX.Element;
}

interface ITabLayout {
  tabs: ITabProps[];
}

export const TabLayout = ({ tabs }: ITabLayout) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          {tabs.map(({ label }, i) => (
            <Tab label={label} key={i} />
          ))}
        </Tabs>
      </Box>
      {tabs.map(({ Component }, i) => (
        <TabPanel value={value} index={i} key={i}>
          {Component}
        </TabPanel>
      ))}
    </Box>
  );
};
