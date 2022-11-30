import { Route, Routes, Navigate } from 'react-router-dom';

import { Analytics } from 'Components/Project/Analytics';
import { TaskBoard } from 'Components/Task/TaskBoard';

import { DashboardLayout } from 'Layouts/Dashboard';

import ProjectList from 'Pages/ProjectList';
import { MyAccount } from 'Pages/Account';
import Login from 'Pages/Login';
import { WorkSpace } from 'Pages/Manager/WorkSpace';

import { users } from 'data';
import Employees from 'Pages/Employees';

const Router: React.FC = () => {
  const user = users['admin'];
  console.log('router');
  return (
    <Routes>
      <Route path='/' element={<DashboardLayout />}>
        {/* {user.role === 'manager' ? ( */}
        <Route>
          <Route path='/' element={<Navigate to='/workspace' />} />
          <Route path='workspace' element={<WorkSpace />} />
          <Route path='projectboard' element={<TaskBoard />} />
          <Route path='analytics' element={<Analytics />} />
          <Route path='account' element={<MyAccount />} />
        </Route>
        {/* ) : user.role === 'admin' ? ( */}
        <Route>
          <Route path='/' element={<Navigate to='/dashboard' />} />
          <Route path='workspace' element={<WorkSpace />} />
          <Route path='taskboard' element={<TaskBoard />} />
          <Route path='dashboard' element={<></>} />

          <Route path='employees' element={<Employees />} />
          <Route path='projects' element={<ProjectList />} />
          <Route path='projects/:name' element={<WorkSpace />} />
          <Route path='analytics' element={<></>} />
        </Route>
        {/* ) : ( */}
        {/* <Route path='/' element={<></>} /> */}
        {/* )} */}
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<></>} />

      {/* <Route path='*' element={<Navigate to='/' />} /> */}
    </Routes>
  );
};

export default Router;
