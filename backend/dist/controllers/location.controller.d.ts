import express from 'express';
export declare class LocationController {
    static updateLocation(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>> | undefined>;
    static getNearbyDrivers(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>> | undefined>;
    static getAllDrivers(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>> | undefined>;
    static setOffline(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=location.controller.d.ts.map