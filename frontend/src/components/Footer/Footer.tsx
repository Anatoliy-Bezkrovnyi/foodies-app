import clsx from 'clsx';
import Logo from '../Logo/Logo';
import Copyright from './Copyright';
import SocialLinks from './SocialLinks';
import useBrowserTheme from '../../hooks/useBrowserTheme';
import css from './Footer.module.css';

export interface FooterProps {
  isDark?: boolean;
}

const Footer = ({ isDark: isDarkProp }: FooterProps) => {
  const systemIsDark = useBrowserTheme();
  const isDark = isDarkProp ?? systemIsDark;

  return (
    <footer className={clsx(css.footerWrapper, isDark && css.dark)}>
      <div className={clsx('container', css.footer)}>
        <div className={css.top}>
          <Logo isDark={isDark} className={css.logo} />
          <SocialLinks isDark={isDark} />
        </div>
        <Copyright />
      </div>
    </footer>
  );
};

export default Footer;
