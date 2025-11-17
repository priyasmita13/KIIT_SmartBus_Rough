import { Link } from 'react-router-dom';
import { Bus, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-green-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg">
                <Bus className="h-6 w-6 text-green-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">KIIT SmartBus</h3>
                <p className="text-green-200 text-sm">Smart Campus Transport</p>
              </div>
            </div>
            <p className="text-green-100">
              Making campus transportation smarter, safer, and more efficient for the KIIT University community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-green-100 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/live-tracker" className="block text-green-100 hover:text-white transition-colors">
                Live Tracker
              </Link>
              <Link to="/seat-availability" className="block text-green-100 hover:text-white transition-colors">
                Seat Availability
              </Link>
              <Link to="/route-schedule" className="block text-green-100 hover:text-white transition-colors">
                Routes & Schedule
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <div className="space-y-2">
              <a href="#" className="block text-green-100 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-green-100 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="block text-green-100 hover:text-white transition-colors">
                Cookie Policy
              </a>
              <Link to="/contact" className="block text-green-100 hover:text-white transition-colors">
                Support
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-200" />
                <span className="text-green-100 text-sm">KIIT University, Bhubaneswar</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-200" />
                <span className="text-green-100 text-sm">+91 674 272 7777</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-200" />
                <span className="text-green-100 text-sm">smartbus@kiit.ac.in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-600 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-green-200 text-sm">
              © 2025 KIIT SmartBus. All rights reserved. Developed for KIIT University.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-green-200 text-sm">Developer Credits:</span>
              <div className="flex space-x-2">
                <a href="#" className="text-green-200 hover:text-white transition-colors">
                  <Github className="h-4 w-4" />
                </a>
                <a href="#" className="text-green-200 hover:text-white transition-colors">
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


