import { useState } from 'react';
import { Bus, Filter, RefreshCw } from 'lucide-react';

const busData = [
  { id: 'B01', from: 'Campus 1',  to: 'Campus 6',   fill: 0.33 },
  { id: 'B02', from: 'Campus 6',  to: 'Campus 15',  fill: 0.82 },
  { id: 'B03', from: 'Campus 15', to: 'Campus 25',  fill: 0.20 },
  { id: 'B04', from: 'Campus 25', to: 'Campus 1',   fill: 0.93 },
  { id: 'B05', from: 'Campus 1',  to: 'Campus 15',  fill: 1.00 },
  { id: 'B06', from: 'Campus 15', to: 'Campus 6',   fill: 0.12 },
];

const campuses = ['All Routes', 'Campus 1', 'Campus 6', 'Campus 15', 'Campus 25'];

function getAv(fill: number) {
  if (fill >= 1)   return { label: 'Full',     bar: 'bg-rose-500',    badge: 'badge-full',     ring: 'ring-rose-500/20' };
  if (fill >= 0.6) return { label: 'Moderate', bar: 'bg-amber-500',   badge: 'badge-moderate', ring: 'ring-amber-500/20' };
  return             { label: 'Empty',    bar: 'bg-emerald-500', badge: 'badge-empty',    ring: 'ring-emerald-500/20' };
}

const SeatAvailability = () => {
  const [filter, setFilter] = useState('All Routes');
  const [spinning, setSpinning] = useState(false);

  const buses = filter === 'All Routes'
    ? busData
    : busData.filter(b => b.from === filter || b.to === filter);

  const fullCount = buses.filter(b => b.fill >= 1).length;

  const refresh = () => { setSpinning(true); setTimeout(() => setSpinning(false), 900); };

  return (
    <div className="min-h-screen bg-[#0F0F1A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="section-label mb-3"><Bus className="h-3 w-3" />Live Seat Monitor</div>
            <h1 className="text-3xl font-bold text-white">Seat Availability</h1>
            <p className="text-slate-400 mt-1 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
              Updated every 30 seconds
            </p>
          </div>
          <button onClick={refresh} disabled={spinning}
            className="btn-ghost text-sm gap-2 disabled:opacity-60">
            <RefreshCw className={`h-4 w-4 ${spinning ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass rounded-2xl p-5">
            <p className="text-3xl font-bold gradient-text">{buses.length}</p>
            <p className="text-sm text-slate-400 mt-1">Active Buses</p>
          </div>
          <div className="glass rounded-2xl p-5">
            <p className="text-3xl font-bold text-rose-400">{fullCount}</p>
            <p className="text-sm text-slate-400 mt-1">Full Buses</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3 flex-wrap">
          <Filter className="h-4 w-4 text-slate-500" />
          {campuses.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                filter === c
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-500 border border-white/08 hover:border-white/20 hover:text-white'
              }`}>
              {c}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {buses.map(bus => {
            const av = getAv(bus.fill);
            return (
              <div key={bus.id} className={`glass rounded-2xl p-5 hover:shadow-card-hover hover:-translate-y-1 hover:border-indigo-500/20 transition-all duration-300 ring-1 ${av.ring}`}>
                {/* Top */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center">
                      <Bus className="h-5 w-5 text-indigo-400" />
                    </div>
                    <span className="text-lg font-bold text-white">{bus.id}</span>
                  </div>
                  <span className={av.badge}>{av.label}</span>
                </div>

                {/* Route */}
                <p className="text-sm text-slate-400 mb-4">
                  <span className="text-white font-medium">{bus.from}</span>
                  <span className="mx-2 text-slate-600">→</span>
                  <span className="text-white font-medium">{bus.to}</span>
                </p>

                {/* Bar */}
                <div className="w-full h-2 rounded-full bg-white/08">
                  <div className={`h-2 rounded-full ${av.bar} transition-all`} style={{ width: `${Math.round(bus.fill * 100)}%` }} />
                </div>
                <p className="text-right text-xs text-slate-600 mt-1">{Math.round(bus.fill * 100)}% full</p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default SeatAvailability;
