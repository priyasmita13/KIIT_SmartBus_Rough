
import mongoose from 'mongoose';
import User from '../models/user.model';
import config from '../config';

async function assignBusToDriver() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('Connected to MongoDB');

    const driver = await User.findOne({ role: 'DRIVER' });
    if (!driver) {
      console.log('No driver found!');
      return;
    }

    console.log(`Found driver: ${driver.name}`);
    
    // Assign B001 to this driver
    driver.driverBusId = 'B001';
    await driver.save();
    
    console.log(`Assigned Bus ID 'B001' to driver ${driver.name}`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

assignBusToDriver();
