
import mongoose from 'mongoose';
import { LocationService } from '../services/location.service';
import User from '../models/user.model';
import Bus from '../models/bus.model';
import config from '../config';

async function simulateFlow() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('Connected to MongoDB');

    // 1. Find the driver
    const driver = await User.findOne({ role: 'DRIVER' });
    if (!driver) {
      console.error('No driver found!');
      return;
    }
    console.log(`\n1. Found Driver: ${driver.name} (${driver._id})`);
    console.log(`   Current Bus ID: ${driver.driverBusId}`);

    // 2. Simulate Location Update
    console.log('\n2. Simulating Location Update...');
    const newLat = 20.35 + Math.random() * 0.01;
    const newLng = 85.80 + Math.random() * 0.01;
    
    const updatedUser = await LocationService.updateLocation(driver._id.toString(), newLat, newLng);
    
    if (updatedUser) {
      console.log('   User location updated successfully.');
      console.log(`   New Location: ${updatedUser.location?.latitude}, ${updatedUser.location?.longitude}`);
      console.log(`   Is Online: ${updatedUser.isOnline}`);
    } else {
      console.error('   Failed to update user location!');
    }

    // 3. Check Bus Update
    if (driver.driverBusId) {
      const bus = await Bus.findOne({ busId: driver.driverBusId });
      console.log(`\n3. Checking Bus (${driver.driverBusId})...`);
      if (bus) {
        console.log(`   Bus Location: ${bus.currentLocation?.latitude}, ${bus.currentLocation?.longitude}`);
        console.log(`   Bus Status: ${bus.status}`);
        
        // Verify match
        if (Math.abs(bus.currentLocation?.latitude - newLat) < 0.0001) {
           console.log('   ✅ Bus location matches update!');
        } else {
           console.log('   ❌ Bus location DOES NOT match update!');
        }
      } else {
        console.log('   Bus not found in DB.');
      }
    }

    // 4. Simulate Fetch (what the student sees)
    console.log('\n4. Simulating "Get Online Drivers" fetch...');
    const onlineDrivers = await LocationService.getOnlineDrivers();
    console.log(`   Found ${onlineDrivers.length} online drivers.`);
    
    const foundMe = onlineDrivers.find(d => d._id.toString() === driver._id.toString());
    if (foundMe) {
      console.log('   ✅ Driver is in the list!');
      console.log('   Data:', JSON.stringify(foundMe.location));
    } else {
      console.log('   ❌ Driver is NOT in the list!');
      console.log('   Debug: Why?');
      console.log(`   - Role: ${driver.role}`);
      console.log(`   - IsOnline: ${updatedUser?.isOnline}`);
      console.log(`   - Location Exists: ${!!updatedUser?.location}`);
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

simulateFlow();
