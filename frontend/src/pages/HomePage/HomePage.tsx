import { useSearchParams } from 'react-router-dom';
import { Hero } from '../../components/Hero/Hero';
import { Categories } from '../../components/Categories/Categories';
import { CATEGORY_PARAM, Recipes } from '../../components/Recipes';
import { Testimonials } from '../../components/Testimonials';

export const HomePage = () => {
  const [searchParams] = useSearchParams();
  const hasCategory = searchParams.has(CATEGORY_PARAM);

  return (
    <main>
      <Hero />
      {hasCategory ? <Recipes /> : <Categories />}
      <Testimonials />
    </main>
  );
};

export default HomePage;
