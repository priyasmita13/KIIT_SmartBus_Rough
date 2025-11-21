import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';
import config from './config.js';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

const app = express();

app.use(helmet());
app.use(compression());
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    limit: 300,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
  })
);
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      const explicitlyAllowed = config.corsOrigins.includes(origin);
      const devLocalhostAllowed = !config.isProd && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
      const allowed = explicitlyAllowed || devLocalhostAllowed;
      cb(allowed ? null : new Error('CORS blocked'), allowed);
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan(config.isProd ? 'combined' : 'dev'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api', routes);
app.use(errorHandler);

export default app;


