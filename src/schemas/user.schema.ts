import { object, string, InferType } from 'yup';

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateUserInput:
 *       type: object
 *       required:
 *        - name
 *        - email
 *        - password
 *        - role
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           default: "admin@gmail.com"
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum:
 *             - admin
 *             - user
 *     CreateUserResponse:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           default: "admin@gmail.com"
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum:
 *             - admin
 *             - user
 *         id:
 *           type: string
 *         created_at:
 *           type: string
 *         updated_at:
 *           type: string
 */

const payload = {
  body: object({
    name: string()
      .defined('Name is required')
      .max(120, 'Name must be less than 120 characters'),
    email: string().email('Invalid e-mail').defined('E-mail is required'),
    password: string().defined('Password is required'),
  }).defined(),
};

const updatePayload = {
  body: object({
    name: string()
      .defined('Name is required')
      .max(120, 'Name must be less than 120 characters'),
  }).defined(),
};

const params = {
  params: object({ userId: string().defined('userId is required') }),
};

export const createUserSchema = object({
  ...payload,
});

export const updateUserSchema = object({
  ...updatePayload,
  ...params,
});

export const deleteUserSchema = object({
  ...params,
});

export const readUserSchema = object({
  ...params,
});

export type CreateUserInput = InferType<typeof createUserSchema>;
export type UpdateUserInput = InferType<typeof updateUserSchema>;
export type ReadUserInput = InferType<typeof readUserSchema>;
export type DeleteUserInput = InferType<typeof deleteUserSchema>;
