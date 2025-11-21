import mongoose from 'mongoose';
import app from './app.js';
import config from './config.js';
import logger from './lib/logger.js';

async function start() {
  try {
    await mongoose.connect(config.mongoUri);
    logger.info('Connected to MongoDB');

    app.listen(config.port, () => {
      console.log(`API server listening
    port: ${config.port}
    time: ${new Date().toISOString()}`);
    });
  } catch (err) {
    logger.error({ err }, 'Failed to start server');
    process.exit(1);
  }
}

start();
