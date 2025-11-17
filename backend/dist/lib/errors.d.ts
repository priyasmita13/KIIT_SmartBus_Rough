import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
export declare const errors: {
    unauthorized: (msg?: string) => createHttpError.HttpError<StatusCodes.UNAUTHORIZED>;
    forbidden: (msg?: string) => createHttpError.HttpError<StatusCodes.FORBIDDEN>;
    badRequest: (msg?: string) => createHttpError.HttpError<StatusCodes.BAD_REQUEST>;
    notFound: (msg?: string) => createHttpError.HttpError<StatusCodes.NOT_FOUND>;
    conflict: (msg?: string) => createHttpError.HttpError<StatusCodes.CONFLICT>;
};
export default errors;
//# sourceMappingURL=errors.d.ts.map