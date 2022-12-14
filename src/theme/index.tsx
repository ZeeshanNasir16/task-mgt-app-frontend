import React, { useMemo } from 'react';
// material
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from '@mui/material';
import { CssBaseline } from '@mui/material';
//
// import shape from './shape';
import palette from './palette';
import typography from './typography';
import GlobalStyles from './globalStyles';
import breakpoints from './breakpoints';
import components from './components';
// import shadows, { customShadows } from './shadows';

export const ThemeConfig: React.FunctionComponent = (props) => {
  const themeOptions = useMemo(
    () => ({
      palette,
      typography,
      breakpoints,
      components,
      // custom: {
      //   borderRadius: {
      //     lrg: 16,
      //     med: 10,
      //     sm: 6,
      //   },
      // },
      // shape,
    }),
    []
  );

  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {props.children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
