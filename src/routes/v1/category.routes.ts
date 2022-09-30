import { Router } from 'express';
import {
  createCategoryHandler,
  deleteCategoryHandler,
  getCategoryHandler,
  getCategoriesHandler,
  updateCategoryHandler,
} from '../../controllers/category.controller';
import requireUser from '../../middlewares/requireUser';
import deserializeUser from '../../middlewares/deserializeUser';
import validateResource from '../../middlewares/validateResource';

import {
  createCategorySchema,
  deleteCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} from '../../schemas/category.schema';

const routes = Router();

/**
 * @openapi
 * '/api/v1/categories':
 *  get:
 *     tags:
 *     - Categories
 *     summary: Get all registered categories
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/CreateCategoryInput'
 *  post:
 *     tags:
 *     - Categories
 *     summary: Create a category
 *     description: Only admins can create other categories.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryInput'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateCategoryResponse'
 *       401:
 *         description: Unhautorized
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             code: 401
 *             message: Only admins can create categories
 *       409:
 *         description: Conflict
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             code: 409
 *             message: Category already exists
 * '/api/v1/categories/{categoryId}':
 *  get:
 *     tags:
 *     - Categories
 *     summary: Get a single category by the categoryId
 *     parameters:
 *      - name: categoryId
 *        in: path
 *        description: The id of the category
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateCategoryResponse'
 *       404:
 *         description: Not Found
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             code: 404
 *             message: Category not found
 *  delete:
 *     tags:
 *     - Categories
 *     summary: Delete category by the categoryId
 *     description: Only admins can delete other categories.
 *     parameters:
 *      - name: categoryId
 *        in: path
 *        description: The id of the category
 *        required: true
 *     responses:
 *       204:
 *         description: No Content
 *       401:
 *         description: Unhautorized
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             code: 401
 *             message: Only admins can delete categories
 *       404:
 *         description: Not Found
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             code: 404
 *             message: Category not found
 *  put:
 *     tags:
 *     - Categories
 *     summary: Update category by the categoryId
 *     description: Only admins can update other categories.
 *     parameters:
 *      - name: categoryId
 *        in: path
 *        description: The id of the category
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateCategoryResponse'
 *       401:
 *         description: Unhautorized
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             code: 401
 *             message: Only admins can update categories
 *       404:
 *         description: Not Found
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             code: 404
 *             message: Category not found
 *       409:
 *         description: Conflict
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             code: 409
 *             message: Category has linked posts
 */

routes
  .route('/')
  .get(getCategoriesHandler)
  .post(
    [deserializeUser, requireUser, validateResource(createCategorySchema)],
    createCategoryHandler
  );

routes
  .route('/:categoryId')
  .get([validateResource(getCategorySchema)], getCategoryHandler)
  .delete(
    [deserializeUser, requireUser, validateResource(deleteCategorySchema)],
    deleteCategoryHandler
  )
  .put(
    [deserializeUser, requireUser, validateResource(updateCategorySchema)],
    updateCategoryHandler
  );

export default routes;
