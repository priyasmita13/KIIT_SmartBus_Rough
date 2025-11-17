import mongoose, { Schema, Document, Model } from 'mongoose';
const otpSchema = new Schema({
    email: { type: String, required: true, index: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true, index: { expireAfterSeconds: 0 } },
    isUsed: { type: Boolean, default: false },
}, { timestamps: true });
// Create TTL index for automatic cleanup
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export const Otp = mongoose.models.Otp || mongoose.model('Otp', otpSchema);
export default Otp;
//# sourceMappingURL=otp.model.js.map