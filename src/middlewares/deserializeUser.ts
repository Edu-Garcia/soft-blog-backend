import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { get } from 'lodash';
import ApiError from '../utils/apiError.utils';
import { verifyJwt } from '../utils/jwt.utils';

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    ''
  );

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Expired Login Session');
  }

  return next();
};

export default deserializeUser;
