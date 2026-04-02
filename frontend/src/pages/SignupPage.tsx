import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { Bus, Mail, Lock, User, Shield, UserCheck, RefreshCw, ArrowLeft } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { API_BASE as API } from '../lib/apiBase'

type Role = 'STUDENT' | 'DRIVER' | 'ADMIN'

const ROLE_OPTIONS: { value: Role; label: string; icon: React.ReactNode; desc: string }[] = [
  {
    value: 'STUDENT',
    label: 'Student',
    icon: <User className="h-5 w-5" />,
    desc: 'Track buses, check seat availability, manage campus transit',
  },
  {
    value: 'DRIVER',
    label: 'Driver',
    icon: <Bus className="h-5 w-5" />,
    desc: 'Manage your route, update live location, communicate with students',
  },
  {
    value: 'ADMIN',
    label: 'Admin',
    icon: <Shield className="h-5 w-5" />,
    desc: 'Oversee the full bus system, routes, schedules and user accounts',
  },
]

// ── Shared sub-components (module-level — MUST NOT be defined inside a component) ──

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0F0F1A] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-violet-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-56 h-56 rounded-full bg-indigo-500/08 blur-[80px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-glow-indigo group-hover:scale-110 transition-transform">
              <Bus className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-white text-xl tracking-tight">KIIT SmartBus</span>
          </Link>
        </div>
        {children}
      </div>
    </div>
  )
}

