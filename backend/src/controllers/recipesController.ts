import type { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { getRecipes, getPopularRecipes, getRecipeById } from '../services/recipesService.js';

const DEFAULT_POPULAR_LIMIT = 4;
const MAX_POPULAR_LIMIT = 20;

// GET /api/recipes
export const getRecipesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const perPage = Math.min(50, Math.max(1, Number(req.query.perPage) || 12));

    const category = typeof req.query.category === 'string' ? req.query.category : undefined;

    const ingredientId =
      typeof req.query.ingredientId === 'string' ? req.query.ingredientId : undefined;

    const areaId = typeof req.query.areaId === 'string' ? req.query.areaId : undefined;

    const result = await getRecipes({
      category,
      ingredientId,
      areaId,
      page,
      perPage,
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// GET /api/recipes/popular
export const getPopularRecipesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsedLimit = Number(req.query.limit);
    const limit =
      Number.isFinite(parsedLimit) && parsedLimit >= 1
        ? Math.min(MAX_POPULAR_LIMIT, Math.trunc(parsedLimit))
        : DEFAULT_POPULAR_LIMIT;

    const recipes = await getPopularRecipes(limit);
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};

// GET /api/recipes/:id
export const getRecipeByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recipe = await getRecipeById(req.params.id);

    if (!recipe) {
      throw createHttpError(404, 'Recipe not found');
    }

    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
};
