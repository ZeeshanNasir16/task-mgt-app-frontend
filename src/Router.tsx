import { Route, Routes, Navigate } from 'react-router-dom';

import { Analytics } from 'Components/Project/Analytics';
import { TaskBoard } from 'Components/Task/TaskBoard';

import { DashboardLayout } from 'Layouts/Dashboard';

import ProjectList from 'Pages/ProjectList';
import { MyAccount } from 'Pages/Account';
import Login from 'Pages/Login';
import ProjectOverwiew from 'Pages/ProjectOverview';

import { users } from 'data';
import Employees from 'Pages/Employees';
import { useAppSelector } from 'store/hooks';
import { Box } from '@mui/material';
import Loading from 'Components/common/Loading';
// import { useSelector } from 'react-redux';

const Router: React.FC = () => {
  const { user, isLoggedIn, authenticating } = useAppSelector((st) => st.auth);

  if (authenticating) return <Loading />;
  return (
    <>
      {isLoggedIn && user ? (
        <Routes>
          <Route path='/' element={<DashboardLayout />}>
            {user?.role === 'admin' ? (
              <Route>
                <Route path='/' element={<Navigate to='/projects' />} />
                <Route path='projects' element={<ProjectList />} />
                <Route path='projects/:id' element={<ProjectOverwiew />} />
                <Route path='employees' element={<Employees />} />
                <Route path='analytics' element={<Analytics />} />
                {/* <Route path='taskboard' element={<TaskBoard />} /> */}
              </Route>
            ) : user?.role === 'manager' ? (
              <Route>
                <Route path='/' element={<Navigate to='/dashboard' />} />
                <Route path='projects' element={<ProjectList />} />
                <Route path='projects/:id' element={<ProjectOverwiew />} />
                <Route
                  path='taskboard'
                  element={<TaskBoard userId={user._id} />}
                />
                <Route path='dashboard' element={<></>} />
                <Route path='employees' element={<Employees />} />
                {/* <Route path='employees' element={<Employees />} />
                <Route path='projects/:name' element={<WorkSpace />} />
                <Route path='analytics' element={<></>} /> */}
              </Route>
            ) : (
              <Route>
                <Route path='/' element={<Navigate to='/taskboard' />} />
                <Route
                  path='taskboard'
                  element={<TaskBoard userId={user._id} />}
                />
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
    </>
  );
};

export default Router;
