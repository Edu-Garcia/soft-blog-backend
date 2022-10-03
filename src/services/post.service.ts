import { instanceToInstance } from 'class-transformer';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'tsyringe';
import {
  ICreatePostInput,
  IUpdatePostInput,
  IPost,
  IPostsRepository,
} from '../models/post.model';
import { ICategoriesRepository } from '../models/category.model';
import { IUsersRepository } from '../models/user.model';
import ApiError from '../utils/apiError.utils';

@injectable()
export class PostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  public async readPosts(): Promise<IPost[]> {
    const posts = this.postsRepository.find();
    return instanceToInstance(posts);
  }

  public async readPost(id: string): Promise<IPost> {
    const post = await this.postsRepository.findById(id);

    if (!post) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Post not found');
    }

    return instanceToInstance(post);
  }

  public async createPost(input: ICreatePostInput): Promise<IPost> {
    const { userId, categoryId } = input;

    const category = await this.categoriesRepository.findById(categoryId);

    if (!category) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Category not found');
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        'Only registered users can create posts'
      );
    }

    const newPost = await this.postsRepository.create({
      ...input,
    });

    return newPost;
  }

  public async updatePost(input: IUpdatePostInput): Promise<IPost> {
    const { id, title, content, userId } = input;

    const post = await this.postsRepository.findById(id);

    if (!post) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Post not found');
    }

    if (post.user.id !== userId) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        'Only author can update their post'
      );
    }

    post.title = title || post.title;
    post.content = content || post.content;

    await this.postsRepository.save(post);
    return post;
  }

  public async deletePost(id: string, userId: string): Promise<void> {
    const post = await this.postsRepository.findById(id);

    if (!post) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Post not found');
    }

    if (post.user.id !== userId) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        'Only author can delete their post'
      );
    }

    await this.postsRepository.remove(post);
  }
}
