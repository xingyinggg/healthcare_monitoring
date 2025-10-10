import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';
import PatientDetail from './pages/PatientDetail';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Login route - no navbar */}
          <Route path="/login" element={<Login />} />
          
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
