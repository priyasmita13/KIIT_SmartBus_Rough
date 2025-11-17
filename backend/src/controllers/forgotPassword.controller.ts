import type { Request, Response } from 'express';
import { 
  requestPasswordReset, 
  verifyOtp, 
  resetPassword 
} from '../services/forgotPassword.service.js';

export async function postForgotPassword(req: Request, res: Response) {
  try {
    const result = await requestPasswordReset(req.body);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ 
      error: { 
        message: error.message || 'Failed to process request', 
        status: 400 
      } 
    });
  }
}

export async function postVerifyOtp(req: Request, res: Response) {
  try {
    const result = await verifyOtp(req.body);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ 
      error: { 
        message: error.message || 'Invalid OTP', 
        status: 400 
      } 
    });
  }
}

export async function postResetPassword(req: Request, res: Response) {
  try {
    const result = await resetPassword(req.body);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ 
      error: { 
        message: error.message || 'Failed to reset password', 
        status: 400 
      } 
    });
  }
}
