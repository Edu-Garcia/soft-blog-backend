import { compare } from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'tsyringe';
import { ISession, ISessionResponse } from '../models/session.model';
import { IUsersRepository } from '../models/user.model';
import { signJwt } from '../utils/jwt.utils';
import ApiError from '../utils/apiError.utils';

@injectable()
export class SessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async createSession({
    email,
    password,
  }: ISession): Promise<ISessionResponse> {
    const userSession = await this.usersRepository.findByEmail(email);

    if (!userSession) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid email or password');
    }

    const passwordConfirmed = await compare(password, userSession.password);

    if (!passwordConfirmed) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid email or password');
    }

    const user = {
      id: userSession.id,
      role: userSession.role,
    };

    const token = signJwt({}, { subject: userSession.id });

    return { token, user };
  }
}
