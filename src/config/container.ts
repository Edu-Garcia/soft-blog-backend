import { container } from 'tsyringe';
import { IUsersRepository } from '../models/user.model';
import { UsersRepository } from '../database/repositories/user.repository';
import { ICategoriesRepository } from '../models/category.model';
import { CategoriesRepository } from '../database/repositories/category.repository';
import { IPostsRepository } from '../models/post.model';
import { PostsRepository } from '../database/repositories/post.repository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<IPostsRepository>(
  'PostsRepository',
  PostsRepository
);
