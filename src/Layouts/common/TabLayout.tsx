import { Box, Tab, Tabs, Typography } from '@mui/material';
import { TabPanel } from 'Layouts/common/TabLayoutProps';
import { useState } from 'react';

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
    console.log(value);
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
