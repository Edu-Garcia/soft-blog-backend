import { object, string, InferType } from 'yup';

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateCategoryInput:
 *       type: object
 *       required:
 *        - title
 *        - userId
 *       properties:
 *         title:
 *           type: string
 *         userId:
 *           type: string
 *     CreateCategoryResponse:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         userId:
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
    title: string()
      .max(50, 'Category must be less than 50 characters')
      .defined('Title is required'),
  }).defined(),
};

const params = {
  params: object({
    categoryId: string().defined('categoryId is required'),
  }),
};

export const createCategorySchema = object({
  ...payload,
});

export const updateCategorySchema = object({
  ...payload,
  ...params,
});

export const deleteCategorySchema = object({
  ...params,
});

export const readCategorySchema = object({
  ...params,
});

export type CreateCategoryInput = InferType<typeof createCategorySchema>;
export type UpdateCategoryInput = InferType<typeof updateCategorySchema>;
export type ReadCategoryInput = InferType<typeof readCategorySchema>;
export type DeleteCategoryInput = InferType<typeof deleteCategorySchema>;
