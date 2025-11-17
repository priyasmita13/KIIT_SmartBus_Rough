export interface UpdateBusLocationData {
    latitude: number;
    longitude: number;
}
export interface UpdateBusStatusData {
    destination?: string;
    seatAvailability?: 'EMPTY' | 'FEW_SEATS' | 'FULL';
    passengerCount?: number;
    status?: 'IN_SERVICE' | 'OUT_OF_SERVICE' | 'ON_BREAK' | 'EMERGENCY';
}
export declare function getBusById(busId: string): Promise<import("mongoose").Document<unknown, {}, import("../models/bus.model.js").BusDocument, {}, {}> & import("../models/bus.model.js").BusDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare function getAllActiveBuses(): Promise<(import("mongoose").Document<unknown, {}, import("../models/bus.model.js").BusDocument, {}, {}> & import("../models/bus.model.js").BusDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
})[]>;
export declare function updateBusLocation(busId: string, location: UpdateBusLocationData): Promise<import("mongoose").Document<unknown, {}, import("../models/bus.model.js").BusDocument, {}, {}> & import("../models/bus.model.js").BusDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare function updateBusStatus(busId: string, statusData: UpdateBusStatusData): Promise<import("mongoose").Document<unknown, {}, import("../models/bus.model.js").BusDocument, {}, {}> & import("../models/bus.model.js").BusDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare function assignDriverToBus(busId: string, driverId: string): Promise<import("mongoose").Document<unknown, {}, import("../models/bus.model.js").BusDocument, {}, {}> & import("../models/bus.model.js").BusDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare function createBus(busData: {
    busId: string;
    currentLocation: {
        latitude: number;
        longitude: number;
    };
    destination?: string;
    maxCapacity?: number;
}): Promise<import("mongoose").Document<unknown, {}, import("../models/bus.model.js").BusDocument, {}, {}> & import("../models/bus.model.js").BusDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
//# sourceMappingURL=bus.service.d.ts.map