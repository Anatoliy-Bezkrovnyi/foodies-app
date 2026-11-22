import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import clsx from 'clsx';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import useBrowserTheme from '../../hooks/useBrowserTheme';
import css from './SharedLayout.module.css';

export const SharedLayout = () => {
  const isDark = useBrowserTheme();

  return (
    <div
      className={clsx(css.layoutWrapper, isDark ? css.dark : css.light)}
      data-theme={isDark ? 'dark' : 'light'}
    >
      <Header isDark={isDark} />
      <main className={css.mainContent}>
        <Suspense fallback={<div className={css.loader}>Завантаження...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer isDark={isDark} />
    </div>
  );
};

export default SharedLayout;
