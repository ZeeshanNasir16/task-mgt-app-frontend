// import Dashboard from 'Pages/Dashboard';
// import { Dashboard } from 'Layouts/Dashboard';
import React from 'react';
import Router from 'Router';
import { ThemeConfig } from 'theme';

const App: React.FC = () => {
  return (
    <>
      <ThemeConfig>
        <Router />
      </ThemeConfig>
    </>
  );
};

export default App;
