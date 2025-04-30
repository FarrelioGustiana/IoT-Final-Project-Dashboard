export const formatDate = (timestamp: any): string => {
    if (!timestamp) return "N/A"
  
    try {
      if (timestamp.toDate && typeof timestamp.toDate === "function") {
        const date = timestamp.toDate()
        return new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(date)
      }
  
      if (typeof timestamp === "string" || typeof timestamp === "number") {
        const date = new Date(timestamp)
        return new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(date)
      }
  
      return "Invalid date"
    } catch (error) {
      console.error("Error formatting date:", error)
      return "Invalid date"
    }
  }
  