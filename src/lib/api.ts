const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

export const apiClient = {
  async getEmployees() {
    const response = await fetch(`${API_BASE_URL}/employees`)
    if (!response.ok) throw new Error("Failed to fetch employees")
    return response.json()
  },

  async getTasks() {
    const response = await fetch(`${API_BASE_URL}/tasks`)
    if (!response.ok) throw new Error("Failed to fetch tasks")
    return response.json()
  },

  async getProjects() {
    const response = await fetch(`${API_BASE_URL}/projects`)
    if (!response.ok) throw new Error("Failed to fetch projects")
    return response.json()
  },

  async getInvoices() {
    const response = await fetch(`${API_BASE_URL}/invoices`)
    if (!response.ok) throw new Error("Failed to fetch invoices")
    return response.json()
  },

  async getAttendance() {
    const response = await fetch(`${API_BASE_URL}/attendance`)
    if (!response.ok) throw new Error("Failed to fetch attendance")
    return response.json()
  },

  async getDailyTasks() {
    const response = await fetch(`${API_BASE_URL}/daily-tasks`)
    if (!response.ok) throw new Error("Failed to fetch daily tasks")
    return response.json()
  },

  async getEditorSheets() {
    const response = await fetch(`${API_BASE_URL}/editor-sheets`)
    if (!response.ok) throw new Error("Failed to fetch editor sheets")
    return response.json()
  },

  async updateDailyTask(id: string, data: any) {
    const response = await fetch(`${API_BASE_URL}/daily-tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update daily task")
    return response.json()
  },
}
