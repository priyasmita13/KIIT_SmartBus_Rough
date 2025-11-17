import User from '../models/user.model';
export class LocationService {
    // Update user location
    static async updateLocation(userId, latitude, longitude) {
        try {
            const user = await User.findByIdAndUpdate(userId, {
                location: {
                    latitude,
                    longitude,
                    lastUpdated: new Date()
                },
                isOnline: true
            }, { new: true });
            return user;
        }
        catch (error) {
            console.error('Error updating location:', error);
            return null;
        }
    }
    // Get all online drivers (buses)
    static async getOnlineDrivers() {
        try {
            const drivers = await User.find({
                role: 'DRIVER',
                isOnline: true,
                location: { $exists: true }
            }).select('name driverBusId location lastUpdated');
            return drivers;
        }
        catch (error) {
            console.error('Error fetching online drivers:', error);
            return [];
        }
    }
    // Get nearby drivers within radius (in kilometers)
    static async getNearbyDrivers(userLat, userLng, radiusKm = 5) {
        try {
            const drivers = await User.find({
                role: 'DRIVER',
                isOnline: true,
                location: { $exists: true }
            }).select('name driverBusId location lastUpdated');
            // Filter by distance (simple distance calculation)
            const nearbyDrivers = drivers.filter(driver => {
                if (!driver.location)
                    return false;
                const distance = this.calculateDistance(userLat, userLng, driver.location.latitude, driver.location.longitude);
                return distance <= radiusKm;
            });
            return nearbyDrivers;
        }
        catch (error) {
            console.error('Error fetching nearby drivers:', error);
            return [];
        }
    }
    // Calculate distance between two points (Haversine formula)
    static calculateDistance(lat1, lng1, lat2, lng2) {
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
    static toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
    // Set user offline
    static async setUserOffline(userId) {
        try {
            await User.findByIdAndUpdate(userId, { isOnline: false });
        }
        catch (error) {
            console.error('Error setting user offline:', error);
        }
    }
}
//# sourceMappingURL=location.service.js.map