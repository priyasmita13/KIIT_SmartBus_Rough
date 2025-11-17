import Bus from '../models/bus.model.js';
import { errors } from '../lib/errors.js';

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

export async function getBusById(busId: string) {
  const bus = await Bus.findOne({ busId, isActive: true });
  if (!bus) throw errors.notFound('Bus not found');
  return bus;
}

export async function getAllActiveBuses() {
  return Bus.find({ isActive: true }).sort({ lastUpdated: -1 });
}

export async function updateBusLocation(busId: string, location: UpdateBusLocationData) {
  const bus = await Bus.findOneAndUpdate(
    { busId, isActive: true },
    { 
      currentLocation: location,
      lastUpdated: new Date()
    },
    { new: true }
  );
  if (!bus) throw errors.notFound('Bus not found');
  return bus;
}

export async function updateBusStatus(busId: string, statusData: UpdateBusStatusData) {
  const updateData = {
    ...statusData,
    lastUpdated: new Date()
  };
  
  const bus = await Bus.findOneAndUpdate(
    { busId, isActive: true },
    updateData,
    { new: true }
  );
  if (!bus) throw errors.notFound('Bus not found');
  return bus;
}

export async function assignDriverToBus(busId: string, driverId: string) {
  const bus = await Bus.findOneAndUpdate(
    { busId, isActive: true },
    { driverId },
    { new: true }
  );
  if (!bus) throw errors.notFound('Bus not found');
  return bus;
}

export async function createBus(busData: {
  busId: string;
  currentLocation: { latitude: number; longitude: number };
  destination?: string;
  maxCapacity?: number;
}) {
  const existingBus = await Bus.findOne({ busId: busData.busId });
  if (existingBus) throw errors.conflict('Bus with this ID already exists');
  
  const bus = await Bus.create({
    ...busData,
    destination: busData.destination || 'Campus 25',
    maxCapacity: busData.maxCapacity || 30
  });
  return bus;
}
