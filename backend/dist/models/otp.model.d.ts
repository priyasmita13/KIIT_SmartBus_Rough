import { Document, Model } from 'mongoose';
export interface OtpDocument extends Document {
    email: string;
    otp: string;
    expiresAt: Date;
    isUsed: boolean;
    createdAt: Date;
}
export declare const Otp: Model<OtpDocument>;
export default Otp;
//# sourceMappingURL=otp.model.d.ts.map