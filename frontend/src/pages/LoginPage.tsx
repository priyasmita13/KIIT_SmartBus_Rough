import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { Bus, Mail, Lock, ArrowLeft, RefreshCw, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { API_BASE as API } from '../lib/apiBase'

// ── Shared sub-components (module-level — MUST NOT be defined inside a component) ──

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0F0F1A] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-violet-500/08 blur-[80px] pointer-events-none" />

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

// ── OTP digit input row ───────────────────────────────────────────────────────

function OtpInput({
  id,
  otp,
  onChange,
  onKeyDown,
  onPaste,
}: {
  id: string
  otp: string[]
  onChange: (index: number, value: string) => void
  onKeyDown: (index: number, e: React.KeyboardEvent) => void
  onPaste: (e: React.ClipboardEvent) => void
}) {
  return (
    <div className="flex gap-2 justify-center" onPaste={onPaste}>
      {otp.map((digit, i) => (
        <input
          key={i}
          id={`${id}-${i}`}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => onChange(i, e.target.value)}
          onKeyDown={(e) => onKeyDown(i, e)}
          className="w-12 h-12 text-center text-xl font-bold rounded-xl border-2 border-white/10 bg-white/5
                     text-white focus:border-indigo-500/60 focus:outline-none transition-colors"
        />
      ))}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, setUserFromData } = useAuth()

  // Login form
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  // Forgot password
  const [forgotPassword, setForgotPassword] = useState(false)
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false)
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState<string | null>(null)
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [otpVerified, setOtpVerified] = useState(false)

  // Email verification (unverified account)
  const [needsVerification, setNeedsVerification] = useState(false)
  const [verifyUserId, setVerifyUserId] = useState<string | null>(null)
  const [verifyOtp, setVerifyOtp] = useState(['', '', '', '', '', ''])
  const [verifyLoading, setVerifyLoading] = useState(false)
  const [verifyError, setVerifyError] = useState<string | null>(null)
  const [verifySuccess, setVerifySuccess] = useState<string | null>(null)
  const [resendLoading, setResendLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)

  // ── Handlers ──────────────────────────────────────────────────────────────

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!email.endsWith('@kiit.ac.in')) {
      setError('Please use your official KIIT email ID')
      setLoading(false)
      return
    }

    try {
      const data = await login(email, password)
      navigate(`/${data.user.role.toLowerCase()}`)
    } catch (err: any) {
      if (err?.response?.data?.needsVerification) {
        const uid = err.response.data.userId
        setVerifyUserId(uid)
        setNeedsVerification(true)
        try {
          await axios.post(`${API}/api/auth/resend-otp`, { userId: uid })
        } catch {
          // user can still click Resend manually
        }
        startResendTimer()
      } else {
        setError(err?.response?.data?.error?.message || 'Login failed')
      }
    } finally {
      setLoading(false)
    }
  }

  function startResendTimer() {
    setResendTimer(60)
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) { clearInterval(interval); return 0 }
        return prev - 1
      })
    }, 1000)
  }

  function handleVerifyOtpChange(index: number, value: string) {
    if (value.length > 1 || !/^\d*$/.test(value)) return
    const updated = [...verifyOtp]
    updated[index] = value
    setVerifyOtp(updated)
    if (value && index < 5) document.getElementById(`verify-otp-${index + 1}`)?.focus()
  }

  function handleVerifyOtpKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !verifyOtp[index] && index > 0) {
      document.getElementById(`verify-otp-${index - 1}`)?.focus()
    }
  }

  function handleVerifyOtpPaste(e: React.ClipboardEvent) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').slice(0, 6)
    if (!/^\d+$/.test(pasted)) return
    setVerifyOtp([...pasted.split(''), ...Array(6 - pasted.length).fill('')])
  }

  async function handleVerifySubmit(e: React.FormEvent) {
    e.preventDefault()
    const otpValue = verifyOtp.join('')
    if (otpValue.length !== 6) { setVerifyError('Please enter the complete 6-digit OTP'); return }

    setVerifyLoading(true)
    setVerifyError(null)
    try {
      const res = await axios.post(`${API}/api/auth/verify-email`, { userId: verifyUserId, otp: otpValue }, { withCredentials: true })
      setVerifySuccess('Email verified! Redirecting...')
      setUserFromData(res.data.user, res.data.accessToken)
      setTimeout(() => navigate(`/${res.data.user.role.toLowerCase()}`), 1500)
    } catch (err: any) {
      setVerifyError(err?.response?.data?.error?.message || 'Verification failed')
    } finally {
      setVerifyLoading(false)
    }
  }

  async function handleResendVerifyOtp() {
    setResendLoading(true)
    setVerifyError(null)
    try {
      await axios.post(`${API}/api/auth/resend-otp`, { userId: verifyUserId })
      setVerifySuccess('OTP resent successfully!')
      setVerifyOtp(['', '', '', '', '', ''])
      startResendTimer()
      setTimeout(() => setVerifySuccess(null), 3000)
    } catch (err: any) {
      setVerifyError(err?.response?.data?.error?.message || 'Failed to resend OTP')
    } finally {
      setResendLoading(false)
    }
  }

  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault()
    if (!email) { setForgotPasswordMessage('Please enter your email address'); return }
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

  async function handleVerifyForgotOtp(e: React.FormEvent) {
    e.preventDefault()
    if (!otp || otp.length !== 6) { setForgotPasswordMessage('Please enter a valid 6-digit OTP'); return }
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
    if (!newPassword || newPassword.length < 8) { setForgotPasswordMessage('Password must be at least 8 characters long'); return }
    if (newPassword !== confirmPassword) { setForgotPasswordMessage('Passwords do not match'); return }
    setForgotPasswordLoading(true)
    setForgotPasswordMessage(null)
    try {
      const res = await axios.post(`${API}/api/forgot-password/reset-password`, { email, otp, newPassword })
      setForgotPasswordMessage(res.data.message)
      setTimeout(() => {
        setForgotPassword(false); setOtpSent(false); setOtpVerified(false)
        setOtp(''); setNewPassword(''); setConfirmPassword(''); setForgotPasswordMessage(null)
      }, 2000)
    } catch (err: any) {
      setForgotPasswordMessage(err?.response?.data?.error?.message || 'Failed to reset password. Please try again.')
    } finally {
      setForgotPasswordLoading(false)
    }
  }

  function resetForgotFlow() {
    setForgotPassword(false); setOtpSent(false); setOtpVerified(false)
    setOtp(''); setNewPassword(''); setConfirmPassword(''); setForgotPasswordMessage(null)
  }

  // ── Screen: Email verification (unverified account) ───────────────────────

  if (needsVerification) {
    return (
      <PageShell>
        <div className="glass-strong rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white text-center mb-1">Verify Your Email</h2>
          <p className="text-slate-400 text-sm text-center mb-6">
            A 6-digit OTP was sent to <span className="text-indigo-400 font-semibold">{email}</span>
          </p>

          {verifyError && <Alert type="error" message={verifyError} />}
          {verifySuccess && <Alert type="success" message={verifySuccess} />}

          <form onSubmit={handleVerifySubmit} className="space-y-6">
            <OtpInput
              id="verify-otp"
              otp={verifyOtp}
              onChange={handleVerifyOtpChange}
              onKeyDown={handleVerifyOtpKeyDown}
              onPaste={handleVerifyOtpPaste}
            />
            <button type="submit" disabled={verifyLoading} className="btn-primary w-full justify-center">
              {verifyLoading ? <><RefreshCw className="animate-spin h-4 w-4" />Verifying...</> : 'Verify Email'}
            </button>
          </form>

          <div className="text-center mt-4">
            {resendTimer > 0 ? (
              <p className="text-slate-500 text-sm">Resend OTP in <span className="text-indigo-400 font-semibold">{resendTimer}s</span></p>
            ) : (
              <button
                onClick={handleResendVerifyOtp}
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
              onClick={() => { setNeedsVerification(false); setVerifyOtp(['', '', '', '', '', '']); setVerifyError(null) }}
              className="text-slate-400 hover:text-white text-sm font-medium inline-flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />Back to Login
            </button>
          </div>
        </div>
      </PageShell>
    )
  }

  // ── Screen: Main login / forgot-password ──────────────────────────────────

  const pageTitle = forgotPassword
    ? (otpVerified ? 'Set New Password' : otpSent ? 'Enter OTP' : 'Reset Password')
    : 'Welcome Back'
  const pageSubtitle = forgotPassword
    ? (otpVerified ? 'Create a new secure password' : otpSent ? 'Check your email for the code' : 'Enter your KIIT email to reset')
    : 'Sign in to your account'

  return (
    <PageShell>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white">{pageTitle}</h2>
        <p className="text-slate-400 text-sm mt-1">{pageSubtitle}</p>
      </div>

      <div className="glass-strong rounded-2xl p-8">

        {/* ── Login form ── */}
        {!forgotPassword && (
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-dark pl-10"
                  placeholder="yourname@kiit.ac.in"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-dark pl-10 pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && <Alert type="error" message={error} />}

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
              {loading ? <><RefreshCw className="animate-spin h-4 w-4" />Signing in...</> : 'Sign In'}
            </button>
          </form>
        )}

        {/* ── Forgot password: step 1 — email ── */}
        {forgotPassword && !otpSent && (
          <form onSubmit={handleForgotPassword} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-dark pl-10"
                  placeholder="yourname@kiit.ac.in"
                />
              </div>
            </div>
            {forgotPasswordMessage && (
              <Alert type={forgotPasswordMessage.includes('sent') ? 'success' : 'error'} message={forgotPasswordMessage} />
            )}
            <button type="submit" disabled={forgotPasswordLoading} className="btn-primary w-full justify-center">
              {forgotPasswordLoading ? <><RefreshCw className="animate-spin h-4 w-4" />Sending...</> : 'Send Reset Email'}
            </button>
          </form>
        )}

        {/* ── Forgot password: step 2 — OTP ── */}
        {forgotPassword && otpSent && !otpVerified && (
          <form onSubmit={handleVerifyForgotOtp} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                6-digit OTP sent to <span className="text-indigo-400">{email}</span>
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="123456"
                maxLength={6}
                required
                className="input-dark text-center text-2xl font-mono tracking-widest"
              />
            </div>
            {forgotPasswordMessage && (
              <Alert type={forgotPasswordMessage.includes('verified') ? 'success' : 'error'} message={forgotPasswordMessage} />
            )}
            <button type="submit" disabled={forgotPasswordLoading} className="btn-primary w-full justify-center">
              {forgotPasswordLoading ? <><RefreshCw className="animate-spin h-4 w-4" />Verifying...</> : 'Verify OTP'}
            </button>
          </form>
        )}

        {/* ── Forgot password: step 3 — new password ── */}
        {forgotPassword && otpVerified && (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={8}
                  className="input-dark pl-10"
                  placeholder="Enter new password"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  className="input-dark pl-10"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            {forgotPasswordMessage && (
              <Alert type={forgotPasswordMessage.includes('successfully') ? 'success' : 'error'} message={forgotPasswordMessage} />
            )}
            <button type="submit" disabled={forgotPasswordLoading} className="btn-primary w-full justify-center">
              {forgotPasswordLoading ? <><RefreshCw className="animate-spin h-4 w-4" />Resetting...</> : 'Reset Password'}
            </button>
          </form>
        )}

        {/* ── Footer links ── */}
        <div className="mt-6 text-center space-y-3">
          {!forgotPassword ? (
            <>
              <button
                type="button"
                onClick={() => setForgotPassword(true)}
                className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
              >
                Forgot your password?
              </button>
              <p className="text-slate-500 text-sm">
                Don't have an account?{' '}
                <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                  Sign up here
                </Link>
              </p>
            </>
          ) : (
            <button
              type="button"
              onClick={resetForgotFlow}
              className="text-slate-400 hover:text-white text-sm font-medium inline-flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />Back to Login
            </button>
          )}
        </div>
      </div>
    </PageShell>
  )
}
