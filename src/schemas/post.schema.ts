import { object, string, InferType } from 'yup';

/**
 * @openapi
 * components:
 *   schemas:
 *     CreatePostInput:
 *       type: object
 *       required:
 *        - title
 *        - content
 *        - userId
 *        - categoryId
 *       properties:
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         userId:
 *           type: string
 *         categoryId:
 *           type: string
 *     CreatePostResponse:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         userId:
 *           type: string
 *         categoryId:
 *           type: string
 *         id:
 *           type: string
 *         created_at:
 *           type: string
 *         updated_at:
 *           type: string
 */

const payload = {
  body: object({
    title: string().defined('Title is required'),
    content: string().defined('Content is required'),
    categoryId: string().defined('categoryId is required'),
  }).defined(),
};

const updatePayload = {
  body: object({
    title: string(),
    content: string(),
  }).defined(),
};
const params = {
  params: object({
    postId: string().defined('postId is required'),
  }),
};

export const createPostSchema = object({
  ...payload,
});

export const updatePostSchema = object({
  ...updatePayload,
  ...params,
});

export const deletePostSchema = object({
  ...params,
});

export const getPostSchema = object({
  ...params,
});

export type CreatePostInput = InferType<typeof createPostSchema>;
export type UpdatePostInput = InferType<typeof updatePostSchema>;
export type ReadPostInput = InferType<typeof getPostSchema>;
export type DeletePostInput = InferType<typeof deletePostSchema>;
