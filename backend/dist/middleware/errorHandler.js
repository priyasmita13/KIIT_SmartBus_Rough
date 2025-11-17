import { HttpError } from 'http-errors';
import logger from '../lib/logger.js';
export default function errorHandler(err, req, res, _next) {
    const error = err;
    const status = error.statusCode || error.status || 500;
    const message = error.message || 'Internal Server Error';
    if (status >= 500) {
        logger.error({ err, path: req.path, method: req.method }, 'Unhandled error');
    }
    else {
        logger.warn({ err, path: req.path, method: req.method }, 'Client error');
    }
    res.status(status).json({ error: { message, status } });
}
//# sourceMappingURL=errorHandler.js.map