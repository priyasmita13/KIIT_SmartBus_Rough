import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { Bus, Mail, Lock, User, Shield, UserCheck, RefreshCw, ArrowLeft } from 'lucide-react'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

export default function SignupPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'STUDENT' as 'STUDENT' | 'DRIVER' | 'ADMIN'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    // Validate KIIT email domain
    if (!formData.email.endsWith('@kiit.ac.in')) {
      setError('Please use your official KIIT email ID')
      setLoading(false)
      return
    }
    
    try {
      const res = await axios.post(`${API}/api/auth/signup`, formData, { withCredentials: true })
      sessionStorage.setItem('accessToken', res.data.accessToken)
      sessionStorage.setItem('user', JSON.stringify(res.data.user))
      
      // Redirect based on role
      const role = res.data.user.role.toLowerCase()
      navigate(`/${role}`)
    } catch (err: any) {
      setError(err?.response?.data?.error?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }


  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'STUDENT':
        return 'Track buses, check seat availability, and manage your campus transportation';
      case 'DRIVER':
        return 'Manage your bus route, update location, and communicate with students';
      case 'ADMIN':
        return 'Manage the entire bus system, routes, schedules, and user accounts';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Bus className="h-12 w-12 text-green-primary" />
            <h1 className="text-3xl font-bold text-green-primary ml-2">KIIT SmartBus</h1>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">Create Account</h2>
          <p className="text-gray-600 mt-2">Join the smart campus transportation system</p>
          
          {/* Back Button */}
          <div className="mt-4">
            <button
              onClick={() => navigate('/login')}
              className="flex items-center space-x-2 text-green-primary hover:text-green-700 text-sm font-medium transition-colors mx-auto"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Login</span>
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-200">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  required 
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  required 
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                  type="password" 
                  value={formData.password} 
                  onChange={(e) => setFormData({...formData, password: e.target.value})} 
                  required 
                  minLength={8}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent transition-colors"
                  placeholder="Create a secure password"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Role
              </label>
              <div className="space-y-3">
                {[
                  { value: 'STUDENT', label: 'Student', icon: <User className="h-5 w-5" /> },
                  { value: 'DRIVER', label: 'Driver', icon: <Bus className="h-5 w-5" /> },
                  { value: 'ADMIN', label: 'Admin', icon: <Shield className="h-5 w-5" /> }
                ].map((role) => (
                  <label key={role.value} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-green-primary hover:bg-green-50 transition-colors">
                    <input
                      type="radio"
                      name="role"
                      value={role.value}
                      checked={formData.role === role.value}
                      onChange={(e) => setFormData({...formData, role: e.target.value as any})}
                      className="sr-only"
                    />
                    <div className={`flex items-center w-full ${formData.role === role.value ? 'text-green-primary' : 'text-gray-600'}`}>
                      <div className={`mr-3 ${formData.role === role.value ? 'text-green-primary' : 'text-gray-400'}`}>
                        {role.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{role.label}</div>
                        <div className="text-sm text-gray-500">
                          {getRoleDescription(role.value)}
                        </div>
                      </div>
                      {formData.role === role.value && (
                        <div className="text-green-primary">
                          <UserCheck className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-primary to-green-secondary text-white py-3 px-4 rounded-lg font-medium hover:from-green-700 hover:to-green-800 focus:ring-2 focus:ring-green-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <RefreshCw className="animate-spin h-5 w-5 mr-2" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-green-primary hover:text-green-700 font-medium transition-colors">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
