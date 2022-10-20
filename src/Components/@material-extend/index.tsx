import { Theme, useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

// ----------------------------------------------------------------------

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface MHiddenProps {
  children: JSX.Element;
  type: 'up' | 'down';
  value: Breakpoint;
}

export const  MHidden =({ type, children, value }: MHiddenProps)=> {
  const hiddenUp = useMediaQuery((theme: Theme) => theme.breakpoints.up(value));
  const hiddenDown = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(value)
  );

  if (type === 'down') {
    return hiddenDown ? null : children;
  }

  if (type === 'up') {
    return hiddenUp ? null : children;
  }

  return null;
}
