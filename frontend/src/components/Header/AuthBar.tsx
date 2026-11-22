import clsx from 'clsx';
import css from './Header.module.css';

export interface AuthBarProps {
  isDark?: boolean;
  onOpenSignIn?: () => void;
  onOpenSignUp?: () => void;
}

export const AuthBar = ({ isDark = false, onOpenSignIn, onOpenSignUp }: AuthBarProps) => {
  return (
    <div className={clsx(css.authBar, isDark && css.dark)}>
      <button type="button" className={css.signInBtn} onClick={onOpenSignIn}>
        SIGN IN
      </button>
      <button type="button" className={css.signUpBtn} onClick={onOpenSignUp}>
        SIGN UP
      </button>
    </div>
  );
};

export default AuthBar;
