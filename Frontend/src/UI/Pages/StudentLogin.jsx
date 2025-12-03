import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTheme } from '../Context/ThemeContext'

const StudentLogin = () => {
  const navigate = useNavigate()
  const { isDarkMode, toggleTheme } = useTheme()
  const [formData, setFormData] = useState({
    user: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('All fields are required')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email')
      return false
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // if (!validateForm()) return

    setLoading(true)
    try {
      console.log('Submitting form data:', formData)
      const response = await fetch('http://localhost:3000/api/auth/Studentlogin', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }
      setTimeout(() => {
        navigate('/student/profile')
      }, 1000)
    } catch {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-cyan-100'} flex items-center justify-center py-12 px-4`}>
      <div className='w-full max-w-md'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`}>O.R.B.I.T</h1>
          <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Student Login</h2>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Access your learning portal</p>
        </div>

        {/* Login Card */}
        <div className={`rounded-lg shadow-xl p-8 mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {error && (
            <div className={`mb-4 p-4 border rounded-lg ${isDarkMode ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-200'}`}>
              <p className={isDarkMode ? 'text-red-400' : 'text-red-600'}>
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Email Field */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email Address
              </label>
              <input
                type='text'
                name='user'
                value={formData.email}
                onChange={handleChange}
                placeholder='your.email@student.institution.edu'
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'}`}
              />
            </div>

            {/* Password Field */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Enter your password'
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'}`}
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className='flex items-center justify-between text-sm'>
              <label className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <input type='checkbox' className='mr-2 w-4 h-4' />
                Remember me
              </label>
              <Link to='/' className={`font-medium ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type='submit'
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>

        {/* Back Button */}
        <div className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <Link to='/' className={`font-medium ${isDarkMode ? 'hover:text-gray-200' : 'hover:text-gray-900'}`}>
            ← Back to Home
          </Link>
        </div>

        {/* Theme Toggle */}
        <div className='text-center mt-6'>
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-lg font-semibold transition ${isDarkMode ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-600' : 'bg-gray-700 text-white hover:bg-gray-800'}`}
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default StudentLogin
