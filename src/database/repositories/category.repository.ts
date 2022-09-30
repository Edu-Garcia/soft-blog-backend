import { getRepository, Repository } from 'typeorm';
import {
  ICreateCategoryInput,
  ICategoriesRepository,
} from '../../models/category.model';
import Category from '../entities/Category.Entity';

export class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async create({
    title,
    userId,
  }: ICreateCategoryInput): Promise<Category> {
    const category = this.ormRepository.create({
      title,
      user: { id: userId },
    });

    await this.ormRepository.save(category);

    return category;
  }

  public async save(category: Category): Promise<Category> {
    await this.ormRepository.save(category);

    return category;
  }

  public async remove(category: Category): Promise<void> {
    await this.ormRepository.remove(category);
  }

  public async find(): Promise<Category[]> {
    const category = await this.ormRepository.find();
    return category;
  }

  public async findById(id: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({ id });
    return category;
  }

  public async findByTitle(title: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({ title });
    return category;
  }
}
