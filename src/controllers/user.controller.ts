import 'reflect-metadata';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';
import {
  CreateUserInput,
  DeleteUserInput,
  ReadUserInput,
  UpdateUserInput,
} from '../schemas/user.schema';

import { UserService } from '../services/user.service';

export async function readUsersHandler(req: Request, res: Response) {
  const userService = container.resolve(UserService);

  const users = await userService.readUsers();

  res.status(StatusCodes.OK).json(users);
}

export async function readUserHandler(
  req: Request<ReadUserInput['params']>,
  res: Response
) {
  const { params } = req;
  const { userId: id } = params;

  const userService = container.resolve(UserService);

  const user = await userService.readUser(id);

  res.status(StatusCodes.OK).json(user);
}

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) {
  const { body } = req;

  const userService = container.resolve(UserService);

  const user = await userService.createUser({ ...body });

  res.status(StatusCodes.CREATED).json(user);
}

export async function updateUserHandler(
  req: Request<UpdateUserInput['params']>,
  res: Response
) {
  const { body, params } = req;
  const { userId: id } = params;
  const { sub: requesterId } = res.locals.user;

  const userService = container.resolve(UserService);

  const user = await userService.updateUser({ id, ...body }, requesterId);

  res.status(StatusCodes.OK).json(user);
}

export async function deleteUserHandler(
  req: Request<DeleteUserInput['params']>,
  res: Response
) {
  const { userId } = req.params;
  const { sub: requesterId } = res.locals.user;

  const userService = container.resolve(UserService);

  await userService.deleteUser(userId, requesterId);

  res.sendStatus(StatusCodes.NO_CONTENT);
}
