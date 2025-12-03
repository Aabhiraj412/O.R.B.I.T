import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './Context/ThemeContext'
import Home from './Pages/Home'
import StaffLogin from './Pages/StaffLogin'
import StudentLogin from './Pages/StudentLogin'
import StaffProfile from './Pages/StaffProfile'
import StudentProfile from './Pages/StudentProfile'

const App = () => {
  return (
    <ThemeProvider>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home/>}/>
        
        {/* Staff Routes */}
        <Route path="/staff/login" element={<StaffLogin/>}/>
        <Route path="/staff/profile" element={<StaffProfile/>}/>
        
        {/* Student Routes */}
        <Route path="/student/login" element={<StudentLogin/>}/>
        <Route path="/student/profile" element={<StudentProfile/>}/>
      </Routes>
    </ThemeProvider>
  )
}

export default App
