import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ICategory } from '../../models/category.model';
import Base from './Base.Entity';
import User from './User.Entity';

@Entity('categories')
export default class Category extends Base implements ICategory {
  @Column()
  title: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
