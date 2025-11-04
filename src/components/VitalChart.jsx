import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const VitalChart = ({ data, title, color = "primary" }) => {
  const colorConfig = {
    primary: {
      border: "rgb(2, 132, 199)",
      background: "rgba(2, 132, 199, 0.1)",
      gradient: "rgba(2, 132, 199, 0.3)",
    },
    secondary: {
      border: "rgb(219, 39, 119)",
      background: "rgba(219, 39, 119, 0.1)",
      gradient: "rgba(219, 39, 119, 0.3)",
    },
    success: {
      border: "rgb(34, 197, 94)",
      background: "rgba(34, 197, 94, 0.1)",
      gradient: "rgba(34, 197, 94, 0.3)",
    },
    warning: {
      border: "rgb(245, 158, 11)",
      background: "rgba(245, 158, 11, 0.1)",
      gradient: "rgba(245, 158, 11, 0.3)",
    },
    danger: {
      border: "rgb(239, 68, 68)",
      background: "rgba(239, 68, 68, 0.1)",
      gradient: "rgba(239, 68, 68, 0.3)",
    },
  }

  const config = colorConfig[color] || colorConfig.primary

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: title,
        data: data.data,
        borderColor: config.border,
        backgroundColor: (context) => {
          const chart = context.chart
          const { ctx, chartArea } = chart
          if (!chartArea) return config.background

          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
          gradient.addColorStop(0, config.gradient)
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
          return gradient
        },
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: config.border,
        pointBorderColor: "#ffffff",
        pointBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: config.border,
        pointHoverBorderColor: "#ffffff",
        pointHoverBorderWidth: 3,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index",
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#374151",
        bodyColor: "#6B7280",
        borderColor: "#E5E7EB",
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: false,
        padding: 12,
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          title: (context) => `Time: ${context[0].label}`,
          label: (context) => {
            const unit = title.includes("Heart Rate")
              ? " bpm"
              : title.includes("Blood Pressure")
                ? " mmHg"
                : title.includes("SpO2") || title.includes("SpO₂")
                  ? "%"
                  : title.includes("Respiratory")
                    ? " bpm"
                    : title.includes("Activity")
                      ? " steps"
                      : ""
            return `${title}: ${context.parsed.y.toFixed(1)}${unit}`
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 8,
          color: "#9CA3AF",
          font: {
            size: 12,
          },
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#F3F4F6",
          drawBorder: false,
        },
        ticks: {
          color: "#9CA3AF",
          font: {
            size: 12,
          },
          callback: (value) => {
            const unit = title.includes("Heart Rate")
              ? " bpm"
              : title.includes("Blood Pressure")
                ? " mmHg"
                : title.includes("SpO2") || title.includes("SpO₂")
                  ? "%"
                  : title.includes("Respiratory")
                    ? " bpm"
                    : title.includes("Activity")
                      ? " steps"
                      : ""
            return `${value}${unit}`
          },
        },
        border: {
          display: false,
        },
        beginAtZero: false,
      },
    },
    elements: {
      point: {
        hoverBackgroundColor: config.border,
      },
    },
    animation: {
      duration: 1000,
      easing: "easeInOutQuart",
    },
  }

  return (
    <div className="w-full">
      <div style={{ height: "350px", position: "relative" }}>
        <Line data={chartData} options={options} />
      </div>

      {/* Chart Statistics */}
      <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-neutral-100">
        <div className="text-center">
          <div className="text-2xl font-bold text-neutral-900">{Math.max(...data.data).toFixed(1)}</div>
          <div className="text-sm text-neutral-500">Peak</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-neutral-900">
            {(data.data.reduce((a, b) => a + b, 0) / data.data.length).toFixed(1)}
          </div>
          <div className="text-sm text-neutral-500">Average</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-neutral-900">{Math.min(...data.data).toFixed(1)}</div>
          <div className="text-sm text-neutral-500">Low</div>
        </div>
      </div>
    </div>
  )
}

export default VitalChart
