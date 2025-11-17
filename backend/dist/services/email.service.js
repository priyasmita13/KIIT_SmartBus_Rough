import nodemailer from 'nodemailer';
import config from '../config.js';
// Create transporter (using Gmail for development - you can change this)
const createTransporter = () => {
    if (config.isProd) {
        // Production email configuration
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.emailUser,
                pass: config.emailPassword,
            },
        });
    }
    else {
        // Development - using Ethereal Email for testing
        return nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'ethereal.user@ethereal.email',
                pass: 'ethereal.pass',
            },
        });
    }
};
export async function sendOtpEmail(email, otp) {
    const transporter = createTransporter();
    const mailOptions = {
        from: config.emailUser || 'noreply@kiitsmartbus.com',
        to: email,
        subject: 'Password Reset OTP - KIIT Smart Bus',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
        <p>Hello,</p>
        <p>You have requested to reset your password for KIIT Smart Bus. Please use the following OTP to proceed:</p>
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; margin: 20px 0;">
          <h1 style="color: #007bff; font-size: 32px; margin: 0; letter-spacing: 5px;">${otp}</h1>
        </div>
        <p><strong>This OTP will expire in 10 minutes.</strong></p>
        <p>If you did not request this password reset, please ignore this email.</p>
        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
          This is an automated message from KIIT Smart Bus System.
        </p>
      </div>
    `,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        // In development, log the preview URL for Ethereal
        if (!config.isProd && info.previewUrl) {
            console.log('Preview URL:', info.previewUrl);
        }
    }
    catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send OTP email');
    }
}
//# sourceMappingURL=email.service.js.map