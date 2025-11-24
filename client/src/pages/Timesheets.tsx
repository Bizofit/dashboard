import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import MainLayout from "../components/Layout/MainLayout";
import { Card, CardContent } from "../components/UI/Card";
import Button from "../components/UI/Button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Badge,
} from "../components/UI/Table";
import Modal from "../components/UI/Modal";
import Input, { Select } from "../components/UI/Input";
import { Plus, Clock, Check, X, Calendar } from "lucide-react";

interface Timesheet {
  id: string;
  employeeName: string;
  projectName: string;
  date: string;
  hours: number;
  description: string;
  status: "pending" | "approved" | "rejected";
}

export default function TimesheetsPage() {
  const [_, setLocation] = useLocation();
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLocation("/login");
      return;
    }

    const timestamp = Date.now();
    fetch(`/api/timesheets?_t=${timestamp}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setTimesheets(data.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [setLocation]);

  const filteredTimesheets =
    filter === "all"
      ? timesheets
      : timesheets.filter((t) => t.status === filter);

  const totalHours = filteredTimesheets.reduce((sum, t) => sum + t.hours, 0);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Timesheets</h1>
            <p className="text-gray-600 mt-1">
              Review and approve employee time logs
            </p>
          </div>
          <Button
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsModalOpen(true)}
          >
            Log Time
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Hours</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {totalHours}h
                  </p>
                </div>
                <Clock className="w-10 h-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">
                {timesheets.filter((t) => t.status === "pending").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {timesheets.filter((t) => t.status === "approved").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600 mt-1">
                {timesheets.filter((t) => t.status === "rejected").length}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Button
                  variant={filter === "all" ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setFilter("all")}
                >
                  All
                </Button>
                <Button
                  variant={filter === "pending" ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setFilter("pending")}
                >
                  Pending
                </Button>
                <Button
                  variant={filter === "approved" ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setFilter("approved")}
                >
                  Approved
                </Button>
                <Button
                  variant={filter === "rejected" ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setFilter("rejected")}
                >
                  Rejected
                </Button>
              </div>
            </div>

            {filteredTimesheets.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No timesheets found
                </h3>
                <p className="text-gray-600 mb-6">
                  Start logging time to track work hours
                </p>
                <Button onClick={() => setIsModalOpen(true)}>Log Time</Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTimesheets.map((timesheet) => (
                    <TableRow key={timesheet.id}>
                      <TableCell className="font-medium">
                        {timesheet.employeeName}
                      </TableCell>
                      <TableCell>{timesheet.projectName}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {new Date(timesheet.date).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {timesheet.hours}h
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {timesheet.description}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            timesheet.status === "approved"
                              ? "success"
                              : timesheet.status === "pending"
                              ? "warning"
                              : "danger"
                          }
                        >
                          {timesheet.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {timesheet.status === "pending" && (
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              icon={
                                <Check className="w-4 h-4 text-green-500" />
                              }
                            >
                              Approve
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              icon={<X className="w-4 h-4 text-red-500" />}
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Log Time"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary">Submit Timesheet</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Select
            label="Project"
            options={[
              { value: "", label: "Select project" },
              { value: "project1", label: "Project Alpha" },
              { value: "project2", label: "Project Beta" },
            ]}
            required
          />
          <Input label="Date" type="date" required />
          <Input label="Hours Worked" type="number" placeholder="8" required />
          <Input label="Description" placeholder="What did you work on?" />
        </div>
      </Modal>
    </MainLayout>
  );
}
