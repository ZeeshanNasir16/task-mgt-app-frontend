import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';

import {
  Button,
  Card,
  Chip,
  Container,
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
import Label from 'Components/common/Label';
import SearchNotFound from 'Components/common/SearchNotFound';
import { ConfirmDialog } from 'Components/dialogs/ConfirmDialog';
import Page from 'Components/common/Page';
import Scrollbar from 'Components/common/Scrollbar';

import { tasks as taskList, users } from 'data';
import TableHeadConfig from 'Components/common/TableHeadConfig';
import TaskMoreMenu from 'Components/Task/TaskMoreMenu';
import AddTask from 'Components/dialogs/AddTask';

// import Skeleton from '@material-ui/lab/Skeleton';
// import Skeleton from 'react-loading-skeleton';
// import AddToTableModal from 'dialogs/AddToManagerModal';
// import AddToGroupModal from 'dialogs/AddToGroupModal';

// import AddorEditModal from 'dialogs/AddorEditModal';
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
  id: string;
  label: string;
  alignRight?: boolean | false;
}

const TABLE_HEAD: ITable_Head[] = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'assignedTo', label: 'Assigned To', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'deadline', label: 'Deadline', alignRight: false },
  { id: 'options', label: '' },
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

export const TaskList = () => {
  const user = users['manager'];
  const [filteredtasks, setFilteredtasks] = useState([]);
  const [page, setPage] = useState<number>(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<Task>();
  const [selectedTask, setSelectedTask] = useState<string>();
  const [orderBy, setOrderBy] = useState<string>('name');
  const [isDelOpen, setIsDelOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [isAddToOpen, setIsAddToOpen] = useState<boolean>(false);
  const [isRemoveFromOpen, setIsRemoveFromOpen] = useState<boolean>(false);
  const [isAddToOpen2, setIsAddToOpen2] = useState<boolean>(false);
  const [isRemoveFromOpen2, setIsRemoveFromOpen2] = useState<boolean>(false);
  const [filterName, setFilterName] = useState<string>('');
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handleRequestSort = (
    _e: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const toggleDelOpen = () => setIsDelOpen((st) => !st);
  const toggleEditOpen = () => setIsEditOpen((st) => !st);
  const toggleCreateOpen = () => setIsCreateOpen((st) => !st);
  // const toggleAddToOpen = () => setIsAddToOpen((st) => !st);
  // const toggleRemoveFromOpen = () => setIsRemoveFromOpen((st) => !st);
  const toggleAddToOpen2 = () => setIsAddToOpen2((st) => !st);
  // const toggleRemoveFromOpen2 = () => setIsRemoveFromOpen2((st) => !st);

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

  const handleFilterByName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(e.target.value);
  };

  const emptyRows =
    page > 0 && taskList
      ? Math.max(0, (1 + page) * rowsPerPage - taskList.length)
      : 0;

  const isUserNotFound = filteredtasks.length === 0;

  // useEffect(() => {
  //   if (!taskList || taskList === null) return;
  //   setFilteredtasks(
  //     applySortFilter(taskList, getComparator(order, orderBy), filterName)
  //   );
  // }, [taskList, order, orderBy, filterName]);

  const handleDelete = () => {
    // deleteTask(selected, toggleDelOpen);
    console.log('Delete Task');
  };

  const getFormattedDate = (date: string) => {
    const dt = new Date(date);
    return dt.toDateString();
  };

  return (
    <Page title='Tasks | Task Manager App'>
      <Stack
        direction='row'
        // alignItems='rights'
        justifyContent='end'
        my={3}
      >
        {/* {user && user.role === 'Admin' && ( */}
        <Button
          variant='contained'
          onClick={toggleCreateOpen}
          startIcon={<Icon icon={plusFill} />}
        >
          New Task
        </Button>
        {/* )} */}
      </Stack>

      <AddTask open={isCreateOpen} toggleDialog={toggleCreateOpen} />

      {/* // For multiple item selected (checkbox) */}
      {/* <UserListToolbar
        numSelected={0}
        filterName={filterName}
        onFilterName={handleFilterByName}
        slug='Tasks'
      /> */}

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableHeadConfig
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={taskList ? taskList.length : 0}
              numSelected={0}
              onRequestSort={handleRequestSort}
              // onSelectAllClick={handleSelectAllClick}
            />

            <TableBody>
              {taskList
                ? taskList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: Task) => {
                      const { _id, description, assignedTo, status, deadline } =
                        row;
                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role='checkbox'
                          selected={false}
                          aria-checked={false}
                        >
                          {/* <TableCell padding='checkbox'>
                            <Checkbox
                                  checked={isItemSelected}
                                  onChange={(event) => handleClick(event, name)}
                                />
                          </TableCell> */}
                          <TableCell component='th' scope='row' padding='none'>
                            <Stack
                              direction='row'
                              alignItems='center'
                              spacing={2}
                            >
                              {/* <Avatar
                                    alt={name}
                                    src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${name
                                      .split(' ')
                                      .join('%20')}`}
                                  /> */}
                              <Typography variant='subtitle2' noWrap>
                                {description}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align='left'>{description}</TableCell>
                          <TableCell align='left'>
                            {assignedTo ? (
                              assignedTo.name
                            ) : (
                              <Chip label='Not Assigned' variant='outlined' />

                              // <Label variant='ghost' color='error'>
                              //   Not Assigned
                              // </Label>
                            )}
                          </TableCell>
                          <TableCell align='left'>
                            {status === 'In-Progress' ? (
                              <Chip
                                label='In Progress'
                                variant='outlined'
                                color='warning'
                              />
                            ) : (
                              // <Label variant='ghost' color='warning'>
                              //   {status}
                              // </Label>
                              <Chip
                                label={status}
                                variant='outlined'
                                color='success'
                              />
                            )}
                          </TableCell>
                          <TableCell align='left'>
                            {deadline && getFormattedDate(deadline)}
                          </TableCell>
                          {user && user.role === 'Manager' && (
                            <TableCell align='right'>
                              <TaskMoreMenu
                                currentTask={row}
                                setSelected={setSelected}
                                addToTable={!assignedTo}
                                toggleAddToOpen={() => {
                                  setSelectedTask(_id);
                                  toggleAddToOpen2();
                                }}
                                viewTask
                                viewLink={`/dashboard/tasks/${_id}`}
                                addToSlug='Assign to Group'
                                removeFromTable={
                                  assignedTo && status !== 'complete'
                                }
                                handleRemoveFrom={() => {
                                  const assignedToId =
                                    assignedTo && assignedTo._id
                                      ? assignedTo._id
                                      : assignedTo;
                                  console.log(assignedToId);
                                  // unAssignTaskFromGroup(_id, assignedToId);
                                }}
                                removeFromSlug='UnAssign'
                              />
                            </TableCell>
                          )}
                          {user && user.role === 'Employee' && (
                            <TableCell align='right'>
                              <TaskMoreMenu
                                currentTask={row}
                                setSelected={setSelected}
                                toggleEditOpen={toggleEditOpen}
                                noDelete
                                noEdit
                                viewTask
                                viewLink={`/dashboard/tasks/${_id}`}
                              />
                            </TableCell>
                          )}
                        </TableRow>
                      );
                    })
                : Array<any>(5)
                    .fill('')
                    .map(() => (
                      <TableRow>
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
            {/* {taskList && isUserNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align='center' colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={filterName} />
                  </TableCell>
                </TableRow>
              </TableBody>
            )} */}
          </Table>
        </TableContainer>
      </Scrollbar>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={taskList ? taskList.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <ConfirmDialog
        open={isDelOpen}
        toggleDialog={toggleDelOpen}
        dialogTitle='Delete This Task ?'
        confirmDelete={handleDelete}
      />
      {/* <AddorEditModal
        isOpen={isCreateOpen}
        closeDialog={toggleCreateOpen}
        createNew={(...props) => {
          addNewTask(...props, toggleCreateOpen);
        }}
        role='Task'
      /> */}
      {/* <AddorEditModal
        isOpen={isEditOpen}
        closeDialog={toggleEditOpen}
        updateUser={(...props) => {
          updateTask(...props, toggleEditOpen);
        }}
        editUser={selected}
        isEdit
        role='Task'
        viewOnly={user.role === 'Employee'}
      /> */}
      {/* <AddToTableModal
        isOpen={isAddToOpen}
        closeDialog={toggleAddToOpen}
        targetId={selectedTask}
        addAction={assignTaskToManager}
        data={managers}
        slug='Assign'
        resource='managers'
      /> */}
      {/* <AddToTableModal
        isOpen={isRemoveFromOpen}
        closeDialog={toggleRemoveFromOpen}
        targetId={selectedTask}
        addAction={unAssignTaskFromManger}
        data={managers}
        slug='unAssign'
        resource='managers'
      /> */}
      {/* <AddToGroupModal
        isOpen={isAddToOpen2}
        closeDialog={toggleAddToOpen2}
        targetId={selectedTask}
        addAction={assignTaskToGroup}
        data={groups}
        slug='Assign'
        resource='Task'
      /> */}
      {/* <AddToGroupModal
        isOpen={isRemoveFromOpen2}
        closeDialog={toggleRemoveFromOpen2}
        targetId={selectedTask}
        addAction={unAssignTaskFromGroup}
        data={groups}
        slug='unAssign'
        resource='Task'
      /> */}
    </Page>
  );
};
