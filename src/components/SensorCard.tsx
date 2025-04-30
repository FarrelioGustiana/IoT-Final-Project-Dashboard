import React from "react"
interface SensorCardProps {
  value: number
  status: "normal" | "warning" | "critical"
  title: string
  icon: React.ReactNode
}

const SensorCard = ({ value, status, title, icon }: SensorCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "critical":
        return "text-error"
      case "warning":
        return "text-warning"
      default:
        return "text-success"
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "critical":
        return "Critical"
      case "warning":
        return "Warning"
      default:
        return "Normal"
    }
  }

  return (
    <div className="p-6 bg-secondary rounded-lg shadow-md">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-accent/10 rounded-full">{icon}</div>
        <div>
          <h2 className="text-lg font-medium">{title}</h2>
          <p className={`text-sm ${getStatusColor()}`}>{getStatusText()}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-4xl font-bold">
              {value.toFixed(1)}
              <span className="text-xl ml-1">%</span>
            </p>
            <p className="text-text-secondary text-sm mt-1">Current level</p>
          </div>
          <div className="h-16 w-full max-w-xs">
            <div className="h-4 bg-secondary border border-border rounded-full overflow-hidden">
              <div
                className={`h-full ${getStatusColor()} transition-all duration-500 ease-out`}
                style={{ width: `${Math.min(100, value)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SensorCard
