import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import routes from './routes';
import config, { environments } from './config/config';
import ApiError from './utils/apiError.utils';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(cors());
app.options('*', cors());
routes(app);

app.use(
  // eslint-disable-next-line
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof ApiError) {
      return response.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
      });
    }

    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
);

if (config.env !== environments.PRODUCTION) {
  app.use(morgan('tiny'));
}

export default app;
