interface SensorChartProps {
    data: { time: string; value: number }[]
  }
  
  const SensorChart = ({ data }: SensorChartProps) => {
    const values = data.map((item) => item.value)
    const max = Math.max(...values)
    const min = Math.min(...values)
    const range = max - min
  
    const getHeight = (value: number) => {
      if (range === 0) return 50
      return 10 + ((value - min) / range) * 90 
    }
  
    return (
      <div className="h-64">
        <div className="flex h-full items-end gap-1">
          {data.map((item, index) => (
            <div key={index} className="group relative flex-1 flex flex-col items-center">
              <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-accent text-text-primary text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap">
                {item.value}% at {item.time}
              </div>
              <div
                className="w-full bg-accent/80 hover:bg-accent transition-colors rounded-t"
                style={{ height: `${getHeight(item.value)}%` }}
              ></div>
              {index % 4 === 0 && (
                <span className="text-xs text-text-secondary mt-1 rotate-45 origin-left translate-y-2">{item.time}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  export default SensorChart
  