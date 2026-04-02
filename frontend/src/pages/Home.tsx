import { Link } from 'react-router-dom';
import { MapPin, Users, Calendar, Clock, Shield, Smartphone, Bell, MessageCircle, Coffee, ArrowRight, Zap, Radio } from 'lucide-react';

const features = [
  { icon: MapPin,     title: 'Live GPS Tracking',   desc: 'See every campus bus in real-time on an interactive map. Never wonder where your bus is again.',   accent: 'from-indigo-500 to-violet-500' },
  { icon: Users,      title: 'Seat Availability',   desc: 'Know if a bus is empty, moderate, or full before you even step outside. Ditch the sardine experience.', accent: 'from-cyan-500 to-indigo-500' },
  { icon: Calendar,   title: 'Route Planning',      desc: 'Plan the fastest path between any two campuses. Smarter than asking random people.',               accent: 'from-violet-500 to-pink-500' },
  { icon: Clock,      title: 'Smart Scheduling',    desc: 'Know exactly when to leave. Punctuality unlocked — no more dashing across campus.',                 accent: 'from-emerald-500 to-cyan-500' },
];

const upcoming = [
  { icon: Bell,          title: 'Smart Alerts',   desc: 'Push notifications when your bus is close.' },
  { icon: Shield,        title: 'SOS Emergency',  desc: 'One-tap emergency button for safety incidents.' },
  { icon: MessageCircle, title: 'AI Assistant',   desc: 'Ask Joe Bot anything about routes and schedules.' },
];

const testimonials = [
  { name: 'Rahul', branch: 'CSE · 3rd Year',    text: 'Finally no more being late! I track the bus timing perfectly now.' },
  { name: 'Priya', branch: 'ETC · 2nd Year',    text: 'I check seat availability before leaving. Zero sardine situations.' },
  { name: 'Arjun', branch: 'Mech · 4th Year',   text: 'Tech that actually works. Honestly the best campus app we have.' },
];

const campuses = [
  { name: 'Campus 1', label: 'Main Campus',      students: '15,000+' },
  { name: 'Campus 6', label: 'Engineering',       students: '8,000+' },
  { name: 'Campus 15',label: 'Medical',           students: '3,000+' },
  { name: 'Campus 25',label: 'Law & Management',  students: '2,500+' },
];

const stats = [
  { value: '28,500+', label: 'Students Served' },
  { value: '6',       label: 'Active Buses' },
  { value: '4',       label: 'Campuses' },
  { value: '99.9%',   label: 'Uptime' },
];

