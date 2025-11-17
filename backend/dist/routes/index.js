import { Router } from 'express';
import authRoutes from './auth.routes.js';
import busRoutes from './bus.routes.js';
import forgotPasswordRoutes from './forgotPassword.routes.js';
import locationRoutes from './location.routes.js';
import { requireAuth } from '../middleware/auth.js';
import User from '../models/user.model.js';
const router = Router();
router.use('/auth', authRoutes);
router.use('/buses', busRoutes);
router.use('/forgot-password', forgotPasswordRoutes);
router.use('/location', locationRoutes);
router.get('/users/me', requireAuth(), async (req, res) => {
    const user = await User.findById(req.auth.sub);
    if (!user)
        return res.status(404).json({ error: { message: 'Not found', status: 404 } });
    res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
});
export default router;
//# sourceMappingURL=index.js.map