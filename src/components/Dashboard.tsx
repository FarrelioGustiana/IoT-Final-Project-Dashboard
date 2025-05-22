import SensorCard from "@components/SensorCard"
import {  Droplet, Thermometer } from "react-feather"
import { FlaskConical } from "lucide-react"

interface DashboardProps {
  ph: number
  moisture: number
  tds: number
  timestamp: string
}

const Dashboard = ({ ph, moisture, tds, timestamp }: DashboardProps) => {
  return (
    <main className="flex-1 h-screen overflow-x-hidden bg-background p-4 md:p-6">
      <div className="max-w-3xl mx-auto">
        <header className="border-b border-border pb-4 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-foreground">Soil Monitoring</h1>
            <div className="text-xs text-muted flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
              Last updated: {timestamp}
            </div>
          </div>
        </header>

        <div className="space-y-3">
          <SensorCard
            value={ph}
            status={ph < 5 || ph > 8 ? "warning" : "normal"}
            title="pH Level"
            icon={<FlaskConical className="w-4 h-4" />}
            unit=""
            max={14}
          />

          <SensorCard
            value={moisture}
            status={moisture < 30 ? "warning" : "normal"}
            title="Moisture"
            icon={<Droplet className="w-4 h-4" />}
            unit="%"
            max={100}
          />

          <SensorCard
            value={tds}
            status={tds > 1000 ? "warning" : "normal"}
            title="TDS"
            icon={<Thermometer className="w-4 h-4" />}
            unit="ppm"
            max={2000}
          />
        </div>
      </div>
    </main>
  )
}

export default Dashboard
