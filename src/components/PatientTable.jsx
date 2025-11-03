import { useNavigate } from 'react-router-dom';
import AlertBadge from './AlertBadge';

const PatientTable = ({ patients = [] }) => {
  const navigate = useNavigate();

  const handlePatientClick = (patientId) => {
    navigate(`/patient/${patientId}`);
  };

  const getVitalStatus = (vital, value, type) => {
    if (value === undefined || value === null) return 'text-neutral-400';
    
    switch (type) {
      case 'heartRate':
        if (value > 100) return 'text-danger-600 font-semibold';
        if (value < 60) return 'text-warning-600 font-semibold';
        return 'text-success-600 font-semibold';
      case 'spO2':
        if (value < 95) return 'text-danger-600 font-semibold';
        if (value < 98) return 'text-warning-600 font-semibold';
        return 'text-success-600 font-semibold';
      case 'respiratoryRate':
        if (value > 24 || value < 12) return 'text-danger-600 font-semibold';
        if (value > 20 || value < 14) return 'text-warning-600 font-semibold';
        return 'text-success-600 font-semibold';
      case 'bloodPressure':
        if (typeof value !== 'string') return 'text-neutral-400';
        const systolic = parseInt(value.split('/')[0]);
        if (systolic > 140) return 'text-danger-600 font-semibold';
        if (systolic > 130) return 'text-warning-600 font-semibold';
        return 'text-success-600 font-semibold';
      case 'ecg':
        if (typeof value !== 'string') return 'text-neutral-400';
        if (value.includes('Normal')) return 'text-success-600 font-semibold';
        if (value.includes('Tachycardia') || value.includes('Fibrillation')) return 'text-danger-600 font-semibold';
        return 'text-warning-600 font-semibold';
      case 'activityLevel':
        if (value < 2000) return 'text-danger-600 font-semibold';
        if (value < 5000) return 'text-warning-600 font-semibold';
        return 'text-success-600 font-semibold';
      default:
        return 'text-neutral-700';
    }
  };

  if (!patients || patients.length === 0) {
    return (
      <div className="card p-12 text-center animate-fade-in">
        <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-neutral-700 mb-2">No Patient Data</h3>
        <p className="text-neutral-500">No patients data available at this time</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden animate-fade-in">
      {/* Modern Header */}
      <div className="px-6 py-5 border-b border-neutral-100 bg-gradient-to-r from-neutral-50 to-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-neutral-900 mb-1">Patient Overview</h3>
            <p className="text-sm text-neutral-600 flex items-center">
              <span className="status-dot status-online mr-2"></span>
              Real-time monitoring • {patients.length} patients
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center px-3 py-1.5 bg-white rounded-lg border border-neutral-200 shadow-sm">
              <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-xs font-medium text-neutral-600">Live Updates</span>
            </div>
            <button className="btn btn-ghost text-sm px-4 py-2">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </button>
          </div>
        </div>
      </div>
      
      {/* Modern Table */}
      <div className="overflow-x-auto">
        <table className="table-modern">
          <thead className="table-header">
            <tr>
              <th className="text-left">Patient</th>
              <th className="text-left">
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-heart-50 flex items-center justify-center mr-2">
                    <svg className="w-3 h-3 text-heart-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
                  Heart Rate
                </div>
              </th>
              <th className="text-left">
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-pressure-50 flex items-center justify-center mr-2">
                    <svg className="w-3 h-3 text-pressure-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  Blood Pressure
                </div>
              </th>
              <th className="text-left">
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-oxygen-50 flex items-center justify-center mr-2">
                    <svg className="w-3 h-3 text-oxygen-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m3-16C15.5 2 19 5.5 19 10c0 7-8 13-8 13s-8-6-8-13c0-4.5 3.5-8 8-8z" />
                    </svg>
                  </div>
                  SpO₂
                </div>
              </th>
              <th className="text-left">
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-heart-50 flex items-center justify-center mr-2">
                    <svg className="w-3 h-3 text-heart-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                  </div>
                  ECG Status
                </div>
              </th>
              <th className="text-left">
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-success-50 flex items-center justify-center mr-2">
                    <svg className="w-3 h-3 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                  Resp. Rate
                </div>
              </th>
              <th className="text-left">
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-primary-50 flex items-center justify-center mr-2">
                    <svg className="w-3 h-3 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  Activity
                </div>
              </th>
              <th className="text-left">Risk Level</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr 
                key={patient.id} 
                className="table-row cursor-pointer group"
                onClick={() => handlePatientClick(patient.id)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Patient Info */}
                <td className="table-cell">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 mr-4">
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-primary-700 font-bold text-sm shadow-soft group-hover:scale-105 transition-transform duration-200">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors duration-200">
                        {patient.name}
                      </div>
                      <div className="text-xs text-neutral-500">ID: {patient.id}</div>
                    </div>
                  </div>
                </td>

                {/* Heart Rate */}
                <td className="table-cell">
                  <div className="flex items-center">
                    <span className={`text-lg font-bold ${getVitalStatus('heartRate', patient.heartRate, 'heartRate')}`}>
                      {patient.heartRate || '--'}
                    </span>
                    <span className="text-xs text-neutral-400 ml-1 font-medium">bpm</span>
                  </div>
                </td>

                {/* Blood Pressure */}
                <td className="table-cell">
                  <div className="flex items-center">
                    <span className={`text-lg font-bold ${getVitalStatus('bloodPressure', patient.bloodPressure, 'bloodPressure')}`}>
                      {patient.bloodPressure || '--'}
                    </span>
                    <span className="text-xs text-neutral-400 ml-1 font-medium">mmHg</span>
                  </div>
                </td>

                {/* SpO2 */}
                <td className="table-cell">
                  <div className="flex items-center">
                    <span className={`text-lg font-bold ${getVitalStatus('spO2', patient.spO2, 'spO2')}`}>
                      {patient.spO2 || '--'}
                    </span>
                    <span className="text-xs text-neutral-400 ml-1 font-medium">%</span>
                    <div className="ml-2 flex items-center">
                      <div className="w-1.5 h-1.5 bg-success-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </td>

                {/* ECG Status */}
                <td className="table-cell">
                  <div className="flex items-center">
                    <span className={`text-sm font-medium ${getVitalStatus('ecg', patient.ecg, 'ecg')}`}>
                      {patient.ecg || 'No data'}
                    </span>
                  </div>
                </td>

                {/* Respiratory Rate */}
                <td className="table-cell">
                  <div className="flex items-center">
                    <span className={`text-lg font-bold ${getVitalStatus('respiratoryRate', patient.respiratoryRate, 'respiratoryRate')}`}>
                      {patient.respiratoryRate || '--'}
                    </span>
                    <span className="text-xs text-neutral-400 ml-1 font-medium">bpm</span>
                  </div>
                </td>

                {/* Activity Level */}
                <td className="table-cell">
                  <div className="flex items-center">
                    <span className={`text-lg font-bold ${getVitalStatus('activityLevel', patient.activityLevel, 'activityLevel')}`}>
                      {patient.activityLevel ? `${(patient.activityLevel / 1000).toFixed(1)}k` : '--'}
                    </span>
                    <span className="text-xs text-neutral-400 ml-1 font-medium">steps</span>
                  </div>
                </td>

                {/* Risk Level */}
                <td className="table-cell">
                  <AlertBadge riskLevel={patient.riskLevel} size="small" animated />
                </td>

                {/* Actions */}
                <td className="table-cell text-right">
                  <button 
                    className="inline-flex items-center px-3 py-1.5 bg-neutral-50 hover:bg-primary-50 text-neutral-600 hover:text-primary-600 border border-neutral-200 hover:border-primary-200 rounded-lg text-xs font-medium transition-all duration-200 group-hover:scale-105"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePatientClick(patient.id);
                    }}
                  >
                    <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modern Footer */}
      <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-neutral-600">
            Showing <span className="font-bold text-neutral-900">{patients.length}</span> patients
          </div>
          <div className="text-xs text-neutral-500 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientTable;