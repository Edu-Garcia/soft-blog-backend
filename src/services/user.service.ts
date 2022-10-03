import { hash } from 'bcrypt';
import { instanceToInstance } from 'class-transformer';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'tsyringe';
import config from '../config/config';
import {
  ICreateUserInput,
  IUpdateUserInput,
  IUser,
  IUsersRepository,
} from '../models/user.model';
import ApiError from '../utils/apiError.utils';

@injectable()
export class UserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async readUsers(): Promise<IUser[]> {
    const users = this.usersRepository.find();
    return instanceToInstance(users);
  }

  public async readUser(id: string): Promise<IUser> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
    }

    return instanceToInstance(user);
  }

  public async createUser(input: ICreateUserInput): Promise<IUser> {
    const { password, email } = input;

    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new ApiError(StatusCodes.CONFLICT, 'E-mail already exists');
    }

    const hashedPassword = await hash(password, config.saltWorkFactor);

    const newUser = await this.usersRepository.create({
      ...input,
      password: hashedPassword,
    });

    return newUser;
  }

  public async updateUser(
    input: IUpdateUserInput,
    requesterId: string
  ): Promise<IUser> {
    const { id, name } = input;

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
    }

    if (user.id !== requesterId) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        'Only user can update their information'
      );
    }

    user.name = name || user.name;

    await this.usersRepository.save(user);
    return user;
  }

  public async deleteUser(id: string, requesterId: string): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
    }

    if (user.id !== requesterId) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        'Only user can delete their account'
      );
    }

    await this.usersRepository.remove(user);
  }
}
