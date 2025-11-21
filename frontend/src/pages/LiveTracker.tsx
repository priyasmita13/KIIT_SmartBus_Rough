import React, { useState, useEffect, useRef } from 'react';
import { Navigation, BusIcon, UserIcon, Shield } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

// Fix Leaflet default icons
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
 shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const API = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:4000';

// Types
interface Position {
  latitude: number;
  longitude: number;
  accuracy?: number;
  lastUpdated?: string;
}

interface BusLocation {
  id: string;
  name: string;
  busId: string;
  location: Position;
  lastUpdated: string;
  routeInfo?: {
    from: string;
    to: string;
  };
  seatStatus?: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'DRIVER' | 'ADMIN';
  driverBusId?: string;
}

// Custom Icons - Student is smaller to be visible when overlapping
const createBusIcon = () => new Icon({
  iconUrl: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="14" fill="#F59E0B" stroke="white" stroke-width="3"/>
      <circle cx="20" cy="20" r="6" fill="white"/>
    </svg>
  `)}`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});

const createStudentIcon = () => new Icon({
  iconUrl: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
    <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="12" fill="#10B981" stroke="white" stroke-width="2.5"/>
      <circle cx="14" cy="14" r="5" fill="white"/>
    </svg>
  `)}`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, -14],
  className: 'student-marker'
});

const studentIcon = createStudentIcon();
const busIcon = createBusIcon();

