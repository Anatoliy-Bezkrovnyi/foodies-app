import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import css from './Header.module.css';
import iconsSprite from '../../images/icons/icons.svg';

export interface UserMenuProps {
  isDark?: boolean;
  userName: string;
  userAvatar?: string;
  onOpenLogOut?: () => void;
}

export const UserMenu = ({ isDark = false, userName, userAvatar, onOpenLogOut }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={css.userMenuWrapper} ref={menuRef}>
      <button
        type="button"
        className={clsx(css.userBarBtn, isDark && css.dark)}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        {userAvatar && <img src={userAvatar} alt={userName} className={css.avatar} />}
        <span className={css.userName}>{userName.toUpperCase()}</span>
        <svg className={css.chevron} width="18" height="18" aria-hidden="true">
          <use href={`${iconsSprite}#${isOpen ? 'icon-chevron-up' : 'icon-chevron-down'}`} />
        </svg>
      </button>

      {isOpen && (
        <div className={clsx(css.dropdown, isDark && css.dark)}>
          <Link to="/user" className={css.dropdownItem} onClick={() => setIsOpen(false)}>
            PROFILE
          </Link>
          <button
            type="button"
            className={css.dropdownItem}
            onClick={() => {
              setIsOpen(false);
              onOpenLogOut?.();
            }}
          >
            <span>LOG OUT</span>
            <svg width="16" height="16" aria-hidden="true">
              <use href={`${iconsSprite}#icon-arrow-up-right`} />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
