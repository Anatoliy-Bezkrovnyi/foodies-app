import React from 'react';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes/AppRoutes';

export const App: React.FC = () => {
  return (
    <>
      <AppRoutes />
      <Toaster />
    </>
  );
};

export default App;
