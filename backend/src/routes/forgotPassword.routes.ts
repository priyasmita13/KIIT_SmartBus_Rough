import { Router } from 'express';
import { 
  postForgotPassword, 
  postVerifyOtp, 
  postResetPassword 
} from '../controllers/forgotPassword.controller.js';

const router = Router();

router.post('/forgot-password', postForgotPassword);
router.post('/verify-otp', postVerifyOtp);
router.post('/reset-password', postResetPassword);

export default router;
