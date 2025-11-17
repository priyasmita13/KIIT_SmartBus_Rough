import type { UserDocument } from '../models/user.model';
export interface LocationUpdate {
    latitude: number;
    longitude: number;
    userId: string;
}
export declare class LocationService {
    static updateLocation(userId: string, latitude: number, longitude: number): Promise<UserDocument | null>;
    static getOnlineDrivers(): Promise<UserDocument[]>;
    static getNearbyDrivers(userLat: number, userLng: number, radiusKm?: number): Promise<UserDocument[]>;
    private static calculateDistance;
    private static toRadians;
    static setUserOffline(userId: string): Promise<void>;
}
//# sourceMappingURL=location.service.d.ts.map