const Home = () => (
  <div className="overflow-x-hidden">

    {/* ── HERO ─────────────────────────────────────────────── */}
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#0A0A14]" />
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-indigo-500/10 blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-violet-500/10 blur-[80px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-cyan-500/06 blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
        {/* Pill label */}
        <div className="section-label mx-auto w-fit animate-fade-in mb-6">
          <Radio className="h-3 w-3 text-indigo-400 animate-pulse" />
          Live Campus Transit Network
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 animate-fade-in-delay leading-[1.05]">
          KIIT{' '}
          <span className="gradient-text">SmartBus</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 animate-fade-in-delay leading-relaxed">
          Real-time GPS tracking, instant seat availability, and smart routing — all in one clean interface designed for campus life.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
          <Link to="/live-tracker" className="btn-primary text-base py-3.5 px-7">
            <MapPin className="h-5 w-5" /> Track Live Buses
          </Link>
          <Link to="/seat-availability" className="btn-ghost text-base py-3.5 px-7">
            <Users className="h-5 w-5" /> Check Seats
          </Link>
        </div>

        {/* Stats strip */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-in-delay-2">
          {stats.map(({ value, label }) => (
            <div key={label} className="glass rounded-2xl py-4 px-3">
              <p className="text-2xl font-bold gradient-text">{value}</p>
              <p className="text-xs text-slate-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F0F1A] to-transparent" />
    </section>

    {/* ── FEATURES ─────────────────────────────────────────── */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <div className="section-label mx-auto w-fit mb-4"><Zap className="h-3 w-3" />Core Features</div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Everything you need,<br />
          <span className="gradient-text">nothing you don't</span>
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto">Built from scratch for KIIT students, by KIIT students who were tired of missing buses.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map(({ icon: Icon, title, desc, accent }, i) => (
          <div key={i} className="feature-card group">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* ── CAMPUS COVERAGE ──────────────────────────────────── */}
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/03 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left copy */}
          <div>
            <div className="section-label mb-4"><MapPin className="h-3 w-3" />Campus Coverage</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Smart transport<br />
              <span className="gradient-text">for every campus</span>
            </h2>
            <p className="text-slate-400 mb-8 leading-relaxed">From Campus 1 to Campus 25, every route is tracked live. Whether you're heading to Engineering, Medical, or Law — we've got you covered.</p>

            <div className="space-y-3">
              {[
                { icon: Smartphone, text: 'Mobile-first — works perfectly on any device' },
                { icon: Shield,     text: 'Secured with KIIT email authentication' },
                { icon: Zap,        text: 'Real-time data updated every 30 seconds' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-indigo-400" />
                  </div>
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — campus cards */}
          <div className="space-y-3">
            {campuses.map((c, i) => (
              <div key={i} className="glass rounded-2xl p-5 flex items-center justify-between hover:border-indigo-500/20 transition-colors">
                <div>
                  <p className="font-semibold text-white">{c.name} <span className="text-slate-500 font-normal text-sm">— {c.label}</span></p>
                  <p className="text-xs text-slate-500 mt-0.5">{c.students} students</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-medium text-emerald-400">Active</span>
                </div>
              </div>
            ))}
            <div className="glass rounded-2xl p-4 text-center border-indigo-500/20">
              <p className="text-sm text-slate-400">
                <span className="gradient-text font-bold text-base">28,500+</span> students served daily
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── TESTIMONIALS ─────────────────────────────────────── */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-14">
        <div className="section-label mx-auto w-fit mb-4">⭐ Student Reviews</div>
        <h2 className="text-4xl font-bold text-white">What students <span className="gradient-text">actually say</span></h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {testimonials.map(({ name, branch, text }, i) => (
          <div key={i} className="feature-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm">
                {name[0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{name}</p>
                <p className="text-xs text-slate-500">{branch}</p>
              </div>
              <div className="ml-auto text-xs text-amber-400">★★★★★</div>
            </div>
            <p className="text-sm text-slate-400 italic">"{text}"</p>
          </div>
        ))}
      </div>
    </section>

    {/* ── UPCOMING ─────────────────────────────────────────── */}
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/04 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-14">
          <div className="section-label mx-auto w-fit mb-4 bg-violet-500/10 border-violet-500/20 text-violet-400">🚀 Coming Soon</div>
          <h2 className="text-4xl font-bold text-white">What's next for <span className="gradient-text-violet">SmartBus</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {upcoming.map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="glass rounded-2xl p-6 border-dashed border border-white/08 hover:border-violet-500/30 transition-colors text-center">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4">
                <Icon className="h-6 w-6 text-violet-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">{title}</h3>
              <p className="text-sm text-slate-400">{desc}</p>
              <span className="mt-4 inline-block px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20">
                Beta soon
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── CTA ──────────────────────────────────────────────── */}
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="relative glass rounded-3xl p-12 text-center overflow-hidden border-indigo-500/15">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/08 via-transparent to-cyan-500/06 rounded-3xl" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />

        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to ride <span className="gradient-text">smarter?</span></h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">Join thousands of KIIT students who've already said goodbye to the uncertainty of campus commuting.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/live-tracker"      className="btn-primary text-base py-3.5 px-8"><MapPin className="h-5 w-5" />Start Tracking</Link>
            <Link to="/route-schedule"    className="btn-ghost   text-base py-3.5 px-8"><Calendar className="h-5 w-5" />View Routes</Link>
          </div>
        </div>
      </div>
    </section>

    {/* ── FROM THE DEVS ─────────────────────────────────────── */}
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="glass rounded-3xl p-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-5 shadow-lg">
          <Coffee className="h-7 w-7 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-1">From the Developers</h3>
        <p className="text-xs text-slate-500 mb-6">Final Year Students · KIIT University</p>
        <blockquote className="text-slate-400 text-sm leading-relaxed italic mb-6">
          "We built this because we know the struggle — running for buses, finding them full, waiting in the Bhubaneswar heat.
          This app is our gift to every student who comes after us.
          Use it, love it, and <span className="text-amber-400 font-semibold not-italic">may your buses always arrive on time.</span>"
        </blockquote>
        <div className="flex justify-center gap-6 text-xs text-slate-500">
          <span className="flex items-center gap-1"><Coffee className="h-3 w-3" /> Powered by Chai</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Built at 2 AM</span>
          <span className="flex items-center gap-1"><ArrowRight className="h-3 w-3" /> Made for Students</span>
        </div>
      </div>
    </section>

  </div>
);

export default Home;
