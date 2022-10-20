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
import { overrides } from './overrides';
import breakpoints from './breakpoints';
// import shadows, { customShadows } from './shadows';

export const ThemeConfig: React.FunctionComponent = (props) => {
  const themeOptions = useMemo(
    () => ({
      palette,
      typography,
      overrides,
      breakpoints,
      // customShadows,
      // shape,
    }),
    []
  );

  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
