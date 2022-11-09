import PropTypes from 'prop-types';
// material
import { Paper, PaperProps, Typography } from '@mui/material';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
};

interface ISearchNotFound {
  searchQuery: string;
  others?: PaperProps;
}

export default function SearchNotFound({
  searchQuery = '',
  ...other
}: ISearchNotFound) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align='center' variant='subtitle1'>
        Not found
      </Typography>
      <Typography variant='body2' align='center'>
        No results found for &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Try checking for typos or
        using complete words.
      </Typography>
    </Paper>
  );
}
