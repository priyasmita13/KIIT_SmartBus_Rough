import User from '../models/user.model';
import type { UserDocument } from '../models/user.model';
import Bus from '../models/bus.model';

export interface LocationUpdate {
  latitude: number;
  longitude: number;
  userId: string;
}

export class LocationService {
  // Update user location
  static async updateLocation(
    userId: string, 
    latitude: number, 
    longitude: number,
    routeFrom?: string,
    routeTo?: string,
    seatStatus?: string
  ): Promise<UserDocument | null> {
    try {
      const updateData: any = {
        location: {
          latitude,
          longitude,
          lastUpdated: new Date()
        },
        isOnline: true
      };

      // Add route and seat info if provided (for drivers)
      if (routeFrom !== undefined || routeTo !== undefined) {
        updateData.routeInfo = {
          from: routeFrom || '',
          to: routeTo || ''
        };
      }
      if (seatStatus !== undefined) {
        updateData.seatStatus = seatStatus;
      }

      console.log('[LocationService] Updating with data:', {
        userId,
        routeFrom,
        routeTo,
        seatStatus,
        updateData
      });

      const user = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true }
      );

      console.log('[LocationService] Updated user:', {
        id: user?.id,
        routeInfo: user?.routeInfo,
        seatStatus: user?.seatStatus
      });

      // If user is a driver and has a bus assigned, update the bus location too
      if (user && user.role === 'DRIVER' && user.driverBusId) {
        await Bus.findOneAndUpdate(
          { busId: user.driverBusId },
          {
            currentLocation: {
              latitude,
              longitude
            },
            lastUpdated: new Date(),
            status: 'IN_SERVICE',
            isActive: true
          }
        );
      }

      return user;
    } catch (error) {
      console.error('Error updating location:', error);
      return null;
    }
  }

  // Get all online drivers (buses)
  static async getOnlineDrivers(): Promise<UserDocument[]> {
    try {
      const drivers = await User.find({
        role: 'DRIVER',
        isOnline: true,
        location: { $exists: true }
      }).select('name driverBusId location lastUpdated routeInfo seatStatus');
      
      console.log('[LocationService] Fetched drivers:', drivers.map(d => ({
        id: d.id,
        name: d.name,
        busId: d.driverBusId,
        routeInfo: d.routeInfo,
        seatStatus: d.seatStatus
      })));

      return drivers;
    } catch (error) {
      console.error('Error fetching online drivers:', error);
      return [];
    }
  }

  // Get nearby drivers within radius (in kilometers)
  static async getNearbyDrivers(userLat: number, userLng: number, radiusKm: number = 5): Promise<UserDocument[]> {
    try {
      const drivers = await User.find({
        role: 'DRIVER',
        isOnline: true,
        location: { $exists: true }
      }).select('name driverBusId location lastUpdated');

      // Filter by distance (simple distance calculation)
      const nearbyDrivers = drivers.filter(driver => {
        if (!driver.location) return false;
        
        const distance = this.calculateDistance(
          userLat, userLng,
          driver.location.latitude, driver.location.longitude
        );
        
        return distance <= radiusKm;
      });

      return nearbyDrivers;
    } catch (error) {
      console.error('Error fetching nearby drivers:', error);
      return [];
    }
  }

  // Calculate distance between two points (Haversine formula)
  private static calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLng = this.toRadians(lng2 - lng1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return distance;
  }

  private static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  // Set user offline
  static async setUserOffline(userId: string): Promise<void> {
    try {
      await User.findByIdAndUpdate(userId, { isOnline: false });
    } catch (error) {
      console.error('Error setting user offline:', error);
    }
  }
}
