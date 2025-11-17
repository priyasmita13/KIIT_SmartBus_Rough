import mongoose, { Schema, Document, Model } from 'mongoose';
const userSchema = new Schema({
    email: { type: String, unique: true, required: true, index: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['STUDENT', 'DRIVER', 'ADMIN'], default: 'STUDENT', index: true },
    driverBusId: { type: String },
    location: {
        latitude: { type: Number },
        longitude: { type: Number },
        lastUpdated: { type: Date, default: Date.now }
    },
    isOnline: { type: Boolean, default: false }
}, { timestamps: true });
export const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
//# sourceMappingURL=user.model.js.map