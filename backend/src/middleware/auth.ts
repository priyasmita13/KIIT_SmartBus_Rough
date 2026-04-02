import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { errors } from '../lib/errors.js';
import config from '../config.js';

export interface AuthUser {
  sub: string;
  role: 'STUDENT' | 'DRIVER' | 'ADMIN';
}

declare module 'express-serve-static-core' {
  interface Request {
    auth?: AuthUser;
  }
}

export function requireAuth(roles?: AuthUser['role'][]): (req: Request, _res: Response, next: NextFunction) => void {
  return (req, _res, next) => {
    const header = req.headers.authorization;
    const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;
    if (!token) return next(errors.unauthorized());
    try {
      const payload = jwt.verify(token, config.jwtAccessSecret) as AuthUser;
      if (roles && !roles.includes(payload.role)) return next(errors.forbidden());
      req.auth = payload;
      next();
    } catch {
      next(errors.unauthorized());
    }
  };
}



