import type { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';
import logger from '../lib/logger.js';

export default function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  const error = err as Partial<HttpError & { statusCode?: number; status?: number }>;
  const status = error.statusCode || error.status || 500;
  const message = (error as any).message || 'Internal Server Error';

  if (status >= 500) {
    logger.error({ err, path: req.path, method: req.method }, 'Unhandled error');
  } else {
    logger.warn({ err, path: req.path, method: req.method }, 'Client error');
  }

  res.status(status).json({ error: { message, status } });
}