const LiveTracker: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [userLocation, setUserLocation] = useState<Position | null>(null);
  const [busLocations, setBusLocations] = useState<BusLocation[]>([]);
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  
  // Driver-specific state
  const [fromDestination, setFromDestination] = useState<string>('');
  const [toDestination, setToDestination] = useState<string>('');
  const [seatStatus, setSeatStatus] = useState<string>('empty');
  
  const watchIdRef = useRef<number | null>(null);
  const updateIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initialize User
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 1. Track Self (Student & Driver)
  useEffect(() => {
    if (!user || user.role === 'ADMIN') return;

    if (!navigator.geolocation) {
      console.error('Geolocation is not supported');
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const location = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        };
        setUserLocation(location);
        
        // Center map initially
        if (!mapCenter) {
          setMapCenter([location.latitude, location.longitude]);
        }

        // If Driver, send update to backend
        if (user.role === 'DRIVER') {
          sendDriverUpdate(location);
        }
      },
      (err) => console.error('Geolocation error:', err.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
    );

    return () => {
      if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
    };
  }, [user]);

  // 2. Send Driver Update
  const sendDriverUpdate = async (location: Position) => {
    try {
      const token = sessionStorage.getItem('accessToken');
      await axios.post(
        `${API}/api/location/update`,
        { 
          latitude: location.latitude, 
          longitude: location.longitude,
          routeFrom: fromDestination,
          routeTo: toDestination,
          seatStatus: seatStatus
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error('Failed to update location:', err);
    }
  };

  // Update backend when driver changes route or seat status
  useEffect(() => {
    if (user?.role === 'DRIVER' && userLocation) {
      sendDriverUpdate(userLocation);
    }
  }, [fromDestination, toDestination, seatStatus]);

  // 3. Fetch Bus Locations (All Roles)
  const fetchBusLocations = async () => {
    try {
      const token = sessionStorage.getItem('accessToken');
      if (!token) return;

      const url = `${API}/api/location/all-drivers`;
      console.log(`[Frontend] Fetching from: ${url}`);
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.data.success) {
        console.log('[Frontend] Fetched drivers:', res.data.drivers);
        console.log('[Frontend] First driver details:', res.data.drivers[0]);
        // Filter out self if driver to avoid double rendering (optional, but good practice)
        const others = res.data.drivers.filter((d: any) => d.id !== user?.id);
        setBusLocations(others);
        
        // For ADMIN users, center map on first bus if not already centered
        if (user?.role === 'ADMIN' && others.length > 0 && !mapCenter) {
          const firstBus = others[0];
          setMapCenter([firstBus.location.latitude, firstBus.location.longitude]);
        }
      }
    } catch (err: any) {
      console.error('[Frontend] API Error:', err);
      if (err.response) {
        console.error('[Frontend] Error Response:', err.response.status, err.response.data);
        if (err.response.status === 401) {
          console.error(`Session expired (401). URL: ${API}`);
          if (updateIntervalRef.current) clearInterval(updateIntervalRef.current);
        }
      }
    }
  };

  useEffect(() => {
    if (!user) return;

    fetchBusLocations();
    updateIntervalRef.current = setInterval(fetchBusLocations, 5000); // Poll every 5s

    return () => {
      if (updateIntervalRef.current) clearInterval(updateIntervalRef.current);
    };
  }, [user]);

  // Render Helpers
  const getRoleBadge = () => {
    switch (user?.role) {
      case 'STUDENT': return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center"><UserIcon className="w-4 h-4 mr-1"/> Student View</span>;
      case 'DRIVER': return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center"><BusIcon className="w-4 h-4 mr-1"/> Driver View</span>;
      case 'ADMIN': return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center"><Shield className="w-4 h-4 mr-1"/> Admin View</span>;
      default: return null;
    }
  };

  // Helper to update map view
  const MapUpdater = ({ center }: { center: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, map.getZoom());
    }, [center, map]);
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Add custom CSS for student marker visibility */}
      <style>{`
        .student-marker {
          filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.9));
          z-index: 1000 !important;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-10 py-6 space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Navigation className="w-8 h-8 text-green-600 mr-3" />
              Live Bus Tracker
            </h1>
            <p className="text-gray-500 mt-1">Real-time location updates across campus</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            {getRoleBadge()}
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>Live System Active</span>
            </div>
          </div>
        </div>

        {/* Map and Sidebar Container */}
        <div className="grid grid-cols-12 gap-4">
          {/* Map Container - 8 columns (2/3 width) */}
          <div className="col-span-8 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 h-[450px] relative">
            {!user ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                <p className="text-gray-500">Please log in to view the map</p>
              </div>
            ) : (
              <MapContainer
                center={mapCenter || [20.2484, 85.8150]} // Default to Bhubaneswar
                zoom={15}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />
                
                {/* Dynamic Map Updater */}
                {mapCenter && <MapUpdater center={mapCenter} />}

                {/* Render bus markers first (lower layer) */}
                {busLocations.map((bus) => (
                  <Marker 
                    key={bus.id} 
                    position={[bus.location.latitude, bus.location.longitude]} 
                    icon={busIcon}
                    zIndexOffset={100}
                  >
                    <Popup>
                      <div className="min-w-[200px]">
                        <div className="font-bold text-lg text-gray-900 mb-3">Bus {bus.busId || 'Unassigned'}</div>
                        
                        {/* Route Information */}
                        {bus.routeInfo && (bus.routeInfo.from || bus.routeInfo.to) && (
                          <div className="mb-2 pb-2 border-b border-gray-200">
                            <div className="text-xs font-semibold text-gray-700 mb-1">Route</div>
                            {bus.routeInfo.from && (
                              <div className="text-xs text-gray-600">
                                <span className="font-medium">From:</span> {bus.routeInfo.from}
                              </div>
                            )}
                            {bus.routeInfo.to && (
                              <div className="text-xs text-gray-600">
                                <span className="font-medium">To:</span> {bus.routeInfo.to}
                              </div>
                            )}
                          </div>
                        )}
                        
                        {/* Seat Status */}
                        {bus.seatStatus && (
                          <div>
                            <div className="text-xs font-semibold text-gray-700 mb-1">Seats</div>
                            <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                              bus.seatStatus === 'empty' ? 'bg-green-100 text-green-800' :
                              bus.seatStatus === 'half-empty' ? 'bg-blue-100 text-blue-800' :
                              bus.seatStatus === 'partly-empty' ? 'bg-yellow-100 text-yellow-800' :
                              bus.seatStatus === 'full' ? 'bg-orange-100 text-orange-800' :
                              bus.seatStatus === 'standing' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {bus.seatStatus.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </span>
                          </div>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* 1. Student View: Self (Green) - render on top with glow */}
                {user.role === 'STUDENT' && userLocation && (
                  <Marker 
                    position={[userLocation.latitude, userLocation.longitude]} 
                    icon={studentIcon}
                    zIndexOffset={200}
                  >
                    <Popup>You are here</Popup>
                  </Marker>
                )}

                {/* 2. Driver View: Self (Yellow) */}
                {user.role === 'DRIVER' && userLocation && (
                  <Marker position={[userLocation.latitude, userLocation.longitude]} icon={busIcon}>
                    <Popup>Your Bus (Broadcasting)</Popup>
                  </Marker>
                )}

              </MapContainer>
            )}

            {/* Legend Overlay */}
            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur p-4 rounded-lg shadow-lg z-[1000]">
              <h3 className="font-semibold text-gray-800 mb-2">Legend</h3>
              <div className="space-y-2 text-sm">
                {user?.role === 'STUDENT' && (
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                    <span>You (Student)</span>
                  </div>
                )}
                {(user?.role === 'DRIVER' || user?.role === 'ADMIN' || user?.role === 'STUDENT') && (
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                    <span>Active Bus</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - 4 columns (1/3 width) */}
          <div className="col-span-4 bg-white rounded-xl shadow-lg border border-gray-200 p-6 h-[450px] overflow-y-auto">
            {user?.role === 'DRIVER' ? (
              /* Driver View - Show own bus info with controls */
              <>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <BusIcon className="w-5 h-5 text-yellow-600 mr-2" />
                  Your Bus Information
                </h3>
                
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-200 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                        <BusIcon className="w-7 h-7 text-white" />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-600 font-medium">Bus Number</p>
                        <p className="text-2xl font-bold text-gray-900">{user.driverBusId || 'Not Assigned'}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                        Broadcasting
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3">
                        <UserIcon className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Driver Name</p>
                        <p className="font-semibold text-gray-900">{user.name}</p>
                      </div>
                    </div>
                    
                    {userLocation && (
                      <div className="flex items-center text-sm">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3">
                          <Navigation className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Current Location</p>
                          <p className="font-mono text-xs text-gray-700">
                            {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Route Selection */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Route Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">From</label>
                      <select 
                        value={fromDestination}
                        onChange={(e) => setFromDestination(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      >
                        <option value="">Select origin</option>
                        <option value="Campus 1">Campus 1</option>
                        <option value="Campus 2">Campus 2</option>
                        <option value="Campus 3">Campus 3</option>
                        <option value="Campus 6">Campus 6</option>
                        <option value="Campus 13">Campus 13</option>
                        <option value="Campus 14">Campus 14</option>
                        <option value="Campus 15">Campus 15</option>
                        <option value="Campus 25">Campus 25</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">To</label>
                      <select 
                        value={toDestination}
                        onChange={(e) => setToDestination(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      >
                        <option value="">Select destination</option>
                        <option value="Campus 1">Campus 1</option>
                        <option value="Campus 2">Campus 2</option>
                        <option value="Campus 3">Campus 3</option>
                        <option value="Campus 6">Campus 6</option>
                        <option value="Campus 13">Campus 13</option>
                        <option value="Campus 14">Campus 14</option>
                        <option value="Campus 15">Campus 15</option>
                        <option value="Campus 25">Campus 25</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Seat Status Selection */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Seat Availability</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'empty', label: 'Empty', color: 'bg-green-100 text-green-800 border-green-300' },
                      { value: 'half-empty', label: 'Half Empty', color: 'bg-blue-100 text-blue-800 border-blue-300' },
                      { value: 'partly-empty', label: 'Partly Empty', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
                      { value: 'full', label: 'Full', color: 'bg-orange-100 text-orange-800 border-orange-300' },
                      { value: 'standing', label: 'Standing', color: 'bg-red-100 text-red-800 border-red-300' },
                    ].map((status) => (
                      <button
                        key={status.value}
                        onClick={() => setSeatStatus(status.value)}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold border-2 transition-all ${
                          seatStatus === status.value 
                            ? `${status.color} ring-2 ring-offset-1 ring-yellow-400` 
                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {status.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs text-blue-800">
                    <strong>ℹ️ Info:</strong> Your location and status are being broadcast to all students and admins in real-time.
                  </p>
                </div>
              </>
            ) : (
              /* Student/Admin View - Show active buses list */
              <>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <BusIcon className="w-5 h-5 text-yellow-600 mr-2" />
                  Active Buses
                </h3>
                
                {busLocations.length === 0 ? (
                  <div className="text-center text-gray-500 mt-8">
                    <BusIcon className="w-12 h-12 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No buses currently active</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {busLocations.map((bus) => (
                      <div 
                        key={bus.id} 
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 transition-all cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-base">Bus {bus.busId || 'Unassigned'}</h4>
                          </div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500 ml-2 mt-1"></div>
                        </div>
                        
                        {/* Route Info */}
                        {bus.routeInfo && (bus.routeInfo.from || bus.routeInfo.to) && (
                          <div className="mb-2 text-xs">
                            {bus.routeInfo.from && (
                              <div className="text-gray-600">
                                <span className="font-medium">From:</span> {bus.routeInfo.from}
                              </div>
                            )}
                            {bus.routeInfo.to && (
                              <div className="text-gray-600">
                                <span className="font-medium">To:</span> {bus.routeInfo.to}
                              </div>
                            )}
                          </div>
                        )}
                        
                        {/* Seat Status */}
                        {bus.seatStatus && (
                          <div className="mb-2">
                            <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                              bus.seatStatus === 'empty' ? 'bg-green-100 text-green-800' :
                              bus.seatStatus === 'half-empty' ? 'bg-blue-100 text-blue-800' :
                              bus.seatStatus === 'partly-empty' ? 'bg-yellow-100 text-yellow-800' :
                              bus.seatStatus === 'full' ? 'bg-orange-100 text-orange-800' :
                              bus.seatStatus === 'standing' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {bus.seatStatus.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </span>
                          </div>
                        )}
                        
                        <div className="text-xs text-gray-500">
                          Last updated: {new Date(bus.lastUpdated).toLocaleTimeString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        
        {/* Footer spacing */}
        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default LiveTracker;
