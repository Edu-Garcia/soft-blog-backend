import 'reflect-metadata';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';
import {
  CreatePostInput,
  DeletePostInput,
  ReadPostInput,
  UpdatePostInput,
} from '../schemas/post.schema';

import { PostService } from '../services/post.service';

export async function readPostsHandler(req: Request, res: Response) {
  const postService = container.resolve(PostService);

  const posts = await postService.readPosts();

  res.status(StatusCodes.OK).json(posts);
}

export async function readPostsByUserHandler(req: Request, res: Response) {
  const { sub: userId } = res.locals.user;

  const postService = container.resolve(PostService);

  const posts = await postService.readPostsByUser(userId);

  res.status(StatusCodes.OK).json(posts);
}

export async function readPostHandler(
  req: Request<ReadPostInput['params']>,
  res: Response
) {
  const { params } = req;
  const { postId: id } = params;

  const postService = container.resolve(PostService);

  const post = await postService.readPost(id);

  res.status(StatusCodes.OK).json(post);
}

export async function createPostHandler(
  req: Request<{}, {}, CreatePostInput['body']>,
  res: Response
) {
  const { body } = req;
  const { sub: userId } = res.locals.user;

  const postService = container.resolve(PostService);

  const post = await postService.createPost({
    title: body.title.trim(),
    content: body.content.trim(),
    categoryId: body.categoryId,
    userId,
  });

  res.status(StatusCodes.CREATED).json(post);
}

export async function updatePostHandler(
  req: Request<UpdatePostInput['params']>,
  res: Response
) {
  const { body, params } = req;
  const { postId: id } = params;
  const { sub: userId } = res.locals.user;

  const postService = container.resolve(PostService);

  const post = await postService.updatePost({
    id,
    userId,
    title: body.title.trim() || null,
    content: body.content.trim() || null,
  });

  res.status(StatusCodes.OK).json(post);
}

export async function deletePostHandler(
  req: Request<DeletePostInput['params']>,
  res: Response
) {
  const { postId } = req.params;
  const { sub: userId } = res.locals.user;

  const postService = container.resolve(PostService);

  await postService.deletePost(postId, userId);

  res.sendStatus(StatusCodes.NO_CONTENT);
}
