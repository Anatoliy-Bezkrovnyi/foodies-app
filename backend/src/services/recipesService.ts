import createHttpError from 'http-errors';
import { prisma } from '../db/prisma.js';
import { uploadImageBuffer } from '../utils/cloudinary.js';
import type { CreateRecipeInput } from '../validation/recipeSchemas.js';

interface GetRecipesParams {
  category?: string;
  ingredientId?: string;
  areaId?: string;
  page: number;
  perPage: number;
}

interface GetOwnRecipesParams {
  userId: string;
  page: number;
  perPage: number;
}

const recipeDetailsInclude = {
  owner: {
    select: {
      id: true,
      name: true,
      avatar: true,
    },
  },
  category: true,
  area: true,
  ingredients: {
    include: {
      ingredient: true,
    },
  },
  _count: {
    select: {
      favorites: true,
    },
  },
} as const;

// GET /api/recipes
export const getRecipes = async ({
  category,
  ingredientId,
  areaId,
  page,
  perPage,
}: GetRecipesParams) => {
  const where = {
    ...(category && {
      categoryName: category,
    }),
    ...(ingredientId && {
      ingredients: {
        some: {
          ingredientId,
        },
      },
    }),
    ...(areaId && {
      area: {
        id: areaId,
      },
    }),
  };

  const [recipes, totalItems] = await prisma.$transaction([
    prisma.recipe.findMany({
      where,
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: {
        createdAt: 'desc',
      },
      include: recipeDetailsInclude,
    }),
    prisma.recipe.count({ where }),
  ]);

  return {
    recipes,
    page,
    perPage,
    totalItems,
    totalPages: Math.ceil(totalItems / perPage),
  };
};

// GET /api/recipes/popular
export const getPopularRecipes = (limit = 4) => {
  return prisma.recipe.findMany({
    take: limit,
    orderBy: [
      {
        favorites: {
          _count: 'desc',
        },
      },
      {
        createdAt: 'desc',
      },
    ],
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      _count: {
        select: {
          favorites: true,
        },
      },
    },
  });
};

// GET /api/recipes/own
export const getOwnRecipes = async ({ userId, page, perPage }: GetOwnRecipesParams) => {
  const where = { ownerId: userId };

  const [recipes, totalItems] = await prisma.$transaction([
    prisma.recipe.findMany({
      where,
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: {
        createdAt: 'desc',
      },
      include: recipeDetailsInclude,
    }),
    prisma.recipe.count({ where }),
  ]);

  return {
    recipes,
    page,
    perPage,
    totalItems,
    totalPages: Math.ceil(totalItems / perPage),
  };
};

// GET /api/recipes/:id
export const getRecipeById = (recipeId: string) => {
  return prisma.recipe.findUnique({
    where: {
      id: recipeId,
    },
    include: recipeDetailsInclude,
  });
};

// POST /api/recipes
export const createRecipe = async (
  userId: string,
  input: CreateRecipeInput,
  file?: Express.Multer.File,
) => {
  const ingredientIds = input.ingredients.map((item) => item.id);

  const [category, area, existingIngredients] = await Promise.all([
    prisma.category.findUnique({ where: { name: input.category }, select: { name: true } }),
    prisma.area.findUnique({ where: { name: input.area }, select: { name: true } }),
    prisma.ingredient.findMany({
      where: { id: { in: ingredientIds } },
      select: { id: true },
    }),
  ]);

  if (!category) {
    throw createHttpError(400, `Category "${input.category}" does not exist`);
  }

  if (!area) {
    throw createHttpError(400, `Area "${input.area}" does not exist`);
  }

  if (existingIngredients.length !== ingredientIds.length) {
    throw createHttpError(400, 'One or more provided ingredients do not exist');
  }

  const thumbUrl = file ? await uploadImageBuffer(file.buffer, 'foodies/recipes') : null;

  return prisma.recipe.create({
    data: {
      title: input.title,
      description: input.description,
      categoryName: category.name,
      areaName: area.name,
      time: input.time,
      instructions: input.instructions,
      thumb: thumbUrl,
      ownerId: userId,
      ingredients: {
        create: input.ingredients.map((item) => ({
          ingredientId: item.id,
          measure: item.measure,
        })),
      },
    },
    include: recipeDetailsInclude,
  });
};

// DELETE /api/recipes/:id
export const deleteOwnRecipe = async (userId: string, recipeId: string) => {
  const recipe = await prisma.recipe.findUnique({
    where: { id: recipeId },
    select: { id: true, ownerId: true },
  });

  if (!recipe) {
    throw createHttpError(404, 'Recipe not found');
  }

  if (recipe.ownerId !== userId) {
    throw createHttpError(403, 'You can only delete your own recipes');
  }

  await prisma.recipe.delete({
    where: { id: recipeId },
  });

  return {
    id: recipeId,
    message: 'Recipe successfully deleted',
  };
};
