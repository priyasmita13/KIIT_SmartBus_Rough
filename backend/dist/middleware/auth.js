import jwt from 'jsonwebtoken';
import { errors } from '../lib/errors.js';
import config from '../config.js';
export function requireAuth(roles) {
    return (req, _res, next) => {
        const header = req.headers.authorization;
        const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;
        if (!token)
            return next(errors.unauthorized());
        try {
            const payload = jwt.verify(token, config.jwtAccessSecret);
            if (roles && !roles.includes(payload.role))
                return next(errors.forbidden());
            req.auth = payload;
            next();
        }
        catch {
            next(errors.unauthorized());
        }
    };
}
//# sourceMappingURL=auth.js.map