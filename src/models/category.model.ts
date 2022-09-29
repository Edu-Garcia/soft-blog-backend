import { IUser } from './user.model';

export interface ICategory {
  id: string;
  title: string;
  created_at: Date;
  updated_at: Date;
  user: IUser;
}

export interface ICreateCategoryInput {
  title: string;
  userId: string;
}

export interface IUpdateCategoryInput {
  id: string;
  title: string;
  userId: string;
}

export interface ICategoriesRepository {
  create(data: ICreateCategoryInput): Promise<ICategory>;
  save(category: ICategory): Promise<ICategory>;
  remove(category: ICategory): Promise<void>;
  find(): Promise<ICategory[]>;
  findById(id: string): Promise<ICategory | undefined>;
  findByTitle(title: string): Promise<ICategory | undefined>;
}
