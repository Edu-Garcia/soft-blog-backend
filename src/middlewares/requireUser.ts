import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/apiError.utils';

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const { user } = res.locals;

  if (!user) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'Invalid Login Session');
  }

  return next();
};

export default requireUser;
