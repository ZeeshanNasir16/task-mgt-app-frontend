import { NavLink } from 'react-router-dom';
import {
  Toolbar,
  OutlinedInput,
  Typography,
  InputAdornment,
  Box,
  Button,
  styled,
} from '@mui/material';
import { Icon } from '@iconify/react';

import searchFill from '@iconify/icons-eva/search-fill';
import personOutline from '@iconify/icons-eva/person-outline';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  // '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    // borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

interface ITableMultiCheckView {
  numSelected: number;
  filterName: string;
  onFilterName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  slug?: string;
  viewLink?: string;
}

export default function TableMultiCheckView({
  numSelected,
  filterName,
  onFilterName,
  slug,
  viewLink,
}: ITableMultiCheckView) {
  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component='div' variant='subtitle1'>
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder={`Search ${slug || ''}...`}
          startAdornment={
            <InputAdornment position='start'>
              <Box
                component={Icon}
                icon={searchFill}
                sx={{ color: 'text.disabled' }}
              />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 && (
        <Button
          startIcon={<Icon icon={personOutline} />}
          component={(props) => (
            <NavLink {...props} to='viewLink' sx={{ flex: 1 }} />
          )}
          // component={NavLink}
          // href={viewLink}
        >
          View
        </Button>
      )}
    </RootStyle>
  );
}
