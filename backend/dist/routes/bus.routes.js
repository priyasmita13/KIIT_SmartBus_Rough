import { Router } from 'express';
import { getBus, getAllBuses, updateLocation, updateStatus, assignDriver, createNewBus } from '../controllers/bus.controller.js';
import { requireAuth } from '../middleware/auth.js';
const router = Router();
// Public routes for students to view bus data
router.get('/buses', getAllBuses);
router.get('/buses/:busId', getBus);
// Driver routes (require driver role)
router.put('/buses/:busId/location', requireAuth(['DRIVER']), updateLocation);
router.put('/buses/:busId/status', requireAuth(['DRIVER']), updateStatus);
// Admin routes
router.post('/buses', requireAuth(['ADMIN']), createNewBus);
router.put('/buses/:busId/assign', requireAuth(['ADMIN']), assignDriver);
export default router;
//# sourceMappingURL=bus.routes.js.map