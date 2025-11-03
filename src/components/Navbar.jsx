import { useAuth } from "react-oidc-context"
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    auth.removeUser();
    // navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass sticky top-0 z-50 border-b border-gray-200/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-soft group hover:shadow-medium transition-shadow duration-300">
              <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold text-gradient">HealthMonitor</h1>
              <p className="text-xs text-gray-500 -mt-0.5 font-medium hidden md:block">Professional Dashboard</p>
            </div>
          </div>

          {/* Navigation Links - Hidden on mobile, shown in sidebar */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`nav-link group ${
                isActive('/') ? 'nav-link-active' : 'nav-link-inactive'
              }`}
            >
              <div className={`w-4 h-4 mr-2 transition-colors duration-200 ${
                isActive('/') ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-500'
              }`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
              </div>
              <span className="font-medium">Dashboard</span>
            </Link>
            
            <Link
              to="/alerts"
              className={`nav-link group ${
                isActive('/alerts') ? 'nav-link-active' : 'nav-link-inactive'
              }`}
            >
              <div className={`w-4 h-4 mr-2 transition-colors duration-200 ${
                isActive('/alerts') ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-500'
              }`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <span className="font-medium">Alerts</span>
              <div className="w-2 h-2 bg-red-500 rounded-full ml-2 animate-pulse"></div>
            </Link>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* User Profile - Hidden on small screens */}
            <div className="hidden lg:flex items-center space-x-3 px-3 py-2 rounded-xl bg-gray-50/80 border border-gray-200/60">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900 truncate max-w-32">
                  {auth.user?.profile?.email || auth.user?.profile?.name || 'User'}
                </p>
                <p className="text-gray-500 text-xs">Healthcare Professional</p>
              </div>
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-xl bg-gray-50/80 border border-gray-200/60 hover:bg-gray-100 transition-colors duration-200">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">3</span>
              </div>
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="btn btn-danger text-xs md:text-sm px-3 py-2 md:px-4 shadow-soft hover:shadow-medium"
            >
              <svg className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="font-medium hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200/60 py-2">
          <div className="flex space-x-1">
            <Link
              to="/"
              className={`flex-1 flex items-center justify-center py-2 px-3 rounded-xl text-sm font-medium transition-colors duration-200 ${
                isActive('/') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              </svg>
              Dashboard
            </Link>
            
            <Link
              to="/alerts"
              className={`flex-1 flex items-center justify-center py-2 px-3 rounded-xl text-sm font-medium transition-colors duration-200 relative ${
                isActive('/alerts') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              Alerts
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full ml-1 animate-pulse"></div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;