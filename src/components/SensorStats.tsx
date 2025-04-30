interface SensorStatsProps {
    title: string
    value: string
    unit: string
  }
  
  const SensorStats = ({ title, value, unit }: SensorStatsProps) => {
    return (
      <div className="p-4 bg-secondary rounded-lg shadow-md">
        <h3 className="text-text-secondary text-sm">{title}</h3>
        <p className="text-2xl font-bold mt-1">
          {value}
          <span className="text-sm ml-1 font-normal text-text-secondary">{unit}</span>
        </p>
      </div>
    )
  }
  
  export default SensorStats
  