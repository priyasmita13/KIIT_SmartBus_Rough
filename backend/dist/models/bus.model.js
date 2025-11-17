import mongoose, { Schema, Document, Model } from 'mongoose';
const busSchema = new Schema({
    busId: { type: String, unique: true, required: true, index: true },
    driverId: { type: String, ref: 'User' },
    currentLocation: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    destination: { type: String, required: true, default: 'Campus 25' },
    seatAvailability: {
        type: String,
        enum: ['EMPTY', 'FEW_SEATS', 'FULL'],
        default: 'EMPTY'
    },
    passengerCount: { type: Number, default: 0, min: 0 },
    maxCapacity: { type: Number, default: 30 },
    status: {
        type: String,
        enum: ['IN_SERVICE', 'OUT_OF_SERVICE', 'ON_BREAK', 'EMERGENCY'],
        default: 'OUT_OF_SERVICE'
    },
    lastUpdated: { type: Date, default: Date.now },
    route: { type: String, default: 'Main Route' },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });
busSchema.index({ busId: 1 });
busSchema.index({ driverId: 1 });
busSchema.index({ isActive: 1 });
export const Bus = mongoose.models.Bus || mongoose.model('Bus', busSchema);
export default Bus;
//# sourceMappingURL=bus.model.js.map