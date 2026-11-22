import { useState, useEffect } from 'react';
import useBrowserTheme from '../../hooks/useBrowserTheme';
import clsx from 'clsx';
import Logo from '../Logo/Logo';
import NavMenu from './NavMenu';
import UserMenu from './UserMenu';
import AuthBar from './AuthBar';
import MobileMenu from './MobileMenu';
import css from './Header.module.css';
import iconsSprite from '../../images/icons/icons.svg';

export interface HeaderProps {
  isDark?: boolean;
  onOpenSignIn?: () => void;
  onOpenSignUp?: () => void;
  onOpenLogOut?: () => void;
}

export const Header = ({
  isDark: isDarkProp,
  onOpenSignIn,
  onOpenSignUp,
  onOpenLogOut,
}: HeaderProps) => {
  const systemIsDark = useBrowserTheme();
  const isDark = isDarkProp ?? systemIsDark;

  // Тимчасовий мок до підключення auth slice у Redux
  const isLoggedIn = true;
  const user = {
    name: 'Victoria',
    avatarURL: 'https://via.placeholder.com/50',
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 375) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={clsx(css.header, isDark ? css.dark : css.light)}>
      <div className={clsx('container', css.inner)}>
        <Logo isDark={isDark} />

        {isLoggedIn && <NavMenu isDark={isDark} className={css.desktopNav} />}

        <div className={css.actions}>
          {isLoggedIn ? (
            <UserMenu
              isDark={isDark}
              userName={user.name}
              userAvatar={user.avatarURL}
              onOpenLogOut={onOpenLogOut}
            />
          ) : (
            <AuthBar isDark={isDark} onOpenSignIn={onOpenSignIn} onOpenSignUp={onOpenSignUp} />
          )}

          {isLoggedIn && (
            <button
              type="button"
              className={css.burgerBtn}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <svg width="28" height="28" aria-hidden="true">
                <use
                  href={`${iconsSprite}#${isMobileMenuOpen ? 'icon-close' : 'icon-burger-menu'}`}
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {isLoggedIn && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          isDark={isDark}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
