import { z } from 'zod';
declare const forgotPasswordSchema: z.ZodObject<{
    email: z.ZodString;
}, z.core.$strip>;
declare const verifyOtpSchema: z.ZodObject<{
    email: z.ZodString;
    otp: z.ZodString;
}, z.core.$strip>;
declare const resetPasswordSchema: z.ZodObject<{
    email: z.ZodString;
    otp: z.ZodString;
    newPassword: z.ZodString;
}, z.core.$strip>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export declare function requestPasswordReset(input: ForgotPasswordInput): Promise<{
    message: string;
}>;
export declare function verifyOtp(input: VerifyOtpInput): Promise<{
    message: string;
}>;
export declare function resetPassword(input: ResetPasswordInput): Promise<{
    message: string;
}>;
export {};
//# sourceMappingURL=forgotPassword.service.d.ts.map