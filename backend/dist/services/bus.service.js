import Bus from '../models/bus.model.js';
import { errors } from '../lib/errors.js';
export async function getBusById(busId) {
    const bus = await Bus.findOne({ busId, isActive: true });
    if (!bus)
        throw errors.notFound('Bus not found');
    return bus;
}
export async function getAllActiveBuses() {
    return Bus.find({ isActive: true }).sort({ lastUpdated: -1 });
}
export async function updateBusLocation(busId, location) {
    const bus = await Bus.findOneAndUpdate({ busId, isActive: true }, {
        currentLocation: location,
        lastUpdated: new Date()
    }, { new: true });
    if (!bus)
        throw errors.notFound('Bus not found');
    return bus;
}
export async function updateBusStatus(busId, statusData) {
    const updateData = {
        ...statusData,
        lastUpdated: new Date()
    };
    const bus = await Bus.findOneAndUpdate({ busId, isActive: true }, updateData, { new: true });
    if (!bus)
        throw errors.notFound('Bus not found');
    return bus;
}
export async function assignDriverToBus(busId, driverId) {
    const bus = await Bus.findOneAndUpdate({ busId, isActive: true }, { driverId }, { new: true });
    if (!bus)
        throw errors.notFound('Bus not found');
    return bus;
}
export async function createBus(busData) {
    const existingBus = await Bus.findOne({ busId: busData.busId });
    if (existingBus)
        throw errors.conflict('Bus with this ID already exists');
    const bus = await Bus.create({
        ...busData,
        destination: busData.destination || 'Campus 25',
        maxCapacity: busData.maxCapacity || 30
    });
    return bus;
}
//# sourceMappingURL=bus.service.js.map