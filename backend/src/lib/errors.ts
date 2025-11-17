import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

export const errors = {
  unauthorized: (msg = 'Unauthorized') => createHttpError(StatusCodes.UNAUTHORIZED, msg),
  forbidden: (msg = 'Forbidden') => createHttpError(StatusCodes.FORBIDDEN, msg),
  badRequest: (msg = 'Bad Request') => createHttpError(StatusCodes.BAD_REQUEST, msg),
  notFound: (msg = 'Not Found') => createHttpError(StatusCodes.NOT_FOUND, msg),
  conflict: (msg = 'Conflict') => createHttpError(StatusCodes.CONFLICT, msg),
};

export default errors;



