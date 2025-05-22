import useFirestoreData from "@hooks/useFirestoreData"
import Dashboard from "@components/Dashboard"
import { formatDate } from "@/utils/dateUtils"

const App = () => {
  // Fetch the 'readings' document from 'sensors' collection
  const { data, loading } = useFirestoreData("sensors")

  // Find the 'readings' document
  const readingsDoc = data?.find((doc: any) => doc.id === "readings") || {}
  const { ph = 0, moisture = 0, tds = 0, timeStamp } = readingsDoc
  const timestamp = timeStamp ? formatDate(timeStamp) : "N/A"

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-5 h-5 border border-muted border-t-success rounded-full animate-spin"></div>
          <p className="text-muted text-xs">Loading sensor data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background overflow-x-hidden text-foreground">
      <Dashboard ph={ph} moisture={moisture} tds={tds} timestamp={timestamp} />
    </div>
  )
}

export default App
