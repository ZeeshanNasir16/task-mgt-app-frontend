// import DashboardWrapper from 'Pages/Dashboard';
import { Analytics } from 'Components/ProjectBoardView/BoardTabs/Analytics';
import { TaskBoard } from 'Components/Task/TaskBoard';
import { users } from 'data';
import { DashboardLayout } from 'Layouts/Dashboard';
import { MyAccount } from 'Pages/Account';
import { WorkSpace } from 'Pages/Manager/WorkSpace';
import { Route, Routes, Navigate } from 'react-router-dom';

const Router: React.FC = () => {
  const user = users['manager'];

  return (
    <Routes>
      <Route path='/' element={<DashboardLayout />}>
        {user.role === 'manager' ? (
          <Route>
            <Route path='/' element={<Navigate to='/workspace' />} />
            <Route path='workspace' element={<WorkSpace />} />
            <Route path='projectboard' element={<TaskBoard />} />
            <Route path='analytics' element={<Analytics />} />
            <Route path='account' element={<MyAccount />} />
          </Route>
        ) : (
          // <Route path='/login' element={<></>} />
          <Route path='/register' element={<></>} />
        )}
      </Route>
      <Route path='/login' element={<></>} />
      <Route path='/register' element={<></>} />

      {/* <Route path='*' element={<Navigate to='/' />} /> */}
    </Routes>
  );
};

export default Router;
