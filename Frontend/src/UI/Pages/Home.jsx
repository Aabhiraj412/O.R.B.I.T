import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../Context/ThemeContext'

const Home = () => {
  const navigate = useNavigate()
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
        {/* Navigation Bar */}
        <nav className={isDarkMode ? 'bg-gray-800 shadow-md' : 'bg-white shadow-md'}>
          <div className='max-w-6xl mx-auto px-4 py-4 flex justify-between items-center'>
            <div>
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-indigo-600'}`}>O.R.B.I.T</h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Educational Management System</p>
            </div>
            <div className='flex gap-4 items-center'>
              <button 
                onClick={() => navigate('/student/login')}
                className={`px-4 py-2 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-indigo-600'} font-medium transition`}
              >
                Student Login
              </button>
              <button 
                onClick={() => navigate('/staff/login')}
                className={`px-4 py-2 rounded-lg transition font-medium ${isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
              >
                Staff Login
              </button>
              <button
                onClick={toggleTheme}
                className={`px-4 py-2 rounded-lg font-semibold transition ${isDarkMode ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-600' : 'bg-gray-700 text-white hover:bg-gray-800'}`}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className='max-w-6xl mx-auto px-4 py-20'>
          <div className='grid md:grid-cols-2 gap-12 items-center mb-20'>
            <div className='text-left'>
              <h2 className={`text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
                Welcome to O.R.B.I.T
              </h2>
              <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-8`}>
                A comprehensive Educational Resource & Management System designed for seamless collaboration between students, faculty, and administration.
              </p>
              <div className='flex gap-4'>
                <button 
                  onClick={() => navigate('/student/login')}
                  className={`px-8 py-4 rounded-lg transition font-semibold text-lg ${isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                  Student Portal
                </button>
                <button 
                  onClick={() => navigate('/staff/login')}
                  className={`px-8 py-4 rounded-lg transition font-semibold text-lg ${isDarkMode ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                >
                  Staff Portal
                </button>
              </div>
            </div>
            <div className={`rounded-lg shadow-lg p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className='space-y-6'>
                <div className='flex items-start gap-4'>
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-blue-900 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                    <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
                      <path d='M10.5 1.5H3.75A2.25 2.25 0 001.5 3.75v12.5A2.25 2.25 0 003.75 18.5h12.5a2.25 2.25 0 002.25-2.25V9.5'/>
                    </svg>
                  </div>
                  <div>
                    <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Course Management</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Track courses, assignments, and grades in one place</p>
                  </div>
                </div>
                <div className='flex items-start gap-4'>
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-purple-900 text-purple-400' : 'bg-indigo-100 text-indigo-600'}`}>
                    <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
                      <path d='M10 12a2 2 0 100-4 2 2 0 000 4z'/>
                    </svg>
                  </div>
                  <div>
                    <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Real-time Notifications</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Stay updated with instant announcements and alerts</p>
                  </div>
                </div>
                <div className='flex items-start gap-4'>
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-pink-900 text-pink-400' : 'bg-purple-100 text-purple-600'}`}>
                    <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
                      <path d='M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z'/>
                    </svg>
                  </div>
                  <div>
                    <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Attendance Tracking</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Monitor attendance and academic performance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className='grid md:grid-cols-3 gap-8 mt-16'>
            <div className={`rounded-lg shadow-md p-6 hover:shadow-lg transition ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
                <span className='text-2xl'>📚</span>
              </div>
              <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Learning Management</h3>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Access course materials, lectures, and resources from anywhere, anytime.</p>
            </div>
            <div className={`rounded-lg shadow-md p-6 hover:shadow-lg transition ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${isDarkMode ? 'bg-purple-900' : 'bg-indigo-100'}`}>
                <span className='text-2xl'>👥</span>
              </div>
              <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Community Support</h3>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Connect with peers, submit grievances, and get academic support.</p>
            </div>
            <div className={`rounded-lg shadow-md p-6 hover:shadow-lg transition ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${isDarkMode ? 'bg-pink-900' : 'bg-purple-100'}`}>
                <span className='text-2xl'>📊</span>
              </div>
              <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Analytics & Reports</h3>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Comprehensive analytics for better insights into academic progress.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className={isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-900 text-white'} >
          <div className='max-w-6xl mx-auto px-4 text-center py-8'>
            <p className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>© 2025 O.R.B.I.T - Educational Management System. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Home
