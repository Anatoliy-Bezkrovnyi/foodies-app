import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ArrowIcon from '../../../assets/icons/arrow-up-right.svg?react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchLookups } from '../../../redux/meta/operations';
import { CATEGORY_PARAM } from '../Recipes';
import css from './Categories.module.css';

// Figma's curated category order and card proportions. Photos below are temporary
// substitutes pending export of the original Figma image assets.
const curated = [
  { name: 'Beef', image: 'photo-1546833999-b9f581a1996d', wide: false },
  { name: 'Breakfast', image: 'photo-1525351484163-7529414344d8', wide: false },
  { name: 'Desserts', image: 'photo-1488477181946-6428a0291777', wide: true },
  { name: 'Lamb', image: 'photo-1544025162-d76694265947', wide: true },
  { name: 'Goat', image: 'photo-1547592180-85f173990554', wide: false },
  { name: 'Miscellaneous', image: 'photo-1543353071-873f17a7a088', wide: false },
  { name: 'Pasta', image: 'photo-1473093295043-cdd812d0e601', wide: false },
  { name: 'Pork', image: 'photo-1432139555190-58524dae6a55', wide: true },
  { name: 'Seafood', image: 'photo-1559737558-2f5a35f4523b', wide: false },
  { name: 'Side', image: 'photo-1512621776951-a57141f2eefd', wide: true },
  { name: 'Starter', image: 'photo-1546069901-ba9599a7e63c', wide: false },
];

export const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.meta.categories);
  const [expanded, setExpanded] = useState(false);
  const [, setSearchParams] = useSearchParams();

  useEffect(() => { void dispatch(fetchLookups()); }, [dispatch]);
  // Some API responses wrap the categories array in { data } or { categories }.
  // Redux state is typed as Category[], but runtime JSON may still have those wrappers.
  // Normalize before reading .length or calling .map so an unexpected response cannot
  // crash the entire HomePage (see FE-05 browser regression).
  const cards = useMemo(() => {
    const extractCategories = (input: unknown): { name: string }[] => {
      let value: unknown = input;
      for (let depth = 0; depth < 3; depth += 1) {
        if (Array.isArray(value)) {
          return value.filter(
            (entry): entry is { name: string } =>
              typeof entry === 'object' && entry !== null &&
              'name' in entry && typeof entry.name === 'string' && Boolean(entry.name.trim()),
          );
        }
        if (typeof value !== 'object' || value === null) break;
        const record = value as Record<string, unknown>;
        value = record.data ?? record.categories ?? record.items ?? record.results;
      }
      return [];
    };

    const apiCategories = extractCategories(categories);
    if (!apiCategories.length) return curated;
    const available = new Set(apiCategories.map((item) => item.name.toLowerCase()));
    const main = curated.filter((item) => available.has(item.name.toLowerCase()));
    const extras = apiCategories
      .filter((item) => !curated.some((c) => c.name.toLowerCase() === item.name.toLowerCase()))
      .map((item) => ({ name: item.name, image: 'photo-1543353071-873f17a7a088', wide: false }));
    return [...main, ...extras];
  }, [categories]);

  const choose = (name: string) => {
    setSearchParams((params) => {
      const next = new URLSearchParams(params);
      next.set(CATEGORY_PARAM, name);
      next.delete('area');
      next.delete('ingredient');
      next.delete('page');
      return next;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <section className={css.categories} aria-labelledby="categories-title">
      <div className={css.intro}>
        <h2 id="categories-title">Categories</h2>
        <p>Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style and the warm atmosphere of the kitchen.</p>
      </div>
      <div className={`${css.grid} ${expanded ? css.expanded : ''}`}>
        {cards.map((item, index) => (
          <button
            key={item.name}
            className={`${css.card} ${item.wide && index < 11 ? css.wide : ''} ${index >= 8 ? css.mobileHidden : ''}`}
            type="button"
            onClick={() => choose(item.name)}
            aria-label={`Browse ${item.name} recipes`}
          >
            <img src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=950&q=85`} alt="" loading="lazy" />
            <span className={css.cardActions}><span className={css.name}>{item.name}</span><span className={css.arrow}><ArrowIcon aria-hidden="true" /></span></span>
          </button>
        ))}
        <button className={css.allCategories} type="button" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}>
          {expanded ? 'Show fewer categories' : 'All categories'}
          <ArrowIcon aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};

export default Categories;
