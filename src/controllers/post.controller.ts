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

export async function getPostsHandler(req: Request, res: Response) {
  const postService = container.resolve(PostService);

  const posts = await postService.getPosts();

  res.status(StatusCodes.OK).json(posts);
}

export async function getPostHandler(
  req: Request<ReadPostInput['params']>,
  res: Response
) {
  const { params } = req;
  const { postId: id } = params;

  const postService = container.resolve(PostService);

  const post = await postService.getPost(id);

  res.status(StatusCodes.OK).json(post);
}

export async function createPostHandler(
  req: Request<{}, {}, CreatePostInput['body']>,
  res: Response
) {
  const { body } = req;
  const { sub: userId } = res.locals.user;

  const postService = container.resolve(PostService);

  const post = await postService.createPost({ ...body, userId });

  res.status(StatusCodes.CREATED).json(post);
}

export async function updatePostHandler(
  req: Request<UpdatePostInput['params']>,
  res: Response
) {
  const { body, params } = req;
  const { postId: id } = params;
  const { sub: userId } = res.locals.post;

  const postService = container.resolve(PostService);

  const post = await postService.updatePost({
    id,
    userId,
    ...body,
  });

  res.status(StatusCodes.OK).json(post);
}

export async function deletePostHandler(
  req: Request<DeletePostInput['params']>,
  res: Response
) {
  const { postId } = req.params;
  const { sub: userId } = res.locals.post;

  const postService = container.resolve(PostService);

  await postService.deletePost(postId, userId);

  res.sendStatus(StatusCodes.NO_CONTENT);
}
