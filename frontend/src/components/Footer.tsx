import { Link } from 'react-router-dom';
import { Bus, Mail, Phone, MapPin, Github, Linkedin, ArrowUpRight } from 'lucide-react';

const Footer = () => (
  <footer className="border-t border-white/06 bg-[#0A0A14]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="space-y-4 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-glow-indigo">
              <Bus className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">KIIT SmartBus</p>
              <p className="text-[10px] text-slate-500">Smart Campus Transit</p>
            </div>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            Making campus transportation smarter, safer, and more efficient for the entire KIIT community.
          </p>
          <div className="flex gap-3">
            <a href="#" className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-500 hover:text-white hover:border-indigo-500/30 transition-colors">
              <Github className="h-4 w-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-500 hover:text-white hover:border-indigo-500/30 transition-colors">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Navigate</h4>
          <div className="space-y-2.5">
            {[
              { to: '/',                label: 'Home' },
              { to: '/live-tracker',    label: 'Live Tracker' },
              { to: '/seat-availability',label: 'Seat Availability' },
              { to: '/route-schedule',  label: 'Routes & Schedule' },
              { to: '/contact',         label: 'Contact / Help' },
            ].map(({ to, label }) => (
              <Link key={to} to={to} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition-colors group">
                {label}
                <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Legal</h4>
          <div className="space-y-2.5">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Support'].map(l => (
              <a key={l} href="#" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition-colors group">
                {l}
                <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Contact</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-sm text-slate-500">
              <MapPin className="h-4 w-4 text-indigo-400 flex-shrink-0" />
              KIIT University, Bhubaneswar
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-500">
              <Phone className="h-4 w-4 text-indigo-400 flex-shrink-0" />
              +91 674 272 7777
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-500">
              <Mail className="h-4 w-4 text-indigo-400 flex-shrink-0" />
              smartbus@kiit.ac.in
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-white/05 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-xs text-slate-600">© 2025 KIIT SmartBus. All rights reserved. Developed for KIIT University.</p>
        <p className="text-xs text-slate-600">Built with 💜 by final-year KIIT students</p>
      </div>
    </div>
  </footer>
);

export default Footer;
