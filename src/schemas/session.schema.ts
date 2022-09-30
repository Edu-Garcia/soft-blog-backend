import { object, string, InferType } from 'yup';

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateSessionInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *        password:
 *          type: string
 *    CreateSessionResponse:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 *        user:
 *          type: object
 *          properties:
 *            id:
 *              type: string
 *            role:
 *              type: string
 *              enum:
 *                - admin
 *                - user
 */

const payload = {
  body: object({
    email: string().email('Invalid e-mail').defined('E-mail is required'),
    password: string().defined('Password is required'),
  }).defined(),
};

export const createSessionSchema = object({
  ...payload,
});

export type CreateSessionInput = InferType<typeof createSessionSchema>;
