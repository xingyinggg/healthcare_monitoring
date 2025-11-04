"use client"

import { useNavigate } from "react-router-dom"
import AlertBadge from "../components/AlertBadge"
import { getPatientAlerts } from "../data/mockData"

const Alerts = () => {
  const navigate = useNavigate()
  const highRiskPatients = getPatientAlerts()

  const handlePatientClick = (patientId) => {
    navigate(`/patient/${patientId}`)
  }

  const getAlertIcon = (condition) => {
    const iconClass = "w-6 h-6"
    switch (condition) {
      case "Tachycardia":
        return (
          <svg className={`${iconClass} text-red-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        )
      case "Hypertension":
        return (
          <svg className={`${iconClass} text-blue-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      case "Hypoxemia":
        return (
          <svg className={`${iconClass} text-emerald-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
      case "Fever":
        return (
          <svg className={`${iconClass} text-amber-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1m-16 0H1m15.364 1.636l.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        )
      default:
        return (
          <svg className={`${iconClass} text-red-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4v2m0 4v2m0-14V3m0 2v2m0 4v2"
            />
          </svg>
        )
    }
  }

  const getAlertDescription = (condition) => {
    switch (condition) {
      case "Tachycardia":
        return "Elevated heart rate detected - requires immediate attention"
      case "Hypertension":
        return "High blood pressure reading - monitor closely"
      case "Hypoxemia":
        return "Low oxygen saturation levels - check respiratory status"
      case "Arrhythmia":
        return "Irregular heart rhythm detected - requires immediate assessment"
      case "Tachypnea":
        return "Elevated respiratory rate - monitor breathing patterns"
      case "Low Activity":
        return "Decreased activity level - assess patient mobility"
      default:
        return "Abnormal vital signs detected - review patient status"
    }
  }

  const getPriorityLevel = (condition) => {
    switch (condition) {
      case "Tachycardia":
      case "Hypoxemia":
      case "Arrhythmia":
        return "CRITICAL"
      case "Hypertension":
      case "Tachypnea":
        return "HIGH"
      case "Low Activity":
        return "MEDIUM"
      default:
        return "MEDIUM"
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Patient Alerts</h1>
              <p className="text-lg text-slate-400">High-priority patients requiring immediate medical attention</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl backdrop-blur">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-300">Live Monitoring</span>
                </div>
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors inline-flex items-center">
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
          <div className="bg-slate-900 border border-slate-800 border-l-4 border-l-red-500 p-6 rounded-lg animate-in">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-red-400">{highRiskPatients.length}</h3>
                <p className="text-sm text-slate-400">Critical Alerts</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 border-l-4 border-l-amber-500 p-6 rounded-lg animate-in">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-amber-400">{Math.floor(Math.random() * 15) + 5}</h3>
                <p className="text-sm text-slate-400">Avg Response Time (min)</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 border-l-4 border-l-blue-500 p-6 rounded-lg animate-in">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-blue-400">{Math.floor(Math.random() * 20) + 10}</h3>
                <p className="text-sm text-slate-400">Resolved Today</p>
              </div>
            </div>
          </div>
        </div>

        {/* High-Risk Patients List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Active Critical Alerts</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-400">Sort by:</span>
              <select className="bg-slate-900 border border-slate-800 text-white text-sm py-2 px-3 rounded-lg">
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
              className="bg-slate-900 border border-slate-800 p-6 rounded-lg animate-in group cursor-pointer hover:border-slate-700 transition-all"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 flex-1">
                  {/* Alert Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      {getAlertIcon(patient.condition)}
                    </div>
                  </div>

                  {/* Patient Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {patient.name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                          getPriorityLevel(patient.condition) === "CRITICAL"
                            ? "bg-red-600 text-white animate-pulse"
                            : "bg-amber-600 text-white"
                        }`}
                      >
                        {getPriorityLevel(patient.condition)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mb-1">Patient ID: {patient.id}</p>
                    <div className="flex items-center space-x-4">
                      <div className="text-lg font-medium text-red-400">{patient.condition}</div>
                      <div className="text-sm text-slate-500">Triggered: {new Date().toLocaleTimeString()}</div>
                    </div>
                    <p className="text-sm text-slate-400 mt-2">{getAlertDescription(patient.condition)}</p>
                  </div>
                </div>

                {/* Risk Level & Actions */}
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <AlertBadge riskLevel={patient.riskLevel} animated={true} />
                    <div
                      className={`mt-2 w-4 h-4 rounded-full mx-auto ${
                        patient.alertColor === "red" ? "bg-red-500 animate-pulse" : "bg-amber-500"
                      }`}
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg transition-colors font-medium"
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePatientClick(patient.id)
                      }}
                    >
                      View Patient
                    </button>
                    <button
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm px-4 py-2 rounded-lg transition-colors font-medium"
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    >
                      Acknowledge
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Vital Stats */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-xs text-slate-400 mb-1">Heart Rate</div>
                    <div className={`text-lg font-bold ${patient.heartRate > 100 ? "text-red-400" : "text-white"}`}>
                      {patient.heartRate} <span className="text-xs font-normal">bpm</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-400 mb-1">Blood Pressure</div>
                    <div
                      className={`text-lg font-bold ${
                        Number.parseInt(patient.bloodPressure.split("/")[0]) > 140 ? "text-red-400" : "text-white"
                      }`}
                    >
                      {patient.bloodPressure} <span className="text-xs font-normal">mmHg</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-400 mb-1">SpO₂</div>
                    <div className={`text-lg font-bold ${patient.spO2 < 95 ? "text-red-400" : "text-white"}`}>
                      {patient.spO2} <span className="text-xs font-normal">%</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-400 mb-1">ECG Status</div>
                    <div
                      className={`text-sm font-bold ${patient.ecg?.includes("Normal") ? "text-white" : "text-red-400"}`}
                    >
                      {patient.ecg?.split(" ")[0] || "Normal"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-400 mb-1">Respiratory Rate</div>
                    <div
                      className={`text-lg font-bold ${
                        patient.respiratoryRate > 24 || patient.respiratoryRate < 12 ? "text-red-400" : "text-white"
                      }`}
                    >
                      {patient.respiratoryRate} <span className="text-xs font-normal">bpm</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-400 mb-1">Activity Level</div>
                    <div
                      className={`text-lg font-bold ${patient.activityLevel < 2000 ? "text-red-400" : "text-white"}`}
                    >
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
          <div className="bg-slate-900 border border-slate-800 p-12 rounded-lg text-center">
            <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">All Clear</h3>
            <p className="text-lg text-slate-400 mb-6">
              No critical alerts at this time. All patients have stable vital signs.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors inline-flex items-center font-medium">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh Status
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Alerts
