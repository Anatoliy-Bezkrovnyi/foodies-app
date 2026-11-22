import { Router } from 'express';
import {
  createRecipeController,
  deleteRecipeController,
  getOwnRecipesController,
  getRecipesController,
  getPopularRecipesController,
  getRecipeByIdController,
} from '../controllers/recipesController.js';
import { authenticate } from '../middlewares/authenticate.js';
import { uploadRecipeThumb } from '../middlewares/uploadRecipeThumb.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createRecipeSchema, parseRecipeFormData } from '../validation/recipeSchemas.js';

const recipesRouter = Router();

// Static routes MUST be declared before /:id
recipesRouter.get('/', getRecipesController);
recipesRouter.get('/popular', getPopularRecipesController);
recipesRouter.get('/own', authenticate, getOwnRecipesController);

recipesRouter.post(
  '/',
  authenticate,
  uploadRecipeThumb,
  parseRecipeFormData,
  validateBody(createRecipeSchema),
  createRecipeController,
);

recipesRouter.get('/:id', getRecipeByIdController);
recipesRouter.delete('/:id', authenticate, deleteRecipeController);

export default recipesRouter;
