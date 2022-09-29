import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IPost } from '../../models/post.model';
import Base from './Base.Entity';
import Category from './Category.Entity';
import User from './User.Entity';

@Entity('posts')
export default class Post extends Base implements IPost {
  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
