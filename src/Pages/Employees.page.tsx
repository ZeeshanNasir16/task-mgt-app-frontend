import {
  Avatar,
  Button,
  Icon,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Tabs,
  Typography,
} from '@mui/material';
import Page from 'Components/common/Page';
import { RndCrndWrapper } from 'Layouts/common/RoundCornWrapper';
import { TabLayout } from 'Layouts/common/TabLayout';
import { WrapperHeader } from 'Layouts/common/WrapperHeader';
import React, { useEffect, useState } from 'react';
import { getIcon } from 'Utils/GetIcon';

import plusFill from '@iconify/icons-eva/plus-fill';
import Scrollbar from 'Components/common/Scrollbar';
import { employees } from 'data';
import TableHeadConfig from 'Components/common/TableHeadConfig';
import EmployeeFormDialog from 'Components/dialogs/EmployeeFormDialog';
import { useAppDispatch, useAppSelector } from 'store/hooks.store';
import { User } from 'interfaces/User';
import EmpMoreMenu from 'Components/User/UserMoreMenu';

type Props = {
  userId: string;
};

export interface Employee {
  _id: string;
  name: string;
  image: string;
  designation: string;
  email: string;
}

interface ITable_Head {
  id: string;
  label: string;
  alignRight?: boolean | false;
}

const TABLE_HEAD: ITable_Head[] = [
  { id: 'fullName', label: 'Full Name', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'options', label: '' },
];

const Employees = ({ userId }: Props) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('name');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);

  const usersStore = useAppSelector((st) => ({
    users: st.users.users.filter((el: User) => el._id !== userId),
    fetching: st.users.fetching,
  }));

  const { user } = useAppSelector((st) => st.auth);

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

  const dialogProps = {
    open: isCreateOpen,
    toggleDialog: toggleCreateOpen,
  };

  return (
    <Page title={`Employees | ${!!user && user.role}`}>
      <WrapperHeader heading='Employees' />
      <RndCrndWrapper>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='flex-end'
          mb={5}
        >
          {user && user.role === 'admin' && (
            <Button
              variant='contained'
              onClick={toggleCreateOpen}
              startIcon={getIcon(plusFill)}
            >
              New Employee
            </Button>
          )}
        </Stack>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHeadConfig
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={usersStore.users ? usersStore.users.length : 0}
                numSelected={0}
                onRequestSort={handleRequestSort}
                // onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {usersStore.fetching
                  ? Array(5)
                      .fill('')
                      .map((_, idx) => (
                        <TableRow>
                          {Array(4)
                            .fill('')
                            .map(() => (
                              <TableCell>
                                <Skeleton />
                              </TableCell>
                            ))}
                        </TableRow>
                      ))
                  : usersStore.users &&
                    usersStore.users.length > 0 &&
                    usersStore.users
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row: User) => {
                        const { _id, role, createdAt, email, fullName } = row;

                        return (
                          <TableRow
                            hover
                            key={_id}
                            tabIndex={-1}
                            role='checkbox'
                            selected={false}
                            aria-checked={false}
                          >
                            <TableCell
                              component='th'
                              scope='row'
                              padding='none'
                            >
                              <Stack
                                direction='row'
                                alignItems='center'
                                spacing={2}
                              >
                                <Avatar
                                  alt={`${fullName}`}
                                  src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${fullName
                                    .split(' ')
                                    .join('%20')}`}
                                />
                                <Typography variant='subtitle2' noWrap>
                                  {`${fullName}`}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align='left'>{role}</TableCell>
                            <TableCell align='left'>{email}</TableCell>

                            {!!user && user.role === 'admin' && (
                              <TableCell align='right'>
                                <EmpMoreMenu currentUser={row} />
                              </TableCell>
                            )}
                          </TableRow>
                        );
                      })}
              </TableBody>
              {!usersStore.fetching && usersStore.users.length === 0 && (
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
          count={usersStore.users ? usersStore.users.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </RndCrndWrapper>
      <EmployeeFormDialog dialogProps={dialogProps} />
    </Page>
  );
};

export default Employees;
