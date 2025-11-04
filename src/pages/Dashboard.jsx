"use client"

import { useState, useEffect } from "react"
import VitalCard from "../components/VitalCard"
import VitalChart from "../components/VitalChart"
import PatientTable from "../components/PatientTable"
import { mockPatients, generateHistoricalData } from "../data/mockData"

const Dashboard = () => {
  const [selectedVital, setSelectedVital] = useState("heartRate")
  const [chartData, setChartData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [totalPatients, setTotalPatients] = useState(0)
  const [activeAlerts, setActiveAlerts] = useState(0)
  const [highRiskPatients, setHighRiskPatients] = useState(0)
  const [averageVitals, setAverageVitals] = useState({
    heartRate: 0,
    bloodPressure: 0,
    spO2: 0,
    ecg: "Normal",
    activityLevel: 0,
    respiratoryRate: 0,
  })

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setTotalPatients(100)
      setActiveAlerts(5)
      setHighRiskPatients(10)
      setAverageVitals({
        heartRate: 72,
        bloodPressure: 120,
        spO2: 95,
        ecg: "Normal",
        activityLevel: 7500,
        respiratoryRate: 16,
      })
      setChartData(generateHistoricalData(selectedVital))
      setLoading(false)
    }, 2000)
  }, [selectedVital])

  const handleVitalCardClick = (vitalType) => {
    setSelectedVital(vitalType)
  }

  const getVitalColor = (vitalType) => {
    const colors = {
      heartRate: "danger",
      bloodPressure: "primary",
      spO2: "success",
      ecg: "warning",
      activityLevel: "secondary",
      respiratoryRate: "primary",
    }
    return colors[vitalType] || "primary"
  }

  const getVitalTitle = (vitalType) => {
    const titles = {
      heartRate: "Heart Rate Trend",
      bloodPressure: "Blood Pressure Trend",
      spO2: "SpO₂ Trend",
      ecg: "ECG Status Trend",
      activityLevel: "Activity Level Trend",
      respiratoryRate: "Respiratory Rate Trend",
    }
    return titles[vitalType] || "Vital Sign Trend"
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-5xl font-bold text-white mb-3">Good morning, Dr. Smith</h1>
              <p className="text-base text-slate-400">Here's what's happening with your patients today</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-500">Last updated</div>
              <div className="text-lg font-semibold text-slate-200">
                {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-slate-900/50 backdrop-blur border border-slate-800 p-7 rounded-xl hover:border-slate-700 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400 mb-1">Total Patients</p>
                <p className="text-4xl font-bold text-white">{totalPatients}</p>
              </div>
              <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
                <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur border border-slate-800 p-7 rounded-xl hover:border-slate-700 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400 mb-1">Active Alerts</p>
                <p className="text-4xl font-bold text-amber-400">{activeAlerts}</p>
              </div>
              <div className="w-14 h-14 bg-amber-500/20 rounded-2xl flex items-center justify-center border border-amber-500/30">
                <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur border border-slate-800 p-7 rounded-xl hover:border-slate-700 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400 mb-1">High Risk</p>
                <p className="text-4xl font-bold text-red-400">{highRiskPatients}</p>
              </div>
              <div className="w-14 h-14 bg-red-500/20 rounded-2xl flex items-center justify-center border border-red-500/30">
                <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Vital Signs Overview */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-white mb-8">Average Vital Signs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
            <VitalCard
              title="Heart Rate"
              value={averageVitals.heartRate}
              unit="bpm"
              color="danger"
              trend={2.5}
              onClick={() => handleVitalCardClick("heartRate")}
            />
            <VitalCard
              title="Blood Pressure"
              value={averageVitals.bloodPressure}
              unit="mmHg"
              color="primary"
              trend={-1.2}
              onClick={() => handleVitalCardClick("bloodPressure")}
            />
            <VitalCard
              title="SpO₂"
              value={averageVitals.spO2}
              unit="%"
              color="success"
              trend={0.8}
              onClick={() => handleVitalCardClick("spO2")}
            />
            <VitalCard
              title="ECG Status"
              value="Normal"
              unit=""
              color="warning"
              trend={0}
              onClick={() => handleVitalCardClick("ecg")}
            />
            <VitalCard
              title="Activity Level"
              value={`${(averageVitals.activityLevel / 1000).toFixed(1)}k`}
              unit="steps"
              color="secondary"
              trend={5.2}
              onClick={() => handleVitalCardClick("activityLevel")}
            />
            <VitalCard
              title="Respiratory Rate"
              value={averageVitals.respiratoryRate}
              unit="bpm"
              color="primary"
              trend={-0.5}
              onClick={() => handleVitalCardClick("respiratoryRate")}
            />
          </div>
        </div>

        {/* Chart Section */}
        <div className="mb-10">
          <div className="bg-slate-900/50 backdrop-blur border border-slate-800 p-8 rounded-xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white">{getVitalTitle(selectedVital)}</h2>
                <p className="text-slate-400 text-sm mt-2">Click on a vital sign card above to view its trend chart</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-400">Live Data</span>
              </div>
            </div>

            {loading ? (
              <div className="h-80 flex items-center justify-center">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
                  <span className="text-slate-400">Loading chart data...</span>
                </div>
              </div>
            ) : chartData ? (
              <VitalChart data={chartData} title={getVitalTitle(selectedVital)} color={getVitalColor(selectedVital)} />
            ) : null}
          </div>
        </div>

        {/* Patient Table */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">Patient Overview</h2>
            <button className="text-slate-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Export Report
            </button>
          </div>
          <PatientTable patients={mockPatients} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
