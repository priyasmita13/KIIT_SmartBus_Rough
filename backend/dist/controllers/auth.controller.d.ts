import type { Request, Response } from 'express';
export declare function postSignup(req: Request, res: Response): Promise<void>;
export declare function postLogin(req: Request, res: Response): Promise<void>;
export declare function postLogout(_req: Request, res: Response): Promise<void>;
export declare function postRefresh(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=auth.controller.d.ts.map