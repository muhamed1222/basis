
import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { Loader } from './components/Loader';

const App: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      {useRoutes(routes)}
    </Suspense>
  );
};

export default App;
