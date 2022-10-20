// import DashboardWrapper from 'Pages/Dashboard';
import { users } from 'data';
import { DashboardLayout } from 'Layouts/Dashboard';
import { ProjectBoardView } from 'Pages/Manager/ProjectBoard';
import { Route, Routes, Navigate } from 'react-router-dom';

const Router: React.FC = () => {
  const user = users['manager'];

  return (
    <Routes>
      <Route path='/' element={<DashboardLayout />}>
        {user.role === 'manager' ? (
          <Route>
            <Route path='/' element={<Navigate to='/workspace' />} />
            <Route path='workspace' element={<></>} />
            <Route path='projectboard' element={<ProjectBoardView />} />
          </Route>
        ) : (
          <Route path='/login' element={<></>} />
        )}
      </Route>
    </Routes>
  );
};

export default Router;
