import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass sticky top-0 z-50 border-b border-neutral-200/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-soft group hover:shadow-medium transition-shadow duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient-primary">HealthMonitor</h1>
              <p className="text-2xs text-neutral-500 -mt-0.5 font-medium">Professional Dashboard</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            <Link
              to="/"
              className={`nav-link group ${
                isActive('/') ? 'nav-link-active' : 'nav-link-inactive'
              }`}
            >
              <div className={`w-4 h-4 mr-2 transition-colors duration-200 ${
                isActive('/') ? 'text-primary-600' : 'text-neutral-400 group-hover:text-primary-500'
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
                isActive('/alerts') ? 'text-primary-600' : 'text-neutral-400 group-hover:text-primary-500'
              }`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <span className="font-medium">Alerts</span>
              <div className="w-2 h-2 bg-danger-500 rounded-full ml-2 animate-pulse"></div>
            </Link>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {/* User Profile */}
            <div className="hidden md:flex items-center space-x-3 px-3 py-2 rounded-xl bg-neutral-50/80 border border-neutral-200/60">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="text-sm">
                <p className="font-semibold text-neutral-900">Dr. Smith</p>
                <p className="text-neutral-500 text-2xs">Cardiologist</p>
              </div>
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-xl bg-neutral-50/80 border border-neutral-200/60 hover:bg-neutral-100 transition-colors duration-200">
              <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-danger-500 rounded-full flex items-center justify-center">
                <span className="text-2xs text-white font-bold">3</span>
              </div>
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="btn btn-danger text-sm px-4 py-2 shadow-soft hover:shadow-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;