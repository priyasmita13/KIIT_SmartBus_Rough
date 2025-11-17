// import { useState, useEffect } from 'react';
// import { MapPin, Navigation, RefreshCw, Bus } from 'lucide-react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { Icon } from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// const LiveTracker = () => {
//   console.log('LiveTracker component is rendering');
//   const [isLoading, setIsLoading] = useState(false);
//   const [userLocation, setUserLocation] = useState<{latitude: number, longitude: number, accuracy?: number} | null>(null);
//   const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [permissionDenied, setPermissionDenied] = useState(false);
//   const [locationAccuracy, setLocationAccuracy] = useState<number | null>(null);
//   const [isGettingLocation, setIsGettingLocation] = useState(false);
//   const [showManualInput, setShowManualInput] = useState(false);
//   const [manualLat, setManualLat] = useState('');
//   const [manualLng, setManualLng] = useState('');

//   // AGGRESSIVE GPS DEBUGGING AND FORCE FRESH LOCATION
//   const getCurrentLocation = () => {
//     if (!navigator.geolocation) {
//       setError('Geolocation is not supported by this browser');
//       return;
//     }

//     console.log('🔍 STARTING GPS LOCATION REQUEST');
//     console.log('🔍 Current userLocation:', userLocation);
//     console.log('🔍 Current mapCenter:', mapCenter);
    
//     setIsGettingLocation(true);
//     setError(null);

