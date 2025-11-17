import mongoose, { Schema, Document, Model } from 'mongoose';

export interface OtpDocument extends Document {
  email: string;
  otp: string;
  expiresAt: Date;
  isUsed: boolean;
  createdAt: Date;
}

const otpSchema = new Schema<OtpDocument>(
  {
    email: { type: String, required: true, index: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true, index: { expireAfterSeconds: 0 } },
    isUsed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Create TTL index for automatic cleanup
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Otp: Model<OtpDocument> = mongoose.models.Otp || mongoose.model<OtpDocument>('Otp', otpSchema);

export default Otp;
