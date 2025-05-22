import type React from "react"

interface SensorCardProps {
  value: number
  status: "normal" | "warning" | "critical"
  title: string
  icon: React.ReactNode
  unit: string
  max: number
}

const SensorCard = ({ value, status, title, icon, unit, max }: SensorCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "critical":
        return "text-critical bg-critical/10"
      case "warning":
        return "text-warning bg-warning/10"
      default:
        return "text-success bg-success/10"
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

  const getProgressColor = () => {
    switch (status) {
      case "critical":
        return "bg-critical"
      case "warning":
        return "bg-warning"
      default:
        return "bg-success"
    }
  }

  // Calculate percentage for progress bar
  const percentage = (value / max) * 100

  return (
    <div className="bg-card border border-border rounded-md hover:border-border-hover transition-colors">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-muted">{icon}</span>
            <h2 className="text-sm font-medium text-foreground">{title}</h2>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor()}`}>{getStatusText()}</span>
        </div>

        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-3xl font-semibold text-foreground">
              {value.toFixed(1)}
              <span className="text-xs ml-1 text-muted font-normal">{unit}</span>
            </p>
            <p className="text-xs text-muted">Current reading</p>
          </div>

          <div className="text-xs text-muted">
            <span>
              Max: {max}
              {unit}
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="h-1.5 bg-border rounded-full w-full overflow-hidden">
            <div
              className={`h-full ${getProgressColor()} transition-all duration-500 ease-out rounded-full`}
              style={{ width: `${Math.min(100, percentage)}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1 text-[10px] text-muted">
            <span>0</span>
            <span>{max / 2}</span>
            <span>{max}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SensorCard
