import { auth } from "../lib/auth";
import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
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
  ArrowLeft,
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Building2,
  Calendar,
  Users,
  Eye,
  CheckCircle,
  XCircle,
  MessageCircle,
} from "lucide-react";

interface JobDetail {
  id: string;
  title: string;
  description: string;
  location: string;
  salary?: string;
  budget_range?: string;
  employment_type?: string;
  work_mode?: string;
  years_of_exp?: number;
  hiring_org?: string;
  status: "open" | "closed" | "draft";
  is_featured?: boolean;
  is_urgent?: boolean;
  platform: string;
  postedAt: string;
  updatedAt?: string;
  requirements?: string;
  benefits?: string;
  bid_duration?: number;
}

interface Application {
  id: number;
  candidate: {
    name: string;
    email: string;
    avatar?: string;
  };
  appliedDate: string;
  aiScore: number;
  status: string;
}

export default function JobDetailPage() {
  const [_, setLocation] = useLocation();
  const [match, params] = useRoute("/jobs/:jobId");
  const [job, setJob] = useState<JobDetail | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  const jobId = params?.jobId;

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      setLocation("/login");
      return;
    }

    if (jobId) {
      fetchJobDetail();
    }
  }, [jobId, setLocation]);

  const fetchJobDetail = async () => {
    try {
      setLoading(true);
      const response = await auth.fetchAPI(`/api/giglancer/projects/${jobId}`);
      const data = await response.json();

      if (data.success) {
        setJob(data.data);
        // Mock applications data - would come from bids API
        setApplications(data.applications || []);
      }
    } catch (error) {
      console.error("Error fetching job detail:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "ai screening":
        return "bg-purple-100 text-purple-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "interview scheduled":
        return "bg-blue-100 text-blue-800";
      case "offer extended":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </MainLayout>
    );
  }

  if (!job) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Job not found
          </h2>
          <Button onClick={() => setLocation("/jobs")}>Back to Jobs</Button>
        </div>
      </MainLayout>
    );
  }

  const stats = {
    totalApplications: applications.length,
    pendingReview: applications.filter((a) => a.status === "Pending").length,
    shortlisted: applications.filter((a) => a.status === "Interview Scheduled")
      .length,
    rejected: applications.filter((a) => a.status === "Rejected").length,
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          icon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => setLocation("/jobs")}
        >
          Back to Jobs
        </Button>

        {/* Job Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Badge
                  className={`${
                    job.status === "open"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {job.status === "open" ? "Active" : job.status}
                </Badge>
                <span className="text-sm text-gray-500">
                  Posted: {new Date(job.postedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                {job.hiring_org && (
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>{job.hiring_org}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                {(job.salary || job.budget_range) && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-semibold text-gray-900">
                      {job.salary || job.budget_range}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600">
              Edit Job
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge className="bg-blue-100 text-blue-700">
              {job.employment_type || "Full-Time"}
            </Badge>
            {job.work_mode && (
              <Badge className="bg-purple-100 text-purple-700">
                {job.work_mode}
              </Badge>
            )}
            {job.years_of_exp !== undefined && (
              <Badge className="bg-green-100 text-green-700">
                {job.years_of_exp}+ years exp
              </Badge>
            )}
          </div>
        </div>

        {/* Application Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600">Total Applications</p>
                  <p className="text-3xl font-bold text-blue-900 mt-1">
                    {stats.totalApplications}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">↑ 18% this week</p>
                </div>
                <Users className="w-10 h-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-700">Pending Review</p>
                  <p className="text-3xl font-bold text-yellow-900 mt-1">
                    {stats.pendingReview}
                  </p>
                  <p className="text-xs text-yellow-700 mt-1">Awaiting action</p>
                </div>
                <Clock className="w-10 h-10 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Shortlisted</p>
                  <p className="text-3xl font-bold text-green-900 mt-1">
                    {stats.shortlisted}
                  </p>
                  <p className="text-xs text-green-600 mt-1">Under review</p>
                </div>
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600">Rejected</p>
                  <p className="text-3xl font-bold text-red-900 mt-1">
                    {stats.rejected}
                  </p>
                  <p className="text-xs text-red-600 mt-1">Not a match</p>
                </div>
                <XCircle className="w-10 h-10 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Job Description Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {job.description}
                </p>

                {job.requirements && (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                      Requirements
                    </h3>
                    <div className="text-gray-700 whitespace-pre-wrap">
                      {job.requirements}
                    </div>
                  </>
                )}

                {job.benefits && (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                      Benefits
                    </h3>
                    <div className="text-gray-700 whitespace-pre-wrap">
                      {job.benefits}
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                Close Job Posting
              </Button>
              <Button className="w-full bg-blue-500 hover:bg-blue-600">
                Share Job
              </Button>
              <Button className="w-full bg-green-500 hover:bg-green-600">
                Export Applications
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Applications List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Applications ({applications.length})</CardTitle>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>All Statuses</option>
                <option>AI Screening</option>
                <option>Pending</option>
                <option>Interview Scheduled</option>
                <option>Offer Extended</option>
                <option>Rejected</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No applications yet
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>CANDIDATE</TableHead>
                    <TableHead>APPLIED DATE</TableHead>
                    <TableHead>AI SCORE</TableHead>
                    <TableHead>STATUS</TableHead>
                    <TableHead className="text-right">ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {application.candidate.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {application.candidate.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {application.candidate.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-600">
                          {new Date(application.appliedDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[60px]">
                            <div
                              className={`h-2 rounded-full ${
                                application.aiScore >= 80
                                  ? "bg-green-500"
                                  : application.aiScore >= 60
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                              style={{ width: `${application.aiScore}%` }}
                            />
                          </div>
                          <span className="font-semibold text-sm">
                            {application.aiScore}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(application.status)}>
                          {application.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="View Profile"
                          >
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </button>
                          <button
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Message"
                          >
                            <MessageCircle className="w-4 h-4 text-blue-600" />
                          </button>
                          <button
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4 text-red-600" />
                          </button>
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
