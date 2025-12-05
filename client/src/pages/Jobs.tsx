import { auth } from "../lib/auth";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import MainLayout from "../components/Layout/MainLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/UI/Card";
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
import {
  Plus,
  Edit,
  Trash2,
  Briefcase,
  Users as UsersIcon,
  Eye,
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  salary?: string;
  budget_range?: string;
  type: "full-time" | "part-time" | "contract" | "freelance";
  employment_type?: string;
  work_mode?: string;
  years_of_exp?: number;
  hiring_org?: string;
  status: "open" | "closed" | "draft";
  status_name?: string;
  project_status_id?: number;
  applications?: number;
  is_featured?: boolean;
  is_urgent?: boolean;
  platform: string;
  postedAt: string;
  updatedAt?: string;
}

interface ProjectStatus {
  id: number;
  name: string;
  projectCount: number;
}

export default function JobsPage() {
  const [_, setLocation] = useLocation();
  const [giglancerProjects, setGiglancerProjects] = useState<Job[]>([]);
  const [projectStatuses, setProjectStatuses] = useState<ProjectStatus[]>([]);
  const [selectedStatusId, setSelectedStatusId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      setLocation("/login");
      return;
    }

    // Fetch project statuses first
    auth
      .fetchAPI("/api/giglancer/project-statuses")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setProjectStatuses(data.data);
          // Set default to "Open for Bidding" (id: 2)
          const openStatus = data.data.find((s: ProjectStatus) => s.name === "Open For Bidding");
          if (openStatus) {
            setSelectedStatusId(openStatus.id);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching project statuses:", error);
      });
  }, [setLocation]);

  // Fetch jobs when selected status changes
  useEffect(() => {
    if (selectedStatusId !== null) {
      fetchJobs();
    }
  }, [selectedStatusId]);

  const fetchJobs = () => {
    setLoading(true);
    // Build query string with status filter
    const queryParams = selectedStatusId ? `?project_status_id=${selectedStatusId}` : '';

    // Fetch Giglancer projects
    auth
      .fetchAPI(`/api/giglancer/projects${queryParams}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setGiglancerProjects(data.data || []);
        }
      })
      .catch((error) => {
        console.error("Error fetching Giglancer projects:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePostJob = () => {
    setLocation("/post-job");
  };

  const handleDeleteJob = async (jobId: string, jobTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${jobTitle}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await auth.fetchAPI(`/api/giglancer/projects/${jobId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        alert("Job deleted successfully!");
        fetchJobs(); // Refresh the list
      } else {
        alert(data.message || "Failed to delete job");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("An error occurred while deleting the job");
    }
  };

  // Use only Giglancer projects
  const allJobs = giglancerProjects;

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
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Job Postings</h1>
            <p className="text-gray-600 mt-1">
              Manage your job openings and applications
            </p>
          </div>
          <Button icon={<Plus className="w-4 h-4" />} onClick={handlePostJob}>
            Post Job
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-3 border-b border-gray-200 overflow-x-auto">
          {projectStatuses.map((status) => {
            const isSelected = selectedStatusId === status.id;
            return (
              <button
                key={status.id}
                onClick={() => setSelectedStatusId(status.id)}
                className={`
                  px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors relative
                  ${isSelected
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <span>{status.name}</span>
                  <span className={`
                    inline-flex items-center justify-center min-w-[1.5rem] h-6 px-2 rounded-full text-xs font-semibold
                    ${isSelected
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                    }
                  `}>
                    {isSelected ? allJobs.length : status.projectCount}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Jobs</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {allJobs.length}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Giglancer Projects
                  </p>
                </div>
                <Briefcase className="w-10 h-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Open Positions</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">
                    {allJobs.filter((j) => j.status === "open").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">
                    {allJobs.reduce((sum, j) => sum + (j.applications || 0), 0)}
                  </p>
                </div>
                <UsersIcon className="w-10 h-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg. Applications</p>
                  <p className="text-2xl font-bold text-purple-600 mt-1">
                    {allJobs.length > 0
                      ? Math.round(
                          allJobs.reduce(
                            (sum, j) => sum + (j.applications || 0),
                            0
                          ) / allJobs.length
                        )
                      : 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Jobs Table */}
        <Card>
          <CardContent className="p-0">
            {allJobs.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No job postings yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start hiring by posting your first job
                </p>
                <Button onClick={handlePostJob}>Post Job</Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Budget/Salary</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">
                            {job.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {job.description?.substring(0, 60)}...
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded capitalize">
                          {(job.employment_type || job.type || "").replace("-", " ")}
                        </span>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {job.salary || job.budget_range || "Not specified"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={job.platform === "giglancer" ? "info" : "default"}>
                          {job.platform}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <UsersIcon className="w-4 h-4 text-gray-400" />
                          <span className="font-semibold">
                            {job.applications || 0}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            job.status === "open"
                              ? "success"
                              : job.status === "draft"
                              ? "warning"
                              : "default"
                          }
                        >
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={<Eye className="w-4 h-4" />}
                            onClick={() => setLocation(`/jobs/${job.id}`)}
                            title="View Job Details"
                          >
                            View
                          </Button>
                          {job.platform === "giglancer" && (
                            <>
                              <button
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                onClick={() => setLocation(`/jobs/${job.id}/edit`)}
                                title="Edit Job"
                              >
                                <Edit className="w-4 h-4 text-gray-600" />
                              </button>
                              <button
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                onClick={() => handleDeleteJob(job.id, job.title)}
                                title="Delete Job"
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}