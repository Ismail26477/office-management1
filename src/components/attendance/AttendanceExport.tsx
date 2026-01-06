"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AttendanceExportProps {
  attendanceData: any[]
}

export function AttendanceExport({ attendanceData }: AttendanceExportProps) {
  const exportCSV = () => {
    if (attendanceData.length === 0) {
      alert("No attendance data to export")
      return
    }

    const headers = [
      "Employee Name",
      "Email",
      "Date",
      "Check In Time",
      "Check Out Time",
      "Total Hours",
      "Status",
      "Department",
    ]
    const rows = attendanceData.map((record: any) => [
      record.employeeName || "Unknown",
      record.email || "-",
      new Date(record.date || record.createdAt).toLocaleDateString(),
      record.checkInTime || "-",
      record.checkOutTime || "-",
      record.totalHours || "-",
      record.status || "-",
      record.department || "-",
    ])

    let csv = headers.join(",") + "\n"
    rows.forEach((row: any[]) => {
      csv += row.map((cell) => `"${cell}"`).join(",") + "\n"
    })

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `attendance-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="flex items-center gap-2">
      <Button onClick={exportCSV} size="sm" variant="outline" className="flex items-center gap-2 bg-transparent">
        <Download className="h-4 w-4" />
        Export CSV
      </Button>
    </div>
  )
}
