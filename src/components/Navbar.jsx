"use client"

import { useAuth } from "react-oidc-context"
import { Link, useLocation, useNavigate } from "react-router-dom"

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const auth = useAuth()

  const handleLogout = () => {
    auth.removeUser()
    // navigate('/login');
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/50 backdrop-blur-xl bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group hover:shadow-xl hover:scale-105 transition-all duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">HeartSync</h1>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            <Link
              to="/"
              className={`group px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive("/")
                  ? "bg-slate-800 text-blue-400"
                  : "text-slate-300 hover:bg-slate-800/60 hover:text-slate-100"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 mr-2 transition-colors duration-200 ${
                    isActive("/") ? "text-blue-400" : "text-slate-400 group-hover:text-blue-400"
                  }`}
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                    />
                  </svg>
                </div>
                <span className="font-medium">Dashboard</span>
              </div>
            </Link>

            <Link
              to="/analytics"
              className={`group px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive("/analytics")
                  ? "bg-slate-800 text-blue-400"
                  : "text-slate-300 hover:bg-slate-800/60 hover:text-slate-100"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 mr-2 transition-colors duration-200 ${
                    isActive("/analytics") ? "text-blue-400" : "text-slate-400 group-hover:text-blue-400"
                  }`}
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <span className="font-medium">Analytics</span>
              </div>
            </Link>

            <Link
              to="/alerts"
              className={`group px-3 py-2 rounded-lg transition-all duration-200 flex items-center ${
                isActive("/alerts")
                  ? "bg-slate-800 text-blue-400"
                  : "text-slate-300 hover:bg-slate-800/60 hover:text-slate-100"
              }`}
            >
              <div
                className={`w-4 h-4 mr-2 transition-colors duration-200 ${
                  isActive("/alerts") ? "text-blue-400" : "text-slate-400 group-hover:text-blue-400"
                }`}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <span className="font-medium">Alerts</span>
              <div className="w-2 h-2 bg-red-500 rounded-full ml-2 animate-pulse"></div>
            </Link>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {/* User Profile */}
            <div className="hidden md:flex items-center space-x-3 px-3 py-2 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors duration-200">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="text-sm">
                <p className="font-semibold text-slate-100">
                  {auth.user?.profile?.email || auth.user?.profile?.name || "User"}
                </p>
                <p className="text-slate-400 text-2xs">Healthcare Professional</p>
              </div>
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors duration-200">
              <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-5 5v-5zM9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-2xs text-white font-bold">3</span>
              </div>
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
