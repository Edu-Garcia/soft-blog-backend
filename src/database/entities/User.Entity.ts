import { Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { IUser } from '../../models/user.model';
import Base from './Base.Entity';

@Entity('users')
export default class User extends Base implements IUser {
  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  @Exclude()
  public password: string;

  @Column({ default: 'user' })
  public role: string = 'user';
}
