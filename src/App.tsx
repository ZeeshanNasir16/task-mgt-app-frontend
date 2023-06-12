import React, { useEffect } from 'react';
import Router from 'Router';
import { getMe } from 'store/slices/auth/extraReducers.auth';
import { useAppDispatch } from 'store/hooks.store';
import { ThemeConfig } from 'theme';
import { fetchUsers } from 'store/slices/users/extraReducers.user';
import { fetchProjects } from 'store/slices/projects/extraReducers.project';
import { fetchTasks } from 'store/slices/tasks/extraReducers.tasks';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <ThemeConfig>
      <Router />
    </ThemeConfig>
  );
};

export default App;
