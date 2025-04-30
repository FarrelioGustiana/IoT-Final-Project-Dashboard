import { useState, useEffect } from "react"
import useFirestoreData from "@hooks/useFirestoreData"
import Dashboard from "@components/Dashboard"
import Sidebar from "@components/Sidebar"
import { formatDate } from "@/utils/dateUtils"

const App = () => {
  const { data, loading } = useFirestoreData("water/")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const latestReading = data?.[0]?.value || 0
  const timestamp = data?.[0]?.timeStamp ? formatDate(data[0].timeStamp) : "N/A"

  const [historicalData, setHistoricalData] = useState<{ time: string; value: number }[]>([])

  useEffect(() => {
    if (data && data.length > 0) {
      const baseValue = data[0].value
      const mockData = Array.from({ length: 24 }, (_, i) => {
        const hourAgo = new Date()
        hourAgo.setHours(hourAgo.getHours() - (23 - i))

        const randomVariation = Math.random() * 10 - 5
        const value = Math.max(0, baseValue + randomVariation)

        return {
          time: hourAgo.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          value: Number.parseFloat(value.toFixed(1)),
        }
      })

      setHistoricalData(mockData)
    }
  }, [data])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-primary">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          <p className="text-text-primary text-lg">Loading sensor data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-primary overflow-hidden text-text-primary">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Dashboard
        sensorValue={latestReading}
        timestamp={timestamp}
        historicalData={historicalData}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
    </div>
  )
}

export default App
