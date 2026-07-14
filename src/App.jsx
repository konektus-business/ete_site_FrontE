import { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/public/Home'
import PublicLayout from './pages/public/PublicLayout'
import './App.css'
import Login from './pages/auth/Login'
import ForgotPassword from './pages/auth/ForgotPassword'
import Register from './pages/auth/Register'
import Services from './pages/public/Services'

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path='/' element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path='services' element={<Services />} />
      </Route>
      
      <Route path='/login' element={<Login />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/register' element={<Register />} />
    </>
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App
