import {
  Bar,
  BarChart,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
  Percent,
} from "lucide-react";

const clientData = [
  { name: "Mon", clients: 4 },
  { name: "Tue", clients: 7 },
  { name: "Wed", clients: 5 },
  { name: "Thu", clients: 6 },
  { name: "Fri", clients: 8 },
  { name: "Sat", clients: 10 },
  { name: "Sun", clients: 3 },
];

const sessionTypeData = [
  { name: "Personal Training", value: 60 },
  { name: "Group Classes", value: 25 },
  { name: "Online Coaching", value: 10 },
  { name: "Nutrition Consultation", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const upcomingSessions = [
  {
    id: 1,
    client: "Alice Johnson",
    time: "10:00 AM",
    duration: "60 min",
    type: "Personal Training",
  },
  {
    id: 2,
    client: "Bob Smith",
    time: "11:30 AM",
    duration: "45 min",
    type: "Nutrition Consultation",
  },
  {
    id: 3,
    client: "Carol Williams",
    time: "2:00 PM",
    duration: "60 min",
    type: "Personal Training",
  },
  {
    id: 4,
    client: "David Brown",
    time: "3:30 PM",
    duration: "30 min",
    type: "Progress Check-in",
  },
  {
    id: 5,
    client: "Eva Davis",
    time: "5:00 PM",
    duration: "60 min",
    type: "Personal Training",
  },
];

export default function EnhancedTrainerDashboard() {
  return (
    <div className="flex-1 p-6">
      <h1 className="mb-6 text-2xl font-bold">Trainee Detail</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">36</div>
            <p className="text-xs text-muted-foreground">+2 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Sessions This Week
            </CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              4 more than last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Hours Trained</CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,225</div>
            <p className="text-xs text-muted-foreground">
              +10% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Your schedule for today</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingSessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell className="font-medium">
                      {session.client}
                    </TableCell>
                    <TableCell>{session.time}</TableCell>
                    <TableCell>{session.duration}</TableCell>
                    <TableCell>{session.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Weekly Client Overview</CardTitle>
            <CardDescription>Number of clients trained per day</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer
              config={{
                clients: {
                  label: "Clients",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={clientData}>
                  <Bar
                    dataKey="clients"
                    fill="var(--color-clients)"
                    radius={[4, 4, 0, 0]}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Session Type Distribution</CardTitle>
            <CardDescription>Breakdown of session types</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                sessionType: {
                  label: "Session Type",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sessionTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sessionTypeData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Client Retention Rate</CardTitle>
            <CardDescription>Percentage of returning clients</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[200px]">
            <div className="text-center">
              <Percent className="w-12 h-12 mx-auto mb-4 text-primary" />
              <div className="text-5xl font-bold">85%</div>
              <p className="mt-2 text-sm text-muted-foreground">
                +5% from last quarter
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Client Progress</CardTitle>
            <CardDescription>Based on fitness assessments</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[200px]">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-primary" />
              <div className="text-5xl font-bold">+18%</div>
              <p className="mt-2 text-sm text-muted-foreground">
                Improvement in 3 months
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
