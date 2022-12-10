// import Dashboard from 'Pages/Dashboard';
// import { Dashboard } from 'Layouts/Dashboard';
import React, { useEffect } from 'react';
import Router from 'Router';
import { getMe } from 'store/slices/auth/extraReducers';
import { useAppDispatch } from 'store/hooks';
import { ThemeConfig } from 'theme';
import { fetchUsers } from 'store/slices/users/extraReducers';
import { fetchProjects } from 'store/slices/projects/extraReducers';
import { fetchTasks } from 'store/slices/tasks/extraReducers';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMe());
    dispatch(fetchUsers());
    dispatch(fetchProjects());
    dispatch(fetchTasks());
  }, []);

  return (
    <>
      <ThemeConfig>
        <Router />
      </ThemeConfig>
    </>
  );
};

export default App;
