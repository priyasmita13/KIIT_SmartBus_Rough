import { Link } from 'react-router-dom';
import { MapPin, Users, Calendar, Clock, Shield, Smartphone, Bell, MessageCircle, Coffee, BookOpen } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Real-time Tracking',
      description: 'Bus kahan hai? Pata kar lo GPS se! No more "bus aa rahi hai" excuses.',
      color: 'bg-blue-500',
    },
    {
      icon: Users,
      title: 'Seat Availability',
      description: 'Check seat availability before boarding. Avoid the sardine experience!',
      color: 'bg-green-500',
    },
    {
      icon: Calendar,
      title: 'Route Planning',
      description: 'Find the best routes between campuses. Better than asking random uncles!',
      color: 'bg-purple-500',
    },
    {
      icon: Clock,
      title: 'Smart Scheduling',
      description: 'Never be late again! We\'ll tell you exactly when to leave. Punctuality level: Professor!',
      color: 'bg-orange-500',
    },
  ];

  const upcomingFeatures = [
    { icon: Bell, title: 'Smart Notifications', description: 'Get instant bus alerts and updates on your phone' },
    { icon: Shield, title: 'SOS Emergency', description: 'Emergency button for safety and immediate assistance' },
    { icon: MessageCircle, title: 'AI Chatbot', description: 'Intelligent assistant for all your transportation queries' },
  ];

  const studentTestimonials = [
    {
      name: 'Rahul (CSE 3rd Year)',
      text: 'Finally, no more being late for classes! I can track the bus timing perfectly.',
      rating: 5
    },
    {
      name: 'Priya (ETC 2nd Year)',
      text: 'No more waiting in the sun like a statue. I check seat availability before leaving!',
      rating: 5
    },
    {
      name: 'Arjun (Mechanical 4th Year)',
      text: 'Finally! Technology that actually works. Way better than the attendance system!',
      rating: 5
    }
  ];

  return (
    <div className="space-y-16 font-sans">
      {/* Hero Section with KIIT Image */}
      <section className="relative bg-gradient-to-br from-green-primary via-green-secondary to-green-light text-white overflow-hidden min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="KIIT University Campus"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-primary/80 via-green-secondary/70 to-green-light/60"></div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-xl animate-bounce"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-black mb-6 animate-fade-in tracking-tight">
                <span className="bg-gradient-to-r from-white via-green-100 to-green-200 bg-clip-text text-transparent">
                  KIIT SmartBus
                </span>
              </h1>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <p className="text-xl md:text-2xl text-green-100 font-medium">
                  Smart Campus Transportation - No More Waiting!
                </p>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-green-100 mb-8 max-w-4xl mx-auto animate-fade-in-delay leading-relaxed">
              The most advanced campus transportation system with real-time tracking, seat availability, 
              and everything a modern student needs. <br />
              <span className="text-green-200 font-semibold">Because missing the bus is so last semester!</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-delay-2">
              <Link
                to="/live-tracker"
                className="group relative bg-white text-green-primary px-8 py-4 rounded-2xl font-bold text-lg hover:bg-green-50 transition-all shadow-2xl transform hover:scale-105 hover:shadow-3xl border-4 border-white/20 hover:border-white/40"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Track Live Buses</span>
                </span>
              </Link>
              <Link
                to="/route-schedule"
                className="group relative border-4 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-green-primary transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>View Routes</span>
                </span>
              </Link>
            </div>
            
            <div className="mt-8 animate-fade-in-delay-2">
              <p className="text-green-200 text-sm mb-2">Made with care for KIIT Students</p>
              <div className="flex justify-center space-x-4 text-xs text-green-300">
                <span>Student Approved</span>
                <span>Lightning Fast</span>
                <span>Mobile Friendly</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-green-primary to-green-secondary bg-clip-text text-transparent">
              Why Choose KIIT SmartBus?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Features so good, you'll wonder how you survived without them! <span className="font-bold text-green-primary">"Finally, tech that works!"</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon: Icon, title, description, color }, index) => (
            <div key={index} className="group bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-gray-100 hover:border-green-200 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-50 to-transparent rounded-full opacity-50"></div>
              
              <div className={`${color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:animate-bounce relative z-10`}>
                <Icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
              <p className="text-gray-600 leading-relaxed">{description}</p>
              
              {/* Hover Effect */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-primary to-green-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-green-primary to-blue-600 bg-clip-text text-transparent">
                What Students Say
              </span>
            </h2>
            <p className="text-lg text-gray-600">Real students, real experiences</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {studentTestimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 transform hover:scale-105 transition-all">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-primary to-green-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section with KIIT Campus Image */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Modern Campus"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">
                <span className="bg-gradient-to-r from-green-primary to-green-secondary bg-clip-text text-transparent">
                  Smart Transportation<br />for Digital Campus
                </span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="bg-gradient-to-r from-green-primary to-green-secondary p-4 rounded-2xl shadow-lg group-hover:animate-pulse">
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Mobile-First Design</h3>
                    <p className="text-gray-600">Everything on your phone! Works offline, uses minimal data. Student budget-friendly!</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 group">
                  <div className="bg-gradient-to-r from-green-primary to-green-secondary p-4 rounded-2xl shadow-lg group-hover:animate-pulse">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Secure & Reliable</h3>
                    <p className="text-gray-600">KIIT email login. Only authorized students get access. Security level: Fort Knox!</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 group">
                  <div className="bg-gradient-to-r from-green-primary to-green-secondary p-4 rounded-2xl shadow-lg group-hover:animate-pulse">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Real-time Updates</h3>
                    <p className="text-gray-600">Live data sync! Faster than campus gossip. Always the latest info!</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border-2 border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-green-primary" />
                <span>Campus Coverage</span>
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'Campus 1 (Main)', status: 'Active', students: '15,000+' },
                  { name: 'Campus 6 (Engineering)', status: 'Active', students: '8,000+' },
                  { name: 'Campus 15 (Medical)', status: 'Active', students: '3,000+' },
                  { name: 'Campus 25 (Law & Mgmt)', status: 'Active', students: '2,500+' }
                ].map((campus, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border-2 border-green-200 shadow-sm hover:shadow-md transition-all">
                    <div>
                      <span className="font-bold text-gray-900">{campus.name}</span>
                      <p className="text-sm text-gray-600">{campus.students} students</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-primary font-bold text-sm">{campus.status}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200">
                <p className="text-gray-700 text-sm text-center">
                  <span className="font-bold">28,500+</span> students already using! 
                  <br />Join the smart transportation revolution!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Coming Soon!
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            More exciting features are on the way. Stay tuned! 
            <span className="text-purple-600 font-semibold"> (Spoiler alert: Your mind will be blown!)</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingFeatures.map(({ icon: Icon, title, description }, index) => (
            <div key={index} className="text-center p-8 border-4 border-dashed border-gray-300 rounded-3xl hover:border-purple-300 transition-all transform hover:scale-105 bg-gradient-to-br from-gray-50 to-purple-50 hover:from-purple-50 hover:to-pink-50">
              <div className="bg-gradient-to-r from-gray-200 to-purple-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md hover:shadow-lg transition-all">
                <Icon className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600">{description}</p>
              <div className="mt-4">
                <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold border border-purple-200">
                  Beta Testing Soon
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-green-primary via-green-secondary to-green-light text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Students with Technology"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-primary/90 to-green-secondary/80"></div>
        </div>
        
        {/* Animated Elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                Ready to Get Started?
              </span>
            </h2>
            <p className="text-xl text-green-100 mb-2 max-w-3xl mx-auto leading-relaxed">
              Join thousands of KIIT students already using SmartBus! 
            </p>
            <p className="text-lg text-green-200 max-w-2xl mx-auto">
              The era of missing buses is over - welcome to smart travel!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Link
              to="/live-tracker"
              className="group relative bg-white text-green-primary px-10 py-5 rounded-2xl font-black text-xl hover:bg-green-50 transition-all shadow-2xl transform hover:scale-110 hover:shadow-3xl border-4 border-white/30 hover:border-white/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative flex items-center space-x-3">
                <MapPin className="h-6 w-6" />
                <span>Start Tracking Now!</span>
              </span>
            </Link>
            <Link
              to="/seat-availability"
              className="group relative border-4 border-white text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-white hover:text-green-primary transition-all transform hover:scale-110 shadow-xl hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative flex items-center space-x-3">
                <Users className="h-6 w-6" />
                <span>Check Seats!</span>
              </span>
            </Link>
          </div>
          
          <div className="text-center">
            <p className="text-green-200 text-sm mb-2">
              Pro Tip: Bookmark this page for quick access!
            </p>
            <div className="flex justify-center space-x-6 text-sm text-green-300">
              <span className="flex items-center space-x-1">
                <span>28,500+ Students</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>99.9% Uptime</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>Mobile Optimized</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Message from Seniors */}
      <section className="bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                A Message from Your Seniors
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full"></div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                <Users className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">From the Developers</h3>
              <p className="text-green-200 text-sm">Final Year Students, KIIT University</p>
            </div>
            
            <blockquote className="text-lg text-green-100 leading-relaxed mb-6 italic">
              "Hey juniors! We built this because we know the struggle of waiting for buses in the scorching Bhubaneswar heat. 
              We've been there - running to catch the bus, only to find it's already full, or waiting endlessly not knowing when it'll arrive.
              <br /><br />
              This app is our gift to you and all future KIIT students. Use it wisely, save your time, and focus on what really matters - 
              your studies (and maybe some fun too!).
              <br /><br />
              Remember: <span className='font-bold text-yellow-300'>Smart students use smart tools!</span>"
            </blockquote>
            
            <div className="border-t border-white/20 pt-6">
              <p className="text-green-200 text-sm mb-4">
                Built with love during countless late nights in the hostel
              </p>
              <div className="flex justify-center space-x-8 text-sm text-green-300">
                <span className="flex items-center space-x-1">
                  <Coffee className="h-4 w-4" />
                  <span>Powered by Chai</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>Built at 2 AM</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>Made for Students</span>
                </span>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl border border-yellow-500/30">
                <p className="text-yellow-200 text-sm font-medium">
                  <strong>Senior Tip:</strong> Always check seat availability before leaving your room. 
                  Trust us, it'll save you from the "sardine can" experience! 
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-green-300 text-sm">
              Questions? Suggestions? Find us at the coding club or drop a mail! 
              <br />
              <span className="text-yellow-400 font-medium">Happy travels, and may your buses always be on time!</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;