//     // FORCE FRESH LOCATION - NO CACHING ALLOWED
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const location = {
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//           accuracy: position.coords.accuracy
//         };
        
//         console.log('🔍 GPS POSITION RECEIVED:');
//         console.log('🔍 Latitude:', position.coords.latitude);
//         console.log('🔍 Longitude:', position.coords.longitude);
//         console.log('🔍 Accuracy:', position.coords.accuracy, 'meters');
//         console.log('🔍 Timestamp:', new Date(position.timestamp));
//         console.log('🔍 Altitude:', position.coords.altitude);
//         console.log('🔍 Heading:', position.coords.heading);
//         console.log('🔍 Speed:', position.coords.speed);
        
//         // ACCEPT ANY LOCATION FOR NOW - LET'S SEE WHAT GPS ACTUALLY RETURNS
//         console.log('✅ ACCEPTING GPS LOCATION (even if wrong):', location);
        
//         console.log('✅ GPS LOCATION ACCEPTED:', location);
//         setUserLocation(location);
//         setMapCenter([location.latitude, location.longitude]);
//         setLocationAccuracy(position.coords.accuracy);
//         setError(null);
//         setPermissionDenied(false);
//         setIsGettingLocation(false);
//       },
//       (error) => {
//         console.error('❌ GPS ERROR:', error);
//         console.error('❌ Error code:', error.code);
//         console.error('❌ Error message:', error.message);
        
//         let errorMessage = 'Unable to retrieve your location';
        
//         switch (error.code) {
//           case error.PERMISSION_DENIED:
//             errorMessage = 'Location access denied by user';
//             setPermissionDenied(true);
//             break;
//           case error.POSITION_UNAVAILABLE:
//             errorMessage = 'Location information unavailable';
//             break;
//           case error.TIMEOUT:
//             errorMessage = 'Location request timed out';
//             break;
//         }
        
//         setError(errorMessage);
//         setIsGettingLocation(false);
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 30000, // 30 second timeout
//         maximumAge: 0 // FORCE FRESH DATA - NO CACHING
//       }
//     );
//   };

//   // Get location on component mount - TRY WATCHPOSITION FOR BETTER ACCURACY
//   useEffect(() => {
//     if (!navigator.geolocation) {
//       setError('Geolocation is not supported by this browser');
//       return;
//     }

//     console.log('🔍 STARTING CONTINUOUS LOCATION WATCHING');
    
//     const watchId = navigator.geolocation.watchPosition(
//       (position) => {
//         const location = {
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//           accuracy: position.coords.accuracy
//         };
        
//         console.log('🔍 WATCH POSITION UPDATE:', location);
//         console.log('🔍 Accuracy:', position.coords.accuracy, 'meters');
        
//         // Accept the location and stop watching after first good one
//         setUserLocation(location);
//         setMapCenter([location.latitude, location.longitude]);
//         setLocationAccuracy(position.coords.accuracy);
//         setError(null);
//         setPermissionDenied(false);
//         setIsGettingLocation(false);
        
//         // Stop watching after getting location
//         navigator.geolocation.clearWatch(watchId);
//       },
//       (error) => {
//         console.error('❌ WATCH POSITION ERROR:', error);
//         setError('Unable to get your location');
//         setIsGettingLocation(false);
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 30000,
//         maximumAge: 0
//       }
//     );

//     // Cleanup watch on unmount
//     return () => {
//       navigator.geolocation.clearWatch(watchId);
//     };
//   }, []);

//   const refreshData = () => {
//     setIsLoading(true);
//     console.log('🔄 FORCE REFRESHING LOCATION...');
    
//     // Clear any existing location data
//     setUserLocation(null);
//     setMapCenter(null);
//     setLocationAccuracy(null);
//     setError(null);
    
//     // Force fresh location after clearing
//     setTimeout(() => {
//       getCurrentLocation();
//     }, 100);
//   };

//   const setManualLocation = () => {
//     const lat = parseFloat(manualLat);
//     const lng = parseFloat(manualLng);
    
//     if (isNaN(lat) || isNaN(lng)) {
//       alert('Please enter valid coordinates');
//       return;
//     }
    
//     if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
//       alert('Invalid coordinate range');
//       return;
//     }
    
//     const location = {
//       latitude: lat,
//       longitude: lng,
//       accuracy: 0 // Manual location is considered perfect
//     };
    
//     console.log('Setting manual location:', location);
    
//     // Force update all location states
//     setUserLocation(location);
//     setMapCenter([lat, lng]);
//     setLocationAccuracy(0);
//     setError(null);
//     setPermissionDenied(false);
//     setIsGettingLocation(false);
    
//     // Force map to re-render with new location
//     setTimeout(() => {
//       setMapCenter([lat, lng]);
//       console.log('Map center updated to:', [lat, lng]);
//     }, 100);
    
//     // Force another update to ensure marker moves
//     setTimeout(() => {
//       setMapCenter([lat, lng]);
//       console.log('Map center force updated to:', [lat, lng]);
//     }, 500);
    
//     setShowManualInput(false);
//     setManualLat('');
//     setManualLng('');
//     console.log('Manual location set successfully:', location);
//   };

//   // Create a more reliable custom icon using a different approach
//   const userIcon = new Icon({
//     iconUrl: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
//       <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//         <circle cx="12" cy="12" r="10" fill="#10B981" stroke="white" stroke-width="2"/>
//         <circle cx="12" cy="12" r="4" fill="white"/>
//       </svg>
//     `),
//     iconSize: [24, 24],
//     iconAnchor: [12, 12],
//     popupAnchor: [0, -12]
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
//         {/* Header */}
//         <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
//             <div>
//               <h1 className="text-4xl font-bold bg-gradient-to-r from-green-primary to-green-secondary bg-clip-text text-transparent flex items-center space-x-3">
//                 <div className="bg-gradient-to-r from-green-primary to-green-secondary p-2 rounded-xl animate-pulse">
//                   <MapPin className="h-8 w-8 text-white" />
//                 </div>
//                 <span>Live Tracker</span>
//               </h1>
//               <div className="text-gray-600 mt-2 flex items-center space-x-2">
//                 <div className={`w-2 h-2 rounded-full ${
//                   userLocation ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
//                 }`}></div>
//                 <span>
//                   {userLocation ? `Location found • Accuracy: ${locationAccuracy ? Math.round(locationAccuracy) : 'Unknown'}m` : 'Finding location...'}
//                 </span>
//               </div>
//             </div>
//             <div className="flex space-x-3">
//               <button
//                 onClick={refreshData}
//                 disabled={isLoading}
//                 className="bg-gradient-to-r from-green-primary to-green-secondary text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all flex items-center space-x-2 disabled:opacity-50"
//               >
//                 <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
//                 <span>Force Refresh</span>
//               </button>
//               <button
//                 onClick={() => setShowManualInput(!showManualInput)}
//                 className="bg-purple-500 text-white px-4 py-3 rounded-xl hover:bg-purple-600 transition-all flex items-center space-x-2"
//               >
//                 <MapPin className="h-5 w-5" />
//                 <span>Manual Location</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Manual Location Input */}
//         {showManualInput && (
//           <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Manual Location Input</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
//                 <input
//                   type="number"
//                   step="any"
//                   value={manualLat}
//                   onChange={(e) => setManualLat(e.target.value)}
//                   placeholder="e.g., 20.3544"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
//                 <input
//                   type="number"
//                   step="any"
//                   value={manualLng}
//                   onChange={(e) => setManualLng(e.target.value)}
//                   placeholder="e.g., 85.8180"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//             <div className="flex space-x-3 mt-4">
//               <button
//                 onClick={setManualLocation}
//                 className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
//               >
//                 Set Location
//               </button>
//               <button
//                 onClick={() => setShowManualInput(false)}
//                 className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Map Section */}
//           <div className="lg:col-span-2">
//             <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/20">
//               <div className="p-4 bg-gradient-to-r from-green-primary to-green-secondary text-white">
//                 <h2 className="text-xl font-semibold flex items-center space-x-2">
//                   <Navigation className="h-5 w-5" />
//                   <span>Live Map View</span>
//                 </h2>
//               </div>
//               <div className="h-96 relative">
//                 {permissionDenied ? (
//                   <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
//                     <div className="text-center p-6">
//                       <MapPin className="h-16 w-16 text-red-400 mx-auto mb-4" />
//                       <p className="text-gray-600 font-medium">Location Access Required</p>
//                       <p className="text-gray-500 text-sm mt-2">Please enable location access to view the live map</p>
//                       <button
//                         onClick={getCurrentLocation}
//                         className="mt-4 bg-green-primary text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
//                       >
//                         Enable Location
//                       </button>
//                     </div>
//                   </div>
//                 ) : error ? (
//                   <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
//                     <div className="text-center p-6">
//                       <MapPin className="h-16 w-16 text-red-400 mx-auto mb-4" />
//                       <p className="text-gray-600 font-medium">Location Error</p>
//                       <p className="text-gray-500 text-sm mt-2">{error}</p>
//                       <button
//                         onClick={getCurrentLocation}
//                         className="mt-4 bg-green-primary text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
//                       >
//                         Retry
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <>
//                     {mapCenter ? (
//                     <MapContainer
//                       center={mapCenter}
//                       zoom={15}
//                       style={{ height: '100%', width: '100%' }}
//                       className="rounded-lg"
//                       key={`${userLocation?.latitude}-${userLocation?.longitude}`}
//                     >
//                     <TileLayer
//                       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                       maxZoom={19}
//                       minZoom={1}
//                     />
                    
//                     {/* User Location Marker - SIMPLE */}
//                     {userLocation && (
//                       <Marker
//                         key={`${userLocation.latitude}-${userLocation.longitude}`}
//                         position={[userLocation.latitude, userLocation.longitude]}
//                         icon={userIcon}
//                       >
//                         <Popup>
//                           <div className="text-center">
//                             <p className="font-semibold text-green-600">📍 Your Location</p>
//                             <p className="text-sm text-gray-600">
//                               {userLocation.latitude.toFixed(6)}, {userLocation.longitude.toFixed(6)}
//                             </p>
//                             <p className="text-xs text-gray-500 mt-1">
//                               {locationAccuracy === 0 ? 'Manual Location (Perfect)' : `GPS Accuracy: ${Math.round(locationAccuracy || 0)}m`}
//                             </p>
//                           </div>
//                         </Popup>
//                       </Marker>
//                     )}
//                     </MapContainer>
//                   ) : (
//                     <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
//                       <div className="text-center p-6">
//                         <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//                         <p className="text-gray-600 font-medium">Waiting for location...</p>
//                         <p className="text-gray-500 text-sm mt-2">Please allow location access to view the map</p>
//                       </div>
//                     </div>
//                   )}
//                   </>
//                 )}
                
//                 {/* Tracking Status */}
//                 <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
//                   <div className="flex items-center space-x-2">
//                     <div className={`w-3 h-3 rounded-full ${userLocation ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
//                     <span className="text-sm font-medium text-gray-700">
//                       {userLocation ? 'Location Active' : 'Finding Location...'}
//                     </span>
//                   </div>
//                   {userLocation && (
//                     <p className="text-xs text-gray-500 mt-1">
//                       You are here!
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Location Info */}
//           <div className="space-y-4">
//             <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-white/20">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Location</h3>
//               {userLocation ? (
//                 <div className="space-y-3">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//                       <MapPin className="h-5 w-5 text-green-600" />
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-800">Location Found</p>
//                       <p className="text-sm text-gray-600">GPS coordinates detected</p>
//                     </div>
//                   </div>
//                   <div className="bg-gray-50 rounded-lg p-3">
//                     <p className="text-xs text-gray-500 mb-1">Coordinates</p>
//                     <p className="font-mono text-sm">
//                       {userLocation.latitude.toFixed(6)}, {userLocation.longitude.toFixed(6)}
//                     </p>
//                     {locationAccuracy && (
//                       <div className="mt-2 pt-2 border-t border-gray-200">
//                         <p className="text-xs text-gray-500">GPS Accuracy</p>
//                         <p className="text-sm font-medium">
//                           {Math.round(locationAccuracy)}m radius
//                           {locationAccuracy < 10 ? ' (Excellent)' : 
//                            locationAccuracy < 50 ? ' (Good)' : 
//                            locationAccuracy < 100 ? ' (Fair)' : ' (Poor)'}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-center py-4">
//                   <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-3" />
//                   <p className="text-gray-600 font-medium">Finding your location...</p>
//                   <p className="text-gray-500 text-sm mt-1">
//                     {error || 'Please allow location access'}
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Bus Status */}
//             <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-white/20">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Nearby Buses</h3>
//               <div className="text-center py-4">
//                 <Bus className="h-12 w-12 text-gray-400 mx-auto mb-3" />
//                 <p className="text-gray-600 font-medium">No buses nearby</p>
//                 <p className="text-gray-500 text-sm mt-1">
//                   Real-time bus tracking coming soon
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Legend */}
//         <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
//           <h3 className="text-lg font-semibold bg-gradient-to-r from-green-primary to-green-secondary bg-clip-text text-transparent mb-4">Status Legend</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse"></div>
//               <span className="text-sm text-gray-700">Your Location - You are here</span>
//             </div>
//             <div className="flex items-center space-x-3">
//               <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse"></div>
//               <span className="text-sm text-gray-700">Bus Location - Coming soon</span>
//             </div>
//             <div className="flex items-center space-x-3">
//               <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse"></div>
//               <span className="text-sm text-gray-700">Delayed - Coming soon</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LiveTracker;

