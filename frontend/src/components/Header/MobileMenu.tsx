import clsx from 'clsx';
import NavMenu from './NavMenu';
import css from './Header.module.css';

export interface MobileMenuProps {
  isOpen: boolean;
  isDark?: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, isDark = false, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className={clsx(css.mobileMenu, isDark && css.dark)}>
      <div className="container">
        <NavMenu isDark={isDark} className={css.mobileNav} onNavigate={onClose} />
      </div>
    </div>
  );
};

export default MobileMenu;
