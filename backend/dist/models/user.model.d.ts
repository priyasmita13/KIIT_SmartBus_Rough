import { Document, Model } from 'mongoose';
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
}
export declare const User: Model<UserDocument>;
export default User;
//# sourceMappingURL=user.model.d.ts.map