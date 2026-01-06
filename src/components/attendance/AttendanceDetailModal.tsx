"use client"

import { X, MapPin, Camera, Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface AttendanceDetailModalProps {
  isOpen: boolean
  onClose: () => void
  record: {
    _id: string
    employeeName?: string
    name?: string
    email?: string
    department?: string
    checkInTime?: string
    checkInLocation?: string | { address?: string; latitude?: number; longitude?: number }
    checkInPhoto?: string
    checkInPhotoData?: string
    checkOutTime?: string
    checkOutLocation?: string | { address?: string; latitude?: number; longitude?: number }
    checkOutPhoto?: string
    checkOutPhotoData?: string
    totalHours?: number
    status: string
    photoData?: string
    [key: string]: any
  } | null
}

export function AttendanceDetailModal({ isOpen, onClose, record }: AttendanceDetailModalProps) {
  if (!isOpen || !record) return null

  console.log("[v0] Attendance record data:", record)
  console.log("[v0] checkInPhoto:", record.checkInPhoto)
  console.log("[v0] checkInPhotoData:", record.checkInPhotoData)
  console.log("[v0] All record keys:", Object.keys(record))

  const getLocationString = (
    location: string | { address?: string; latitude?: number; longitude?: number } | undefined,
  ) => {
    if (!location) return "Not recorded"
    if (typeof location === "string") return location
    if (typeof location === "object" && location.address) return location.address
    return "Not recorded"
  }

  const formatTime = (dateString?: string) => {
    if (!dateString) return "Not recorded"
    try {
      const date = new Date(dateString)
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    } catch {
      return dateString
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not recorded"
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    } catch {
      return dateString
    }
  }

  const formatHours = (hours?: number) => {
    if (!hours) return "-"
    const h = Math.floor(hours)
    const m = Math.round((hours % 1) * 60)
    return `${h}h ${m}m`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
      case "checked-out":
        return "bg-green-100 text-green-800"
      case "late":
        return "bg-yellow-100 text-yellow-800"
      case "absent":
        return "bg-red-100 text-red-800"
      case "leave":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    if (status === "checked-out") return "Present"
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const getImageData = (photoField?: string, photoDataField?: string) => {
    return photoField || photoDataField || null
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 border-2 border-white">
              <AvatarImage src={record.photoData || "/placeholder.svg"} />
              <AvatarFallback className="text-lg">
                {(record.employeeName || record.name || "Unknown")
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{record.employeeName || record.name || "Unknown"}</h2>
              <p className="text-blue-100">{record.email || "No email"}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-full transition">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Quick Info */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-gray-600 mb-1">Department</p>
              <p className="font-semibold text-gray-900">{record.department || "-"}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-sm text-gray-600 mb-1">Total Hours</p>
              <p className="font-semibold text-gray-900">{formatHours(record.totalHours)}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <Badge className={cn("text-xs font-semibold", getStatusColor(record.status))}>
                {getStatusLabel(record.status)}
              </Badge>
            </div>
          </div>

          {/* Check In Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="bg-green-100 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-green-600" />
              </span>
              Check In Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Check In Time */}
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-sm text-gray-600 mb-2">Check In Time</p>
                <p className="text-2xl font-bold text-green-700">{formatTime(record.checkInTime)}</p>
                <p className="text-xs text-gray-500 mt-1">{formatDate(record.checkInTime)}</p>
              </div>

              {/* Check In Location */}
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> Check In Location
                </p>
                <p className="font-semibold text-gray-900 break-words">{getLocationString(record.checkInLocation)}</p>
              </div>

              {/* Check In Photo */}
              {(() => {
                const checkInImage = record.photoData || record.checkInPhoto || record.checkInPhotoData
                return checkInImage ? (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                      <Camera className="h-4 w-4" /> Check In Photo
                    </p>
                    <img
                      src={checkInImage || "/placeholder.svg"}
                      alt="Check In"
                      className="w-full h-48 object-cover rounded-lg border border-green-200"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg"
                      }}
                    />
                  </div>
                ) : null
              })()}
            </div>
          </div>

          {/* Check Out Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="bg-red-100 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-red-600" />
              </span>
              Check Out Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Check Out Time */}
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <p className="text-sm text-gray-600 mb-2">Check Out Time</p>
                <p className="text-2xl font-bold text-red-700">{formatTime(record.checkOutTime)}</p>
                <p className="text-xs text-gray-500 mt-1">{formatDate(record.checkOutTime)}</p>
              </div>

              {/* Check Out Location */}
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> Check Out Location
                </p>
                <p className="font-semibold text-gray-900 break-words">{getLocationString(record.checkOutLocation)}</p>
              </div>

              {/* Check Out Photo */}
              {(() => {
                const checkOutImage = getImageData(record.checkOutPhoto, record.checkOutPhotoData)
                return checkOutImage ? (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                      <Camera className="h-4 w-4" /> Check Out Photo
                    </p>
                    <img
                      src={checkOutImage || "/placeholder.svg"}
                      alt="Check Out"
                      className="w-full h-48 object-cover rounded-lg border border-red-200"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg"
                      }}
                    />
                  </div>
                ) : null
              })()}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 p-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
