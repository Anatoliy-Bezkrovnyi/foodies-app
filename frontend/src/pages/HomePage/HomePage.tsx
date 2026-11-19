import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORY_PARAM, Recipes } from '../../components/HomePage/Recipes';
import { Testimonials } from '../../components/HomePage/Testimonials';

// Hero and Categories come in their own cards. A category tile opens the recipes block by
// setting ?category=<name>; until then the block can be opened directly, e.g. /?category=Dessert.
export const HomePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const hasCategory = searchParams.has(CATEGORY_PARAM);

  return (
    <main>
      {hasCategory && <Recipes />}
      <Testimonials />
    </main>
  );
};

export default HomePage;
