import { Router } from 'express';
import {
  createPostHandler,
  deletePostHandler,
  readPostHandler,
  readPostsHandler,
  updatePostHandler,
} from '../../controllers/post.controller';
import requireUser from '../../middlewares/requireUser';
import deserializeUser from '../../middlewares/deserializeUser';
import validateResource from '../../middlewares/validateResource';

import {
  createPostSchema,
  deletePostSchema,
  readPostSchema,
  updatePostSchema,
} from '../../schemas/post.schema';

const routes = Router();

/**
 * @openapi
 * '/api/v1/posts':
 *  get:
 *     tags:
 *     - Posts
 *     summary: Get all registered posts
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/CreatePostInput'
 *  post:
 *     tags:
 *     - Posts
 *     summary: Create a post
 *     description: Only registered users can create other posts.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePostInput'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreatePostResponse'
 *       401:
 *         description: Unhautorized
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             code: 401
 *             message: Only registered users can create posts
 *       404:
 *         description: Not Found
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             code: 404
 *             message: Category not found
 * '/api/v1/posts/{postId}':
 *  get:
 *     tags:
 *     - Posts
 *     summary: Get a single post by the postId
 *     parameters:
 *      - name: postId
 *        in: path
 *        description: The id of the post
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreatePostResponse'
 *       404:
 *         description: Not Found
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             code: 404
 *             message: Post not found
 *  delete:
 *     tags:
 *     - Posts
 *     summary: Delete post by the postId
 *     description: Only author can delete their posts.
 *     parameters:
 *      - name: postId
 *        in: path
 *        description: The id of the post
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
 *             message: Only author can delete their posts
 *       404:
 *         description: Not Found
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             code: 404
 *             message: Post not found
 *  put:
 *     tags:
 *     - Posts
 *     summary: Update post by the postId
 *     description: Only author can update their posts.
 *     parameters:
 *      - name: postId
 *        in: path
 *        description: The id of the post
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreatePostResponse'
 *       401:
 *         description: Unhautorized
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             code: 401
 *             message: Only author can update their posts
 *       404:
 *         description: Not Found
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             code: 404
 *             message: Post not found
 */

routes
  .route('/')
  .get(readPostsHandler)
  .post(
    [deserializeUser, requireUser, validateResource(createPostSchema)],
    createPostHandler
  );

routes
  .route('/:postId')
  .get([validateResource(readPostSchema)], readPostHandler)
  .delete(
    [deserializeUser, requireUser, validateResource(deletePostSchema)],
    deletePostHandler
  )
  .put(
    [deserializeUser, requireUser, validateResource(updatePostSchema)],
    updatePostHandler
  );

export default routes;
