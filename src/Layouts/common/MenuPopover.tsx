import {
  alpha,
  Popover,
  PopoverProps,
  styled,
  SxProps,
  Theme,
} from '@mui/material';
// import PropTypes from 'prop-types';
// material
// import { Popover } from '@material-ui/core';
// import { alpha, styled } from '@material-ui/core/styles';

// ----------------------------------------------------------------------
const ArrowStyle = styled('span')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    top: -7,
    zIndex: 1,
    width: 12,
    right: 20,
    height: 12,
    content: "''",
    position: 'absolute',
    borderRadius: '0 0 4px 0',
    transform: 'rotate(-135deg)',
    background: theme.palette.background.paper,
    borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
    borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
  },
}));

// ----------------------------------------------------------------------

// MenuPopover.propTypes = {
//   children: PropTypes.node.isRequired,
//   sx: PropTypes.object,
// };

interface IMenuPopover {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  open: boolean;
  anchorEL: null;
  onClose: () => void;
  compProps?: PopoverProps;
}

export default function MenuPopover({
  children,
  sx,
  open,
  onClose,
  anchorEL,
  compProps,
}: IMenuPopover) {
  return (
    <Popover
      open={open}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      anchorEl={anchorEL}
      onClose={onClose}
      PaperProps={{
        sx: {
          mt: 1.5,
          ml: 0.5,
          overflow: 'inherit',
          // boxShadow: (theme) => theme.customShadows.z20,
          // border: (theme) => `solid 1px ${theme.palette.grey[500_8]}`,
          width: 200,
          ...sx,
        },
      }}
      {...compProps}
    >
      <ArrowStyle className='arrow' />

      {children}
    </Popover>
  );
}
