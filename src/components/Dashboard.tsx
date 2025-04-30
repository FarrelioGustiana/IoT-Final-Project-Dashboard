"use client"

import { useState } from "react"
import SensorCard from "@components/SensorCard"
import SensorChart from "@components/SensorChart"
import SensorStats from "@components/SensorStats"
import { Menu, ArrowUpRight, Droplet } from "react-feather";

interface DashboardProps {
  sensorValue: number
  timestamp: string
  historicalData: { time: string; value: number }[]
  toggleSidebar: () => void
}

const Dashboard = ({ sensorValue, timestamp, historicalData, toggleSidebar }: DashboardProps) => {
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("24h")

  const average = historicalData.reduce((sum, item) => sum + item.value, 0) / historicalData.length
  const min = Math.min(...historicalData.map((item) => item.value))
  const max = Math.max(...historicalData.map((item) => item.value))

  let status: "normal" | "warning" | "critical" = "normal"
  if (sensorValue > 80) {
    status = "critical"
  } else if (sensorValue > 60) {
    status = "warning"
  }

  return (
    <main className="flex-1 h-screen overflow-hidden">
      <div className="h-full overflow-y-auto px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="flex justify-between items-center mb-6">
            <div>
              <button
                onClick={toggleSidebar}
                className="md:hidden p-2 rounded-lg bg-secondary text-text-primary hover:bg-accent transition-colors"
              >
                <Menu className="w-5 h-5" />
                <span className="sr-only">Toggle menu</span>
              </button>
              <h1 className="text-2xl font-bold mt-2 md:mt-0">Water Sensor Dashboard</h1>
              <p className="text-text-secondary">Last updated: {timestamp}</p>
            </div>
  
            <div className="flex gap-2">
              <button
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  timeRange === "24h"
                    ? "bg-accent text-text-primary"
                    : "bg-secondary text-text-secondary hover:bg-accent/20"
                }`}
                onClick={() => setTimeRange("24h")}
              >
                24h
              </button>
              <button
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  timeRange === "7d"
                    ? "bg-accent text-text-primary"
                    : "bg-secondary text-text-secondary hover:bg-accent/20"
                }`}
                onClick={() => setTimeRange("7d")}
              >
                7d
              </button>
              <button
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  timeRange === "30d"
                    ? "bg-accent text-text-primary"
                    : "bg-secondary text-text-secondary hover:bg-accent/20"
                }`}
                onClick={() => setTimeRange("30d")}
              >
                30d
              </button>
            </div>
          </header>
  
          {/* Main sensor card */}
          <SensorCard value={sensorValue} status={status} title="Water Level" icon={<Droplet className="w-6 h-6" />} />
  
          {/* Chart section */}
          <div className="mt-6 p-4 bg-secondary rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Historical Data</h2>
              <button className="flex items-center gap-1 text-accent text-sm">
                View details <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            <SensorChart data={historicalData} />
          </div>
  
          {/* Stats section */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <SensorStats title="Average" value={average.toFixed(1)} unit="%" />
            <SensorStats title="Minimum" value={min.toFixed(1)} unit="%" />
            <SensorStats title="Maximum" value={max.toFixed(1)} unit="%" />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Dashboard
