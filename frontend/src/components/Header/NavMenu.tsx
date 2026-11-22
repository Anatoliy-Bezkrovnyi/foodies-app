import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Header.module.css';

export interface NavMenuProps {
  isDark?: boolean;
  className?: string;
  onNavigate?: () => void;
}

export const NavMenu = ({ isDark = false, className = '', onNavigate }: NavMenuProps) => {
  return (
    <nav className={clsx(css.nav, isDark && css.dark, className)} aria-label="Main navigation">
      <NavLink
        to="/"
        end
        onClick={onNavigate}
        className={({ isActive }) => clsx(css.navLink, isActive && css.activeNavLink)}
      >
        HOME
      </NavLink>
      <NavLink
        to="/recipe/add"
        onClick={onNavigate}
        className={({ isActive }) => clsx(css.navLink, isActive && css.activeNavLink)}
      >
        ADD RECIPE
      </NavLink>
    </nav>
  );
};

export default NavMenu;
