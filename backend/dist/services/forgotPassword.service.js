import { z } from 'zod';
import User from '../models/user.model.js';
import Otp from '../models/otp.model.js';
import { sendOtpEmail } from './email.service.js';
import { hashPassword } from '../utils/crypto.js';
import { errors } from '../lib/errors.js';
const forgotPasswordSchema = z.object({
    email: z.string().email(),
});
const verifyOtpSchema = z.object({
    email: z.string().email(),
    otp: z.string().length(6),
});
const resetPasswordSchema = z.object({
    email: z.string().email(),
    otp: z.string().length(6),
    newPassword: z.string().min(8),
});
// Generate 6-digit OTP
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
export async function requestPasswordReset(input) {
    const { email } = forgotPasswordSchema.parse(input);
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        // Don't reveal if user exists or not for security
        return { message: 'If an account with this email exists, an OTP has been sent.' };
    }
    // Generate OTP
    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    // Delete any existing OTPs for this email
    await Otp.deleteMany({ email });
    // Save new OTP
    await Otp.create({
        email,
        otp,
        expiresAt,
    });
    // Send email
    try {
        await sendOtpEmail(email, otp);
    }
    catch (error) {
        console.error('Failed to send OTP email:', error);
        throw new Error('Failed to send OTP. Please try again.');
    }
    return { message: 'If an account with this email exists, an OTP has been sent.' };
}
export async function verifyOtp(input) {
    const { email, otp } = verifyOtpSchema.parse(input);
    const otpRecord = await Otp.findOne({
        email,
        otp,
        isUsed: false,
        expiresAt: { $gt: new Date() },
    });
    if (!otpRecord) {
        throw errors.unauthorized('Invalid or expired OTP');
    }
    return { message: 'OTP verified successfully' };
}
export async function resetPassword(input) {
    const { email, otp, newPassword } = resetPasswordSchema.parse(input);
    // Verify OTP first
    const otpRecord = await Otp.findOne({
        email,
        otp,
        isUsed: false,
        expiresAt: { $gt: new Date() },
    });
    if (!otpRecord) {
        throw errors.unauthorized('Invalid or expired OTP');
    }
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        throw errors.notFound('User not found');
    }
    // Hash new password
    const passwordHash = await hashPassword(newPassword);
    // Update user password
    await User.findByIdAndUpdate(user.id, { passwordHash });
    // Mark OTP as used
    await Otp.findByIdAndUpdate(otpRecord.id, { isUsed: true });
    return { message: 'Password reset successfully' };
}
//# sourceMappingURL=forgotPassword.service.js.map