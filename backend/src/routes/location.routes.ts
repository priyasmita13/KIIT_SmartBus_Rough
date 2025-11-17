import { Router } from 'express';
import { LocationController } from '../controllers/location.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(requireAuth());

// Update user's location
router.post('/update', LocationController.updateLocation);

// Get nearby drivers (for students)
router.get('/nearby-drivers', LocationController.getNearbyDrivers);

// Get all online drivers (for admin/driver dashboard)
router.get('/all-drivers', LocationController.getAllDrivers);

// Set user offline
router.post('/offline', LocationController.setOffline);

export default router;
