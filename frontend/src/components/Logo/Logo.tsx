import clsx from 'clsx';
import { Link } from 'react-router-dom';
import css from './Logo.module.css';

export interface LogoProps {
  isDark?: boolean;
  className?: string;
  asDiv?: boolean;
}

const Logo = ({ isDark = false, className = '', asDiv = false }: LogoProps) => {
  const classes = clsx(css.logo, isDark && css.dark, className);

  if (asDiv) {
    return <div className={classes}>foodies</div>;
  }

  return (
    <Link to="/" className={classes}>
      foodies
    </Link>
  );
};

export default Logo;
