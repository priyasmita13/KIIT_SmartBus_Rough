import pino from 'pino';
import config from '../config.js';
const logger = pino({
    level: process.env.LOG_LEVEL || (config.isProd ? 'info' : 'debug'),
    ...(config.isProd ? {} : {
        transport: {
            target: 'pino-pretty',
            options: { colorize: true, translateTime: 'SYS:standard' },
        },
    }),
});
export default logger;
//# sourceMappingURL=logger.js.map