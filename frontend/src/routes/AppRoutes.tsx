import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import SharedLayout from '../components/SharedLayout/SharedLayout';

const HomePage = React.lazy(() => import('../pages/HomePage/HomePage'));
const RecipePage = React.lazy(() => import('../pages/RecipePage/RecipePage'));
const AddRecipePage = React.lazy(() => import('../pages/AddRecipePage/AddRecipePage'));
const UserPage = React.lazy(() => import('../pages/UserPage/UserPage'));

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div>Завантаження...</div>}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="recipe/:id" element={<RecipePage />} />
          <Route path="add" element={<AddRecipePage />} />
          <Route path="user" element={<UserPage />} />
          <Route path="user/:id" element={<UserPage />} />
          <Route path="*" element={<div>Сторінку не знайдено (404)</div>} />
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
