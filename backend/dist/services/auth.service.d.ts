import { z } from 'zod';
declare const signupSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
    role: z.ZodOptional<z.ZodEnum<{
        STUDENT: "STUDENT";
        DRIVER: "DRIVER";
        ADMIN: "ADMIN";
    }>>;
}, z.core.$strip>;
export type SignupInput = z.infer<typeof signupSchema>;
export declare function signup(input: SignupInput): Promise<{
    id: any;
    email: any;
    name: any;
    role: any;
}>;
declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type LoginInput = z.infer<typeof loginSchema>;
export declare function signTokens(payload: {
    sub: string;
    role: string;
}): {
    accessToken: string;
    refreshToken: string;
};
export declare function login(input: LoginInput): Promise<{
    accessToken: string;
    refreshToken: string;
    user: {
        id: any;
        email: any;
        name: any;
        role: any;
    };
}>;
export declare function sanitize(user: any): {
    id: any;
    email: any;
    name: any;
    role: any;
};
export {};
//# sourceMappingURL=auth.service.d.ts.map