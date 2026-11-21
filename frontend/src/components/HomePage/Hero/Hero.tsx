import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { openAuthModal } from '../../../redux/ui/uiSlice';
import css from './Hero.module.css';

// Photographic placeholders until the original Figma photographs are exported.
// The layout, copy and measurements are taken from the Foodies desktop/tablet/mobile frames.
const heroMain = 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85';
const heroSmall = 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=360&q=85';

export const Hero = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuth);
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const addRecipe = () => {
    if (isAuthenticated) navigate('/recipe/add');
    else dispatch(openAuthModal('signIn'));
  };

  return (
    <section className={css.hero} aria-labelledby="hero-title">
      <header className={css.header}>
        <Link className={css.logo} to="/" aria-label="Foodies home">foodies</Link>
        <nav className={css.nav} aria-label="Main navigation">
          <Link to="/" aria-current="page">Home</Link>
          <button type="button" onClick={addRecipe}>Add recipe</button>
        </nav>
        <div className={css.userActions}>
          {isAuthenticated ? (
            <Link className={css.profileLink} to={`/user/${encodeURIComponent(user?.id || '')}`}>
              {user?.avatar ? <img src={user.avatar} alt="" /> : <span aria-hidden="true">{(user?.name || 'U').slice(0, 1).toUpperCase()}</span>}
              <span className={css.profileText}>{user?.name || 'Profile'}</span>
            </Link>
          ) : (
            <>
              <button className={css.signIn} type="button" onClick={() => dispatch(openAuthModal('signIn'))}>Sign in</button>
              <button className={css.signUp} type="button" onClick={() => dispatch(openAuthModal('signUp'))}>Sign up</button>
            </>
          )}
        </div>
      </header>
      <div className={css.copy}>
        <h1 id="hero-title">Improve your<br className={css.desktopBreak} /> culinary talents</h1>
        <p>Amazing recipes for beginners in the world of cooking, enveloping you in the aromas and tastes of various cuisines.</p>
        <button className={css.addButton} type="button" onClick={addRecipe}>Add recipe</button>
      </div>
      <div className={css.heroPhotos} aria-hidden="true">
        <div className={css.photoSmall}><img src={heroSmall} alt="" loading="eager" /></div>
        <div className={css.photoMain}><img src={heroMain} alt="" loading="eager" /></div>
      </div>
    </section>
  );
};

export default Hero;
