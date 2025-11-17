import { useState } from 'react';
import { Clock, Navigation, Locate } from 'lucide-react';

const RouteSchedule = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  const campusLocations = [
    'Campus 1 (Main Campus)',
    'Campus 6 (Engineering)',
    'Campus 15 (Medical)',
    'Campus 25 (Law & Management)',
    'Main Gate',
    'Library Junction',
    'Sports Complex',
    'Hostels Area',
    'Medical Center',
    'Academic Block A',
    'Academic Block B',
    'Food Court',
    'Admin Building'
  ];

  const routes = [
    {
      id: 'R001',
      name: 'Main Circuit',
      path: 'Campus 1 → Campus 6 → Campus 15 → Campus 25 → Campus 1',
      frequency: '10 min',
      duration: '45 min',
      buses: ['KB001', 'KB003', 'KB005'],
      stops: [
        { name: 'Campus 1 (Main Campus)', time: '08:00', duration: '2 min' },
        { name: 'Library Junction', time: '08:05', duration: '1 min' },
        { name: 'Campus 6 (Engineering)', time: '08:12', duration: '3 min' },
        { name: 'Sports Complex', time: '08:18', duration: '1 min' },
        { name: 'Campus 15 (Medical)', time: '08:25', duration: '3 min' },
        { name: 'Medical Center', time: '08:30', duration: '1 min' },
        { name: 'Campus 25 (Law & Management)', time: '08:38', duration: '2 min' },
        { name: 'Campus 1 (Main Campus)', time: '08:45', duration: '2 min' }
      ]
    },
    {
      id: 'R002',
      name: 'Express Route',
      path: 'Campus 1 → Campus 15 → Campus 1',
      frequency: '15 min',
      duration: '25 min',
      buses: ['KB002', 'KB004'],
      stops: [
        { name: 'Campus 1 (Main Campus)', time: '08:00', duration: '2 min' },
        { name: 'Academic Block A', time: '08:08', duration: '1 min' },
        { name: 'Campus 15 (Medical)', time: '08:15', duration: '3 min' },
        { name: 'Campus 1 (Main Campus)', time: '08:25', duration: '2 min' }
      ]
    },
    {
      id: 'R003',
      name: 'Hostel Shuttle',
      path: 'Hostels Area → Campus 6 → Hostels Area',
      frequency: '8 min',
      duration: '20 min',
      buses: ['KB006'],
      stops: [
        { name: 'Hostels Area', time: '07:30', duration: '2 min' },
        { name: 'Food Court', time: '07:35', duration: '1 min' },
        { name: 'Campus 6 (Engineering)', time: '07:42', duration: '3 min' },
        { name: 'Hostels Area', time: '07:50', duration: '2 min' }
      ]
    }
  ];

  const handleGetLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          // Mock location detection - in real app, this would reverse geocode
          setTimeout(() => {
            setSource('Campus 1 (Main Campus)'); // Mock result
            setIsLocating(false);
          }, 1000);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLocating(false);
        }
      );
    } else {
      setIsLocating(false);
    }
  };

  const findRoutes = () => {
    if (!source || !destination) return [];
    return routes.filter(route => 
      route.stops.some(stop => stop.name.includes(source.split(' ')[0])) &&
      route.stops.some(stop => stop.name.includes(destination.split(' ')[0]))
    );
  };

  const suggestedRoutes = findRoutes();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
          <Navigation className="h-8 w-8 text-green-primary" />
          <span>Route & Schedule</span>
        </h1>
        <p className="text-gray-600 mt-2">Plan your journey with detailed routes and schedules</p>
      </div>

      {/* Route Planner */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Plan Your Journey</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Source */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From (Source)</label>
            <div className="relative">
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent"
              >
                <option value="">Select source location</option>
                {campusLocations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              <button
                onClick={handleGetLocation}
                disabled={isLocating}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-primary hover:text-green-secondary"
                title="Use current location"
              >
                <Locate className={`h-5 w-5 ${isLocating ? 'animate-pulse' : ''}`} />
              </button>
            </div>
            {isLocating && (
              <p className="text-sm text-green-primary mt-1">Detecting your location...</p>
            )}
          </div>

          {/* Destination */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To (Destination)</label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent"
            >
              <option value="">Select destination</option>
              {campusLocations.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Results */}
        {source && destination && (
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-semibold text-green-primary mb-2">Suggested Routes</h3>
            {suggestedRoutes.length > 0 ? (
              <div className="space-y-2">
                {suggestedRoutes.map((route) => (
                  <div key={route.id} className="bg-white rounded-lg p-3 border border-green-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{route.name}</span>
                      <div className="flex space-x-4 text-sm text-gray-600">
                        <span>Duration: {route.duration}</span>
                        <span>Frequency: {route.frequency}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-green-700">No direct routes found. Please check available routes below.</p>
            )}
          </div>
        )}
      </div>

      {/* All Routes */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">All Routes</h2>
        
        {routes.map((route) => (
          <div key={route.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-green-primary text-white p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                <div>
                  <h3 className="text-xl font-bold">{route.name}</h3>
                  <p className="text-green-100">{route.path}</p>
                </div>
                <div className="text-right">
                  <div className="flex space-x-4 text-sm">
                    <div>
                      <Clock className="h-4 w-4 inline mr-1" />
                      Every {route.frequency}
                    </div>
                    <div>
                      <Navigation className="h-4 w-4 inline mr-1" />
                      {route.duration} journey
                    </div>
                  </div>
                  <p className="text-green-100 text-sm mt-1">
                    Buses: {route.buses.join(', ')}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Route Timeline</h4>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-green-200"></div>
                
                <div className="space-y-4">
                  {route.stops.map((stop, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="relative z-10">
                        <div className="w-3 h-3 bg-green-primary rounded-full border-2 border-white shadow"></div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                          <div>
                            <p className="font-medium text-gray-900">{stop.name}</p>
                            <p className="text-sm text-gray-600">Stop duration: {stop.duration}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-primary">{stop.time}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Information */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Schedule Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Operating Hours</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Weekdays: 7:00 AM - 10:00 PM</p>
              <p>Weekends: 8:00 AM - 9:00 PM</p>
              <p>Holidays: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Peak Hours</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Morning: 8:00 AM - 10:00 AM</p>
              <p>Lunch: 12:00 PM - 2:00 PM</p>
              <p>Evening: 5:00 PM - 7:00 PM</p>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Service Notes</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Higher frequency during peak hours</p>
              <p>Express routes available</p>
              <p>Real-time updates via app</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteSchedule;


