import clsx from 'clsx';
import css from './Footer.module.css';
import iconsSprite from '../../images/icons/icons.svg';

export interface SocialLinksProps {
  isDark?: boolean;
  className?: string;
}

const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/goITclub/',
    iconId: 'icon-facebook',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/goitclub/',
    iconId: 'icon-instagram',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/c/GoIT',
    iconId: 'icon-youtube',
  },
];

const SocialLinks = ({ isDark = false, className = '' }: SocialLinksProps) => {
  return (
    <ul className={clsx(css.socialList, isDark && css.dark, className)}>
      {SOCIAL_LINKS.map(({ name, href, iconId }) => (
        <li key={name} className={css.socialItem}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className={css.socialLink}
          >
            <svg className={css.socialIcon} width="20" height="20" aria-hidden="true">
              <use href={`${iconsSprite}#${iconId}`} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
