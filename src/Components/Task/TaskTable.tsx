import { Icon } from '@iconify/react';
import { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';

import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

// components
// import Label from 'Components/common/Label';
// import SearchNotFound from 'Components/common/SearchNotFound';
import Page from 'Components/common/Page';
import Scrollbar from 'Components/common/Scrollbar';

import TableHeadConfig from 'Components/common/TableHeadConfig';
import TaskMoreMenu from 'Components/Task/TaskMoreMenu';
import TaskFormDialog from 'Components/dialogs/TaskFormDialog';
import { useAppSelector } from 'store/hooks.store';
import { Task_DB } from 'interfaces/Task';
import { dateFormat } from 'Utils/Date';

// import Skeleton from 'react-loading-skeleton';
// import Label from 'components/Label';

// ----------------------------------------------------------------------

export interface Task {
  _id: string;
  description: string;
  assignedTo: { name: string; image: string; _id: string };
  deadline: string;
  status: string;
}

interface ITable_Head {
  id: keyof Task_DB;
  label: string;
  alignRight?: boolean | false;
}

const TABLE_HEAD: ITable_Head[] = [
  { id: 'title', label: 'Name', alignRight: false },
  { id: 'assignedTo', label: 'Assigned To', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'deadLine', label: 'Deadline', alignRight: false },
  { id: '_id', label: '' },
];

// ----------------------------------------------------------------------

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface IProps {
  projectId: string;
  managerId: string;
}

const TaskTable = (props: IProps) => {
  const { user } = useAppSelector((st) => st.auth);
  // const { tasks, loading } = useAppSelector((st) => st.tasks);
  const taskStore = useAppSelector((st) => ({
    tasks: st.tasks.tasks.filter(
      (el: Task_DB) => el.project === props.projectId
    ),
    loading: st.tasks.loading,
  }));

  // const [filteredtasks, setFilteredtasks] = useState<any>([]);
  const [page, setPage] = useState<number>(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('name');
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  // const [filterName, setFilterName] = useState<string>('');
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handleRequestSort = (
    _e: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const toggleCreateOpen = () => setIsCreateOpen((st) => !st);

  const handleChangePage = (
    _e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  // const handleFilterByName = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFilterName(e.target.value);
  // };

  const emptyRows =
    page > 0 && taskStore.tasks
      ? Math.max(0, (1 + page) * rowsPerPage - taskStore.tasks.length)
      : 0;

  // const isUserNotFound = filteredtasks.length === 0;

  // useEffect(() => {
  //   if (!taskStore.tasks || taskStore.tasks === null) return;
  //   taskStore.tasks.length > 0 &&
  //     setFilteredtasks(applySortFilter(taskStore.tasks, getComparator(order, orderBy)));
  // }, [taskStore.tasks, order, orderBy]);

  const dialogProps = {
    open: isCreateOpen,
    toggleDialog: toggleCreateOpen,
  };

  return (
    <Page title='Tasks | Task Manager App'>
      <Box my={5}>
        <Divider />
      </Box>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        my={3}
      >
        {/* {user && user.role === 'Admin' && ( */}

        <Typography variant='h5'>Tasks</Typography>
        <Button
          variant='contained'
          onClick={toggleCreateOpen}
          startIcon={<Icon icon={plusFill} />}
        >
          New Task
        </Button>
        {/* )} */}
      </Stack>
      <TaskFormDialog
        dialogProps={dialogProps}
        managerId={props.managerId}
        projectId={props.projectId}
      />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableHeadConfig
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={taskStore.tasks ? taskStore.tasks.length : 0}
              numSelected={0}
              onRequestSort={handleRequestSort}
              // onSelectAllClick={handleSelectAllClick}
            />

            <TableBody>
              {!taskStore.loading
                ? taskStore.tasks
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: Task_DB) => {
                      const {
                        _id,
                        title,
                        assignedTo,
                        status,
                        deadLine,
                        assignedBy,
                        project,
                      } = row;

                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role='checkbox'
                          selected={false}
                          aria-checked={false}
                        >
                          <TableCell component='th' scope='row' padding='none'>
                            <Stack
                              direction='row'
                              alignItems='center'
                              spacing={2}
                            >
                              <Typography variant='subtitle2' noWrap>
                                {title}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            {!!assignedTo && assignedTo.user ? (
                              <Box
                                display='flex'
                                flexWrap='nowrap'
                                alignItems='center'
                                gap={1}
                              >
                                <Avatar
                                  key={assignedTo.user._id}
                                  sx={{ width: 25, height: 25 }}
                                  alt={assignedTo.user.firstName}
                                  src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${assignedTo.user?.firstName} ${assignedTo.user?.lastName}`}
                                />
                                <Typography variant='body2'>
                                  {assignedTo.user.firstName}{' '}
                                  {assignedTo.user.lastName}
                                </Typography>
                              </Box>
                            ) : (
                              <Chip
                                label='Not Assigned'
                                variant='outlined'
                                color='error'
                              />
                            )}
                          </TableCell>
                          <TableCell align='left'>
                            {status === 'todo' ? (
                              <Chip
                                label='Todo'
                                variant='outlined'
                                color='default'
                              />
                            ) : status === 'inProgress' ? (
                              <Chip
                                label={status}
                                variant='outlined'
                                color='warning'
                              />
                            ) : status === 'review' ? (
                              <Chip
                                label={status}
                                variant='outlined'
                                color='info'
                              />
                            ) : (
                              <Chip
                                label={status}
                                variant='outlined'
                                color='success'
                              />
                            )}
                          </TableCell>
                          <TableCell align='left'>
                            {deadLine && dateFormat(deadLine, 'MM-dd-yyyy')}
                          </TableCell>
                          {user &&
                            (user.role === 'manager' ||
                              user.role === 'admin') && (
                              <TableCell align='right'>
                                <TaskMoreMenu
                                  managerId={assignedBy._id}
                                  projectId={project}
                                  currentTask={row}
                                />
                              </TableCell>
                            )}
                        </TableRow>
                      );
                    })
                : Array<any>(5)
                    .fill('')
                    .map((_, ind) => (
                      <TableRow key={`task-table-${ind}`}>
                        <TableCell></TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                      </TableRow>
                    ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            {/* {tasks && isUserNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align='center' colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={filterName} />
                  </TableCell>
                </TableRow>
              </TableBody>
            )} */}
            {taskStore.tasks.length === 0 && (
              <TableBody>
                <TableRow>
                  <TableCell align='center' colSpan={4} sx={{ py: 3 }}>
                    <Typography variant='h5' align='center'>
                      Nothing to show
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={taskStore.tasks ? taskStore.tasks.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Page>
  );
};

export default TaskTable;
