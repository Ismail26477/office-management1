const API_URL = "http://localhost:5000/api"

export async function fetchEmployees(): Promise<any[]> {
  try {
    const response = await fetch(`${API_URL}/employees`)
    if (!response.ok) throw new Error("Failed to fetch employees")
    return await response.json()
  } catch (error) {
    console.error("Error fetching employees:", error)
    return []
  }
}

export async function fetchEmployeeById(id: string): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/employees/${id}`)
    if (!response.ok) throw new Error("Failed to fetch employee")
    return await response.json()
  } catch (error) {
    console.error("Error fetching employee:", error)
    return null
  }
}

export async function createEmployee(employeeData: any): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/employees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employeeData),
    })
    if (!response.ok) throw new Error("Failed to create employee")
    return await response.json()
  } catch (error) {
    console.error("Error creating employee:", error)
    return null
  }
}

export async function fetchEmployeeStats(): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/employees/stats`)
    if (!response.ok) throw new Error("Failed to fetch employee stats")
    return await response.json()
  } catch (error) {
    console.error("Error fetching employee stats:", error)
    return {
      totalEmployees: 0,
      presentToday: 0,
      onLeave: 0,
      averageSalary: 0,
      departmentDistribution: [],
    }
  }
}

export async function fetchTodayAttendance(): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/attendance/today`)
    if (!response.ok) throw new Error("Failed to fetch today's attendance")
    return await response.json()
  } catch (error) {
    console.error("Error fetching today's attendance:", error)
    return {
      presentToday: 0,
      onLeave: 0,
      absent: 0,
    }
  }
}
