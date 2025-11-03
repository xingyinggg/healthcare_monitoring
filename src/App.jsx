import { useAuth } from "react-oidc-context"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';
import PatientDetail from './pages/PatientDetail';
import './App.css';

function App() {
  const auth = useAuth()

  // Show loading spinner while authentication is being checked
  if (auth.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show error if authentication fails
  if (auth.error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>Authentication error: {auth.error.message}</p>
            <button 
              onClick={() => auth.signinRedirect()} 
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // If not authenticated, show sign-in button
  if (!auth.isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Healthcare Management Dashboard</h1>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Please sign in to continue</h2>
            <button 
              onClick={() => auth.signinRedirect()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign In with AWS Cognito
            </button>
          </div>
        </div>
      </div>
    )
  }

  // If authenticated, show the main app
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Protected routes with navbar */}
          <Route path="/*" element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/patient/:id" element={<PatientDetail />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
