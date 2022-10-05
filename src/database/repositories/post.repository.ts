import { getRepository, Repository } from 'typeorm';
import { ICreatePostInput, IPostsRepository } from '../../models/post.model';
import Post from '../entities/Post.Entity';

export class PostsRepository implements IPostsRepository {
  private ormRepository: Repository<Post>;

  constructor() {
    this.ormRepository = getRepository(Post);
  }

  public async create({
    title,
    content,
    userId,
    categoryId,
  }: ICreatePostInput): Promise<Post> {
    const post = this.ormRepository.create({
      title,
      content,
      user: { id: userId },
      category: { id: categoryId },
    });

    await this.ormRepository.save(post);

    return post;
  }

  public async save(post: Post): Promise<Post> {
    await this.ormRepository.save(post);

    return post;
  }

  public async remove(post: Post): Promise<void> {
    await this.ormRepository.remove(post);
  }

  public async find(): Promise<Post[]> {
    const post = await this.ormRepository.find({
      relations: ['user', 'category'],
      order: { created_at: 'ASC' },
    });
    return post;
  }

  public async findById(id: string): Promise<Post | undefined> {
    const post = await this.ormRepository.findOne(
      { id },
      { relations: ['user', 'category'] }
    );
    return post;
  }

  public async findByCategoryId(categoryId: string): Promise<Post[]> {
    const post = await this.ormRepository.find({
      relations: ['user', 'category'],
      order: { created_at: 'ASC' },
      where: { category: { id: categoryId } },
    });
    return post;
  }

  public async findByUserId(userId: string): Promise<Post[]> {
    const post = await this.ormRepository.find({
      relations: ['user', 'category'],
      order: { created_at: 'ASC' },
      where: { user: { id: userId } },
    });
    return post;
  }
}