import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, RefreshCw, Bus } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icons
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Types
interface Position {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

interface RecenterMapProps {
  lat: number;
  lng: number;
}

// Smooth map recentering
const RecenterMap: React.FC<RecenterMapProps> = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], map.getZoom(), { animate: true });
    }
  }, [lat, lng, map]);
  return null;
};

const LiveTracker: React.FC = () => {
  const [userLocation, setUserLocation] = useState<Position | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [locationAccuracy, setLocationAccuracy] = useState<number | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualLat, setManualLat] = useState('');
  const [manualLng, setManualLng] = useState('');

  const watchIdRef = useRef<number | null>(null);
  const desiredAccuracy = 50; // meters

  // Custom user marker
  const userIcon = new Icon({
    iconUrl:
      'data:image/svg+xml;charset=utf-8,' +
      encodeURIComponent(`
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#10B981" stroke="white" stroke-width="2"/>
          <circle cx="12" cy="12" r="4" fill="white"/>
        </svg>
      `),
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });

  // Get live location
  const startWatchingLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    setIsGettingLocation(true);
    setError(null);

    let bestPosition: GeolocationPosition | null = null;

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        // Save the best (most accurate) position
        if (!bestPosition || pos.coords.accuracy < bestPosition.coords.accuracy) {
          bestPosition = pos;
        }

        // Update state only if accuracy is within desired threshold
        if (pos.coords.accuracy <= desiredAccuracy) {
          const location: Position = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
          };
          setUserLocation(location);
          setMapCenter([location.latitude, location.longitude]);
          setLocationAccuracy(pos.coords.accuracy);
          setError(null);
          setPermissionDenied(false);
          setIsGettingLocation(false);
        } else {
          // Still show rough position while searching for better accuracy
          const location: Position = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
          };
          setUserLocation(location);
          setMapCenter([location.latitude, location.longitude]);
          setLocationAccuracy(pos.coords.accuracy);
        }
      },
      (err) => {
        console.error('❌ GPS ERROR:', err);
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError('Location access denied by user');
            setPermissionDenied(true);
            break;
          case err.POSITION_UNAVAILABLE:
            setError('Location information unavailable');
            break;
          case err.TIMEOUT:
            setError('Location request timed out');
            break;
          default:
            setError('Unable to retrieve your location');
        }
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    startWatchingLocation();
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  const refreshData = () => {
    setIsLoading(true);
    setUserLocation(null);
    setMapCenter(null);
    setLocationAccuracy(null);
    setError(null);

    setTimeout(() => {
      startWatchingLocation();
      setIsLoading(false);
    }, 100);
  };

  const setManualLocation = () => {
    const lat = parseFloat(manualLat);
    const lng = parseFloat(manualLng);

    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      alert('Please enter valid coordinates');
      return;
    }

    const location: Position = { latitude: lat, longitude: lng, accuracy: 0 };
    setUserLocation(location);
    setMapCenter([lat, lng]);
    setLocationAccuracy(0);
    setError(null);
    setPermissionDenied(false);
    setShowManualInput(false);
    setManualLat('');
    setManualLng('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-primary to-green-secondary bg-clip-text text-transparent flex items-center space-x-3">
                <div className="bg-gradient-to-r from-green-primary to-green-secondary p-2 rounded-xl animate-pulse">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <span>Live Tracker</span>
              </h1>
              <div className="text-gray-600 mt-2 flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${userLocation ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span>
                  {userLocation
                    ? `Location found • Accuracy: ${locationAccuracy ? Math.round(locationAccuracy) : 'Unknown'}m`
                    : 'Finding location...'}
                </span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={refreshData}
                disabled={isLoading}
                className="bg-gradient-to-r from-green-primary to-green-secondary text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all flex items-center space-x-2 disabled:opacity-50"
              >
                <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Force Refresh</span>
              </button>
              <button
                onClick={() => setShowManualInput(!showManualInput)}
                className="bg-purple-500 text-white px-4 py-3 rounded-xl hover:bg-purple-600 transition-all flex items-center space-x-2"
              >
                <MapPin className="h-5 w-5" />
                <span>Manual Location</span>
              </button>
            </div>
          </div>
        </div>

        {/* Manual Location Input */}
        {showManualInput && (
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Manual Location Input</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
                <input
                  type="number"
                  step="any"
                  value={manualLat}
                  onChange={(e) => setManualLat(e.target.value)}
                  placeholder="e.g., 20.3544"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                <input
                  type="number"
                  step="any"
                  value={manualLng}
                  onChange={(e) => setManualLng(e.target.value)}
                  placeholder="e.g., 85.8180"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-4">
              <button
                onClick={setManualLocation}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Set Location
              </button>
              <button
                onClick={() => setShowManualInput(false)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/20">
              <div className="p-4 bg-gradient-to-r from-green-primary to-green-secondary text-white">
                <h2 className="text-xl font-semibold flex items-center space-x-2">
                  <Navigation className="h-5 w-5" />
                  <span>Live Map View</span>
                </h2>
              </div>
              <div className="h-96 relative">
                {permissionDenied ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="text-center p-6">
                      <MapPin className="h-16 w-16 text-red-400 mx-auto mb-4" />
                      <p className="text-gray-600 font-medium">Location Access Required</p>
                      <p className="text-gray-500 text-sm mt-2">Please enable location access to view the live map</p>
                      <button
                        onClick={startWatchingLocation}
                        className="mt-4 bg-green-primary text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Enable Location
                      </button>
                    </div>
                  </div>
                ) : error ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="text-center p-6">
                      <MapPin className="h-16 w-16 text-red-400 mx-auto mb-4" />
                      <p className="text-gray-600 font-medium">Location Error</p>
                      <p className="text-gray-500 text-sm mt-2">{error}</p>
                      <button
                        onClick={startWatchingLocation}
                        className="mt-4 bg-green-primary text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                ) : mapCenter ? (
                  <MapContainer
                    center={mapCenter}
                    zoom={15}
                    style={{ height: '100%', width: '100%' }}
                    className="rounded-lg"
                    key={`${userLocation?.latitude}-${userLocation?.longitude}`}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      maxZoom={19}
                      minZoom={1}
                    />
                    {userLocation && (
                      <Marker
                        position={[userLocation.latitude, userLocation.longitude]}
                        icon={userIcon}
                      >
                        <Popup>
                          <div className="text-center">
                            <p className="font-semibold text-green-600">📍 Your Location</p>
                            <p className="text-sm text-gray-600">
                              {userLocation.latitude.toFixed(6)}, {userLocation.longitude.toFixed(6)}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {locationAccuracy === 0 ? 'Manual Location (Perfect)' : `GPS Accuracy: ${Math.round(locationAccuracy || 0)}m`}
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                    )}
                    {userLocation && <RecenterMap lat={userLocation.latitude} lng={userLocation.longitude} />}
                  </MapContainer>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="text-center p-6">
                      <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 font-medium">Waiting for location...</p>
                      <p className="text-gray-500 text-sm mt-2">Please allow location access to view the map</p>
                    </div>
                  </div>
                )}

                {/* Tracking Status */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${userLocation ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                    <span className="text-sm font-medium text-gray-700">{userLocation ? 'Location Active' : 'Finding Location...'}</span>
                  </div>
                  {userLocation && <p className="text-xs text-gray-500 mt-1">You are here!</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Location Info */}
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Location</h3>
              {userLocation ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Location Found</p>
                      <p className="text-sm text-gray-600">GPS coordinates detected</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Coordinates</p>
                    <p className="font-mono text-sm">
                      {userLocation.latitude.toFixed(6)}, {userLocation.longitude.toFixed(6)}
                    </p>
                    {locationAccuracy && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <p className="text-xs text-gray-500">GPS Accuracy</p>
                        <p className="text-sm font-medium">
                          {Math.round(locationAccuracy)}m radius
                          {locationAccuracy < 10 ? ' (Excellent)' :
                           locationAccuracy < 50 ? ' (Good)' :
                           locationAccuracy < 100 ? ' (Fair)' : ' (Poor)'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">Finding your location...</p>
                  <p className="text-gray-500 text-sm mt-1">{error || 'Please allow location access'}</p>
                </div>
              )}
            </div>

            {/* Bus Status */}
            <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Nearby Buses</h3>
              <div className="text-center py-4">
                <Bus className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 text-sm">Bus tracking not implemented yet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTracker;
