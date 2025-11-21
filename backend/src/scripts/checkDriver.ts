
import mongoose from 'mongoose';
import User from '../models/user.model';
import Bus from '../models/bus.model';
import config from '../config';

async function checkDriverLocation() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('Connected to MongoDB');

    const drivers = await User.find({ role: 'DRIVER' });
    console.log(`Found ${drivers.length} drivers in total.`);

    for (const driver of drivers) {
      console.log(`\nDriver: ${driver.name} (${driver.email})`);
      console.log(`ID: ${driver._id}`);
      console.log(`Is Online: ${driver.isOnline}`);
      console.log(`Location:`, driver.location);
      console.log(`Bus ID: ${driver.driverBusId}`);

      if (driver.driverBusId) {
        const bus = await Bus.findOne({ busId: driver.driverBusId });
        if (bus) {
          console.log(`Bus (${bus.busId}) Location:`, bus.currentLocation);
        } else {
          console.log(`Bus (${driver.driverBusId}) not found in DB.`);
        }
      }
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

checkDriverLocation();
