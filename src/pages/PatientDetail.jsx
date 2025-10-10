import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import VitalChart from '../components/VitalChart';
import AlertBadge from '../components/AlertBadge';
import { mockPatients, generateHistoricalData } from '../data/mockData';

const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // Find patient by ID
    const foundPatient = mockPatients.find(p => p.id === parseInt(id));
    setPatient(foundPatient);

    if (foundPatient) {
      // Generate chart data for all vitals
      const vitals = ['heartRate', 'bloodPressure', 'spO2', 'ecg', 'activityLevel', 'respiratoryRate'];
      const data = {};
      vitals.forEach(vital => {
        data[vital] = generateHistoricalData(foundPatient.id, vital);
      });
      setChartData(data);
    }
  }, [id]);

  if (!patient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Patient Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const getVitalStatus = (vital, value) => {
    switch (vital) {
      case 'heartRate':
        if (value > 100 || value < 60) return 'text-red-600';
        return 'text-green-600';
      case 'spO2':
        if (value < 95) return 'text-red-600';
        return 'text-green-600';
      case 'respiratoryRate':
        if (value > 24 || value < 12) return 'text-red-600';
        return 'text-green-600';
      case 'bloodPressure':
        const systolic = parseInt(value.split('/')[0]);
        if (systolic > 140 || systolic < 90) return 'text-red-600';
        return 'text-green-600';
      case 'ecg':
        if (typeof value === 'string' && (value.includes('Normal'))) return 'text-green-600';
        return 'text-red-600';
      case 'activityLevel':
        if (value < 2000) return 'text-red-600';
        return 'text-green-600';
      default:
        return 'text-gray-900';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="mb-4 inline-flex items-center text-teal-600 hover:text-teal-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{patient.name}</h1>
              <p className="mt-2 text-gray-600">Patient ID: {patient.id}</p>
            </div>
            <AlertBadge riskLevel={patient.riskLevel} size="large" />
          </div>
        </div>

        {/* Current Vitals Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Vital Signs</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="text-center">
              <div className="text-2xl mb-2">💓</div>
              <div className="text-sm text-gray-500 mb-1">Heart Rate</div>
              <div className={`text-2xl font-bold ${getVitalStatus('heartRate', patient.heartRate)}`}>
                {patient.heartRate}
              </div>
              <div className="text-sm text-gray-500">bpm</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🩸</div>
              <div className="text-sm text-gray-500 mb-1">Blood Pressure</div>
              <div className={`text-2xl font-bold ${getVitalStatus('bloodPressure', patient.bloodPressure)}`}>
                {patient.bloodPressure}
              </div>
              <div className="text-sm text-gray-500">mmHg</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🫁</div>
              <div className="text-sm text-gray-500 mb-1">SpO₂</div>
              <div className={`text-2xl font-bold ${getVitalStatus('spO2', patient.spO2)}`}>
                {patient.spO2}
              </div>
              <div className="text-sm text-gray-500">%</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">📈</div>
              <div className="text-sm text-gray-500 mb-1">ECG Status</div>
              <div className={`text-lg font-bold ${getVitalStatus('ecg', patient.ecg)}`}>
                {patient.ecg?.split(' ')[0] || 'Normal'}
              </div>
              <div className="text-sm text-gray-500">rhythm</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🚶</div>
              <div className="text-sm text-gray-500 mb-1">Activity Level</div>
              <div className={`text-2xl font-bold ${getVitalStatus('activityLevel', patient.activityLevel)}`}>
                {(patient.activityLevel / 1000).toFixed(1)}k
              </div>
              <div className="text-sm text-gray-500">steps</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🌬️</div>
              <div className="text-sm text-gray-500 mb-1">Respiratory Rate</div>
              <div className={`text-2xl font-bold ${getVitalStatus('respiratoryRate', patient.respiratoryRate)}`}>
                {patient.respiratoryRate}
              </div>
              <div className="text-sm text-gray-500">bpm</div>
            </div>
          </div>
        </div>

        {/* Historical Charts */}
        <div className="space-y-8">
          <h2 className="text-xl font-semibold text-gray-900">
            24-Hour Vital Signs Trends
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {chartData.heartRate && (
              <VitalChart
                data={chartData.heartRate}
                title="Heart Rate (Last 24 Hours)"
                color="pink"
              />
            )}
            
            {chartData.bloodPressure && (
              <VitalChart
                data={chartData.bloodPressure}
                title="Blood Pressure (Last 24 Hours)"
                color="blue"
              />
            )}
            
            {chartData.spO2 && (
              <VitalChart
                data={chartData.spO2}
                title="SpO₂ (Last 24 Hours)"
                color="green"
              />
            )}
            
            {chartData.ecg && (
              <VitalChart
                data={chartData.ecg}
                title="ECG Status (Last 24 Hours)"
                color="purple"
              />
            )}

            {chartData.activityLevel && (
              <VitalChart
                data={chartData.activityLevel}
                title="Activity Level (Last 24 Hours)"
                color="orange"
              />
            )}

            {chartData.respiratoryRate && (
              <VitalChart
                data={chartData.respiratoryRate}
                title="Respiratory Rate (Last 24 Hours)"
                color="teal"
              />
            )}
          </div>
        </div>

        {/* Additional Patient Info */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <span className="text-sm text-gray-500">Patient ID</span>
              <div className="text-lg font-medium text-gray-900">{patient.id}</div>
            </div>
            <div>
              <span className="text-sm text-gray-500">Risk Assessment</span>
              <div className="mt-1">
                <AlertBadge riskLevel={patient.riskLevel} />
              </div>
            </div>
            <div>
              <span className="text-sm text-gray-500">Last Updated</span>
              <div className="text-lg font-medium text-gray-900">
                {new Date().toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
