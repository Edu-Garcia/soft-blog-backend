import { ICategory } from './category.model';
import { IUser } from './user.model';

export interface IPost {
  id: string;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  user: IUser;
  category: ICategory;
}

export interface ICreatePostInput {
  title: string;
  content: string;
  userId: string;
  categoryId: string;
}

export interface IUpdatePostInput {
  id: string;
  title?: string;
  content?: string;
  userId: string;
}

export interface IPostsRepository {
  create(data: ICreatePostInput): Promise<IPost>;
  save(post: IPost): Promise<IPost>;
  remove(post: IPost): Promise<void>;
  find(): Promise<IPost[]>;
  findById(id: string): Promise<IPost | undefined>;
  findByCategoryId(categoryId: string): Promise<IPost[]>;
  findByUserId(userId: string): Promise<IPost[]>;
}
