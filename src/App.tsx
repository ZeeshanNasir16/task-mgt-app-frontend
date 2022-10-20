// import Dashboard from 'Pages/Dashboard';
import { Dashboard } from 'Layouts/Dashboard';
import React from 'react';
import { ThemeConfig } from 'theme';

const App: React.FC = () => {
  return (
    <>
      <ThemeConfig>
        <Dashboard />
      </ThemeConfig>
    </>
  );
};

export default App;
