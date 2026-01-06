export interface Employee {
  _id: string
  name: string
  email: string
  phone?: string
  role: string
  department: string
  joiningDate?: string
  status?: "active" | "on_leave" | "inactive"
  avatar?: string
  password?: string
  employeeId?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface Task {
  _id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  assignee: {
    name: string
    avatar: string
  }
  dueDate: string
  tags: string[]
  status: string
}

export interface DailyTask {
  id?: string
  _id?: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  status: "pending" | "in_progress" | "completed"
  assignedTo: string
  dueDate: string
}

export interface Project {
  _id: string
  name: string
  description: string
  progress: number
  status: string
  priority: "high" | "medium" | "low"
  deadline: string
  team: string[]
  tasks: {
    total: number
    completed: number
  }
}

export interface Invoice {
  _id: string
  id: string
  company: string
  companyId: string
  project: string
  client: string
  amount: number
  gstAmount: number
  totalAmount: number
  hasGST: boolean
  gstPercentage: number
  status: "paid" | "pending" | "overdue"
  dueDate: string
  issuedDate: string
  clientImage?: string
}
