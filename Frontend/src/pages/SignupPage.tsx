import { LoaderCircle, Lock, Mail, User } from 'lucide-react'
import { useState } from 'react'
import type { ChangeEvent, SyntheticEvent } from 'react'
import { Link } from 'react-router-dom'

function SignupPage() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
    setErrors({ ...errors, [name]: '' })
  }

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newErrors = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    }

    if (!user.username.trim()) {
      newErrors.username = 'Username is required.'
    }

    if (!user.email.trim()) {
      newErrors.email = 'Please enter a valid email.'
    }

    if (!user.password.trim()) {
      newErrors.password = 'Password cannot be empty.'
    }

    if (!user.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password.'
    } else if (user.password !== user.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.'
    }

    if (
      newErrors.username ||
      newErrors.email ||
      newErrors.password ||
      newErrors.confirmPassword
    ) {
      setErrors(newErrors)
      return
    }

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      alert('Account created successfully!')
    }, 2000)
  }

  return (
  <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
    <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
      <h2 className="mb-2 text-center text-3xl font-bold text-white">
        Create Account
      </h2>

      <p className="mb-8 text-center text-sm text-zinc-400">
        Sign up for Comic-Tube
      </p>

      <button
          type="button"
          className="flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-zinc-700 bg-zinc-800 text-white transition hover:bg-zinc-700"
        >
          <img
            src="/Icons/google-icon.webp"
            alt="Google"
            className="h-5 w-5"
          />
          <span className="font-medium">Continue with Google</span>
        </button>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          
          <span className="flex-shrink mx-2 text-sm font-medium text-gray-500 text-xl">
            or
          </span>
          
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="username"
            className="mb-2 block text-sm text-zinc-300"
          >
            Username
          </label>

          <div className="relative">
            <User
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              id="username"
              type="text"
              name="username"
              placeholder="Choose a username"
              value={user.username}
              onChange={handleChange}
              className={`w-full rounded-lg border bg-zinc-800 py-3 pl-10 pr-4 text-white outline-none ${
                errors.username
                  ? 'border-red-500'
                  : 'border-zinc-700 focus:border-blue-500'
              }`}
            />
          </div>

          {errors.username && (
            <p className="mt-1 text-sm text-red-500">{errors.username}</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="mb-2 block text-sm text-zinc-300"
          >
            Email
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleChange}
              className={`w-full rounded-lg border bg-zinc-800 py-3 pl-10 pr-4 text-white outline-none ${
                errors.email
                  ? 'border-red-500'
                  : 'border-zinc-700 focus:border-blue-500'
              }`}
            />
          </div>

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="mb-2 block text-sm text-zinc-300"
          >
            Password
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={handleChange}
              className={`w-full rounded-lg border bg-zinc-800 py-3 pl-10 pr-4 text-white outline-none ${
                errors.password
                  ? 'border-red-500'
                  : 'border-zinc-700 focus:border-blue-500'
              }`}
            />
          </div>

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm text-zinc-300"
          >
            Confirm Password
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={user.confirmPassword}
              onChange={handleChange}
              className={`w-full rounded-lg border bg-zinc-800 py-3 pl-10 pr-4 text-white outline-none ${
                errors.confirmPassword
                  ? 'border-red-500'
                  : 'border-zinc-700 focus:border-blue-500'
              }`}
            />
          </div>

          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex h-11 w-full items-center justify-center rounded-lg bg-blue-600 font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" size={20} />
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-400">
        Already have an account?{' '}
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

export default SignupPage