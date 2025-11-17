import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { Bus, Mail, Lock, ArrowLeft, RefreshCw, Eye, EyeOff } from 'lucide-react'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [forgotPassword, setForgotPassword] = useState(false)
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false)
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState<string | null>(null)
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [otpVerified, setOtpVerified] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    // Validate KIIT email domain
    if (!email.endsWith('@kiit.ac.in')) {
      setError('Please use your official KIIT email ID')
      setLoading(false)
      return
    }
    
    try {
      const res = await axios.post(`${API}/api/auth/login`, { email, password }, { withCredentials: true })
      sessionStorage.setItem('accessToken', res.data.accessToken)
      sessionStorage.setItem('user', JSON.stringify(res.data.user))
      
      // Redirect to Home page for all users (temporary)
      navigate('/')
    } catch (err: any) {
      setError(err?.response?.data?.error?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault()
    if (!email) {
      setForgotPasswordMessage('Please enter your email address')
      return
    }
    
    setForgotPasswordLoading(true)
    setForgotPasswordMessage(null)
    
    try {
      const res = await axios.post(`${API}/api/forgot-password/forgot-password`, { email })
      setForgotPasswordMessage(res.data.message)
      setOtpSent(true)
    } catch (err: any) {
      setForgotPasswordMessage(err?.response?.data?.error?.message || 'Failed to send reset email. Please try again.')
    } finally {
      setForgotPasswordLoading(false)
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault()
    if (!otp || otp.length !== 6) {
      setForgotPasswordMessage('Please enter a valid 6-digit OTP')
      return
    }
    
    setForgotPasswordLoading(true)
    setForgotPasswordMessage(null)
    
    try {
      const res = await axios.post(`${API}/api/forgot-password/verify-otp`, { email, otp })
      setForgotPasswordMessage(res.data.message)
      setOtpVerified(true)
    } catch (err: any) {
      setForgotPasswordMessage(err?.response?.data?.error?.message || 'Invalid OTP. Please try again.')
    } finally {
      setForgotPasswordLoading(false)
    }
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault()
    if (!newPassword || newPassword.length < 8) {
      setForgotPasswordMessage('Password must be at least 8 characters long')
      return
    }
    if (newPassword !== confirmPassword) {
      setForgotPasswordMessage('Passwords do not match')
      return
    }
    
    setForgotPasswordLoading(true)
    setForgotPasswordMessage(null)
    
    try {
      const res = await axios.post(`${API}/api/forgot-password/reset-password`, { 
        email, 
        otp, 
        newPassword 
      })
      setForgotPasswordMessage(res.data.message)
      // Reset form and go back to login
      setTimeout(() => {
        setForgotPassword(false)
        setOtpSent(false)
        setOtpVerified(false)
        setOtp('')
        setNewPassword('')
        setConfirmPassword('')
        setForgotPasswordMessage(null)
      }, 2000)
    } catch (err: any) {
      setForgotPasswordMessage(err?.response?.data?.error?.message || 'Failed to reset password. Please try again.')
    } finally {
      setForgotPasswordLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Bus className="h-12 w-12 text-green-primary" />
            <h1 className="text-3xl font-bold text-green-primary ml-2">KIIT SmartBus</h1>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {forgotPassword 
              ? (otpVerified ? 'Set New Password' : otpSent ? 'Enter OTP' : 'Reset Password')
              : 'Welcome Back'
            }
          </h2>
          <p className="text-gray-600 mt-2">
            {forgotPassword 
              ? (otpVerified ? 'Create a new secure password' : otpSent ? 'Check your email for the verification code' : 'Enter your email to reset your password')
              : 'Sign in to your account'
            }
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-200">
          {!forgotPassword ? (
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
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
                    type={showPassword ? "text" : "password"} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent transition-colors"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
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
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          ) : (
            <>
              {!otpSent ? (
                <form onSubmit={handleForgotPassword} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent transition-colors"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {forgotPasswordMessage && (
                    <div className={`border rounded-lg p-3 ${
                      forgotPasswordMessage.includes('sent') 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <p className={`text-sm text-center ${
                        forgotPasswordMessage.includes('sent') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {forgotPasswordMessage}
                      </p>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={forgotPasswordLoading}
                    className="w-full bg-gradient-to-r from-green-primary to-green-secondary text-white py-3 px-4 rounded-lg font-medium hover:from-green-700 hover:to-green-800 focus:ring-2 focus:ring-green-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                  >
                    {forgotPasswordLoading ? (
                      <>
                        <RefreshCw className="animate-spin h-5 w-5 mr-2" />
                        Sending...
                      </>
                    ) : (
                      'Send Reset Email'
                    )}
                  </button>
                </form>
              ) : !otpVerified ? (
                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter 6-digit OTP sent to {email}
                    </label>
                    <input 
                      type="text" 
                      value={otp} 
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} 
                      placeholder="123456"
                      maxLength={6}
                      required 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent transition-colors text-center text-2xl font-mono tracking-widest"
                    />
                  </div>

                  {forgotPasswordMessage && (
                    <div className={`border rounded-lg p-3 ${
                      forgotPasswordMessage.includes('verified') 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <p className={`text-sm text-center ${
                        forgotPasswordMessage.includes('verified') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {forgotPasswordMessage}
                      </p>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={forgotPasswordLoading}
                    className="w-full bg-gradient-to-r from-green-primary to-green-secondary text-white py-3 px-4 rounded-lg font-medium hover:from-green-700 hover:to-green-800 focus:ring-2 focus:ring-green-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                  >
                    {forgotPasswordLoading ? (
                      <>
                        <RefreshCw className="animate-spin h-5 w-5 mr-2" />
                        Verifying...
                      </>
                    ) : (
                      'Verify OTP'
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input 
                        type="password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        required 
                        minLength={8}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent transition-colors"
                        placeholder="Enter new password"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                        minLength={8}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent transition-colors"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>

                  {forgotPasswordMessage && (
                    <div className={`border rounded-lg p-3 ${
                      forgotPasswordMessage.includes('successfully') 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <p className={`text-sm text-center ${
                        forgotPasswordMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {forgotPasswordMessage}
                      </p>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={forgotPasswordLoading}
                    className="w-full bg-gradient-to-r from-green-primary to-green-secondary text-white py-3 px-4 rounded-lg font-medium hover:from-green-700 hover:to-green-800 focus:ring-2 focus:ring-green-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                  >
                    {forgotPasswordLoading ? (
                      <>
                        <RefreshCw className="animate-spin h-5 w-5 mr-2" />
                        Resetting...
                      </>
                    ) : (
                      'Reset Password'
                    )}
                  </button>
                </form>
              )}
            </>
          )}

          {/* Footer Links */}
          <div className="mt-6 text-center space-y-3">
            {!forgotPassword ? (
              <>
                <button 
                  type="button"
                  onClick={() => setForgotPassword(true)}
                  className="text-green-primary hover:text-green-700 text-sm font-medium transition-colors"
                >
                  Forgot your password?
                </button>
                <p className="text-gray-600 text-sm">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-green-primary hover:text-green-700 font-medium transition-colors">
                    Sign up here
                  </Link>
                </p>
              </>
            ) : (
              <button 
                type="button"
                onClick={() => {
                  setForgotPassword(false)
                  setOtpSent(false)
                  setOtpVerified(false)
                  setOtp('')
                  setNewPassword('')
                  setConfirmPassword('')
                  setForgotPasswordMessage(null)
                }}
                className="text-green-primary hover:text-green-700 text-sm font-medium transition-colors flex items-center justify-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}



