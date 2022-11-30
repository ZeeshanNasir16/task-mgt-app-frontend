import {
  Avatar,
  Button,
  Icon,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tabs,
  Typography,
} from '@mui/material';
import Page from 'Components/common/Page';
import { RndCrndWrapper } from 'Layouts/common/RoundCornWrapper';
import { TabLayout } from 'Layouts/common/TabLayout';
import { WrapperHeader } from 'Layouts/common/WrapperHeader';
import React, { useState } from 'react';
import { getIcon } from 'Utils/GetIcon';

import plusFill from '@iconify/icons-eva/plus-fill';
import Scrollbar from 'Components/common/Scrollbar';
import { employees } from 'data';
import TableHeadConfig from 'Components/common/TableHeadConfig';
import AddEmployee from 'Components/dialogs/AddEmployee';

type Props = {};

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
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'designation', label: 'Designation', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'options', label: '' },
];

const Employees = (props: Props) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('name');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);

  const handleRequestSort = (
    _e: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const toggleCreateOpen = () => setIsCreateOpen((st) => !st);

  return (
    <Page title='Employees | Manager'>
      <WrapperHeader heading='Employees' />
      <RndCrndWrapper>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='flex-end'
          mb={5}
        >
          {/* {user && user.role === 'Admin' && ( */}
          <Button
            variant='contained'
            onClick={toggleCreateOpen}
            startIcon={getIcon(plusFill)}
          >
            New Employee
          </Button>
          {/* )} */}
        </Stack>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHeadConfig
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={employees ? employees.length : 0}
                numSelected={0}
                onRequestSort={handleRequestSort}
                // onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {employees &&
                  employees
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: Employee) => {
                      const { _id, designation, image, name, email } = row;

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
                              <Avatar
                                alt={name}
                                src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${name
                                  .split(' ')
                                  .join('%20')}`}
                              />
                              <Typography variant='subtitle2' noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align='left'>{designation}</TableCell>
                          <TableCell align='left'>{email}</TableCell>

                          <TableCell align='right'>
                            {/* <UserMoreMenu
                              currentTask={row}
                              setSelected={setSelected}
                              toggleEditOpen={toggleEditOpen}
                              noDelete
                              noEdit
                              viewTask
                              viewLink={`/dashboard/tasks/${_id}`}
                            /> */}
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </RndCrndWrapper>
      <AddEmployee open={isCreateOpen} toggleDialog={toggleCreateOpen} />
    </Page>
  );
};

export default Employees;
