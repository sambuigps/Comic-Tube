import { LoaderCircle, Mail } from 'lucide-react'
import { useState } from 'react'
import type {
  ChangeEvent,
  KeyboardEvent,
  SyntheticEvent,
} from 'react'
import { Link, useNavigate } from 'react-router-dom'

function ForgotPasswordPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])

  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const [errors, setErrors] = useState({
    email: '',
    otp: '',
  })

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)

    setErrors((prev) => ({
      ...prev,
      email: '',
    }))
  }

  const handleOtpChange = (
    index: number,
    value: string
  ) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)

    setOtp(newOtp)

    if (value && index < 5) {
      const nextInput = document.getElementById(
        `otp-${index + 1}`
      ) as HTMLInputElement | null

      nextInput?.focus()
    }

    setErrors((prev) => ({
      ...prev,
      otp: '',
    }))
  }

  const handleOtpKeyDown = (
    index: number,
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === 'Backspace' &&
      !otp[index] &&
      index > 0
    ) {
      const prevInput = document.getElementById(
        `otp-${index - 1}`
      ) as HTMLInputElement | null

      prevInput?.focus()
    }
  }

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newErrors = {
      email: '',
      otp: '',
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!otpSent) {
      if (!email.trim()) {
        newErrors.email = 'Email is required.'
      } else if (!emailRegex.test(email)) {
        newErrors.email = 'Please enter a valid email.'
      }

      if (newErrors.email) {
        setErrors(newErrors)
        return
      }

      setLoading(true)

      // TODO: Send OTP API
      setTimeout(() => {
        setLoading(false)
        setOtpSent(true)
      }, 1500)

      return
    }

    const otpValue = otp.join('')

    if (!/^\d{6}$/.test(otpValue)) {
      newErrors.otp = 'Please enter a valid 6-digit OTP.'
    }

    if (newErrors.otp) {
      setErrors(newErrors)
      return
    }

    setLoading(true)

    // TODO: Verify OTP API
    setTimeout(() => {
      setLoading(false)
      navigate('/reset-password')
    }, 1500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
        <h2 className="mb-2 text-center text-3xl font-bold text-white">
          Forgot Password
        </h2>

        <p className="mb-8 text-center text-sm text-zinc-400">
          Enter your email to receive a one-time password (OTP)
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="mb-2 block text-sm text-zinc-300">
              Email
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                disabled={otpSent}
                className={`w-full rounded-lg border bg-zinc-800 py-3 pl-10 pr-4 text-white outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
                  errors.email
                    ? 'border-red-500'
                    : 'border-zinc-700 focus:border-blue-500'
                }`}
              />
            </div>

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          {otpSent && (
            <>
              <div className="mb-4 rounded-lg border border-blue-800 bg-blue-950/30 p-3">
                <p className="text-sm text-blue-300">
                  A 6-digit OTP has been sent to{' '}
                  <span className="font-medium">{email}</span>
                </p>
              </div>

              <div className="mb-5">
                <label className="mb-2 block text-sm text-zinc-300">
                  OTP
                </label>

                <div className="flex justify-between gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) =>
                        handleOtpChange(index, e.target.value)
                      }
                      onKeyDown={(e) =>
                        handleOtpKeyDown(index, e)
                      }
                      className={`h-12 w-12 rounded-lg border bg-zinc-800 text-center text-lg font-semibold text-white outline-none ${
                        errors.otp
                          ? 'border-red-500'
                          : 'border-zinc-700 focus:border-blue-500'
                      }`}
                    />
                  ))}
                </div>

                {errors.otp && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.otp}
                  </p>
                )}

                <button
                  type="button"
                  className="mt-3 text-sm text-blue-400 hover:underline"
                >
                  Resend OTP
                </button>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex h-11 w-full items-center justify-center rounded-lg bg-blue-600 font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? (
              <LoaderCircle
                className="animate-spin"
                size={20}
              />
            ) : otpSent ? (
              'Verify OTP'
            ) : (
              'Send OTP'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Remember your password?{' '}
          <Link
            to="/login"
            className="font-medium text-blue-400 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPasswordPage