import type { Request, Response } from 'express';
import { 
  getBusById, 
  getAllActiveBuses, 
  updateBusLocation, 
  updateBusStatus,
  assignDriverToBus,
  createBus
} from '../services/bus.service.js';

export async function getBus(req: Request, res: Response) {
  const { busId } = req.params;
  if (!busId) {
    return res.status(400).json({ error: { message: 'Bus ID is required', status: 400 } });
  }
  const bus = await getBusById(busId);
  res.json(bus);
}

export async function getAllBuses(req: Request, res: Response) {
  const buses = await getAllActiveBuses();
  res.json(buses);
}

export async function updateLocation(req: Request, res: Response) {
  const { busId } = req.params;
  const { latitude, longitude } = req.body;
  
  if (!busId) {
    return res.status(400).json({ error: { message: 'Bus ID is required', status: 400 } });
  }
  
  if (!latitude || !longitude) {
    return res.status(400).json({ error: { message: 'Latitude and longitude are required', status: 400 } });
  }
  
  const bus = await updateBusLocation(busId, { latitude, longitude });
  res.json(bus);
}

export async function updateStatus(req: Request, res: Response) {
  const { busId } = req.params;
  const statusData = req.body;
  
  if (!busId) {
    return res.status(400).json({ error: { message: 'Bus ID is required', status: 400 } });
  }
  
  const bus = await updateBusStatus(busId, statusData);
  res.json(bus);
}

export async function assignDriver(req: Request, res: Response) {
  const { busId } = req.params;
  const { driverId } = req.body;
  
  if (!busId) {
    return res.status(400).json({ error: { message: 'Bus ID is required', status: 400 } });
  }
  
  if (!driverId) {
    return res.status(400).json({ error: { message: 'Driver ID is required', status: 400 } });
  }
  
  const bus = await assignDriverToBus(busId, driverId);
  res.json(bus);
}

export async function createNewBus(req: Request, res: Response) {
  const busData = req.body;
  
  if (!busData.busId || !busData.currentLocation) {
    return res.status(400).json({ error: { message: 'Bus ID and current location are required', status: 400 } });
  }
  
  const bus = await createBus(busData);
  res.status(201).json(bus);
}
