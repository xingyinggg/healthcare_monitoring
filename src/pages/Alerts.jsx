import { useNavigate } from 'react-router-dom';
import AlertBadge from '../components/AlertBadge';
import { getPatientAlerts } from '../data/mockData';

const Alerts = () => {
  const navigate = useNavigate();
  const highRiskPatients = getPatientAlerts();

  const handlePatientClick = (patientId) => {
    navigate(`/patient/${patientId}`);
  };

  const getAlertIcon = (condition) => {
    switch (condition) {
      case 'Tachycardia':
        return '💓';
      case 'Hypertension':
        return '🩸';
      case 'Hypoxemia':
        return '🫁';
      case 'Fever':
        return '🌡️';
      default:
        return '⚠️';
    }
  };

  const getAlertDescription = (condition) => {
    switch (condition) {
      case 'Tachycardia':
        return 'Elevated heart rate detected - requires immediate attention';
      case 'Hypertension':
        return 'High blood pressure reading - monitor closely';
      case 'Hypoxemia':
        return 'Low oxygen saturation levels - check respiratory status';
      case 'Arrhythmia':
        return 'Irregular heart rhythm detected - requires immediate assessment';
      case 'Tachypnea':
        return 'Elevated respiratory rate - monitor breathing patterns';
      case 'Low Activity':
        return 'Decreased activity level - assess patient mobility';
      default:
        return 'Abnormal vital signs detected - review patient status';
    }
  };

  const getPriorityLevel = (condition) => {
    switch (condition) {
      case 'Tachycardia':
      case 'Hypoxemia':
      case 'Arrhythmia':
        return 'CRITICAL';
      case 'Hypertension':
      case 'Tachypnea':
        return 'HIGH';
      case 'Low Activity':
        return 'MEDIUM';
        return 'HIGH';
      default:
        return 'MEDIUM';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-danger-50 via-gray-50 to-warning-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Patient Alerts
              </h1>
              <p className="text-lg text-gray-600">
                High-priority patients requiring immediate medical attention
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="glass px-4 py-2 rounded-xl">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-danger-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Live Monitoring</span>
                </div>
              </div>
              <button className="btn-primary">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                </svg>
                Emergency Protocol
              </button>
            </div>
          </div>
        </div>

        {/* Alert Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6 border-l-4 border-danger-500 animate-in">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-danger-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-danger-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-danger-700">
                  {highRiskPatients.length}
                </h3>
                <p className="text-sm text-gray-600">Critical Alerts</p>
              </div>
            </div>
          </div>

          <div className="card p-6 border-l-4 border-warning-500 animate-in">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-warning-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-warning-700">
                  {Math.floor(Math.random() * 15) + 5}
                </h3>
                <p className="text-sm text-gray-600">Avg Response Time (min)</p>
              </div>
            </div>
          </div>

          <div className="card p-6 border-l-4 border-primary-500 animate-in">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-primary-700">
                  {Math.floor(Math.random() * 20) + 10}
                </h3>
                <p className="text-sm text-gray-600">Resolved Today</p>
              </div>
            </div>
          </div>
        </div>

        {/* High-Risk Patients List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Active Critical Alerts</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select className="input-primary text-sm py-2">
                <option>Priority Level</option>
                <option>Patient Name</option>
                <option>Time Triggered</option>
              </select>
            </div>
          </div>

          {highRiskPatients.map((patient, index) => (
            <div
              key={patient.id}
              onClick={() => handlePatientClick(patient.id)}
              className="card card-interactive p-6 animate-in group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  {/* Alert Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-danger-100 to-warning-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <span className="text-3xl">{getAlertIcon(patient.condition)}</span>
                    </div>
                  </div>

                  {/* Patient Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {patient.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                        getPriorityLevel(patient.condition) === 'CRITICAL' 
                          ? 'bg-danger-600 text-white animate-pulse' 
                          : 'bg-warning-600 text-white'
                      }`}>
                        {getPriorityLevel(patient.condition)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Patient ID: {patient.id}</p>
                    <div className="flex items-center space-x-4">
                      <div className="text-lg font-medium text-danger-600">
                        {patient.condition}
                      </div>
                      <div className="text-sm text-gray-500">
                        Triggered: {new Date().toLocaleTimeString()}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {getAlertDescription(patient.condition)}
                    </p>
                  </div>
                </div>

                {/* Risk Level & Actions */}
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <AlertBadge riskLevel={patient.riskLevel} animated={true} />
                    <div className={`mt-2 w-4 h-4 rounded-full mx-auto ${
                      patient.alertColor === 'red' ? 'bg-danger-500 animate-pulse' : 'bg-warning-500'
                    }`} />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <button 
                      className="btn-danger text-sm px-4 py-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePatientClick(patient.id);
                      }}
                    >
                      View Patient
                    </button>
                    <button 
                      className="btn-ghost text-sm px-4 py-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle acknowledge alert
                      }}
                    >
                      Acknowledge
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Vital Stats */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Heart Rate</div>
                    <div className={`text-lg font-bold ${
                      patient.heartRate > 100 ? 'text-danger-600' : 'text-gray-900'
                    }`}>
                      {patient.heartRate} <span className="text-xs font-normal">bpm</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Blood Pressure</div>
                    <div className={`text-lg font-bold ${
                      parseInt(patient.bloodPressure.split('/')[0]) > 140 ? 'text-danger-600' : 'text-gray-900'
                    }`}>
                      {patient.bloodPressure} <span className="text-xs font-normal">mmHg</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">SpO₂</div>
                    <div className={`text-lg font-bold ${
                      patient.spO2 < 95 ? 'text-danger-600' : 'text-gray-900'
                    }`}>
                      {patient.spO2} <span className="text-xs font-normal">%</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">ECG Status</div>
                    <div className={`text-sm font-bold ${
                      patient.ecg?.includes('Normal') ? 'text-gray-900' : 'text-danger-600'
                    }`}>
                      {patient.ecg?.split(' ')[0] || 'Normal'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Respiratory Rate</div>
                    <div className={`text-lg font-bold ${
                      patient.respiratoryRate > 24 || patient.respiratoryRate < 12 ? 'text-danger-600' : 'text-gray-900'
                    }`}>
                      {patient.respiratoryRate} <span className="text-xs font-normal">bpm</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Activity Level</div>
                    <div className={`text-lg font-bold ${
                      patient.activityLevel < 2000 ? 'text-danger-600' : 'text-gray-900'
                    }`}>
                      {(patient.activityLevel / 1000).toFixed(1)}k <span className="text-xs font-normal">steps</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {highRiskPatients.length === 0 && (
          <div className="card p-12 text-center">
            <div className="w-24 h-24 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">All Clear</h3>
            <p className="text-lg text-gray-600 mb-6">
              No critical alerts at this time. All patients have stable vital signs.
            </p>
            <button className="btn-primary">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh Status
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;
