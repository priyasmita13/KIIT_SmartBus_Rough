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
    user?: { id: string; role: string };
  }
}

export function requireAuth(roles?: AuthUser['role'][]): (req: Request, _res: Response, next: NextFunction) => void {
  return (req, _res, next) => {
    const header = req.headers.authorization;
    console.log(`[Auth] Header: ${header}`);

    const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;
    if (!token) {
      console.log('[Auth] No token found or invalid format');
      return next(errors.unauthorized());
    }

    try {
      const payload = jwt.verify(token, config.jwtAccessSecret, { ignoreExpiration: true }) as AuthUser;
      console.log('[Auth] Token verified. Payload:', payload);
      
      if (roles && !roles.includes(payload.role)) {
        console.log(`[Auth] Role mismatch. Required: ${roles}, Got: ${payload.role}`);
        return next(errors.forbidden());
      }
      
      req.auth = payload;
      req.user = { id: payload.sub, role: payload.role }; // ADD THIS LINE
      next();
    } catch (err) {
      console.error('[Auth] Token verification failed:', err);
      next(errors.unauthorized());
    }
  };
}
