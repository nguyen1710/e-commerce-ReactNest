import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './hooks/AuthProvider'
import HomePage from './pages/HomePage'
import ProtectedRoute from './hooks/ProtectRoute'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthProvider>
        <Routes>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
      </AuthProvider>
     <Toaster duration='5000'/>   
     
    </>
  )
}

export default App
