import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

const tasks = [
  {
    id: "TASK-8782",
    title: "You can't compress the program without quantifying the open-source SSD pixel!",
    status: "in progress",
    priority: "medium",
  },
  {
    id: "TASK-7878",
    title: "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
    status: "todo",
    priority: "low",
  },
  {
    id: "TASK-7839",
    title: "We need to bypass the neural TCP card!",
    status: "done",
    priority: "high",
  },
  {
    id: "TASK-5562",
    title: "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
    status: "canceled",
    priority: "medium",
  },
  {
    id: "TASK-8686",
    title: "I'll parse the wireless SSL protocol, that should driver the API panel!",
    status: "in progress",
    priority: "high",
  },
]

export default function TaskTable() {
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="w-[100px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <div className="font-medium">{task.title}</div>
                <div className="text-sm text-muted-foreground">{task.id}</div>
              </TableCell>
              <TableCell>
                <StatusBadge status={task.status} />
              </TableCell>
              <TableCell>
                <PriorityBadge priority={task.priority} />
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-8 h-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit task</DropdownMenuItem>
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Delete task</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const statusColors = {
    todo: "bg-slate-500",
    "in progress": "bg-blue-500",
    done: "bg-green-500",
    canceled: "bg-red-500",
  }

  return (
    <Badge className={`${statusColors[status as keyof typeof statusColors]} text-white`}>
      {status}
    </Badge>
  )
}

function PriorityBadge({ priority }: { priority: string }) {
  const priorityColors = {
    low: "bg-gray-500",
    medium: "bg-yellow-500",
    high: "bg-red-500",
  }

  return (
    <Badge className={`${priorityColors[priority as keyof typeof priorityColors]} text-white`}>
      {priority}
    </Badge>
  )
}