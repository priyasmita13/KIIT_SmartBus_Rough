import { Router } from 'express';
import { postLogin, postLogout, postSignup, postRefresh } from '../controllers/auth.controller.js';
const router = Router();
router.post('/signup', postSignup);
router.post('/login', postLogin);
router.post('/logout', postLogout);
router.post('/refresh', postRefresh);
export default router;
//# sourceMappingURL=auth.routes.js.map