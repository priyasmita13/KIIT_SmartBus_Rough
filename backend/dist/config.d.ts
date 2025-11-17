export type AppConfig = {
    nodeEnv: 'development' | 'test' | 'production';
    port: number;
    mongoUri: string;
    jwtAccessSecret: string;
    jwtRefreshSecret: string;
    jwtAccessTtl: string;
    jwtRefreshTtl: string;
    corsOrigins: string[];
    cookieDomain?: string;
    isProd: boolean;
    emailUser: string | undefined;
    emailPassword: string | undefined;
};
export declare const config: AppConfig;
export default config;
//# sourceMappingURL=config.d.ts.map