import mongoose from 'mongoose';
import Bus from '../models/bus.model.js';
import config from '../config.js';

async function initBus() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('Connected to MongoDB');

    // Create demo bus
    const demoBus = await Bus.findOneAndUpdate(
      { busId: 'B001' },
      {
        busId: 'B001',
        currentLocation: {
          latitude: 20.355,
          longitude: 85.819
        },
        destination: 'Campus 25',
        seatAvailability: 'FEW_SEATS',
        passengerCount: 15,
        maxCapacity: 30,
        status: 'IN_SERVICE',
        lastUpdated: new Date(),
        route: 'Main Route',
        isActive: true
      },
      { upsert: true, new: true }
    );

    console.log('Demo bus created:', demoBus);
    process.exit(0);
  } catch (error) {
    console.error('Error initializing bus:', error);
    process.exit(1);
  }
}

initBus();
