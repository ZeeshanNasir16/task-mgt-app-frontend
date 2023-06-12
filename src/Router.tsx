import { Route, Routes, Navigate } from 'react-router-dom';

import { DashboardLayout } from 'Layouts/Dashboard';

import { TaskBoard } from 'Components/Task/TaskBoard';
import Loading from 'Components/common/Loading';

import ProjectList from 'Pages/ProjectList.page';
import Login from 'Pages/Login.page';
import ProjectOverwiew from 'Pages/ProjectOverview.page';
import Employees from 'Pages/Employees.page';

import { useAppDispatch, useAppSelector } from 'store/hooks.store';
import { MyAccount } from 'Pages/Account.page';
import React, { useEffect } from 'react';
import { fetchUsers } from 'store/slices/users/extraReducers.user';
import { fetchProjects } from 'store/slices/projects/extraReducers.project';
import { fetchTasks } from 'store/slices/tasks/extraReducers.tasks';

const Router: React.FC = () => {
  const { user, isLoggedIn, authenticating } = useAppSelector((st) => st.auth);
  const dispatch = useAppDispatch();

  if (isLoggedIn) {
    dispatch(fetchUsers());
    dispatch(fetchProjects());
    dispatch(fetchTasks());
  }

  if (authenticating) return <Loading />;
  return (
    <React.Fragment>
      {isLoggedIn && user ? (
        <Routes>
          <Route path='/' element={<DashboardLayout />}>
            {user?.role === 'admin' ? (
              <Route>
                <Route path='/' element={<Navigate to='/projects' />} />
                <Route path='projects' element={<ProjectList />} />
                <Route path='projects/:id' element={<ProjectOverwiew />} />
                <Route
                  path='employees'
                  element={<Employees userId={user._id} />}
                />
              </Route>
            ) : user?.role === 'manager' ? (
              <Route>
                <Route path='/' element={<Navigate to='/projects' />} />
                <Route path='projects' element={<ProjectList />} />
                <Route path='projects/:id' element={<ProjectOverwiew />} />
                <Route
                  path='employees'
                  element={<Employees userId={user._id} />}
                />
                <Route path='/profile' element={<Navigate to='/myprofile' />} />
              </Route>
            ) : (
              <Route>
                <Route path='/' element={<Navigate to='/taskboard' />} />
                <Route
                  path='taskboard'
                  element={<TaskBoard userId={user._id} />}
                />
                <Route path='/myprofile' element={<MyAccount />} />
              </Route>
            )}
            <Route path='*' element={<Navigate to='/' />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<></>} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      )}
    </React.Fragment>
  );
};

export default Router;
