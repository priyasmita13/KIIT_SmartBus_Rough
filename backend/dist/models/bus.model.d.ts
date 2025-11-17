import { Document, Model } from 'mongoose';
export type BusStatus = 'IN_SERVICE' | 'OUT_OF_SERVICE' | 'ON_BREAK' | 'EMERGENCY';
export type SeatAvailability = 'EMPTY' | 'FEW_SEATS' | 'FULL';
export interface BusDocument extends Document {
    busId: string;
    driverId?: string;
    currentLocation: {
        latitude: number;
        longitude: number;
    };
    destination: string;
    seatAvailability: SeatAvailability;
    passengerCount: number;
    maxCapacity: number;
    status: BusStatus;
    lastUpdated: Date;
    route: string;
    isActive: boolean;
}
export declare const Bus: Model<BusDocument>;
export default Bus;
//# sourceMappingURL=bus.model.d.ts.map