function Alert({ type, message }: { type: 'error' | 'success'; message: string }) {
  return (
    <div className={`rounded-xl px-4 py-3 text-sm text-center mb-4 border ${
      type === 'error'
        ? 'bg-rose-500/10 border-rose-500/20 text-rose-300'
        : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
    }`}>
      {message}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function SignupPage() {
  const navigate = useNavigate()
  const { setUserFromData } = useAuth()

  const [formData, setFormData] = useState({ email: '', password: '', name: '', role: 'STUDENT' as Role })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // OTP step
  const [step, setStep] = useState<'form' | 'otp'>('form')
  const [userId, setUserId] = useState<string | null>(null)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [verifyLoading, setVerifyLoading] = useState(false)
  const [verifyError, setVerifyError] = useState<string | null>(null)
  const [verifySuccess, setVerifySuccess] = useState<string | null>(null)
  const [resendLoading, setResendLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)

  // ── Helpers ───────────────────────────────────────────────────────────────

  function startResendTimer() {
    setResendTimer(60)
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) { clearInterval(interval); return 0 }
        return prev - 1
      })
    }, 1000)
  }

  // ── Handlers ──────────────────────────────────────────────────────────────

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!formData.email.endsWith('@kiit.ac.in')) {
      setError('Please use your official KIIT email ID')
      setLoading(false)
      return
    }

    try {
      const res = await axios.post(`${API}/api/auth/signup`, formData)
      setUserId(res.data.userId)
      setStep('otp')
      startResendTimer()
    } catch (err: any) {
      setError(err?.response?.data?.error?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  function handleOtpChange(index: number, value: string) {
    if (value.length > 1 || !/^\d*$/.test(value)) return
    const updated = [...otp]
    updated[index] = value
    setOtp(updated)
    if (value && index < 5) document.getElementById(`signup-otp-${index + 1}`)?.focus()
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`signup-otp-${index - 1}`)?.focus()
    }
  }

  function handleOtpPaste(e: React.ClipboardEvent) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').slice(0, 6)
    if (!/^\d+$/.test(pasted)) return
    setOtp([...pasted.split(''), ...Array(6 - pasted.length).fill('')])
  }

  async function handleVerifySubmit(e: React.FormEvent) {
    e.preventDefault()
    const otpValue = otp.join('')
    if (otpValue.length !== 6) { setVerifyError('Please enter the complete 6-digit OTP'); return }

    setVerifyLoading(true)
    setVerifyError(null)
    try {
      const res = await axios.post(`${API}/api/auth/verify-email`, { userId, otp: otpValue }, { withCredentials: true })
      setVerifySuccess('Email verified! Redirecting...')
      setUserFromData(res.data.user, res.data.accessToken)
      setTimeout(() => navigate(`/${res.data.user.role.toLowerCase()}`), 1500)
    } catch (err: any) {
      setVerifyError(err?.response?.data?.error?.message || 'Verification failed')
    } finally {
      setVerifyLoading(false)
    }
  }

  async function handleResendOtp() {
    setResendLoading(true)
    setVerifyError(null)
    try {
      await axios.post(`${API}/api/auth/resend-otp`, { userId })
      setVerifySuccess('OTP resent successfully!')
      setOtp(['', '', '', '', '', ''])
      startResendTimer()
      setTimeout(() => setVerifySuccess(null), 3000)
    } catch (err: any) {
      setVerifyError(err?.response?.data?.error?.message || 'Failed to resend OTP')
    } finally {
      setResendLoading(false)
    }
  }

  // ── OTP Verification Step ─────────────────────────────────────────────────

  if (step === 'otp') {
    return (
      <PageShell>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">Verify Your Email</h2>
          <p className="text-slate-400 text-sm mt-1">
            OTP sent to <span className="text-indigo-400 font-semibold">{formData.email}</span>
          </p>
        </div>

        <div className="glass-strong rounded-2xl p-8">
          {verifyError && <Alert type="error" message={verifyError} />}
          {verifySuccess && <Alert type="success" message={verifySuccess} />}

          <form onSubmit={handleVerifySubmit} className="space-y-6">
            <div className="flex gap-2 justify-center" onPaste={handleOtpPaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`signup-otp-${i}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  className="w-12 h-12 text-center text-xl font-bold rounded-xl border-2 border-white/10 bg-white/5
                             text-white focus:border-indigo-500/60 focus:outline-none transition-colors"
                />
              ))}
            </div>

            <button type="submit" disabled={verifyLoading} className="btn-primary w-full justify-center">
              {verifyLoading
                ? <><RefreshCw className="animate-spin h-4 w-4" />Verifying...</>
                : 'Verify & Create Account'}
            </button>
          </form>

          <div className="text-center mt-4">
            {resendTimer > 0 ? (
              <p className="text-slate-500 text-sm">
                Resend OTP in <span className="text-indigo-400 font-semibold">{resendTimer}s</span>
              </p>
            ) : (
              <button
                onClick={handleResendOtp}
                disabled={resendLoading}
                className="text-indigo-400 hover:text-indigo-300 text-sm font-medium inline-flex items-center gap-2 mx-auto disabled:opacity-50 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${resendLoading ? 'animate-spin' : ''}`} />
                Resend OTP
              </button>
            )}
          </div>

          <div className="mt-5 text-center">
            <button
              onClick={() => { setStep('form'); setOtp(['', '', '', '', '', '']); setVerifyError(null) }}
              className="text-slate-400 hover:text-white text-sm font-medium inline-flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />Back to Signup
            </button>
          </div>
        </div>
      </PageShell>
    )
  }

  // ── Signup Form Step ──────────────────────────────────────────────────────

  return (
    <PageShell>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white">Create Account</h2>
        <p className="text-slate-400 text-sm mt-1">Join the smart campus transportation system</p>
      </div>

      <div className="glass-strong rounded-2xl p-8">
        <form onSubmit={onSubmit} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="input-dark pl-10"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="input-dark pl-10"
                placeholder="yourname@kiit.ac.in"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength={8}
                className="input-dark pl-10"
                placeholder="Create a secure password"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1.5">Minimum 8 characters</p>
          </div>

          {/* Role selection */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Select Your Role</label>
            <div className="space-y-2">
              {ROLE_OPTIONS.map((role) => {
                const isSelected = formData.role === role.value
                return (
                  <label
                    key={role.value}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-150 ${
                      isSelected
                        ? 'border-indigo-500/40 bg-indigo-500/10'
                        : 'border-white/08 bg-white/03 hover:border-white/15 hover:bg-white/05'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role.value}
                      checked={isSelected}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as Role })}
                      className="sr-only"
                    />
                    <div className={`flex-shrink-0 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`}>
                      {role.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-slate-300'}`}>{role.label}</p>
                      <p className="text-xs text-slate-500 truncate">{role.desc}</p>
                    </div>
                    {isSelected && <UserCheck className="h-4 w-4 text-indigo-400 flex-shrink-0" />}
                  </label>
                )
              })}
            </div>
          </div>

          {error && <Alert type="error" message={error} />}

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
            {loading
              ? <><RefreshCw className="animate-spin h-4 w-4" />Creating Account...</>
              : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-500 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </PageShell>
  )
}
