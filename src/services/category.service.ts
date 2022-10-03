import { instanceToInstance } from 'class-transformer';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'tsyringe';
import {
  ICreateCategoryInput,
  IUpdateCategoryInput,
  ICategory,
  ICategoriesRepository,
} from '../models/category.model';
import { IUsersRepository } from '../models/user.model';
import { IPostsRepository } from '../models/post.model';
import ApiError from '../utils/apiError.utils';

@injectable()
export class CategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('PostsRepository')
    private postsRepository: IPostsRepository
  ) {}

  public async readCategories(): Promise<ICategory[]> {
    const categories = this.categoriesRepository.find();
    return instanceToInstance(categories);
  }

  public async readCategory(id: string): Promise<ICategory> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Category not found');
    }

    return instanceToInstance(category);
  }

  public async createCategory(input: ICreateCategoryInput): Promise<ICategory> {
    const { title, userId } = input;

    const categoryExists = await this.categoriesRepository.findByTitle(title);

    if (categoryExists) {
      throw new ApiError(StatusCodes.CONFLICT, 'Category already exists');
    }

    const requesterAdmin = await this.usersRepository.findAdmin(userId);

    if (!requesterAdmin) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        'Only admins can create categories'
      );
    }

    const newCategory = await this.categoriesRepository.create({
      ...input,
    });

    return newCategory;
  }

  public async updateCategory(input: IUpdateCategoryInput): Promise<ICategory> {
    const { id, title, userId } = input;

    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Category not found');
    }

    const requesterAdmin = await this.usersRepository.findAdmin(userId);

    if (!requesterAdmin) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        'Only admins can update categories'
      );
    }

    const categoryExists = await this.categoriesRepository.findByTitle(title);

    if (categoryExists) {
      throw new ApiError(StatusCodes.CONFLICT, 'Category already exists');
    }

    const linkedPosts = await this.postsRepository.findByCategoryId(id);

    if (linkedPosts.length) {
      throw new ApiError(StatusCodes.CONFLICT, 'Category has linked posts');
    }

    category.title = title || category.title;

    await this.categoriesRepository.save(category);
    return category;
  }

  public async deleteCategory(id: string, userId: string): Promise<void> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Category not found');
    }

    const requesterAdmin = await this.usersRepository.findAdmin(userId);

    if (!requesterAdmin) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        'Only admins can update categories'
      );
    }

    await this.categoriesRepository.remove(category);
  }
}
