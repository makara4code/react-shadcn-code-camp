import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from '@/components/ui/textarea'

export default function TraineeDetailPage() {
  const [date, setDate] = useState<Date>()

  return (
    <div className="flex-1 max-w-4xl p-6 mx-auto rounded-lg">
      <h1 className="mb-6 text-2xl font-bold">Trainee Detail</h1>
      
      <div className="p-4 mb-6 bg-gray-100 rounded dark:bg-gray-800">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="name">Name:</Label>
            <Input id="name" placeholder="Enter name" />
          </div>
          <div>
            <Label htmlFor="id">ID:</Label>
            <Input id="id" placeholder="Enter ID" />
          </div>
          <div>
            <Label htmlFor="phone">Phone:</Label>
            <Input id="phone" placeholder="Enter phone number" />
          </div>
          <div>
            <Label htmlFor="age">Age:</Label>
            <Input id="age" type="number" placeholder="Enter age" />
          </div>
          <div>
            <Label htmlFor="date">Date:</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="gender">Gender:</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Table className="relative z-10 border border-collapse">
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Measurement</TableHead>
            <TableHead className="font-bold">Initial</TableHead>
            <TableHead className="font-bold">Current</TableHead>
            <TableHead className="font-bold">Goal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            { label: "Height (cm)", id: "height" },
            { label: "Weight (kg)", id: "weight" },
            { label: "Body Fat (%)", id: "bodyFat" },
            { label: "BMI", id: "bmi" },
            { label: "Muscle Mass (kg)", id: "muscleMass" },
            { label: "Metabolic Age", id: "metabolicAge" },
            { label: "Visceral Fat", id: "visceralFat" }
          ].map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-medium ">{row.label}</TableCell>
              <TableCell>
                <Input id={`${row.id}-initial`} placeholder="Initial" />
              </TableCell>
              <TableCell>
                <Input id={`${row.id}-current`} placeholder="Current" />
              </TableCell>
              <TableCell>
                <Input id={`${row.id}-goal`} placeholder="Goal" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
        <div>
          <h3 className="mb-2 font-bold">Notes</h3>
          <Textarea 
            className="w-full h-32 p-2 border rounded" 
            placeholder="Enter any additional notes here..." 
          />
        </div>
        <div>
          <h3 className="mb-2 font-bold">Related Information</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fitnessGoal">Primary Fitness Goal:</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weightLoss">Weight Loss</SelectItem>
                  <SelectItem value="muscleBuild">Muscle Building</SelectItem>
                  <SelectItem value="endurance">Endurance</SelectItem>
                  <SelectItem value="flexibility">Flexibility</SelectItem>
                  <SelectItem value="overall">Overall Fitness</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="experience">Fitness Experience Level:</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block mb-2">Preferred Training Types:</Label>
              <div className="space-y-2">
                {["Cardio", "Strength Training", "Yoga", "HIIT", "Pilates"].map((type) => (
                  <div key={type} className="flex items-center">
                    <Checkbox id={type.toLowerCase().replace(' ', '-')} />
                    <label
                      htmlFor={type.toLowerCase().replace(' ', '-')}
                      className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button className="text-white bg-blue-500 hover:bg-blue-600">Save Details</Button>
      </div>
    </div>
  )
}