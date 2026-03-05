import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import HomePage from './pages/HomePage'

const App = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<HomePage />} />
        </Routes>
    </div>
  )
}

export default App
