import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';
import { Box } from '@mui/material';
// material

// ----------------------------------------------------------------------

interface PageProps {
  title: string;
  children: React.ReactNode;
  other?: Object;
}

const Page = forwardRef(
  (
    { children, title = '', ...other }: PageProps,
    ref: React.ForwardedRef<any>
  ) => (
    <Box ref={ref} {...other} height='100%'>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </Box>
  )
);

export default Page;
