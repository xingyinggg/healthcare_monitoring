const AlertBadge = ({ riskLevel, size = "medium", animated = false }) => {
  const getRiskColor = (level) => {
    switch (level) {
      case "high":
        return "bg-danger-100 text-danger-700 border-danger-300"
      case "medium":
        return "bg-warning-100 text-warning-700 border-warning-300"
      case "low":
        return "bg-success-100 text-success-700 border-success-300"
      default:
        return "bg-neutral-100 text-neutral-700 border-neutral-300"
    }
  }

  const getSizeClasses = (s) => {
    switch (s) {
      case "small":
        return "px-2 py-1 text-xs"
      case "large":
        return "px-4 py-2 text-base"
      default:
        return "px-3 py-1.5 text-sm"
    }
  }

  const label = riskLevel?.charAt(0).toUpperCase() + riskLevel?.slice(1)

  return (
    <span
      className={`inline-flex items-center border rounded-lg font-semibold transition-all duration-200 ${getSizeClasses(size)} ${getRiskColor(riskLevel)} ${animated ? "animate-pulse" : ""}`}
    >
      {label}
    </span>
  )
}

export default AlertBadge
