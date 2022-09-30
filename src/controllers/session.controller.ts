import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';
import { CreateSessionInput } from '../schemas/session.schema';
import { SessionService } from '../services/session.service';

export async function createSessionHandler(
  req: Request<{}, {}, CreateSessionInput['body']>,
  res: Response
) {
  const { body } = req;
  const sessionService = container.resolve(SessionService);

  const session = await sessionService.createSession({ ...body });
  res.status(StatusCodes.CREATED).json(session);
}
