"use client"

import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Eye,
  Edit,
  Trash2,
  Ellipsis,
  
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useNavigate } from "react-router-dom"

import ConfirmDeleteDialog from "@/components/shared/confirm-delete-dialog"

type StudentLog = {
  id: number
  date: string
  name: string
  exercise: string
  sets: number
  reps: number
  weight: number
  duration: number
}

const initialData: StudentLog[] = [
  { id: 1, date: "2023-05-01", name: "John Doe", exercise: "Bench Press", sets: 3, reps: 10, weight: 150, duration: 20 },
  { id: 2, date: "2023-05-01", name: "Jane Smith", exercise: "Squats", sets: 4, reps: 12, weight: 135, duration: 25 },
  { id: 3, date: "2023-05-02", name: "Mike Johnson", exercise: "Deadlift", sets: 3, reps: 8, weight: 225, duration: 15 },
  { id: 4, date: "2023-05-02", name: "Emily Brown", exercise: "Pull-ups", sets: 3, reps: 8, weight: 0, duration: 10 },
  { id: 5, date: "2023-05-03", name: "Chris Lee", exercise: "Shoulder Press", sets: 3, reps: 10, weight: 80, duration: 15 },
  { id: 6, date: "2023-05-03", name: "Sarah Davis", exercise: "Leg Press", sets: 4, reps: 15, weight: 200, duration: 30 },
  { id: 7, date: "2023-05-04", name: "Tom Wilson", exercise: "Bicep Curls", sets: 3, reps: 12, weight: 30, duration: 15 },
  { id: 8, date: "2023-05-04", name: "Lisa Chen", exercise: "Tricep Extensions", sets: 3, reps: 12, weight: 25, duration: 15 },
  { id: 9, date: "2023-05-05", name: "David Kim", exercise: "Lat Pulldowns", sets: 4, reps: 10, weight: 120, duration: 20 },
  { id: 10, date: "2023-05-05", name: "Emma Watson", exercise: "Leg Curls", sets: 3, reps: 15, weight: 50, duration: 20 },
  { id: 11, date: "2023-05-06", name: "Alex Turner", exercise: "Chest Flyes", sets: 3, reps: 12, weight: 40, duration: 15 },
  { id: 12, date: "2023-05-06", name: "Olivia Parker", exercise: "Crunches", sets: 3, reps: 20, weight: 0, duration: 10 },
  { id: 13, date: "2023-05-07", name: "Ryan Murphy", exercise: "Dips", sets: 3, reps: 10, weight: 0, duration: 15 },
  { id: 14, date: "2023-05-07", name: "Sophie Lee", exercise: "Lunges", sets: 3, reps: 12, weight: 30, duration: 20 },
  { id: 15, date: "2023-05-08", name: "Daniel Brown", exercise: "Plank", sets: 3, reps: 1, weight: 0, duration: 5 },
]

const tableHeaders = [
  { key: "id", label: "ID" },
  { key: "date", label: "Date" },
  { key: "name", label: "Name" },
  { key: "exercise", label: "Exercise" },
  { key: "sets", label: "Sets" },
  { key: "reps", label: "Reps" },
  { key: "weight", label: "Weight" },
  { key: "duration", label: "Duration" },
  { key: "actions", label: "Actions" },
]

export default function GymStudentLogTable() {
  const navigate = useNavigate()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [data, setData] = useState<StudentLog[]>(initialData)
  const [selectedRow, setSelectedRow] = useState<StudentLog | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1)

    const filteredData = initialData?.filter((item) =>
      Object.values(item).some((val) =>
        val
          ?.toString()
          ?.toLowerCase()
          ?.includes(event.target.value?.toLowerCase())
      )
    )
    setData(filteredData)
  }

  const handleViewDetails = (id: number) => {
    navigate(`/trainee/${id}/info`)
  }

  const handleEdit = (id: number) => {
    navigate(`/trainee/${id}/edit`)
  }

  const handleDelete = (id: number) => {
    const rowToDelete = data.find((item) => item.id === id)
    setSelectedRow(rowToDelete ?? null)
    setIsDeleteDialogOpen(true)
  }

  const handleOnConfirmDelete = () => {
    if (selectedRow) {
      const newData = data.filter((item) => item.id !== selectedRow.id)
      setData(newData)
      setIsDeleteDialogOpen(false)
    }
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(data.length / itemsPerPage)

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1)
  }

  return (
    <div className="w-full p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Gym Student Log Records</h2>
        <Input
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-sm"
        />
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              {tableHeaders.map(({ key, label }) => (
                <TableHead key={key} className="font-bold">
                  {label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((row) => (
              <TableRow key={row.id}>
                {Object.values(row).map((value, index) => (
                  <TableCell key={index}>{value}</TableCell>
                ))}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="w-8 h-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <Ellipsis className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleViewDetails(row.id)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        <span>View details</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(row.id)}>
                        <Edit className="w-4 h-4 mr-2" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(row.id)}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <span>Items per page:</span>
          <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder={itemsPerPage.toString()} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink onClick={() => setCurrentPage(page)} isActive={currentPage === page}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <ConfirmDeleteDialog
        open={isDeleteDialogOpen}
        setOpen={setIsDeleteDialogOpen}
        title={`Delete this trainee?`}
        description="Are you sure you want to delete this trainee? This action cannot be undone."
        onConfirm={handleOnConfirmDelete}
        triggerClassName="ml-2"
      />
    </div>
  )
}