import { useState, useEffect } from 'react';
import VitalCard from '../components/VitalCard';
import VitalChart from '../components/VitalChart';
import PatientTable from '../components/PatientTable';
import { mockPatients, generateHistoricalData } from '../data/mockData';

const Dashboard = () => {
  const [selectedVital, setSelectedVital] = useState('heartRate');
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Calculate average vitals across all patients
  const averageVitals = {
    heartRate: Math.round(mockPatients.reduce((sum, p) => sum + p.heartRate, 0) / mockPatients.length),
    bloodPressure: '132/85', // Simplified average
    spO2: Math.round(mockPatients.reduce((sum, p) => sum + p.spO2, 0) / mockPatients.length),
    ecg: 'Normal Sinus Rhythm', // Most common status
    activityLevel: Math.round(mockPatients.reduce((sum, p) => sum + p.activityLevel, 0) / mockPatients.length),
    respiratoryRate: Math.round(mockPatients.reduce((sum, p) => sum + p.respiratoryRate, 0) / mockPatients.length)
  };

  // Calculate stats
  const totalPatients = mockPatients.length;
  const highRiskPatients = mockPatients.filter(p => p.riskLevel === 'High').length;
  const activeAlerts = mockPatients.filter(p => p.riskLevel === 'High' || p.riskLevel === 'Medium').length;

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      // Generate trend data for the selected vital sign (using patient 1 as example)
      const data = generateHistoricalData(1, selectedVital);
      setChartData(data);
      setLoading(false);
    }, 500);
  }, [selectedVital]);

  const handleVitalCardClick = (vitalType) => {
    setSelectedVital(vitalType);
  };

  const getVitalColor = (vitalType) => {
    const colors = {
      heartRate: 'danger',
      bloodPressure: 'primary',
      spO2: 'success',
      ecg: 'warning',
      activityLevel: 'secondary',
      respiratoryRate: 'primary'
    };
    return colors[vitalType] || 'primary';
  };

  const getVitalTitle = (vitalType) => {
    const titles = {
      heartRate: 'Heart Rate Trend',
      bloodPressure: 'Blood Pressure Trend',
      spO2: 'SpO₂ Trend',
      ecg: 'ECG Status Trend',
      activityLevel: 'Activity Level Trend',
      respiratoryRate: 'Respiratory Rate Trend'
    };
    return titles[vitalType] || 'Vital Sign Trend';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Good morning, Dr. Smith
              </h1>
              <p className="text-lg text-gray-600">
                Here's what's happening with your patients today
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Last updated</div>
              <div className="text-lg font-medium text-gray-900">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6 animate-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                <p className="text-3xl font-bold text-gray-900">{totalPatients}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="card p-6 animate-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                <p className="text-3xl font-bold text-warning-600">{activeAlerts}</p>
              </div>
              <div className="w-12 h-12 bg-warning-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="card p-6 animate-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Risk</p>
                <p className="text-3xl font-bold text-danger-600">{highRiskPatients}</p>
              </div>
              <div className="w-12 h-12 bg-danger-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-danger-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Vital Signs Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Average Vital Signs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            <VitalCard
              title="Heart Rate"
              value={averageVitals.heartRate}
              unit="bpm"
              color="danger"
              trend={2.5}
              onClick={() => handleVitalCardClick('heartRate')}
            />
            <VitalCard
              title="Blood Pressure"
              value={averageVitals.bloodPressure}
              unit="mmHg"
              color="primary"
              trend={-1.2}
              onClick={() => handleVitalCardClick('bloodPressure')}
            />
            <VitalCard
              title="SpO₂"
              value={averageVitals.spO2}
              unit="%"
              color="success"
              trend={0.8}
              onClick={() => handleVitalCardClick('spO2')}
            />
            <VitalCard
              title="ECG Status"
              value="Normal"
              unit=""
              color="warning"
              trend={0}
              onClick={() => handleVitalCardClick('ecg')}
            />
            <VitalCard
              title="Activity Level"
              value={`${(averageVitals.activityLevel / 1000).toFixed(1)}k`}
              unit="steps"
              color="secondary"
              trend={5.2}
              onClick={() => handleVitalCardClick('activityLevel')}
            />
            <VitalCard
              title="Respiratory Rate"
              value={averageVitals.respiratoryRate}
              unit="bpm"
              color="primary"
              trend={-0.5}
              onClick={() => handleVitalCardClick('respiratoryRate')}
            />
          </div>
        </div>

        {/* Chart Section */}
        <div className="mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {getVitalTitle(selectedVital)}
                </h2>
                <p className="text-gray-600">
                  Click on a vital sign card above to view its trend chart
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Live Data</span>
              </div>
            </div>
            
            {loading ? (
              <div className="h-80 flex items-center justify-center">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                  <span className="text-gray-600">Loading chart data...</span>
                </div>
              </div>
            ) : chartData ? (
              <VitalChart
                data={chartData}
                title={getVitalTitle(selectedVital)}
                color={getVitalColor(selectedVital)}
              />
            ) : null}
          </div>
        </div>

        {/* Patient Table */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Patient Overview</h2>
            <button className="btn-ghost text-sm">
              <svg className="w-4 h-4 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Report
            </button>
          </div>
          <PatientTable patients={mockPatients} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;