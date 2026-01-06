"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Filter, Plus, Mail, Phone, ChevronLeft, ChevronRight, Edit, Eye, Trash2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { fetchEmployees, createEmployee } from "@/api/employees"
import type { Employee } from "@/types/database"

const statusStyles = {
  active: "status-success",
  on_leave: "status-warning",
  inactive: "status-destructive",
}

const statusLabels = {
  active: "Active",
  on_leave: "On Leave",
  inactive: "Inactive",
}

const departments = ["Caller", "Editor", "Developer", "Designer", "Marketing", "Management", "HR", "Sales"]
const roles = ["Employee", "Admin"]

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: "",
    role: "Employee",
    department: "",
    password: "",
  })

  useEffect(() => {
    const loadEmployees = async () => {
      setLoading(true)
      try {
        const data = await fetchEmployees()
        setEmployees(data)
      } catch (error) {
        console.error("Failed to load employees:", error)
      } finally {
        setLoading(false)
      }
    }
    loadEmployees()
  }, [])

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter
    return matchesSearch && matchesDepartment
  })

  const uniqueDepartments = [...new Set(employees.map((e) => e.department))]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.department || !formData.password) {
      alert("Please fill in all fields")
      return
    }

    setIsSubmitting(true)

    try {
      const employeeData = {
        name: formData.name,
        email: formData.email,
        role: formData.role.toLowerCase(),
        department: formData.department,
        password: formData.password,
        phone: "",
        joiningDate: new Date().toISOString().split("T")[0],
        status: "active",
      }

      const result = await createEmployee(employeeData)

      if (result) {
        alert("Employee added successfully!")
        // Reload employees list
        const updatedEmployees = await fetchEmployees()
        setEmployees(updatedEmployees)
        // Reset form and close dialog
        setFormData({
          name: "",
          email: "",
          employeeId: "",
          role: "Employee",
          department: "",
          password: "",
        })
        setIsAddDialogOpen(false)
      }
    } catch (error) {
      console.error("Failed to add employee:", error)
      alert("Failed to add employee. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-96">Loading employees...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-1 gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              className="pl-9 input-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {uniqueDepartments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Add New Employee
              </DialogTitle>
              <DialogDescription>Enter the employee details to create a new account</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddEmployee} className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="required">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input id="name" placeholder="John Doe" value={formData.name} onChange={handleInputChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="required">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employeeId" className="required">
                  Employee ID <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="employeeId"
                  placeholder="EMP001"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role" className="required">
                    Role <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department" className="required">
                    Department <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => handleSelectChange("department", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="required">
                  Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Min. 6 characters"
                  value={formData.password}
                  onChange={handleInputChange}
                  minLength={6}
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add Employee"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Employees Table */}
      <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                <th className="text-left p-4 font-medium text-muted-foreground text-sm">Employee</th>
                <th className="text-left p-4 font-medium text-muted-foreground text-sm hidden md:table-cell">Phone</th>
                <th className="text-left p-4 font-medium text-muted-foreground text-sm hidden lg:table-cell">
                  Department
                </th>
                <th className="text-left p-4 font-medium text-muted-foreground text-sm hidden xl:table-cell">
                  Joining Date
                </th>
                <th className="text-left p-4 font-medium text-muted-foreground text-sm">Status</th>
                <th className="text-right p-4 font-medium text-muted-foreground text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredEmployees.map((employee) => (
                <tr key={employee._id} className="table-row-hover">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{employee.name}</p>
                        <p className="text-sm text-muted-foreground">{employee.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {employee.phone || "-"}
                    </div>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <Badge variant="secondary">{employee.department}</Badge>
                  </td>
                  <td className="p-4 hidden xl:table-cell text-sm text-muted-foreground">{employee.joiningDate}</td>
                  <td className="p-4">
                    <Badge className={cn("status-pill", statusStyles[employee.status as keyof typeof statusStyles])}>
                      {statusLabels[employee.status as keyof typeof statusLabels]}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setSelectedEmployee(employee)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Employee Profile</DialogTitle>
                          </DialogHeader>
                          {selectedEmployee && (
                            <div className="space-y-6">
                              <div className="flex items-center gap-4">
                                <Avatar className="h-20 w-20">
                                  <AvatarImage src={selectedEmployee.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>
                                    {selectedEmployee.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="text-xl font-semibold">{selectedEmployee.name}</h3>
                                  <p className="text-muted-foreground">{selectedEmployee.role}</p>
                                  <Badge
                                    className={cn(
                                      "status-pill mt-2",
                                      statusStyles[selectedEmployee.status as keyof typeof statusStyles],
                                    )}
                                  >
                                    {statusLabels[selectedEmployee.status as keyof typeof statusLabels]}
                                  </Badge>
                                </div>
                              </div>
                              <div className="grid gap-4">
                                <div className="flex items-center gap-3">
                                  <Mail className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{selectedEmployee.email}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Phone className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{selectedEmployee.phone || "-"}</span>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                                <div>
                                  <p className="text-sm text-muted-foreground">Department</p>
                                  <p className="font-medium">{selectedEmployee.department}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Joining Date</p>
                                  <p className="font-medium">{selectedEmployee.joiningDate}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-border/50 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredEmployees.length} of {employees.length} employees
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 bg-transparent">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 bg-transparent">
              3
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Employees
