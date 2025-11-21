import dotenv from 'dotenv';

dotenv.config();

export type AppConfig = {
  nodeEnv: 'development' | 'test' | 'production';
  port: number;
  mongoUri: string;
  jwtAccessSecret: string;
  jwtRefreshSecret: string;
  jwtAccessTtl: string; // e.g., '15m'
  jwtRefreshTtl: string; // e.g., '7d'
  corsOrigins: string[];
  cookieDomain?: string;
  isProd: boolean;
  emailUser: string | undefined;
  emailPassword: string | undefined;
};

function required(name: string, value: string | undefined): string {
  if (!value) throw new Error(`Missing required env var ${name}`);
  return value;
}

const rawCors = process.env.CORS_ORIGINS || '';
const corsOrigins = rawCors
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

export const config: AppConfig = {
  nodeEnv: (process.env.NODE_ENV as AppConfig['nodeEnv']) || 'development',
  port: Number(process.env.PORT || 4000),
  mongoUri: required('MONGO_URI', process.env.MONGO_URI),
  jwtAccessSecret: required('JWT_ACCESS_SECRET', process.env.JWT_ACCESS_SECRET),
  jwtRefreshSecret: required('JWT_REFRESH_SECRET', process.env.JWT_REFRESH_SECRET),
  jwtAccessTtl: process.env.JWT_ACCESS_TTL || '15m',
  jwtRefreshTtl: process.env.JWT_REFRESH_TTL || '7d',
  corsOrigins: corsOrigins.length ? corsOrigins : ['http://localhost:5173'],
  cookieDomain: process.env.COOKIE_DOMAIN || 'localhost',
  isProd: process.env.NODE_ENV === 'production',
  emailUser: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASSWORD,
};

console.log('[Config] Loaded:', { 
  mongoUri: config.mongoUri, 
  jwtAccessTtl: config.jwtAccessTtl,
  isProd: config.isProd 
});

export default config;



