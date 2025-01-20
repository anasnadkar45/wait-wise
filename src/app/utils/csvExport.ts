export function convertToCSV(data: any[]): string {
    const headers = Object.keys(data[0]).join(",")
    const rows = data.map((row) =>
      Object.values(row)
        .map((value) => (typeof value === "string" ? `"${value.replace(/"/g, '""')}"` : value))
        .join(","),
    )
    return [headers, ...rows].join("\n")
  }
  
  