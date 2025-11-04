"use client"

const VitalCard = ({ title, value, unit, color = "primary", onClick, icon, trend }) => {
  const colorClasses = {
    primary: {
      gradient: "from-primary-50 to-primary-100",
      border: "border-primary-200/50",
      text: "text-primary-700",
      accent: "from-primary-500 to-primary-600",
      icon: "text-primary-600",
      iconBg: "bg-primary-100",
    },
    secondary: {
      gradient: "from-secondary-50 to-secondary-100",
      border: "border-secondary-200/50",
      text: "text-secondary-700",
      accent: "from-secondary-500 to-secondary-600",
      icon: "text-secondary-600",
      iconBg: "bg-secondary-100",
    },
    success: {
      gradient: "from-success-50 to-success-100",
      border: "border-success-200/50",
      text: "text-success-700",
      accent: "from-success-500 to-success-600",
      icon: "text-success-600",
      iconBg: "bg-success-100",
    },
    warning: {
      gradient: "from-warning-50 to-warning-100",
      border: "border-warning-200/50",
      text: "text-warning-700",
      accent: "from-warning-500 to-warning-600",
      icon: "text-warning-600",
      iconBg: "bg-warning-100",
    },
    danger: {
      gradient: "from-danger-50 to-danger-100",
      border: "border-danger-200/50",
      text: "text-danger-700",
      accent: "from-danger-500 to-danger-600",
      icon: "text-danger-600",
      iconBg: "bg-danger-100",
    },
  }

  const colors = colorClasses[color] || colorClasses.primary

  const getVitalIcon = (title) => {
    if (icon) return icon

    switch (title.toLowerCase()) {
      case "heart rate":
      case "average heart rate":
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        )
      case "blood pressure":
      case "average blood pressure":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      case "spo2":
      case "average spo2":
      case "spo₂":
      case "average spo₂":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m3-16C15.5 2 19 5.5 19 10c0 7-8 13-8 13s-8-6-8-13c0-4.5 3.5-8 8-8z"
            />
          </svg>
        )
      case "ecg":
      case "ecg status":
      case "average ecg":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
            />
          </svg>
        )
      case "activity level":
      case "activity":
      case "average activity level":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      case "respiratory rate":
      case "resp. rate":
      case "average respiratory rate":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        )
      case "temperature":
      case "average temperature":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19V6l3-3 3 3v13a7 7 0 11-6 0zm-2 0a9 9 0 1018 0"
            />
          </svg>
        )
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2z"
            />
          </svg>
        )
    }
  }

  const getTrendIcon = (trend) => {
    if (trend > 0) {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l10-10M17 7v10m0-10H7" />
        </svg>
      )
    } else if (trend < 0) {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17l-10-10M7 7v10m0-10h10" />
        </svg>
      )
    }
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
      </svg>
    )
  }

  const getTrendColor = (trend) => {
    if (trend > 0) return "text-success-600 bg-success-50 border-success-200"
    if (trend < 0) return "text-danger-600 bg-danger-50 border-danger-200"
    return "text-neutral-500 bg-neutral-50 border-neutral-200"
  }

  return (
    <div
      className={`
        vital-card card-interactive p-6 bg-gradient-to-br ${colors.gradient} ${colors.border} 
        border group animate-scale-in cursor-pointer relative overflow-hidden
      `}
      onClick={onClick}
    >
      {/* Accent Line */}
      <div
        className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${colors.accent} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
      ></div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 ${colors.iconBg} rounded-2xl flex items-center justify-center ${colors.icon} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-soft`}
        >
          {getVitalIcon(title)}
        </div>

        {trend !== undefined && (
          <div
            className={`flex items-center px-2.5 py-1 rounded-lg border text-xs font-semibold ${getTrendColor(trend)}`}
          >
            {getTrendIcon(trend)}
            <span className="ml-1">{Math.abs(trend)}%</span>
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-neutral-600 mb-3 group-hover:text-neutral-700 transition-colors duration-200">
        {title}
      </h3>

      {/* Value */}
      <div className="flex items-baseline mb-2">
        <span className={`text-3xl font-bold ${colors.text} group-hover:scale-105 transition-transform duration-200`}>
          {value}
        </span>
        {unit && <span className="ml-2 text-lg font-semibold text-neutral-500">{unit}</span>}
      </div>

      {/* Interactive Elements */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <div className={`w-2 h-2 rounded-full ${colors.iconBg} group-hover:animate-pulse`}></div>
          <div
            className={`w-1.5 h-1.5 rounded-full ${colors.iconBg} group-hover:animate-pulse`}
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className={`w-1 h-1 rounded-full ${colors.iconBg} group-hover:animate-pulse`}
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>

        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  )
}

export default VitalCard
