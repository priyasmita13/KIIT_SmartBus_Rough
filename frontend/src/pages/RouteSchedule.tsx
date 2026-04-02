import { useState } from 'react';
import { Clock, Navigation, Locate, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

const campusLocations = [
  'Campus 1 (Main Campus)', 'Campus 6 (Engineering)', 'Campus 15 (Medical)',
  'Campus 25 (Law & Management)', 'Main Gate', 'Library Junction',
  'Sports Complex', 'Hostels Area', 'Medical Center',
  'Academic Block A', 'Academic Block B', 'Food Court', 'Admin Building',
];

const routes = [
  {
    id: 'R001', name: 'Main Circuit', tag: 'Full Loop',
    path: 'Campus 1 → Campus 6 → Campus 15 → Campus 25 → Campus 1',
    frequency: '10 min', duration: '45 min', buses: ['B01', 'B03', 'B05'],
    accent: 'from-indigo-500 to-violet-500',
    stops: [
      { name: 'Campus 1 (Main Campus)',       time: '08:00' },
      { name: 'Library Junction',              time: '08:05' },
      { name: 'Campus 6 (Engineering)',        time: '08:12' },
      { name: 'Sports Complex',                time: '08:18' },
      { name: 'Campus 15 (Medical)',           time: '08:25' },
      { name: 'Medical Center',                time: '08:30' },
      { name: 'Campus 25 (Law & Management)', time: '08:38' },
      { name: 'Campus 1 (Main Campus)',        time: '08:45' },
    ],
  },
  {
    id: 'R002', name: 'Express Route', tag: 'Fastest',
    path: 'Campus 1 → Campus 15 → Campus 1',
    frequency: '15 min', duration: '25 min', buses: ['B02', 'B04'],
    accent: 'from-cyan-500 to-indigo-500',
    stops: [
      { name: 'Campus 1 (Main Campus)', time: '08:00' },
      { name: 'Academic Block A',        time: '08:08' },
      { name: 'Campus 15 (Medical)',     time: '08:15' },
      { name: 'Campus 1 (Main Campus)', time: '08:25' },
    ],
  },
  {
    id: 'R003', name: 'Hostel Shuttle', tag: 'Most Frequent',
    path: 'Hostels Area → Campus 6 → Hostels Area',
    frequency: '8 min', duration: '20 min', buses: ['B06'],
    accent: 'from-emerald-500 to-cyan-500',
    stops: [
      { name: 'Hostels Area',            time: '07:30' },
      { name: 'Food Court',              time: '07:35' },
      { name: 'Campus 6 (Engineering)', time: '07:42' },
      { name: 'Hostels Area',            time: '07:50' },
    ],
  },
];

const RouteSchedule = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [openRoute, setOpenRoute] = useState<string | null>('R001');

  const handleGetLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => { setTimeout(() => { setSource('Campus 1 (Main Campus)'); setIsLocating(false); }, 1000); },
        () => setIsLocating(false),
      );
    } else { setIsLocating(false); }
  };

  const suggested = source && destination
    ? routes.filter(r =>
        r.stops.some(s => s.name.includes(source.split(' ')[0])) &&
        r.stops.some(s => s.name.includes(destination.split(' ')[0]))
      )
    : [];

  return (
    <div className="min-h-screen bg-[#0F0F1A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* Header */}
        <div>
          <div className="section-label mb-3"><Navigation className="h-3 w-3" />Transit Network</div>
          <h1 className="text-3xl font-bold text-white">Routes & Schedule</h1>
          <p className="text-slate-400 mt-1 text-sm">Plan your journey across all KIIT campuses</p>
        </div>

        {/* Journey Planner */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-5">Plan Your Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-medium text-slate-400 block mb-2">From</label>
              <div className="relative">
                <select value={source} onChange={e => setSource(e.target.value)}
                  className="input-dark appearance-none pr-10 w-full">
                  <option value="">Select origin</option>
                  {campusLocations.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                <button onClick={handleGetLocation} disabled={isLocating}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-indigo-300">
                  <Locate className={`h-4 w-4 ${isLocating ? 'animate-ping' : ''}`} />
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-400 block mb-2">To</label>
              <select value={destination} onChange={e => setDestination(e.target.value)}
                className="input-dark appearance-none w-full">
                <option value="">Select destination</option>
                {campusLocations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
          {source && destination && (
            <div className="mt-2 p-4 rounded-xl bg-indigo-500/08 border border-indigo-500/20">
              <p className="text-xs font-semibold text-indigo-400 mb-2">Suggested Routes</p>
              {suggested.length > 0
                ? suggested.map(r => (
                    <div key={r.id} className="flex justify-between items-center text-sm text-slate-300">
                      <span className="font-medium">{r.name}</span>
                      <span className="text-slate-500">{r.duration} · every {r.frequency}</span>
                    </div>
                  ))
                : <p className="text-sm text-slate-500">No direct routes. Browse all routes below.</p>
              }
            </div>
          )}
        </div>

        {/* Route Cards */}
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-slate-300">All Routes</h2>
          {routes.map(route => {
            const open = openRoute === route.id;
            return (
              <div key={route.id} className="glass rounded-2xl overflow-hidden border border-white/06 hover:border-indigo-500/20 transition-colors">
                <button className="w-full text-left p-5 flex items-center justify-between"
                  onClick={() => setOpenRoute(open ? null : route.id)}>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${route.accent} flex items-center justify-center flex-shrink-0`}>
                      <Navigation className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{route.name}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">{route.tag}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{route.path}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="hidden sm:flex flex-col items-end text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> every {route.frequency}</span>
                      <span className="flex items-center gap-1 mt-0.5"><MapPin className="h-3 w-3" /> {route.duration}</span>
                    </div>
                    {open ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                  </div>
                </button>

                {open && (
                  <div className="px-5 pb-5 pt-1 border-t border-white/05">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {route.buses.map(b => (
                        <span key={b} className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-white/06 text-slate-300 border border-white/08">{b}</span>
                      ))}
                    </div>
                    <div className="relative pl-4">
                      <div className="absolute left-1.5 top-2 bottom-2 w-px bg-gradient-to-b from-indigo-500/60 via-cyan-500/40 to-indigo-500/10" />
                      <div className="space-y-3">
                        {route.stops.map((stop, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="absolute left-0.5 w-2 h-2 rounded-full bg-indigo-400 ring-2 ring-indigo-500/20" />
                              <span className="text-sm text-slate-300 pl-2">{stop.name}</span>
                            </div>
                            <span className="text-xs font-mono text-indigo-400">{stop.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Schedule info */}
        <div className="glass rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: 'Operating Hours',
              lines: ['Weekdays: 7 AM – 10 PM', 'Weekends: 8 AM – 9 PM', 'Holidays: 9 AM – 6 PM'] },
            { label: 'Peak Hours',
              lines: ['Morning: 8 – 10 AM', 'Lunch: 12 – 2 PM', 'Evening: 5 – 7 PM'] },
            { label: 'Service Notes',
              lines: ['Higher frequency in peak hours', 'Express routes available', 'Real-time tracking active'] },
          ].map(({ label, lines }) => (
            <div key={label}>
              <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-3">{label}</p>
              <div className="space-y-1.5">
                {lines.map(l => <p key={l} className="text-sm text-slate-400">{l}</p>)}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default RouteSchedule;
