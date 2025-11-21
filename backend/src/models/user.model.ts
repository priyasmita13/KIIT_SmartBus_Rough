import mongoose, { Schema, Document, Model } from 'mongoose';

export type UserRole = 'STUDENT' | 'DRIVER' | 'ADMIN';

export interface UserDocument extends Document {
  email: string;
  passwordHash: string;
  name: string;
  role: UserRole;
  driverBusId?: string;
  location?: {
    latitude: number;
    longitude: number;
    lastUpdated: Date;
  };
  isOnline?: boolean;
  routeInfo?: {
    from: string;
    to: string;
  };
  seatStatus?: string;
}

const userSchema = new Schema<UserDocument>(
  {
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
    isOnline: { type: Boolean, default: false },
    routeInfo: {
      from: { type: String },
      to: { type: String }
    },
    seatStatus: { type: String }
  },
  { timestamps: true }
);


export const User: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);

export default User;


