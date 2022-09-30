import { Router } from 'express';
import {
  createUserHandler,
  deleteUserHandler,
  getUserHandler,
  getUsersHandler,
  updateUserHandler,
} from '../../controllers/user.controller';
import requireUser from '../../middlewares/requireUser';
import deserializeUser from '../../middlewares/deserializeUser';
import validateResource from '../../middlewares/validateResource';

import {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  updateUserSchema,
} from '../../schemas/user.schema';

const routes = Router();

/**
 * @openapi
 * '/api/v1/users':
 *  get:
 *     tags:
 *     - Users
 *     summary: Get all registered users
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/CreateUserInput'
 *  post:
 *     tags:
 *     - Users
 *     summary: Create a user
 *     description: User registration.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *       409:
 *         description: Conflict
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             code: 409
 *             message: E-mail already exists
 * '/api/v1/users/{userId}':
 *  get:
 *     tags:
 *     - Users
 *     summary: Get a single user by the userId
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: The id of the user
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *       404:
 *         description: Not Found
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             code: 404
 *             message: User not found
 *  delete:
 *     tags:
 *     - Users
 *     summary: Delete user by the userId
 *     description: User account deletion
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: The id of the user
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
 *             message: Only user can delete their account
 *       404:
 *         description: Not Found
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             code: 404
 *             message: User not found
 *  put:
 *     tags:
 *     - Users
 *     summary: Update user by the userId
 *     description: Update user account information.
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: The id of the user
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *       401:
 *         description: Unhautorized
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             code: 401
 *             message: Only user can update their account
 *       404:
 *         description: Not Found
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             code: 404
 *             message: User not found
 */

routes
  .route('/')
  .get(getUsersHandler)
  .post([validateResource(createUserSchema)], createUserHandler);

routes
  .route('/:userId')
  .get(
    [deserializeUser, requireUser, validateResource(getUserSchema)],
    getUserHandler
  )
  .delete(
    [deserializeUser, requireUser, validateResource(deleteUserSchema)],
    deleteUserHandler
  )
  .put(
    [deserializeUser, requireUser, validateResource(updateUserSchema)],
    updateUserHandler
  );

export default routes;
