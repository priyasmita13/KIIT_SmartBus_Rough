import React, { useState } from 'react';
import { HelpCircle, Mail, Phone, MapPin, MessageCircle, Send, Clock, Users } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock form submission
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'smartbus@kiit.ac.in',
      color: 'bg-blue-500'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call for immediate assistance',
      contact: '+91 674 272 7777',
      color: 'bg-green-500'
    },
    {
      icon: MapPin,
      title: 'Office Location',
      description: 'Visit our help desk',
      contact: 'Transport Office, KIIT Campus 1',
      color: 'bg-purple-500'
    }
  ];

  const faqData = [
    {
      question: 'How do I track buses in real-time?',
      answer: 'Use the Live Bus Tracker page to see all active buses on the map with their current locations and estimated arrival times.'
    },
    {
      question: 'Can I check seat availability before boarding?',
      answer: 'Yes! Visit the Seat Availability page to see real-time seat occupancy for all buses with color-coded status indicators.'
    },
    {
      question: 'How often is the bus location updated?',
      answer: 'Bus locations are updated every 30 seconds to provide you with the most accurate real-time information.'
    },
    {
      question: 'What if a bus is running late?',
      answer: 'Late buses are marked with a red indicator, and you\'ll see updated arrival times. Consider alternative routes or buses during peak hours.'
    },
    {
      question: 'How do I report a technical issue?',
      answer: 'Use the contact form below or email us directly at smartbus@kiit.ac.in with details about the issue you\'re experiencing.'
    },
    {
      question: 'Can I suggest new routes or stops?',
      answer: 'Absolutely! We welcome suggestions for improving our service. Submit your ideas through the contact form or email us.'
    }
  ];

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Send className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for contacting us. We've received your message and will get back to you within 24 hours.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: '', email: '', category: '', message: '' });
            }}
            className="bg-green-primary text-white px-6 py-3 rounded-lg hover:bg-green-secondary transition-colors"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
          <HelpCircle className="h-8 w-8 text-green-primary" />
          <span>Contact & Help</span>
        </h1>
        <p className="text-gray-600 mt-2">Get support, report issues, or share feedback about KIIT SmartBus</p>
      </div>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactMethods.map(({ icon: Icon, title, description, contact, color }) => (
          <div key={title} className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className={`${color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
              <Icon className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 mb-3">{description}</p>
            <p className="font-medium text-green-primary">{contact}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent"
                required
              >
                <option value="">Select a category</option>
                <option value="technical">Technical Issue</option>
                <option value="feedback">Feedback</option>
                <option value="suggestion">Route Suggestion</option>
                <option value="complaint">Complaint</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent"
                placeholder="Please describe your issue or feedback in detail..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-primary text-white py-3 rounded-lg font-semibold hover:bg-green-secondary transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Support Hours */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Support Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Support Hours</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                <p>Saturday: 9:00 AM - 5:00 PM</p>
                <p>Sunday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Response Time</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Email: Within 24 hours</p>
                <p>Phone: Immediate</p>
                <p>Technical Issues: 2-4 hours</p>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Emergency Contact</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>For urgent transportation issues</p>
                <p>Call: +91 674 272 7777</p>
                <p>Available 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;


