"use client"

import { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/employees": "Employees",
  "/attendance": "Attendance",
  "/projects": "Projects",
  "/tasks": "Tasks",
  "/notifications": "Notifications",
  "/settings": "Settings",
}

export function MainLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const title = pageTitles[location.pathname] || "Dashboard"

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] min-h-screen bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileMenuOpen={mobileMenuOpen}
        onMobileMenuClose={() => setMobileMenuOpen(false)}
      />

      <div className="flex flex-col min-h-screen">
        <Header
          onMenuClick={() => {
            if (window.innerWidth < 1024) {
              setMobileMenuOpen(!mobileMenuOpen)
            } else {
              setSidebarCollapsed(!sidebarCollapsed)
            }
          }}
          title={title}
        />
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
