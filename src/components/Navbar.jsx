import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from '../services/auth'

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    setUser(null)
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">QuickBite</Link>
            {user && (
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/restaurants" className="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md">Restaurants</Link>
                <Link to="/order" className="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md">New Order</Link>
              </div>
            )}
          </div>
          <div>
            {user ? (
              <button 
                onClick={handleSignOut} 
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Sign Out
              </button>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-md">Login</Link>
                <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}