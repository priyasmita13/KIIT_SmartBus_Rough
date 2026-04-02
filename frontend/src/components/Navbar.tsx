import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bus, Menu, X, MapPin, Users, Calendar, Shield, HelpCircle, LogIn, UserPlus, LogOut, UserCircle, Wifi } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/',                 label: 'Home',           icon: Bus },
    { path: '/live-tracker',     label: 'Live Tracker',   icon: MapPin },
    { path: '/seat-availability',label: 'Seats',          icon: Users },
    { path: '/route-schedule',   label: 'Routes',         icon: Calendar },
    { path: '/driver-mode',      label: 'Driver Mode',    icon: Wifi,        requiresDriver: true },
    { path: '/profile',          label: 'Profile',        icon: UserCircle,  requiresAuth: true },
    { path: '/admin',            label: 'Admin',          icon: Shield,      requiresAdmin: true },
    { path: '/contact',          label: 'Help',           icon: HelpCircle },
  ];

  const filteredNavItems = navItems.filter((item) => {
    if (item.requiresAdmin  && user?.role !== 'ADMIN')  return false;
    if (item.requiresDriver && user?.role !== 'DRIVER') return false;
    if (item.requiresAuth   && !user)                  return false;
    return true;
  });

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/06">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-glow-indigo group-hover:scale-110 transition-transform">
              <Bus className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-white text-base tracking-tight">KIIT SmartBus</span>
              <span className="text-[10px] text-slate-500 hidden sm:block">Real-time Campus Transit</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {filteredNavItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`nav-link ${isActive(path) ? 'nav-link-active' : ''}`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}

            {/* Auth */}
            <div className="ml-3 flex items-center gap-2 pl-3 border-l border-white/08">
              {user ? (
                <>
                  <span className="text-xs text-slate-400 hidden sm:block max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <button onClick={handleLogout} className="btn-danger text-xs py-2 px-4">
                    <LogOut className="h-3.5 w-3.5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login"  className="btn-ghost text-xs py-2 px-4"><LogIn className="h-3.5 w-3.5" />Login</Link>
                  <Link to="/signup" className="btn-primary text-xs py-2 px-4"><UserPlus className="h-3.5 w-3.5" />Sign Up</Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/08 transition-colors"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/06 space-y-1">
            {filteredNavItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsMenuOpen(false)}
                className={`nav-link w-full px-4 py-3 ${isActive(path) ? 'nav-link-active' : ''}`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            ))}
            <div className="pt-3 mt-3 border-t border-white/06 flex flex-col gap-2 px-2">
              {user ? (
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="btn-danger w-full justify-center">
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login"  onClick={() => setIsMenuOpen(false)} className="btn-ghost w-full justify-center"><LogIn className="h-4 w-4" />Login</Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="btn-primary w-full justify-center"><UserPlus className="h-4 w-4" />Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
