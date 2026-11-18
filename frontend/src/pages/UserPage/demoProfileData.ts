import type { Paginated, ProfileRecipe, ProfileTab, ProfileUser, ProfileUserCard } from '../../services/userProfileApi';

/** FE-09 presentation-only fixture. Production IDs never use demo data. */
export const isDemoUser = (id?: string) => import.meta.env.DEV && (id === 'demo' || id === 'test');

const photos = [
  'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=720&q=80',
];
const names = ['Salmon avocado salad', 'Homemade flatbread', 'Berry cheesecake', 'Buddha bowl', 'Roasted vegetables', 'Garden salad', 'Pasta with herbs', 'Lemon pancakes', 'Cream soup', 'Tropical smoothie'];

export const demoProfile: ProfileUser = {
  id: 'demo', name: 'Nadia Baker', email: 'nadia@example.com', avatar: null,
  recipesCount: 10, favoritesCount: 8, followersCount: 25, followingCount: 14, isFollowing: false,
};

export const demoRecipes: ProfileRecipe[] = names.map((title, i) => ({
  id: `demo-recipe-${i + 1}`, title,
  description: 'A delicious recipe made with fresh ingredients and plenty of love.',
  thumb: photos[i % photos.length], ownerId: 'demo', ownerName: 'Nadia Baker', ownerAvatar: null,
}));

export const demoPeople: ProfileUserCard[] = [
  'Sophia Green', 'Oliver Scott', 'Olivia Taylor', 'Mason Hill', 'Emma Brown', 'Lucas Martin',
  'Amelia White', 'Henry Ford', 'Isabella King', 'James Wilson', 'Charlotte Hall', 'Ethan Young',
].map((name, i) => ({ id: `user-${i + 1}`, name, avatar: null, recipesCount: 4 + i * 2, isFollowing: i % 3 === 0 }));

export const demoTab = (tab: ProfileTab, page: number, limit: number): Paginated<ProfileRecipe | ProfileUserCard> => {
  const source = tab === 'recipes' || tab === 'favorites' ? demoRecipes : demoPeople;
  const count = tab === 'favorites' ? 8 : source.length;
  const items = source.slice(0, count).slice((page - 1) * limit, page * limit);
  return { items, page, total: count, totalPages: Math.max(1, Math.ceil(count / limit)) };
};
