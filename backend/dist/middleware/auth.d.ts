import type { NextFunction, Request, Response } from 'express';
export interface AuthUser {
    sub: string;
    role: 'STUDENT' | 'DRIVER' | 'ADMIN';
}
declare module 'express-serve-static-core' {
    interface Request {
        auth?: AuthUser;
    }
}
export declare function requireAuth(roles?: AuthUser['role'][]): (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.d.ts.map