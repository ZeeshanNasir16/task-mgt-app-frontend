import PropTypes from 'prop-types';
// material
// import { visuallyHidden } from '@material-ui/utils';
import {
  Box,
  Checkbox,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
} from '@mui/material';
import { Key } from 'react';

// ----------------------------------------------------------------------

// TaskListHead.propTypes = {
//   order: PropTypes.oneOf(['asc', 'desc']),
//   orderBy: PropTypes.string,
//   rowCount: PropTypes.number,
//   headLabel: PropTypes.array,
//   numSelected: PropTypes.number,
//   onRequestSort: PropTypes.func,
//   onSelectAllClick: PropTypes.func,
// };
interface ITABLE_HEAD {
  id: string;
  label: string;
  alignRight: boolean;
}

interface ITaskListHead {
  order: 'asc' | 'desc';
  orderBy: string;
  rowCount: number;
  headLabel: ITABLE_HEAD[];
  numSelected: number;
  onRequestSort: Function;
  //   onSelectAllClick: func;
}

export default function TaskListHead({
  order,
  orderBy,
  rowCount,
  headLabel,
  numSelected,
  onRequestSort,
}: // onSelectAllClick,
ITaskListHead) {
  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            // onChange={onSelectAllClick}
          />
        </TableCell>
        {headLabel.map(
          (headCell: {
            id: Key | null | undefined;
            alignRight: any;
            label: any;
          }) => (
            <TableCell
              key={headCell.id}
              align={headCell.alignRight ? 'right' : 'left'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                hideSortIcon
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box
                  // sx={{ ...visuallyHidden }}
                  >
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
}
