import type { Request, Response } from 'express';
export declare function getBus(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getAllBuses(req: Request, res: Response): Promise<void>;
export declare function updateLocation(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updateStatus(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function assignDriver(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function createNewBus(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=bus.controller.d.ts.map