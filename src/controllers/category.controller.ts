import 'reflect-metadata';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';
import {
  CreateCategoryInput,
  DeleteCategoryInput,
  ReadCategoryInput,
  UpdateCategoryInput,
} from '../schemas/category.schema';
import { normalizeText } from '../utils/normalize.utils';

import { CategoryService } from '../services/category.service';

export async function readCategoriesHandler(req: Request, res: Response) {
  const categoryService = container.resolve(CategoryService);

  const categories = await categoryService.readCategories();

  res.status(StatusCodes.OK).json(categories);
}

export async function readCategoryHandler(
  req: Request<ReadCategoryInput['params']>,
  res: Response
) {
  const { params } = req;
  const { categoryId: id } = params;

  const categoryService = container.resolve(CategoryService);

  const category = await categoryService.readCategory(id);

  res.status(StatusCodes.OK).json(category);
}

export async function createCategoryHandler(
  req: Request<{}, {}, CreateCategoryInput['body']>,
  res: Response
) {
  const { body } = req;
  const { sub: userId } = res.locals.user;

  const categoryService = container.resolve(CategoryService);

  const category = await categoryService.createCategory({
    title: normalizeText(body.title),
    userId,
  });

  res.status(StatusCodes.CREATED).json(category);
}

export async function updateCategoryHandler(
  req: Request<UpdateCategoryInput['params']>,
  res: Response
) {
  const { body, params } = req;
  const { categoryId: id } = params;
  const { sub: userId } = res.locals.user;

  const categoryService = container.resolve(CategoryService);

  const category = await categoryService.updateCategory({
    title: normalizeText(body.title),
    id,
    userId,
  });

  res.status(StatusCodes.OK).json(category);
}

export async function deleteCategoryHandler(
  req: Request<DeleteCategoryInput['params']>,
  res: Response
) {
  const { categoryId } = req.params;
  const { sub: userId } = res.locals.user;

  const categoryService = container.resolve(CategoryService);

  await categoryService.deleteCategory(categoryId, userId);

  res.sendStatus(StatusCodes.NO_CONTENT);
}
