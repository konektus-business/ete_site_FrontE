import { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/public/Home'
import PublicLayout from './pages/public/PublicLayout'
import './App.css'
import Login from './pages/auth/Login'
import ForgotPassword from './pages/auth/ForgotPassword'
import Register from './pages/auth/Register'
import Services from './pages/public/Services'
import Contact from './pages/public/Contact'
import About from './pages/public/About'

function App() {
  // HTML5 browser router with declarative JSX routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Nested routes sharing the PublicLayout (header/footer) */}
        <Route path='/' element={<PublicLayout />}>
          {/* Index route renders Home at '/' */}
          <Route index element={<Home />} />
          {/* Child routes are rendered inside the layout */}
          <Route path='services' element={<Services />} />
          <Route path='contact' element={<Contact />} />
          <Route path='about' element={<About />} />
        </Route>
        
        {/* Standalone auth pages (without the public layout) */}
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/register' element={<Register />} />
      </>
    )
  )

  // Provide the router to the app
  return (
    <RouterProvider router={router} />
  )
}

export default App