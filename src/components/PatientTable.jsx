import { useNavigate } from 'react-router-dom';
import AlertBadge from './AlertBadge';

const PatientTable = ({ patients = [] }) => {
  const navigate = useNavigate();

  const handlePatientClick = (patientId) => {
    navigate(`/patient/${patientId}`);
  };

  const getVitalStatus = (vitalType, value, category) => {
    if (!value) return 'text-gray-400';

    const ranges = {
      heartRate: { normal: [60, 100], warning: [100, 120], critical: [120, 200] },
      systolic: { normal: [90, 120], warning: [120, 140], critical: [140, 180] },
      diastolic: { normal: [60, 80], warning: [80, 90], critical: [90, 120] },
      spO2: { normal: [95, 100], warning: [90, 95], critical: [0, 90] },
      respiratoryRate: { normal: [12, 20], warning: [20, 25], critical: [25, 40] },
      activityLevel: { normal: [5000, 15000], warning: [3000, 5000], critical: [0, 3000] }
    };

    if (vitalType === 'bloodPressure') {
      const [systolic, diastolic] = value.split('/').map(Number);
      const systolicStatus = getVitalStatusHelper(systolic, ranges.systolic);
      const diastolicStatus = getVitalStatusHelper(diastolic, ranges.diastolic);
      return systolicStatus === 'text-red-600' || diastolicStatus === 'text-red-600' 
        ? 'text-red-600' : systolicStatus === 'text-yellow-600' || diastolicStatus === 'text-yellow-600' 
        ? 'text-yellow-600' : 'text-green-600';
    }

    if (vitalType === 'ecg') {
      return value === 'Normal' ? 'text-green-600' : 
             value === 'Abnormal' ? 'text-red-600' : 'text-yellow-600';
    }

    const range = ranges[category];
    if (!range) return 'text-gray-600';

    return getVitalStatusHelper(Number(value), range);
  };

  const getVitalStatusHelper = (value, range) => {
    if (value >= range.normal[0] && value <= range.normal[1]) return 'text-green-600';
    if (value >= range.warning[0] && value <= range.warning[1]) return 'text-yellow-600';
    return 'text-red-600';
  };  if (!patients || patients.length === 0) {
    return (
      <div className="card p-12 text-center animate-fade-in">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Patient Data</h3>
        <p className="text-gray-500">No patients data available at this time</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden animate-fade-in">
      {/* Modern Header */}
      <div className="px-4 md:px-6 py-4 md:py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">Patient Overview</h3>
            <p className="text-sm text-gray-600 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
              Real-time monitoring • {patients.length} patients
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center px-3 py-1.5 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-xs font-medium text-gray-600">Live Updates</span>
            </div>
            <button className="inline-flex items-center px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900 border border-gray-200 rounded-lg text-sm font-medium transition-all duration-200">
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
        <table className="w-full border-collapse">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
            <tr>
              <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Patient</th>
              <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">
                    <svg className="w-2.5 h-2.5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
                  <span className="hidden sm:inline">Heart Rate</span>
                  <span className="sm:hidden">HR</span>
                </div>
              </th>
              <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <svg className="w-2.5 h-2.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="hidden sm:inline">Blood Pressure</span>
                  <span className="sm:hidden">BP</span>
                </div>
              </th>
              <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <svg className="w-2.5 h-2.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m3-16C15.5 2 19 5.5 19 10c0 7-8 13-8 13s-8-6-8-13c0-4.5 3.5-8 8-8z" />
                    </svg>
                  </div>
                  SpO₂
                </div>
              </th>
              <th className="hidden lg:table-cell px-4 md:px-6 py-3 md:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-yellow-100 flex items-center justify-center mr-2">
                    <svg className="w-2.5 h-2.5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                  </div>
                  ECG Status
                </div>
              </th>
              <th className="hidden xl:table-cell px-4 md:px-6 py-3 md:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <svg className="w-2.5 h-2.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                  Resp. Rate
                </div>
              </th>
              <th className="hidden xl:table-cell px-4 md:px-6 py-3 md:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                    <svg className="w-2.5 h-2.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  Activity
                </div>
              </th>
              <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Risk Level</th>
              <th className="px-4 md:px-6 py-3 md:py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr 
                key={patient.id} 
                className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 cursor-pointer group transition-all duration-300 hover:-translate-y-px hover:shadow-md"
                onClick={() => handlePatientClick(patient.id)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Patient Info */}
                <td className="px-4 md:px-6 py-3 md:py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 md:h-12 md:w-12 mr-3 md:mr-4">
                      <div className="h-10 w-10 md:h-12 md:w-12 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs md:text-sm shadow-soft group-hover:scale-105 transition-transform duration-200">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                        {patient.name}
                      </div>
                      <div className="text-xs text-gray-500">ID: {patient.id}</div>
                    </div>
                  </div>
                </td>

                {/* Heart Rate */}
                <td className="px-4 md:px-6 py-3 md:py-4">
                  <div className="flex items-center">
                    <span className={`text-base md:text-lg font-bold ${getVitalStatus('heartRate', patient.heartRate, 'heartRate')}`}>
                      {patient.heartRate || '--'}
                    </span>
                    <span className="text-xs text-gray-400 ml-1 font-medium">bpm</span>
                  </div>
                </td>

                {/* Blood Pressure */}
                <td className="px-4 md:px-6 py-3 md:py-4">
                  <div className="flex items-center">
                    <span className={`text-base md:text-lg font-bold ${getVitalStatus('bloodPressure', patient.bloodPressure, 'bloodPressure')}`}>
                      {patient.bloodPressure || '--'}
                    </span>
                    <span className="text-xs text-gray-400 ml-1 font-medium hidden sm:inline">mmHg</span>
                  </div>
                </td>

                {/* SpO2 */}
                <td className="px-4 md:px-6 py-3 md:py-4">
                  <div className="flex items-center">
                    <span className={`text-base md:text-lg font-bold ${getVitalStatus('spO2', patient.spO2, 'spO2')}`}>
                      {patient.spO2 || '--'}
                    </span>
                    <span className="text-xs text-gray-400 ml-1 font-medium">%</span>
                    <div className="ml-2 flex items-center">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </td>

                {/* ECG Status - Hidden on smaller screens */}
                <td className="hidden lg:table-cell px-4 md:px-6 py-3 md:py-4">
                  <div className="flex items-center">
                    <span className={`text-sm font-medium ${getVitalStatus('ecg', patient.ecg, 'ecg')}`}>
                      {patient.ecg || 'No data'}
                    </span>
                  </div>
                </td>

                {/* Respiratory Rate - Hidden on smaller screens */}
                <td className="hidden xl:table-cell px-4 md:px-6 py-3 md:py-4">
                  <div className="flex items-center">
                    <span className={`text-base md:text-lg font-bold ${getVitalStatus('respiratoryRate', patient.respiratoryRate, 'respiratoryRate')}`}>
                      {patient.respiratoryRate || '--'}
                    </span>
                    <span className="text-xs text-gray-400 ml-1 font-medium">bpm</span>
                  </div>
                </td>

                {/* Activity Level - Hidden on smaller screens */}
                <td className="hidden xl:table-cell px-4 md:px-6 py-3 md:py-4">
                  <div className="flex items-center">
                    <span className={`text-base md:text-lg font-bold ${getVitalStatus('activityLevel', patient.activityLevel, 'activityLevel')}`}>
                      {patient.activityLevel ? `${(patient.activityLevel / 1000).toFixed(1)}k` : '--'}
                    </span>
                    <span className="text-xs text-gray-400 ml-1 font-medium hidden lg:inline">steps</span>
                  </div>
                </td>

                {/* Risk Level */}
                <td className="px-4 md:px-6 py-3 md:py-4">
                  <AlertBadge riskLevel={patient.riskLevel} size="small" animated />
                </td>

                {/* Actions */}
                <td className="px-4 md:px-6 py-3 md:py-4 text-right">
                  <button 
                    className="inline-flex items-center px-3 py-1.5 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 border border-gray-200 hover:border-blue-200 rounded-lg text-xs font-medium transition-all duration-200 group-hover:scale-105"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePatientClick(patient.id);
                    }}
                  >
                    <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="hidden sm:inline">View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modern Footer */}
      <div className="px-4 md:px-6 py-3 bg-gray-50/50 border-t border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Last updated: {new Date().toLocaleTimeString()}
            </div>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Auto-refresh: 30s</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium text-gray-600">
              Showing <span className="font-bold text-gray-900">{patients.length}</span> patients
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Normal</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Warning</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Critical</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientTable;